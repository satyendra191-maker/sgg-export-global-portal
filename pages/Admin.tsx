
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS as INITIAL_PRODUCTS } from '../constants';
import { Product } from '../types';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'products' | 'settings'>('leads');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const itemsPerPage = 10;

  // Generate a larger set of mock leads for pagination demonstration
  const allLeads = useMemo(() => {
    const baseLeads = [
      { 
        id: '1', 
        client: 'Global Retail Corp', 
        product: 'Premium Rice', 
        qty: '50 Tons', 
        date: '2023-11-20', 
        status: 'Pending',
        summary: 'Bulk order of premium aged basmati for European retail distribution with ISO certification requirements.'
      },
      { 
        id: '2', 
        client: 'Solar Solutions Ltd', 
        product: 'PV Modules', 
        qty: '1200 Units', 
        date: '2023-11-19', 
        status: 'Contacted',
        summary: 'Urgent solar panel shipment for industrial site in South East Asia; requires expedited air freight.'
      },
      { 
        id: '3', 
        client: 'Eco Garments', 
        product: 'Raw Cotton', 
        qty: '25 Bales', 
        date: '2023-11-18', 
        status: 'Reviewed',
        summary: 'Organic GOTS-certified raw cotton for sustainable apparel manufacturing project.'
      },
    ];

    const expanded = [];
    for (let i = 0; i < 45; i++) {
      const base = baseLeads[i % baseLeads.length];
      expanded.push({
        ...base,
        id: `${i + 1}`,
        client: `${base.client} #${i + 1}`,
        date: `2023-11-${Math.max(1, 20 - Math.floor(i / 3))}`
      });
    }
    return expanded;
  }, []);

  const totalPages = Math.ceil(allLeads.length / itemsPerPage);
  
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [allLeads, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
      setIsEditModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from the catalog?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-8 border-b border-slate-800">
          <div className="text-xl font-bold brand-font text-amber-500">SGG ADMIN</div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => { setActiveTab('leads'); setCurrentPage(1); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'leads' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <i className="fas fa-inbox"></i>
            <span>RFQ Leads</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'products' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <i className="fas fa-box"></i>
            <span>Catalog Manager</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'settings' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <i className="fas fa-cog"></i>
            <span>Site Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold capitalize">{activeTab} Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-500">System Status: <span className="text-green-500 font-bold">Online</span></div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">JD</div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto">
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="text-slate-400 text-sm uppercase mb-1">Total RFQs</div>
                  <div className="text-3xl font-bold">{allLeads.length.toLocaleString()}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="text-slate-400 text-sm uppercase mb-1">Conversion Rate</div>
                  <div className="text-3xl font-bold">12.4%</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="text-slate-400 text-sm uppercase mb-1">Pending Review</div>
                  <div className="text-3xl font-bold text-amber-600">42</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Client</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">AI Summary</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Product</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Quantity</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {paginatedLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 truncate max-w-[150px]">{lead.client}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{lead.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="bg-amber-50 text-amber-800 text-[11px] p-3 rounded-xl border border-amber-100/50 max-w-sm italic leading-relaxed shadow-sm">
                              <i className="fas fa-magic mr-2 text-amber-500"></i>
                              {lead.summary}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">{lead.product}</td>
                          <td className="px-6 py-4 text-sm">{lead.qty}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              lead.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-slate-900"><i className="fas fa-ellipsis-h"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="bg-white px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, allLeads.length)}</span> of <span className="font-bold text-slate-900">{allLeads.length}</span> results
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <i className="fas fa-chevron-left text-xs"></i>
                    </button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                                currentPage === page 
                                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' 
                                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 || 
                          page === currentPage + 2
                        ) {
                          return <span key={page} className="px-1 text-slate-400">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <i className="fas fa-chevron-right text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Manage Product Catalog</h3>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 hover:bg-black transition-colors">
                  <i className="fas fa-plus text-amber-500"></i>
                  <span>Add New Product</span>
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center space-x-4 shadow-sm group hover:border-amber-200 transition-all">
                    <img src={p.image} className="w-16 h-16 rounded-lg object-cover shadow-inner" alt="" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{p.name}</div>
                      <div className="text-[10px] text-slate-400 italic uppercase tracking-wider">{p.category}</div>
                      <div className="text-[10px] font-bold text-amber-600 mt-1">Min Order: {p.minOrder}</div>
                    </div>
                    <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditClick(p)}
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center text-xs transition-colors"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center text-xs transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold brand-font italic">Edit Product</h3>
                <p className="text-xs text-slate-400">ID: {editingProduct.id}</p>
              </div>
              <button 
                onClick={() => { setIsEditModalOpen(false); setEditingProduct(null); }}
                className="w-10 h-10 rounded-full hover:bg-slate-800 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Energy">Energy</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Metals">Metals</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Description</label>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Image URL</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Min Order Quantity</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    value={editingProduct.minOrder}
                    onChange={e => setEditingProduct({...editingProduct, minOrder: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setEditingProduct(null); }}
                  className="flex-1 px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
