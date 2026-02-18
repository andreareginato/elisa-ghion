export const blobVertexShader = /* glsl */ `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  varying vec3 vWorldPosition;

  //
  // Simplex 3D noise (Ashima Arts)
  //
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    // Gentle, slow organic movement
    float t = u_time * 0.08;
    float noise1 = snoise(position * 0.5 + t);
    float noise2 = snoise(position * 1.0 + t * 1.4 + 10.0) * 0.4;
    float noise3 = snoise(position * 2.0 + t * 1.8 + 20.0) * 0.15;
    float displacement = noise1 + noise2 + noise3;

    // Soft breathing
    float breath = sin(u_time * 0.3) * 0.04 + sin(u_time * 0.13) * 0.025;
    displacement += breath;

    // Subtle mouse influence
    vec3 mouseTarget = vec3(u_mouse.x * 1.2, u_mouse.y * 1.2, 0.3);
    float mouseDist = length(position - mouseTarget);
    float mouseInfluence = smoothstep(3.5, 0.0, mouseDist) * 0.12;
    displacement += mouseInfluence;

    // Mild scroll morphing
    float scrollFactor = 1.0 + u_scroll * 0.25;
    displacement *= scrollFactor;

    vDisplacement = displacement;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    vec3 newPosition = position + normal * displacement * 0.18;
    vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const blobFragmentShader = /* glsl */ `
  uniform float u_time;
  uniform vec2 u_mouse;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  varying vec3 vWorldPosition;

  void main() {
    // Warm, understated palette
    vec3 terracotta  = vec3(0.831, 0.396, 0.290);  // #D4654A
    vec3 coral       = vec3(0.941, 0.627, 0.549);  // #F0A08C
    vec3 gold        = vec3(0.788, 0.663, 0.431);  // #C9A96E
    vec3 rose        = vec3(0.769, 0.420, 0.486);  // #C46B7C
    vec3 cream       = vec3(0.984, 0.965, 0.941);  // #FBF6F0
    vec3 sand        = vec3(0.941, 0.902, 0.847);  // #F0E6D8

    // Soft color gradients driven by displacement
    float t = vDisplacement * 0.35 + 0.5;
    float angle = atan(vPosition.y, vPosition.x) * 0.1 + u_time * 0.03;

    vec3 color = mix(terracotta, coral, smoothstep(0.2, 0.5, t));
    color = mix(color, gold, smoothstep(0.4, 0.7, t + sin(angle) * 0.08));
    color = mix(color, sand, smoothstep(0.65, 0.9, t));
    color = mix(color, cream, smoothstep(0.85, 1.0, t));

    // Subtle fresnel glow
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
    color = mix(color, cream, fresnel * 0.35);

    // Soft directional light for depth
    vec3 lightDir = normalize(vec3(0.8, 1.0, 0.6));
    float diffuse = max(dot(vNormal, lightDir), 0.0) * 0.4 + 0.55;
    color *= diffuse;

    // Gentle specular
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 24.0);
    color += cream * spec * 0.2;

    gl_FragColor = vec4(color, 1.0);
  }
`;
