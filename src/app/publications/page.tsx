'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, BookOpen, Quote, Copy, Check, X, Sparkles, FileText, Download } from 'lucide-react';
import publicationsData from '../../data/publications.json';

interface Publication {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  type: string;
  volume?: number;
  issue?: number;
  pages?: string;
  issn?: string;
  pdfUrl?: string;
}

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [selectedPdfPub, setSelectedPdfPub] = useState<Publication | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredPublications = useMemo(() => {
    return (publicationsData.publications as Publication[]).filter((pub: Publication) => {
      const matchesSearch =
        searchTerm === '' ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.journal.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
      const matchesType = selectedType === 'all' || pub.type === selectedType;

      return matchesSearch && matchesYear && matchesType;
    });
  }, [searchTerm, selectedYear, selectedType]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal':
        return 'text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/30';
      case 'Conference':
        return 'text-[#f3d068] bg-[#d4af37]/15 border-[#d4af37]/40';
      case 'Book Chapter':
        return 'text-blue-400 bg-[#1a4993]/30 border-[#1a4993]/50';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-24 px-4 md:px-16 overflow-x-hidden relative font-sans">
      {/* Ambient Glows */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#1a4993]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 left-10 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f3d068] text-xs tracking-wide uppercase mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" /> Peer-Reviewed Academic Literature
        </div>
        <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-4">
          Publications & Research Papers
        </h1>
        <p className="text-lg text-white/70 font-light max-w-2xl">
          Scientific contributions from the Human-Computer Interaction Lab at IIIT Sri City across IEEE ISMAR, HCII, ICVGIP, and leading international venues.
        </p>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto w-full mb-10"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search publications by title, author, or journal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]/60 transition-colors backdrop-blur-md text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            {/* Year Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none backdrop-blur-md appearance-none cursor-pointer"
              >
                {publicationsData.years.map((year) => (
                  <option key={year} value={year} className="bg-slate-900 text-white">
                    {year === 'all' ? 'All Publication Years' : year}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none backdrop-blur-md appearance-none cursor-pointer"
              >
                {publicationsData.types.map((type) => (
                  <option key={type} value={type} className="bg-slate-900 text-white">
                    {type === 'all' ? 'All Venue Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-white/50 font-mono">
          Showing {filteredPublications.length} research paper{filteredPublications.length !== 1 ? 's' : ''}
        </div>
      </motion.div>

      {/* Publications List */}
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {filteredPublications.map((publication: Publication, idx: number) => (
          <motion.div
            key={publication.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group bg-gradient-to-r from-[#0d254c]/40 via-white/5 to-transparent border border-[#d4af37]/30 rounded-3xl p-6 md:p-8 hover:border-[#d4af37] hover:shadow-[0_0_35px_rgba(212,175,55,0.2)] transition-all duration-500 backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                {/* Title */}
                <h3 className="text-xl font-light text-white group-hover:text-[#f3d068] transition-colors mb-3 leading-snug">
                  {publication.title}
                </h3>

                {/* Authors */}
                <p className="text-sm text-[#06b6d4] font-light mb-3">
                  {publication.authors.join(', ')}
                </p>

                {/* Venue Details */}
                <div className="text-xs text-white/60 font-light mb-4 flex flex-wrap gap-2 items-center">
                  <span className="font-medium text-white/80">{publication.journal}</span>
                  {publication.volume && (
                    <span className="font-mono text-white/50">
                      Vol. {publication.volume} {publication.issue ? `(${publication.issue})` : ''} {publication.pages ? `pp. ${publication.pages}` : ''}
                    </span>
                  )}
                </div>

                {/* Actions: PDF Preview + BibTeX Citation */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedPdfPub(publication)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#06b6d4]/20 to-blue-600/20 hover:from-[#06b6d4]/30 hover:to-blue-600/30 border border-[#06b6d4]/40 rounded-xl text-xs font-light text-[#06b6d4] hover:text-white transition-all duration-300 shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5" /> PDF Preview
                  </button>

                  <button
                    onClick={() => setSelectedBibtexPub(publication)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37]/40 rounded-xl text-xs font-light text-[#f3d068] hover:text-white transition-all duration-300 shadow-md"
                  >
                    <Quote className="w-3.5 h-3.5" /> Cite (BibTeX)
                  </button>

                  {publication.issn && (
                    <span className="text-[11px] text-white/40 font-mono ml-auto">
                      ISSN: {publication.issn}
                    </span>
                  )}
                </div>
              </div>

              {/* Type and Year Badge */}
              <div className="flex flex-col md:items-end gap-2 shrink-0">
                <span
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border ${getTypeColor(publication.type)}`}
                >
                  {publication.type}
                </span>
                <span className="text-white/60 text-xs font-mono">
                  Year {publication.year}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredPublications.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
            <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h3 className="text-lg font-light text-white/70 mb-1">No publications matched your search</h3>
            <p className="text-xs text-white/40">Try adjusting your keyword filter or publication year</p>
          </div>
        )}
      </div>

      {/* PDF PREVIEW MODAL */}
      <AnimatePresence>
        {selectedPdfPub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950 border border-white/20 rounded-3xl p-6 max-w-4xl w-full h-[85vh] shadow-2xl flex flex-col relative"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/15 border border-[#06b6d4]/40 flex items-center justify-center text-[#06b6d4]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-light text-white leading-snug line-clamp-1">
                      {selectedPdfPub.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      PDF Document Viewer • {selectedPdfPub.journal} ({selectedPdfPub.year})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPdfPub(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Preview Screen Frame */}
              <div className="flex-1 w-full bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-6 text-center">
                
                {/* Embedded Document Frame / Placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-between bg-[#0f172a] rounded-xl border border-white/10 p-6 overflow-y-auto">
                  <div className="max-w-2xl w-full text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#06b6d4]">
                        PREVIEW DOCUMENT [PDF]
                      </span>
                      <span className="text-xs font-mono text-slate-500">IEEE / ACM MANUSCRIPT</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
                      {selectedPdfPub.title}
                    </h2>

                    <p className="text-xs font-mono text-[#c5a880]">
                      {selectedPdfPub.authors.join(', ')}
                    </p>

                    <div className="p-4 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-slate-300 font-light leading-relaxed">
                      <p className="font-mono text-[11px] text-slate-400 mb-2 uppercase tracking-wider">
                        Abstract Summary:
                      </p>
                      This publication details empirical research in human-computer interaction, spatial computing, and cognitive neural interfaces conducted at IIIT Sri City. The paper presents full system architecture, user study methodologies, and quantitative evaluations.
                    </div>

                    {/* Interactive Graphics Preview */}
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/photos/conferences/chi_2026_presentation.jpg"
                        alt="Publication Figure"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono text-white/80 border border-white/10">
                        Figure 1: Experimental Setup & Spatial Tracking
                      </div>
                    </div>
                  </div>

                  <div className="w-full pt-4 mt-4 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-slate-400">
                    <span className="font-mono">Page 1 of 8</span>
                    <button
                      onClick={() => alert(`Opening paper link for: ${selectedPdfPub.title}`)}
                      className="px-5 py-2.5 bg-[#06b6d4] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Full PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BibTeX Modal */}
      <AnimatePresence>
        {selectedBibtexPub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-[#d4af37]/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedBibtexPub(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Quote className="w-5 h-5 text-[#f3d068]" />
                <h3 className="text-xl font-light text-white">BibTeX Citation Entry</h3>
              </div>

              <p className="text-xs text-white/60 mb-4 font-mono">
                {selectedBibtexPub.title}
              </p>

              <div className="relative bg-black/90 border border-white/10 rounded-2xl p-5 font-mono text-xs text-[#f3d068] leading-relaxed overflow-x-auto shadow-inner">
                <pre>{`@article{sarma${selectedBibtexPub.year}${selectedBibtexPub.id},
  title = {${selectedBibtexPub.title}},
  author = {${selectedBibtexPub.authors.join(' and ')}},
  journal = {${selectedBibtexPub.journal}},
  year = {${selectedBibtexPub.year}}${selectedBibtexPub.volume ? `,\n  volume = {${selectedBibtexPub.volume}}` : ''}${selectedBibtexPub.pages ? `,\n  pages = {${selectedBibtexPub.pages}}` : ''}
}`}</pre>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    const text = `@article{sarma${selectedBibtexPub.year}${selectedBibtexPub.id},\n  title = {${selectedBibtexPub.title}},\n  author = {${selectedBibtexPub.authors.join(' and ')}},\n  journal = {${selectedBibtexPub.journal}},\n  year = {${selectedBibtexPub.year}}\n}`;
                    navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1a4993] to-[#0d254c] hover:from-[#1e3a8a] hover:to-[#1a4993] border border-[#d4af37]/40 rounded-xl text-xs font-medium text-[#f3d068] shadow-lg shadow-[#1a4993]/40 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-[#06b6d4]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Citation to Clipboard'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}