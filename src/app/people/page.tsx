'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Mail, BookOpen, Briefcase, UserCheck } from 'lucide-react';
import ProfileCard from '@/components/ui/ProfileCard';
import peopleData from '../../data/people.json';

interface Person {
  id: number;
  name: string;
  type: string;
  title?: string;
  email: string;
  imageUrl?: string | null;
  bio: string;
  researchAreas: string[];
  year?: string;
  currentPosition?: string;
}

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const filteredPeople = useMemo(() => {
    return (peopleData.people as Person[]).filter((person) => {
      const matchesSearch =
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.researchAreas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = selectedType === 'all' || person.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const handleContact = (email: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-[#090d16] text-white pt-28 pb-24 px-4 md:px-16 overflow-x-hidden font-sans">
      {/* MIT Media Lab Inspired Background Glows */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-[#1e293b]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-10 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto w-full mb-12 border-b border-white/15 pb-10"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono mb-3">
          <span>HCI LAB</span>
          <span>/</span>
          <span>RESEARCHERS & TEAM</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
          People of HCI Lab
        </h1>
        <p className="text-base md:text-lg text-slate-400 font-light max-w-3xl leading-relaxed">
          Meet the faculty directors, research fellows, PhD scholars, undergraduate researchers, and alumni advancing human-computer interaction, spatial computing, and inclusion AI at IIIT Sri City.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto w-full mb-12"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search researchers by name, email, or interest..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a880]/60 transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {peopleData.types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedType === type
                    ? 'bg-[#c5a880] text-black border-[#c5a880] font-semibold'
                    : 'bg-slate-950/60 text-slate-400 border-white/10 hover:border-white/20'
                }`}
              >
                {type === 'all' ? 'ALL ROLES' : type}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Profile Cards Grid */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPeople.map((person, idx) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex justify-center"
            >
              <ProfileCard
                name={person.name}
                title={person.title || person.type.toUpperCase()}
                handle={person.name.toLowerCase().replace(/[^a-z]/g, '') || 'hcilab'}
                status={person.researchAreas[0] || 'HCI Researcher'}
                contactText="Email"
                avatarUrl={person.imageUrl || '/logo.png'}
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(197, 168, 128, 0.2)"
                onContactClick={() => handleContact(person.email)}
                onViewMoreClick={() => setSelectedPerson(person)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Person Detail Modal Drawer */}
      <AnimatePresence>
        {selectedPerson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-white/15 rounded-3xl max-w-2xl w-full p-6 md:p-10 shadow-2xl relative text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPerson(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPerson.imageUrl || '/logo.png'}
                  alt={selectedPerson.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#c5a880]/50"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.src = '/logo.png';
                  }}
                />
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-1">
                    <span>{selectedPerson.type}</span>
                    {selectedPerson.year && (
                      <>
                        <span>/</span>
                        <span className="text-white">{selectedPerson.year}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-light text-white">{selectedPerson.name}</h2>
                  <p className="text-xs text-[#38bdf8] font-mono">{selectedPerson.title || selectedPerson.type.toUpperCase()}</p>
                </div>
              </div>

              {/* Email & Contact */}
              <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${selectedPerson.email}`}
                  className="inline-flex items-center gap-2 text-xs text-[#c5a880] hover:underline font-mono bg-[#c5a880]/10 px-3 py-1.5 rounded-lg border border-[#c5a880]/20"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedPerson.email}</span>
                </a>
              </div>

              {/* Bio Section */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#c5a880]" /> Biography & Background
                </h4>
                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                  {selectedPerson.bio || 'Researcher at HCI Lab IIIT Sri City exploring spatial computing and human-computer interaction.'}
                </p>
              </div>

              {/* Research Areas */}
              {selectedPerson.researchAreas && selectedPerson.researchAreas.length > 0 && selectedPerson.researchAreas[0] !== "" && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" /> Core Research Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.researchAreas.map((area) => (
                      area ? (
                        <span
                          key={area}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-950 text-slate-200 border border-white/10"
                        >
                          {area}
                        </span>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Current Position / Alumni Status */}
              {selectedPerson.currentPosition && (
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#c5a880]" /> Current Position
                  </h4>
                  <p className="text-xs text-slate-300">{selectedPerson.currentPosition}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
