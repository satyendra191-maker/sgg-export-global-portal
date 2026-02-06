
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';

const Products: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  const filteredProducts = filter === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold italic brand-font mb-4">Product Catalog</h1>
          <p className="text-slate-400 max-w-2xl">
            Sourced directly from verified manufacturers. We maintain strict quality control standards for all export-grade commodities.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-slate-900 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">MOQ</div>
                    <div className="text-slate-900 font-bold">{product.minOrder}</div>
                  </div>
                  <a 
                    href={`#/rfq?id=${product.id}`} 
                    className="bg-slate-900 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-slate-900/10"
                  >
                    REQUEST QUOTE
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
