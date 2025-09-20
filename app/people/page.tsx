'use client';

import { useState, useMemo } from 'react';
import { Search, Users, GraduationCap, Award } from 'lucide-react';
import Image from 'next/image';
import peopleData from '../../data/people.json';

interface Person {
  id: number;
  name: string;
  type: 'faculty' | 'student' | 'alumni';
  title?: string;
  year?: string;
  email: string;
  imageUrl?: string | null;
  researchAreas: string[];
  bio: string;
  currentPosition?: string;
}

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const filteredPeople = useMemo(() => {
    return peopleData.people.filter((person) => {
      const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.researchAreas.some(area => 
                             area.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesType = selectedType === 'all' || person.type === selectedType;
      
      const matchesYear = selectedYear === 'all' || 
                         ((person.type === 'student' && person.year === selectedYear) ||
                          (person.type === 'alumni' && person.year === selectedYear));
      
      return matchesSearch && matchesType && matchesYear;
    });
  }, [searchTerm, selectedType, selectedYear]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'faculty':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      case 'student':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'alumni':
        return 'bg-amber-400/20 text-amber-400 border-amber-400/30';
      default:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getYearColor = (year: string) => {
    const yearColors: { [key: string]: string } = {
      'UG1': 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
      'UG2': 'bg-blue-400/20 text-blue-400 border-blue-400/30',
      'UG3': 'bg-orange-400/20 text-orange-400 border-orange-400/30',
      'UG4': 'bg-red-400/20 text-red-400 border-red-400/30',
      'PG1': 'bg-purple-400/20 text-purple-400 border-purple-400/30',
      'PG2': 'bg-indigo-400/20 text-indigo-400 border-indigo-400/30',
      'PhD': 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
    };
    return yearColors[year] || 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extralight text-white/100 tracking-tight mb-4">
            Our People
          </h1>
          <p className="text-lg text-white/70 font-light max-w-2xl">
            Meet the researchers driving innovation in Human-Computer Interaction
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 md:px-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, email, or research area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              >
                {peopleData.types.map((type) => (
                  <option key={type} value={type} className="bg-black text-white">
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              {(selectedType === 'student' || selectedType === 'alumni') && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
                >
                  {(selectedType === 'student' ? peopleData.studentYears : peopleData.alumniYears).map((year) => (
                    <option key={year} value={year} className="bg-black text-white">
                      {year === 'all' ? 'All Years' : year}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* People Grid */}
      <section className="relative pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeople.map((person: Person) => (
              <div
                key={person.id}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
                    {person.imageUrl ? (
                      <Image
                        src={person.imageUrl}
                        alt={person.name}
                        width={64}
                        height={64}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      getInitials(person.name)
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-light text-white mb-1 truncate">
                      {person.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(person.type)}`}>
                        {person.type === 'faculty' ? (
                          <GraduationCap className="w-3 h-3 mr-1" />
                        ) : person.type === 'student' ? (
                          <Users className="w-3 h-3 mr-1" />
                        ) : (
                          <Award className="w-3 h-3 mr-1" />
                        )}
                        {person.type === 'faculty' ? 'Faculty' : person.type === 'student' ? 'Student' : 'Alumni'}
                      </span>
                      
                      {person.year && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getYearColor(person.year)}`}>
                          {person.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title/Position */}
                {person.title && (
                  <p className="text-sm text-white/60 mb-3 font-light">
                    {person.title}
                  </p>
                )}

                {/* Current Position (for alumni) */}
                {person.currentPosition && (
                  <p className="text-sm text-amber-400/80 mb-3 font-light">
                    Currently: {person.currentPosition}
                  </p>
                )}

                {/* Bio */}
                <p className="text-sm text-white/70 leading-relaxed mb-4 font-light">
                  {person.bio}
                </p>

                {/* Research Areas */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    Research Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {person.researchAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/60 border border-white/10"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href={`mailto:${person.email}`}
                    className="text-xs text-white/50 hover:text-white/70 transition-colors font-light"
                  >
                    {person.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-light text-white/60 mb-2">No people found</h3>
              <p className="text-white/40">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


