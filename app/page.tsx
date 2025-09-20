"use client";

import Hero from "@/components/ui/neural-network-hero";
import { Brain, Users, Zap, Target } from "lucide-react";
// Site navigation is rendered globally from layout via <SiteNav />

export default function DemoOne() {
  return (
    <div className="w-screen min-h-screen flex flex-col relative">
      <Hero 
        title="Human Computer Interaction Lab IIITS"
        description="HCI lab at IIITS is one of the lead labs in India pushing the boundaries of Human Computer Interaction and crafting the future"
        badgeText="XR Hackathon"
        badgeLabel="New"
        ctaButtons={[
          { text: "Explore Research", href: "/publications", primary: true },
          { text: "Meet the Team", href: "/people" }
        ]}
        microDetails={["scroll to see more"]}
      />
      
      {/* Research Focus Areas */}
      <section className="relative -mt-0 pt-0 pb-24 px-6 md:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-4">
              Research Focus Areas
            </h2>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto">
              Pioneering the intersection of human cognition and digital innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-400/30 transition-colors">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Brain-Computer Interface</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Developing neural interfaces for seamless human-machine interaction using EEG and advanced signal processing.
              </p>
            </div>
            
            <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-400/30 transition-colors">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Extended Reality</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Creating immersive VR/AR experiences for education, rehabilitation, and interactive learning environments.
              </p>
            </div>
            
            <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-400/30 transition-colors">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Human-Centered AI</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Building intelligent systems that understand and adapt to human behavior, preferences, and cognitive patterns.
              </p>
            </div>
            
            <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-400/30 transition-colors">
                <Target className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Accessibility & Inclusion</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Designing inclusive interfaces and assistive technologies for users with diverse abilities and needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Mission */}
      <section className="relative py-24 px-6 md:px-16 bg-gradient-to-b from-black to-black/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
            At the Human Computer Interaction Lab, we believe technology should amplify human potential, 
            not replace it. Our research bridges the gap between human cognition and digital innovation, 
            creating interfaces that are intuitive, accessible, and transformative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/publications" 
              className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              View Our Research
            </a>
            <a 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 border border-white/20 rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors"
            >
              Explore Projects
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 px-6 md:px-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-light text-white mb-2">27+</div>
              <div className="text-white/60 text-sm">Publications</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light text-white mb-2">15+</div>
              <div className="text-white/60 text-sm">Research Projects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light text-white mb-2">8</div>
              <div className="text-white/60 text-sm">Years Active</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light text-white mb-2">50+</div>
              <div className="text-white/60 text-sm">Collaborations</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


