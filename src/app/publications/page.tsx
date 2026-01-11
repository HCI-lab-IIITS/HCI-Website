'use client';

import { useState, useMemo } from 'react';
import { Search, Calendar, BookOpen } from 'lucide-react';
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
}

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredPublications = useMemo(() => {
    return publicationsData.publications.filter((pub: Publication) => {
      const matchesSearch = searchTerm === '' || 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some(author => 
          author.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        pub.journal.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
      const matchesType = selectedType === 'all' || pub.type === selectedType;

      return matchesSearch && matchesYear && matchesType;
    });
  }, [searchTerm, selectedYear, selectedType]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Conference': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Book Chapter': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-4">
            Publications
          </h1>
          <p className="text-lg text-white/70 font-light max-w-2xl">
            Research contributions from the Human Computer Interaction Lab at IIIT Sri City
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 md:px-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 z-20 pointer-events-none" />
              <input
                type="text"
                placeholder="Search publications, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 z-20 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent backdrop-blur-sm appearance-none"
              >
                {publicationsData.years.map((year) => (
                  <option key={year} value={year} className="bg-gray-900">
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 z-20 pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent backdrop-blur-sm appearance-none"
              >
                {publicationsData.types.map((type) => (
                  <option key={type} value={type} className="bg-gray-900">
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-sm text-white/60">
            {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="px-6 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {filteredPublications.map((publication: Publication) => (
              <div
                key={publication.id}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-white/90 transition-colors">
                      {publication.title}
                    </h3>

                    {/* Authors */}
                    <div className="text-white/70 mb-3">
                      {publication.authors.join(', ')}
                    </div>

                    {/* Journal */}
                    <div className="text-white/60 text-sm mb-4">
                      {publication.journal}
                      {publication.volume && (
                        <span>
                          {publication.volume}
                          {publication.issue && `(${publication.issue})`}
                          {publication.pages && `, ${publication.pages}`}
                        </span>
                      )}
                    </div>

                    {/* ISSN */}
                    {publication.issn && (
                      <div className="text-white/50 text-xs mb-3">
                        ISSN: {publication.issn}
                      </div>
                    )}
                  </div>

                  {/* Type and Year Badge */}
                  <div className="flex flex-col md:items-end gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(publication.type)}`}
                    >
                      {publication.type}
                    </span>
                    <span className="text-white/60 text-sm">
                      {publication.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredPublications.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/40 text-lg mb-2">No publications found</div>
              <div className="text-white/30 text-sm">
                Try adjusting your search or filters
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}