/**
 * The page's single 3D object: a wireframe icosahedron with square vertex
 * points, a tilted orbit ring and one signal travelling along it.
 *
 * The library is passed in rather than imported, so the same code runs in
 * the Next.js app (dynamic `import("three")`) and in a standalone build that
 * loads Three.js from a CDN.
 */

type Three = typeof import("three");

/** Everything scroll animation is allowed to change. Mutated by GSAP. */
export type SceneState = {
  /** Centre, as a fraction of the viewport from its centre (-0.5 … 0.5). */
  x: number;
  y: number;
  /** Diameter as a fraction of viewport height. */
  size: number;
  /** 0 = assembled, 1 = vertices pulled apart, edges faded out. */
  spread: number;
  /** Extra rotation driven by scroll (radians). */
  rot: number;
  opacity: number;
  /** 0 = neutral, 1 = vertices shift to the accent colour. */
  accent: number;
};

export type ScenePalette = { line: string; point: string; accent: string; signal: string };

export type SceneHandle = { dispose: () => void };

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;

/**
 * True when WebGL is hardware-accelerated. Checked with a throwaway context
 * *before* Three.js is downloaded: on CPU-only WebGL every frame of a
 * full-viewport canvas blocks the main thread (measured at 760–1,340 ms of
 * input delay during a smooth scroll under 4x CPU throttling), so those
 * visitors get the page and its scroll motion without the 3D layer.
 * Browsers that hide the renderer name (e.g. Firefox) are treated as capable.
 */
export function canRenderScene(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = (probe.getContext("webgl2") ?? probe.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !SOFTWARE_RENDERER.test(name);
  } catch {
    return false;
  }
}

export function createScene(
  THREE: Three,
  canvas: HTMLCanvasElement,
  state: SceneState,
  palette: ScenePalette,
  options: { animate: boolean },
): SceneHandle | null {
  let { animate } = options;
  let renderer: InstanceType<Three["WebGLRenderer"]>;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return null; // No WebGL: the page is complete without the object.
  }
  // Without a GPU, WebGL runs on the CPU (SwiftShader, llvmpipe…) and every
  // frame becomes a long main-thread task. There the object only redraws
  // when scrolling moves it, at 1x resolution, with no idle rotation.
  const gl = renderer.getContext();
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const rendererName = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  // Second line of defence if the probe above was inconclusive.
  const software = SOFTWARE_RENDERER.test(rendererName);
  if (software) animate = false;

  const dpr = software ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);
  const viewH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;

  /* --- Geometry: unique vertices + unique edges of a detail-1 icosahedron */
  const source = new THREE.IcosahedronGeometry(1, 1);
  const raw = source.getAttribute("position");
  const verts: number[][] = [];
  const keyToIndex = new Map<string, number>();
  const faceIdx: number[] = [];
  for (let i = 0; i < raw.count; i++) {
    const v = [raw.getX(i), raw.getY(i), raw.getZ(i)];
    const key = v.map((n) => n.toFixed(4)).join(",");
    let idx = keyToIndex.get(key);
    if (idx === undefined) {
      idx = verts.length;
      keyToIndex.set(key, idx);
      verts.push(v);
    }
    faceIdx.push(idx);
  }
  source.dispose();
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (let f = 0; f < faceIdx.length; f += 3) {
    const tri = [faceIdx[f], faceIdx[f + 1], faceIdx[f + 2]];
    for (let e = 0; e < 3; e++) {
      const a = Math.min(tri[e], tri[(e + 1) % 3]);
      const b = Math.max(tri[e], tri[(e + 1) % 3]);
      const k = `${a}-${b}`;
      if (!edgeSet.has(k)) {
        edgeSet.add(k);
        edges.push([a, b]);
      }
    }
  }

  // Deterministic per-vertex spread so the break-apart looks organic.
  const reach = verts.map((_, i) => 0.55 + 0.9 * (0.5 + 0.5 * Math.sin(i * 12.9898) * Math.cos(i * 4.1414)));
  const accentIndex = verts.reduce((best, v, i) => (v[1] > verts[best][1] ? i : best), 0);
  const signalIndex = verts.reduce((best, v, i) => (v[0] < verts[best][0] ? i : best), 0);

  const group = new THREE.Group();
  scene.add(group);

  const linePositions = new Float32Array(edges.length * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: palette.line, transparent: true, depthWrite: false });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  const pointPositions = new Float32Array(verts.length * 3);
  const pointColors = new Float32Array(verts.length * 3);
  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  pointGeo.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));
  const pointMat = new THREE.PointsMaterial({
    size: 4 * dpr,
    sizeAttenuation: false,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
  });
  group.add(new THREE.Points(pointGeo, pointMat));

  // Orbit ring and the signal that travels it.
  const ringSegments = 160;
  const ringRadius = 1.55;
  const ringPts = new Float32Array(ringSegments * 3);
  for (let i = 0; i < ringSegments; i++) {
    const a = (i / ringSegments) * Math.PI * 2;
    ringPts.set([Math.cos(a) * ringRadius, Math.sin(a) * ringRadius, 0], i * 3);
  }
  const ringGeo = new THREE.BufferGeometry();
  ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPts, 3));
  const ringMat = new THREE.LineBasicMaterial({ color: palette.line, transparent: true, depthWrite: false });
  const ring = new THREE.LineLoop(ringGeo, ringMat);
  const orbit = new THREE.Group();
  orbit.rotation.set(1.15, 0.25, 0.3);
  orbit.add(ring);
  group.add(orbit);

  const signalGeo = new THREE.BufferGeometry();
  signalGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
  const signalMat = new THREE.PointsMaterial({
    color: palette.accent,
    size: 7 * dpr,
    sizeAttenuation: false,
    transparent: true,
    depthWrite: false,
  });
  const signal = new THREE.Points(signalGeo, signalMat);
  orbit.add(signal);

  const cPoint = new THREE.Color(palette.point);
  const cAccent = new THREE.Color(palette.accent);
  const cSignal = new THREE.Color(palette.signal);
  const cTmp = new THREE.Color();

  /* --- Sizing ------------------------------------------------------------ */
  let width = 0;
  let height = 0;
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h || (w === width && Math.abs(h - height) < 2)) return;
    width = w;
    height = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  /* --- Frame ------------------------------------------------------------- */
  let dirty = true;
  let raf = 0;
  let time = 0;
  let last = performance.now();
  let lastDraw = 0;
  const snapshot = { ...state };

  const update = () => {
    const s = state;
    group.position.set(s.x * viewH * camera.aspect, s.y * viewH, 0);
    group.scale.setScalar(Math.max(0.0001, (s.size * viewH) / 2 / ringRadius));
    group.rotation.set(0.35 + s.rot * 0.35, time * 0.12 + s.rot, 0.1);
    orbit.rotation.z = 0.3 - time * 0.05;

    for (let i = 0; i < verts.length; i++) {
      const k = 1 + s.spread * reach[i];
      pointPositions[i * 3] = verts[i][0] * k;
      pointPositions[i * 3 + 1] = verts[i][1] * k;
      pointPositions[i * 3 + 2] = verts[i][2] * k;
      const base = i === accentIndex ? cAccent : i === signalIndex ? cSignal : cPoint;
      cTmp.copy(base).lerp(cAccent, i === signalIndex ? 0 : s.accent);
      pointColors.set([cTmp.r, cTmp.g, cTmp.b], i * 3);
    }
    edges.forEach(([a, b], e) => {
      linePositions.set(pointPositions.subarray(a * 3, a * 3 + 3), e * 6);
      linePositions.set(pointPositions.subarray(b * 3, b * 3 + 3), e * 6 + 3);
    });
    lineGeo.attributes.position.needsUpdate = true;
    pointGeo.attributes.position.needsUpdate = true;
    pointGeo.attributes.color.needsUpdate = true;

    const angle = time * 0.6;
    (signalGeo.attributes.position as InstanceType<Three["BufferAttribute"]>).setXYZ(
      0,
      Math.cos(angle) * ringRadius,
      Math.sin(angle) * ringRadius,
      0,
    );
    signalGeo.attributes.position.needsUpdate = true;

    lineMat.opacity = s.opacity * (0.95 - 0.8 * Math.min(1, s.spread));
    lineMat.color.set(palette.line).lerp(cAccent, s.accent * 0.35);
    ringMat.opacity = s.opacity * 0.55;
    pointMat.opacity = s.opacity;
    signalMat.opacity = s.opacity * (1 - Math.min(1, s.spread) * 0.6);
  };

  const changed = () => {
    let diff = false;
    for (const k of Object.keys(state) as (keyof SceneState)[]) {
      if (state[k] !== snapshot[k]) {
        snapshot[k] = state[k];
        diff = true;
      }
    }
    return diff;
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (document.hidden) return;
    if (animate) time += dt;
    // In reduced-motion mode nothing moves on its own, so skip idle frames.
    if (!animate && !dirty && !changed()) return;
    if (software && now - lastDraw < 50) return; // ~20fps cap on CPU rendering
    lastDraw = now;
    dirty = false;
    update();
    renderer.render(scene, camera);
  };
  resize();
  raf = requestAnimationFrame(frame);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      [lineGeo, pointGeo, ringGeo, signalGeo].forEach((g) => g.dispose());
      [lineMat, pointMat, ringMat, signalMat].forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
