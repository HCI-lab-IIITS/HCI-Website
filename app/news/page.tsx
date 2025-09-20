'use client';

import { useState, useMemo } from 'react';
import { Search, Calendar, Newspaper, Star } from 'lucide-react';
import newsData from '../../data/news.json';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  featured: boolean;
  author: string;
}

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredNews = useMemo(() => {
    return newsData.news.filter((article: NewsArticle) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesYear = selectedYear === 'all' || article.date.startsWith(selectedYear);
      const matchesFeatured = !showFeaturedOnly || article.featured;
      
      return matchesSearch && matchesCategory && matchesYear && matchesFeatured;
    });
  }, [searchTerm, selectedCategory, selectedYear, showFeaturedOnly]);

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'Awards': 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
      'Partnerships': 'bg-blue-400/20 text-blue-400 border-blue-400/30',
      'Research Impact': 'bg-green-400/20 text-green-400 border-green-400/30',
      'Publications': 'bg-purple-400/20 text-purple-400 border-purple-400/30',
      'Events': 'bg-orange-400/20 text-orange-400 border-orange-400/30',
      'Product Launch': 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
      'Innovation': 'bg-pink-400/20 text-pink-400 border-pink-400/30',
    };
    return categoryColors[category] || 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extralight text-white/100 tracking-tight mb-4">
            News & Updates
          </h1>
          <p className="text-lg text-white/70 font-light max-w-2xl">
            Stay updated with the latest research breakthroughs, awards, and developments from our lab
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
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              >
                {newsData.categories.map((category) => (
                  <option key={category} value={category} className="bg-black text-white">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              >
                {newsData.years.map((year) => (
                  <option key={year} value={year} className="bg-black text-white">
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-3 rounded-xl border transition-colors backdrop-blur-sm flex items-center gap-2 ${
                  showFeaturedOnly
                    ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                <Star className="w-4 h-4" />
                Featured Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <section className="relative pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNews.map((article: NewsArticle) => (
              <div
                key={article.id}
                className={`group bg-white/5 border rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm ${
                  article.featured ? 'border-yellow-400/30' : 'border-white/10'
                }`}
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {article.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-lg text-xs font-medium border border-yellow-400/30 backdrop-blur-sm">
                      <Star className="w-3 h-3 inline mr-1" />
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-light text-white mb-3 leading-tight group-hover:text-white/90 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-white/60 leading-relaxed mb-4 font-light">
                    {article.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <span className="text-white/50">By {article.author}</span>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-2 border-t border-white/10">
                    <button className="text-xs text-white/50 hover:text-white/70 transition-colors font-light">
                      Read more →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-light text-white/60 mb-2">No news found</h3>
              <p className="text-white/40">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


