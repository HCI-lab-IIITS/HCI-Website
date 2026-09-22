'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface EquipmentItem {
  name: string;
  category: string;
  specs: string[];
  capabilities: string;
  associatedProjects: { title: string; slug: string }[];
  tag: string;
}

const equipmentList: EquipmentItem[] = [
  {
    name: 'Meta Quest 3 Spatial Computing Headsets',
    category: 'Spatial Computing & XR',
    tag: 'Head-Mounted Display',
    specs: [
      'Dual 4K+ Infinite Displays (2064 × 2208 per eye)',
      'Dual RGB Color Passthrough (18 PPD)',
      'Snapdragon XR2 Gen 2 Platform',
      'OpenXR 6DOF Inside-Out Optical Tracking'
    ],
    capabilities: 'Powers stereoscopic mixed-reality pre-surgical teleconsultation, patient organ inspection with sub-millimeter dynamic coordinate synchronization, and interactive cultural heritage navigation.',
    associatedProjects: [
      { title: 'MRConsultation (IEEE VR)', slug: 'mr-teleconsultation' },
      { title: 'Tirumala Darshan AR', slug: 'tirumala-darshan-ar' }
    ]
  },
  {
    name: '12-IMU Sony Mocopi Motion Capture System',
    category: 'Biomechanical Kinematics',
    tag: 'Inertial Motion Capture',
    specs: [
      '12 Ultra-Lightweight (8g) Waterproof IMU Sensors',
      'Sub-20ms Low-Latency Bluetooth 5.2 Streaming',
      'Forward Kinematic Bone Vector Tracking',
      'ArmReachCalibrator Dynamic Anthropometric Normalization'
    ],
    capabilities: 'Enables markerless, full-body kinematic motion tracking across athletic swing phases, dynamically calibrating limb lengths to eliminate stature bias in neuro-symbolic athletic coaching.',
    associatedProjects: [
      { title: 'XR Badminton (IEEE ISMAR / CHI)', slug: 'vr-badminton' },
      { title: 'Modular XR Upper Limb Rehab', slug: 'modular-xr-upper-limb-rehab' }
    ]
  },
  {
    name: 'Multi-Channel EEG Biosensing Headsets',
    category: 'Physiological Sensing',
    tag: 'Neurotechnology',
    specs: [
      '14-Channel Research-Grade Saline / Dry Sensor Array',
      '128 Hz – 256 Hz High-Resolution Sampling Rate',
      'Real-Time Band Power Extraction (Theta, Alpha, Beta, Gamma)',
      'Event-Related Potential (ERP) Time-Locking'
    ],
    capabilities: 'Quantifies mental workload, engagement, and cognitive fatigue during immersive VR learning and teleconsultation sessions to validate cognitive fit models.',
    associatedProjects: [
      { title: 'EEG Neurological VR Learning (ISMAR)', slug: 'vr-school-education' }
    ]
  },
  {
    name: 'Electrooculography (EOG) Bio-Potential Interface',
    category: 'Physiological Sensing',
    tag: 'Assistive Biosensing',
    specs: [
      'Multi-Lead Differential Bio-Potential Amplifiers',
      'Sub-Millivolt Vertical & Horizontal Saccadic Tracking',
      'Custom Active Notch Filtering (50Hz / 60Hz Rejection)',
      'Microcontroller Low-Latency USB/BLE Interface'
    ],
    capabilities: 'Facilitates hands-free gaze and target selection for motor-impaired users by translating corneal-retinal dipole movements into discrete directional commands.',
    associatedProjects: [
      { title: 'EOG Based Object Selection', slug: 'eog-object-selection' }
    ]
  },
  {
    name: 'Dual NVIDIA RTX 4090 Deep Learning Workstation',
    category: 'Neural Compute',
    tag: 'High-Performance Computing',
    specs: [
      '2× NVIDIA GeForce RTX 4090 (24GB GDDR6X per GPU, 48GB VRAM Total)',
      '128GB DDR5 5600MHz System Memory',
      'AMD Ryzen 9 7950X 16-Core / 32-Thread Processor',
      'High-Speed PCIe Gen 5 NVMe Scratch Arrays'
    ],
    capabilities: 'Accelerates training of temporal Graph Neural Networks for video forgery detection, web-scale neural retrieval, and multi-modal computer vision models.',
    associatedProjects: [
      { title: 'GNN AI Video Detection', slug: 'gnn-video-detection' },
      { title: 'DPLA-Retriever (ACM WWW 2026)', slug: 'dpla-retriever' },
      { title: 'ISL Gesture Translation', slug: 'isl-translation' }
    ]
  },
  {
    name: 'Spatial Tracking Volume & Human Subjects Testing Suite',
    category: 'Physical Facilities',
    tag: 'Experimental Laboratory',
    specs: [
      '20m² Clear Room-Scale Optical & Kinematic Tracking Area',
      'Dual Synchronized 4K Observation Cameras with Audio Capture',
      'Isolated Low-Acoustic Testing Pod for Cognitive Studies',
      'Dedicated Ergonomic Calibration Rigs & Safety Padding'
    ],
    capabilities: 'Provides an ethically reviewed, controlled physical space for empirical human-subjects evaluations (N=20+ cohorts), usability benchmarks, and biomechanical kinematics studies.',
    associatedProjects: [
      { title: 'VR Badminton Kinematics', slug: 'vr-badminton' },
      { title: 'MRConsultation Clinical Usability', slug: 'mr-teleconsultation' }
    ]
  }
];

export default function FacilitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Facilities');

  const categories = [
    'All Facilities',
    'Spatial Computing & XR',
    'Biomechanical Kinematics',
    'Physiological Sensing',
    'Neural Compute',
    'Physical Facilities'
  ];

  const filteredEquipment = useMemo(() => {
    if (selectedCategory === 'All Facilities') return equipmentList;
    return equipmentList.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full min-h-screen flex flex-col relative bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 md:px-16 overflow-x-hidden font-sans">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto w-full mb-8 sm:mb-10 border-b border-white/15 pb-8 sm:pb-12"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono mb-3">
          <span>HCI LAB</span>
          <span>/</span>
          <span>RESEARCH INFRASTRUCTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4">
          Laboratory Facilities & Hardware
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-400 font-light max-w-3xl leading-relaxed">
          The Human-Computer Interaction Laboratory at IIIT Sri City is equipped with specialized spatial computing headsets, full-body wearable motion capture systems, physiological biosensors, and GPU compute clusters supporting reproducible empirical research.
        </p>
      </motion.div>

      {/* Category Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="max-w-7xl mx-auto w-full mb-8 flex flex-wrap gap-2 items-center"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
              selectedCategory === cat
                ? 'bg-[#c5a880] text-black border-[#c5a880] font-semibold shadow-md'
                : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEquipment.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-[#c5a880]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#c5a880] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {item.tag}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-medium text-white mb-3 group-hover:text-[#c5a880] transition-colors leading-snug">
                  {item.name}
                </h3>

                {/* Capabilities Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-5">
                  {item.capabilities}
                </p>

                {/* Hardware Specifications */}
                <div className="mb-6 p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Key Technical Specifications:
                  </div>
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                      <span className="text-[#38bdf8]">•</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Research Projects */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2.5">
                  Associated Research Projects:
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.associatedProjects.map((proj) => (
                    <Link
                      key={proj.slug}
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#c5a880]/20 border border-white/10 hover:border-[#c5a880]/40 text-xs font-light text-slate-300 hover:text-white transition-all duration-200"
                    >
                      <span>{proj.title}</span>
                      <ArrowRight className="w-3 h-3 text-[#c5a880]" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Space Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 border border-[#c5a880]/30 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>ETHICAL RIGOR & SAFETY PROTOCOLS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white">
              Institutional Review & Participant Privacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              All human-computer interaction user studies, biosignal captures, and mixed reality trials conducted within the laboratory strictly adhere to ethical research guidelines approved by IIIT Sri City Institutional Review Boards, ensuring participant confidentiality, informed consent, and physical safety.
            </p>
          </div>
          <Link
            href="/publications"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#c5a880] text-black hover:bg-white transition-all font-mono text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
          >
            <span>Review Publications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
