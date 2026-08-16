'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronDown, Sparkles, Move3d, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
gsap.registerPlugin(useGSAP);

// ===================== EXECUTIVE SLATE/GOLD SHADER =====================
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  #ifdef GL_ES
    precision lowp float;
  #endif
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;
  
  vec4 buf[8];
  
  vec4 sigmoid(vec4 x) { return 1. / (1. + exp(-x)); }
  
  vec4 cppn_fn(vec2 coordinate, float in0, float in1, float in2) {
    buf[6] = vec4(coordinate.x, coordinate.y, 0.3948333106474662 + in0, 0.36 + in1);
    buf[7] = vec4(0.14 + in2, sqrt(coordinate.x * coordinate.x + coordinate.y * coordinate.y), 0., 0.);

    buf[0] = mat4(vec4(6.5404263, -3.6126034, 0.7590882, -1.13613), vec4(2.4582713, 3.1660357, 1.2219609, 0.06276096), vec4(-5.478085, -6.159632, 1.8701609, -4.7742867), vec4(6.039214, -5.542865, -0.90925294, 3.251348))
    * buf[6]
    + mat4(vec4(0.8473259, -5.722911, 3.975766, 1.6522468), vec4(-0.24321538, 0.5839259, -1.7661959, -5.350116), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(0.21808943, 1.1243913, -1.7969975, 5.0294676);
    
    buf[1] = mat4(vec4(-3.3522482, -6.0612736, 0.55641043, -4.4719114), vec4(0.8631464, 1.7432913, 5.643898, 1.6106541), vec4(2.4941394, -3.5012043, 1.7184316, 6.357333), vec4(3.310376, 8.209261, 1.1355612, -1.165539))
    * buf[6]
    + mat4(vec4(5.24046, -13.034365, 0.009859298, 15.870829), vec4(2.987511, 3.129433, -0.89023495, -1.6822904), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(-5.9457836, -6.573602, -0.8812491, 1.5436668);

    buf[0] = sigmoid(buf[0]);
    buf[1] = sigmoid(buf[1]);

    buf[2] = mat4(vec4(-15.219568, 8.095543, -2.429353, -1.9381982), vec4(-5.951362, 4.3115187, 2.6393783, 1.274315), vec4(-7.3145227, 6.7297835, 5.2473326, 5.9411426), vec4(5.0796127, 8.979051, -1.7278991, -1.158976))
    * buf[6]
    + mat4(vec4(-11.967154, -11.608155, 6.1486754, 11.237008), vec4(2.124141, -6.263192, -1.7050359, -0.7021966), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(-4.17164, -3.2281182, -4.576417, -3.6401186);
    
    buf[3] = mat4(vec4(3.1832156, -13.738922, 1.879223, 3.233465), vec4(0.64300746, 12.768129, 1.9141049, 0.50990224), vec4(-0.049295485, 4.4807224, 1.4733979, 1.801449), vec4(5.0039253, 13.000481, 3.3991797, -4.5561905))
    * buf[6]
    + mat4(vec4(-0.1285731, 7.720628, -3.1425676, 4.742367), vec4(0.6393625, 3.714393, -0.8108378, -0.39174938), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(-1.1811101, -21.621881, 0.7851888, 1.2329718);
    
    buf[2] = sigmoid(buf[2]);
    buf[3] = sigmoid(buf[3]);

    buf[4] = mat4(vec4(5.214916, -7.183024, 2.7228765, 2.6592617), vec4(-5.601878, -25.3591, 4.067988, 0.4602802), vec4(-10.57759, 24.286327, 21.102104, 37.546658), vec4(4.3024497, -1.9625226, 2.3458803, -1.372816))
    * buf[0]
    + mat4(vec4(-17.6526, -10.507558, 2.2587414, 12.462782), vec4(6.265566, -502.75443, -12.642513, 0.9112289), vec4(-10.983244, 20.741234, -9.701768, -0.7635988), vec4(5.383626, 1.4819539, -4.1911616, -4.8444734))
    * buf[1]
    + mat4(vec4(12.785233, -16.345072, -0.39901125, 1.7955981), vec4(-30.48365, -1.8345358, 1.4542528, -1.1118771), vec4(19.872723, -7.337935, -42.941723, -98.52709), vec4(8.337645, -2.7312303, -2.2927687, -36.142323))
    * buf[2]
    + mat4(vec4(-16.298317, 3.5471997, -0.44300047, -9.444417), vec4(57.5077, -35.609753, 16.163465, -4.1534753), vec4(-0.07470326, -3.8656476, -7.0901804, 3.1523974), vec4(-12.559385, -7.077619, 1.490437, -0.8211543))
    * buf[3]
    + vec4(-7.67914, 15.927437, 1.3207729, -1.6686112);
    
    buf[5] = mat4(vec4(-1.4109162, -0.372762, -3.770383, -21.367174), vec4(-6.2103205, -9.35908, 0.92529047, 8.82561), vec4(11.460242, -22.348068, 13.625772, -18.693201), vec4(-0.3429052, -3.9905605, -2.4626114, -0.45033523))
    * buf[0]
    + mat4(vec4(7.3481627, -4.3661838, -6.3037653, -3.868115), vec4(1.5462853, 6.5488915, 1.9701879, -0.58291394), vec4(6.5858274, -2.2180402, 3.7127688, -1.3730392), vec4(-5.7973905, 10.134961, -2.3395722, -5.965605))
    * buf[1]
    + mat4(vec4(-2.5132585, -6.6685553, -1.4029363, -0.16285264), vec4(-0.37908727, 0.53738135, 4.389061, -1.3024765), vec4(-0.70647055, 2.0111287, -5.1659346, -3.728635), vec4(-13.562562, 10.487719, -0.9173751, -2.6487076))
    * buf[2]
    + mat4(vec4(-8.645013, 6.5546675, -6.3944063, -5.5933375), vec4(-0.57783127, -1.077275, 36.91025, 5.736769), vec4(14.283112, 3.7146652, 7.1452246, -4.5958776), vec4(2.7192075, 3.6021907, -4.366337, -2.3653464))
    * buf[3]
    + vec4(-5.9000807, -4.329569, 1.2427121, 8.59503);

    buf[4] = sigmoid(buf[4]);
    buf[5] = sigmoid(buf[5]);

    buf[6] = mat4(vec4(-1.61102, 0.7970257, 1.4675229, 0.20917463), vec4(-28.793737, -7.1390953, 1.5025433, 4.656581), vec4(-10.94861, 39.66238, 0.74318546, -10.095605), vec4(-0.7229728, -1.5483948, 0.7301322, 2.1687684))
    * buf[0]
    + mat4(vec4(3.2547753, 21.489103, -1.0194173, -3.3100595), vec4(-3.7316632, -3.3792162, -7.223193, -0.23685838), vec4(13.1804495, 0.7916005, 5.338587, 5.687114), vec4(-4.167605, -17.798311, -6.815736, -1.6451967))
    * buf[1]
    + mat4(vec4(0.604885, -7.800309, -7.213122, -2.741014), vec4(-3.522382, -0.12359311, -0.5258442, 0.43852118), vec4(9.6752825, -22.853785, 2.062431, 0.099892326), vec4(-4.3196306, -17.730087, 2.5184598, 5.30267))
    * buf[2]
    + mat4(vec4(-6.545563, -15.790176, -6.0438633, -5.415399), vec4(-43.591583, 28.551912, -16.00161, 18.84728), vec4(4.212382, 8.394307, 3.0958717, 8.657522), vec4(-5.0237565, -4.450633, -4.4768, -5.5010443))
    * buf[3]
    + mat4(vec4(1.6985557, -67.05806, 6.897715, 1.9004834), vec4(1.8680354, 2.3915145, 2.5231109, 4.081538), vec4(11.158006, 1.7294737, 2.0738268, 7.386411), vec4(-4.256034, -306.24686, 8.258898, -17.132736))
    * buf[4]
    + mat4(vec4(1.6889864, -4.5852966, 3.8534803, -6.3482175), vec4(1.3543309, -1.2640043, 9.932754, 2.9079645), vec4(-5.2770967, 0.07150358, -0.13962056, 3.3269649), vec4(28.34703, -4.918278, 6.1044083, 4.085355))
    * buf[5]
    + vec4(6.6818056, 12.522166, -3.7075126, -4.104386);
    
    buf[7] = mat4(vec4(-8.265602, -4.7027016, 5.098234, 0.7509808), vec4(8.6507845, -17.15949, 16.51939, -8.884479), vec4(-4.036479, -2.3946867, -2.6055532, -1.9866527), vec4(-2.2167742, -1.8135649, -5.9759874, 4.8846445))
    * buf[0]
    + mat4(vec4(6.7790847, 3.5076547, -2.8191125, -2.7028968), vec4(-5.743024, -0.27844876, 1.4958696, -5.0517144), vec4(13.122226, 15.735168, -2.9397483, -4.101023), vec4(-14.375265, -5.030483, -6.2599335, 2.9848232))
    * buf[1]
    + mat4(vec4(4.0950394, -0.94011575, -5.674733, 4.755022), vec4(4.3809423, 4.8310084, 1.7425908, -3.437416), vec4(2.117492, 0.16342592, -104.56341, 16.949184), vec4(-5.22543, -2.994248, 3.8350096, -1.9364246))
    * buf[2]
    + mat4(vec4(-5.900337, 1.7946124, -13.604192, -3.8060522), vec4(6.6583457, 31.911177, 25.164474, 91.81147), vec4(11.840538, 4.1503043, -0.7314397, 6.768467), vec4(-6.3967767, 4.034772, 6.1714606, -0.32874924))
    * buf[3]
    + mat4(vec4(3.4992442, -196.91893, -8.923708, 2.8142626), vec4(3.4806502, -3.1846354, 5.1725626, 5.1804223), vec4(-2.4009497, 15.585794, 1.2863957, 2.0252278), vec4(-71.25271, -62.441242, -8.138444, 0.50670296))
    * buf[4]
    + mat4(vec4(-12.291733, -11.176166, -7.3474145, 4.390294), vec4(10.805477, 5.6337385, -0.9385842, -4.7348723), vec4(-12.869276, -7.039391, 5.3029537, 7.5436664), vec4(1.4593618, 8.91898, 3.5101583, 5.840625))
    * buf[5]
    + vec4(2.2415268, -6.705987, -0.98861027, -2.117676);

    buf[6] = sigmoid(buf[6]);
    buf[7] = sigmoid(buf[7]);

    buf[0] = sigmoid(buf[0]);
    float v = (buf[0].x + buf[0].y + buf[0].z) * 0.333;
    vec3 navyDark = vec3(0.035, 0.051, 0.086); // #090d16
    vec3 slateNavy = vec3(0.06, 0.11, 0.20);   // #0f1c33
    vec3 goldAccent = vec3(0.77, 0.66, 0.50);  // #c5a880
    
    vec3 color = mix(navyDark, slateNavy, smoothstep(0.1, 0.7, v));
    color = mix(color, goldAccent * 0.45, smoothstep(0.65, 0.95, buf[0].x));
    
    return vec4(color, 1.0);
  }
  
  void main() {
    vec2 uv = vUv * 2.0 - 1.0; uv.y *= -1.0;
    gl_FragColor = cppn_fn(uv, 0.08 * sin(0.2 * iTime), 0.08 * sin(0.5 * iTime), 0.08 * sin(0.3 * iTime));
  }
`;

const CPPNShaderMaterial = shaderMaterial(
  { iTime: 0, iResolution: new THREE.Vector2(1, 1) },
  vertexShader,
  fragmentShader
);

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  type CPPNMaterialInstance = THREE.ShaderMaterial & {
    iTime: number;
    iResolution: THREE.Vector2;
  };
  const shaderMat = useMemo(() => new CPPNShaderMaterial(), []);
  const materialRef = useRef<CPPNMaterialInstance>(null!);
  const viewport = useThree((state) => state.viewport);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.iTime = state.clock.elapsedTime;
    const { width, height } = state.size;
    materialRef.current.iResolution.set(width, height);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -0.5]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMat} ref={materialRef} side={THREE.DoubleSide} attach="material" />
    </mesh>
  );
}

function ShaderBackground() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const camera = useMemo(() => ({ position: [0, 0, 1] as [number, number, number], fov: 75, near: 0.1, far: 1000 }), []);
  
  useGSAP(
    () => {
      if (!canvasRef.current) return;
      gsap.set(canvasRef.current, {
        filter: 'blur(20px)',
        scale: 1.1,
      });
    },
    { scope: canvasRef }
  );

  return (
    <div ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas camera={camera} resize={{ debounce: 0 }} gl={{ preserveDrawingBuffer: true }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

interface HeroProps {
  title?: string;
  description?: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: string[];
  logoImageUrl?: string;
  logoAltText?: string;
}

export default function Hero({
  title = "Human Computer Interaction Lab IIITS",
  description = "Pioneering spatial computing, cognitive neural interfaces, high-fidelity physics for VR, and Indian Sign Language AI translation at IIIT Sri City.",
  badgeText = "IEEE ISMAR 2026 & DST Research",
  badgeLabel = "Featured",
  ctaButtons = [
    { text: "Explore Publications", href: "/publications", primary: true },
    { text: "Research Projects", href: "/projects" }
  ],
  logoImageUrl = "/logo.png",
  logoAltText = "HCI Lab Logo"
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden py-24 px-4 sm:px-8 md:px-16 z-10">
      <ShaderBackground />

      {/* FLOATING 3D SPATIAL VR HEADSET & CONTROLLER GLASS ACCENTS */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-6 md:left-20 pointer-events-none z-10 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl text-[#c5a880]"
      >
        <Move3d className="w-8 h-8 text-[#38bdf8]" />
        <div className="text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">6DOF Controller</span>
          <span className="text-xs font-medium text-white">Spatial Motion Physics</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-6 md:right-20 pointer-events-none z-10 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl text-[#c5a880]"
      >
        <Eye className="w-8 h-8 text-[#c5a880]" />
        <div className="text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">EOG Gaze Iris</span>
          <span className="text-xs font-medium text-white">Eye Tracking Interface</span>
        </div>
      </motion.div>

      {/* MAIN LIQUID FROSTED GLASS CARD - VERTICALLY CENTERED */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 max-w-5xl w-full mx-auto p-8 sm:p-12 md:p-16 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col items-center text-center"
      >
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-4 py-1.5 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#c5a880]">{badgeLabel}</span>
          <span className="h-1 w-1 rounded-full bg-[#c5a880]" />
          <span className="text-xs font-light tracking-tight text-white/90">{badgeText}</span>
        </div>

        {/* Central Logo & Title Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
          {logoImageUrl && (
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoImageUrl}
                alt={logoAltText || "HCI Logo"}
                className="w-56 sm:w-72 md:w-80 h-auto object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
              />
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-white max-w-xl text-center md:text-left">
            {title}
          </h1>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-10">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`rounded-xl px-7 py-3.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                button.primary
                  ? "bg-[#c5a880] text-black font-semibold hover:bg-white shadow-lg shadow-[#c5a880]/20 scale-105"
                  : "bg-slate-900/80 text-white border border-white/20 hover:border-[#c5a880]/50 backdrop-blur-md"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>

        {/* Micro Scroll Hint */}
        <div className="mt-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
          <ChevronDown className="h-4 w-4 text-[#c5a880] animate-bounce" />
          <span>Scroll down to explore research initiatives</span>
        </div>
      </motion.div>
    </section>
  );
}
