"use client";

import dynamic from "next/dynamic";

const Balatro = dynamic(() => import("@/components/ui/Balatro"), { ssr: false });
const ColorBends = dynamic(() => import("@/components/ui/ColorBends"), { ssr: false });
import ShapeGrid from "@/components/ui/ShapeGrid";
import MaskedHeading from "@/components/ui/MaskedHeading";
import MorphSlider from "@/components/ui/MorphSlider";
import ProfileCard from "@/components/ui/ProfileCard";
import StickyCard002 from "@/components/ui/StickyCard002";
import { motion } from "framer-motion";
import { Brain, Users, BookOpen, ChevronRight, Layers, Eye, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const morphItems = [
    {
      image: "/photos/conferences/chi_2026_presentation.jpg",
      caption: "CHI 2026: Human-Centered AI & Spatial Computing Keynote"
    },
    {
      image: "/photos/conferences/ieee_ismar_keynote.jpg",
      caption: "IEEE ISMAR 2026: VR Badminton Adaptive Biomechanical Coaching"
    },
    {
      image: "/photos/lab/vr_teleconsultation.jpg",
      caption: "MRConsultation: Asynchronous 6DOF Pre-Surgical Spatial Teleconsultation"
    },
    {
      image: "/photos/lab/isl_gesture_recording.jpg",
      caption: "Indian Sign Language AI: Multi-Modal Gesture Recognition Setup"
    }
  ];

  const stickyCardsData = [
    {
      id: "mr-teleconsult",
      title: "MRConsultation: Pre-Surgical Spatial Teleconsultation",
      category: "HEALTHCARE MR",
      description: "Enabling surgical teams to project and annotate volumetric 3D organ models asynchronously in shared 6DOF spatial coordinates.",
      link: "/projects",
      image: "/photos/lab/vr_teleconsultation.jpg"
    },
    {
      id: "vr-badminton",
      title: "VR Badminton Physics & Athletic Coaching",
      category: "IEEE ISMAR 2026",
      description: "High-fidelity physics simulation for VR athletic training, providing real-time biomechanical stroke feedback and aerodynamics.",
      link: "/projects",
      image: "/photos/conferences/ieee_ismar_keynote.jpg"
    },
    {
      id: "isl-translator",
      title: "Indian Sign Language (ISL) Gesture Translator",
      category: "ACCESSIBILITY AI",
      description: "Deep learning transformer model translating Indian Sign Language gestures into real-time spoken and written sentences.",
      link: "/projects",
      image: "/photos/lab/isl_gesture_recording.jpg"
    },
    {
      id: "visi-scroll",
      title: "VISI-SCROLL: EOG Electrooculography Interface",
      category: "ASSISTIVE TECH",
      description: "Hands-free spatial object selection and gaze interaction using Electrooculography (EOG) signals for motor accessibility.",
      link: "/projects",
      image: "/supplementary/Screenshot 2026-08-08 193155.png"
    }
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-[#090d16] text-white overflow-x-hidden font-sans">
      
      {/* HERO SECTION WITH COLOR BENDS BACKGROUND */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden py-24 px-6 md:px-16 z-10 border-b border-white/10 bg-[#090d16]">
        
        {/* ColorBends Fluid Background */}
        <div className="absolute inset-0 w-full h-full opacity-70 z-0 bg-[#090d16] pointer-events-auto">
          <ColorBends
            rotation={90}
            speed={0.2}
            colors={["#5227FF", "#FF9FFC", "#7cff67"]}
            transparent={true}
            autoRotate={0}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.15}
            iterations={1}
            intensity={1.5}
            bandWidth={6}
          />
        </div>

        {/* 2-Column Hero Layout (Left: Large Logo, Right: Text Content) */}
        <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pointer-events-auto">
          
          {/* Left Column: Official HCI Lab Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Gold/Cyan Backlight Glow */}
              <div className="absolute inset-0 bg-[#c5a880]/20 rounded-full blur-3xl group-hover:bg-[#c5a880]/40 transition-all duration-700 pointer-events-none scale-110" />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="HCI Lab Logo"
                className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transform hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right Column: Featured Badge + Masked Heading + Subtext + Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 border border-[#c5a880]/50 bg-black/80 px-4 py-1.5 backdrop-blur-md mb-6 rounded-none shadow-2xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880]">FEATURED RESEARCH INITIATIVE</span>
              <span className="h-1 w-1 bg-[#c5a880]" />
              <span className="text-xs font-mono tracking-wider text-white/90">IEEE ISMAR 2026 & DST</span>
            </motion.div>

            {/* Masked Heading (Text-Through-Image Reveal) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full mb-6"
            >
              <MaskedHeading
                text="HUMAN COMPUTER INTERACTION"
                src="/photos/lab/vr_teleconsultation.jpg"
                align="left"
                weight={900}
                textScale={0.095}
                fillScale={1.3}
                parallax={30}
                className="uppercase tracking-tighter filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
              />
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8 backdrop-blur-md bg-black/70 p-4 border-l-2 border-[#c5a880] rounded-r-xl"
            >
              Pioneering spatial computing, cognitive neural interfaces, high-fidelity physics for VR, and Indian Sign Language AI translation at IIIT Sri City.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/publications"
                className="px-7 py-3.5 bg-[#c5a880] text-black font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-2xl rounded-none transform hover:-translate-y-0.5"
              >
                Explore Publications [30+]
              </Link>
              <Link
                href="/projects"
                className="px-7 py-3.5 bg-black/90 text-white border border-white/30 font-mono text-xs uppercase tracking-[0.2em] hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300 backdrop-blur-md rounded-none transform hover:-translate-y-0.5"
              >
                Research Projects [6]
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GSAP STICKY STACKING CARDS RESEARCH SHOWCASE */}
      <section className="relative bg-[#090d16] z-10 border-t border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono mb-2">
                <span>HCI LAB</span>
                <span>/</span>
                <span>STICKY RESEARCH SHOWCASE</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
                Core Research Initiatives
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c5a880] hover:text-white transition-colors mt-4 md:mt-0"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Skiper17 / StickyCard002 GSAP ScrollTrigger Component */}
        <StickyCard002 cards={stickyCardsData} />
      </section>

      {/* WEBGL GALLERY & SHAPEGRID PILLARS SECTION */}
      <section className="relative py-20 px-6 md:px-16 bg-[#090d16] z-10 overflow-hidden">
        
        {/* ShapeGrid Interactive Grid Canvas Background */}
        <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0">
          <ShapeGrid
            speed={0.5}
            squareSize={45}
            direction="diagonal"
            borderColor="#334155"
            hoverFillColor="#c5a880"
            shape="square"
            hoverTrailAmount={3}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* WebGL GPU Morph Slider Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-[#38bdf8] font-mono block mb-2">
                Conference & Lab Photography
              </span>
              <h3 className="text-2xl md:text-4xl font-light text-white">
                MR / VR / XR Spatial Research Gallery
              </h3>
            </div>
            <div className="w-full h-[480px] md:h-[540px] rounded-none overflow-hidden border border-white/10 shadow-2xl">
              <MorphSlider
                items={morphItems}
                transition="melt"
                intensity={0.4}
                aberration={0.2}
                drift={0.25}
                autoplay={true}
                autoplayDelay={5}
                radius={0}
              />
            </div>
          </motion.div>

          {/* Research Focus Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Eye,
                title: "Eye & EOG Spatial Iris",
                desc: "Hands-free spatial gaze interaction and Electrooculography (EOG) signal processing for motor-accessible computing.",
                borderColor: "group-hover:border-[#38bdf8]/50",
                glowColor: "group-hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]",
                iconBg: "bg-[#38bdf8]/10 text-[#38bdf8]"
              },
              {
                icon: Layers,
                title: "VR Headset XR Realm",
                desc: "High-fidelity physics for VR athletic coaching, Tirumala AR temple navigation, and pre-surgical mixed reality teleconsultations.",
                borderColor: "group-hover:border-[#c5a880]/50",
                glowColor: "group-hover:shadow-[0_0_25px_rgba(197,168,128,0.15)]",
                iconBg: "bg-[#c5a880]/15 text-[#c5a880]"
              },
              {
                icon: Brain,
                title: "Sign Language AI Vision",
                desc: "Deep learning transformers converting Indian Sign Language (ISL) gestures to fluent speech and text in real time.",
                borderColor: "group-hover:border-[#c5a880]/50",
                glowColor: "group-hover:shadow-[0_0_25px_rgba(197,168,128,0.15)]",
                iconBg: "bg-[#c5a880]/15 text-[#c5a880]"
              },
              {
                icon: Cpu,
                title: "Volumetric MR Teleconsult",
                desc: "Asynchronous 6DOF mixed reality spatial teleconsultation allowing multi-user 3D anatomical organ annotation.",
                borderColor: "group-hover:border-[#38bdf8]/50",
                glowColor: "group-hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]",
                iconBg: "bg-[#38bdf8]/10 text-[#38bdf8]"
              }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group bg-slate-900/80 border border-white/10 rounded-none p-8 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between ${pillar.borderColor} ${pillar.glowColor}`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-none flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105 ${pillar.iconBg}`}>
                    <pillar.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-light text-white mb-3 group-hover:text-[#c5a880] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 group-hover:text-[#c5a880] transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY SPOTLIGHT PROFILE CARD WITH BALATRO BACKGROUND */}
      <section className="relative py-24 px-6 md:px-16 bg-[#090d16] border-t border-b border-white/10 z-10 overflow-hidden">
        
        {/* Balatro Interactive Shader Background */}
        <div className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0">
          <Balatro
            spinRotation={-2}
            spinSpeed={7}
            color1="#de883b"
            color2="#006BB4"
            color3="#162325"
            contrast={3.5}
            lighting={0.4}
            spinAmount={0.25}
            pixelFilter={700}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono block mb-2">
              Faculty Spotlight & Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
              Lab Leadership & Principal Investigators
            </h2>
            <p className="text-base text-slate-400 font-light max-w-xl mx-auto">
              Refined 3D profile card showcasing our laboratory director.
            </p>
          </div>

          <div className="max-w-xl mx-auto flex justify-center">
            <ProfileCard
              name="Dr. Himangshu Sarma"
              title="Assistant Professor & HCI Director"
              handle="himangshusarma"
              status="Spatial Computing & ISL AI"
              contactText="Email"
              avatarUrl="/Dr.Himangshu.png"
              enableTilt={true}
              behindGlowEnabled={true}
              behindGlowColor="rgba(197, 168, 128, 0.2)"
              onContactClick={() => {
                if (typeof window !== 'undefined') window.location.href = 'mailto:himangshu.sarma@iiits.in';
              }}
              onViewMoreClick={() => {
                if (typeof window !== 'undefined') window.location.href = '/people';
              }}
            />
          </div>
        </div>
      </section>

      {/* LAB IMPACT STATISTICS */}
      <section className="relative py-20 px-6 md:px-16 bg-[#090d16] border-t border-b border-white/10 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "30+", label: "Peer-Reviewed Papers", sub: "IEEE ISMAR, HCII, ICVGIP" },
              { num: "₹88L+", label: "Research Grants", sub: "DST, SERB, DRDO, ISI" },
              { num: "11+", label: "Active Innovation Projects", sub: "XR, GNN, ISL AI" },
              { num: "5+", label: "Years of Academic Excellence", sub: "Est. IIIT Sri City" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-none bg-slate-900/60 border border-white/10 backdrop-blur-md"
              >
                <div className="text-3xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-white to-[#38bdf8] mb-2">
                  {stat.num}
                </div>
                <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 font-mono">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION CTA */}
      <section className="relative py-24 px-6 md:px-16 bg-gradient-to-t from-[#090d16] via-[#0f172a]/60 to-[#090d16] text-center z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6">
              Advancing Human Potential Through Spatial Computing
            </h2>
            <p className="text-base text-slate-400 font-light leading-relaxed mb-8">
              We design interfaces that understand human intent, preserve spatial reality, and empower speech and motor inclusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/publications"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-none text-sm font-mono uppercase tracking-wider text-[#c5a880] border border-white/10 transition-all shadow-lg"
              >
                <BookOpen className="w-4 h-4" /> Browse 30+ Publications
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none text-sm font-mono uppercase tracking-wider text-white transition-all backdrop-blur-md"
              >
                <Users className="w-4 h-4" /> Meet Our Researchers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
