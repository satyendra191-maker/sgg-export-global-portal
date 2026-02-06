
import React, { useState, useRef, useEffect } from 'react';
import { summarizeRequirements, analyzeDocument, summarizeExtractedData } from '../services/geminiService';

const RFQ: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isAnalyzingFile, setIsAnalyzingFile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    product: '',
    quantity: '',
    timeline: 'Immediate',
    details: '',
    paymentMethod: 'Letter of Credit (LC)',
    attachment: null as File | null,
    aiSummary: '',
    extractedData: null as { specs: string; quantity: string; deliveryTerms: string } | null,
    aiDocSummary: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-summarize logic with debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.details.length > 30) {
        setIsSummarizing(true);
        const summary = await summarizeRequirements(formData.details);
        if (summary) {
          setFormData(prev => ({ ...prev, aiSummary: summary }));
        }
        setIsSummarizing(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData.details]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, attachment: file, extractedData: null, aiDocSummary: '' }));
      
      // Analyze file if it's a PDF or Image
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
      if (allowedTypes.includes(file.type)) {
        setIsAnalyzingFile(true);
        try {
          const base64 = await fileToBase64(file);
          const analysis = await analyzeDocument(base64, file.type);
          if (analysis) {
            // After extraction, generate a cohesive summary
            const docSummary = await summarizeExtractedData(analysis);
            setFormData(prev => ({ 
              ...prev, 
              extractedData: analysis,
              aiDocSummary: docSummary || ''
            }));
          }
        } catch (error) {
          console.error("Failed to analyze file:", error);
        } finally {
          setIsAnalyzingFile(false);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RFQ Submission Package:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">
          <i className="fas fa-check"></i>
        </div>
        <h1 className="text-3xl font-bold mb-2">Request Securely Received</h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Our global sales engineering team has received your RFQ for <span className="font-bold text-slate-900">{formData.product || 'your inquiry'}</span>. 
          We will analyze your requirements and provide a competitive quote within 12-24 hours.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              product: '',
              quantity: '',
              timeline: 'Immediate',
              details: '',
              paymentMethod: 'Letter of Credit (LC)',
              attachment: null,
              aiSummary: '',
              extractedData: null,
              aiDocSummary: ''
            });
          }}
          className="mt-8 text-amber-600 font-bold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 italic brand-font text-slate-900">Request for Quotation</h1>
            <p className="text-slate-600 leading-relaxed">
              Scale your global trade operations with SGG Export. Provide your requirements below to receive 
              a detailed breakdown of pricing, logistics timelines, and compliance documentation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Contact Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Work Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@company.com"
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Row 2: Product & Quantity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Product Category</label>
                <div className="relative">
                  <select 
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none appearance-none cursor-pointer"
                    value={formData.product}
                    onChange={e => setFormData({...formData, product: e.target.value})}
                  >
                    <option value="">Select Category...</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Energy">Energy</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Metals">Metals</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Estimated Order Quantity</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. 500 MT, 2x40ft Containers"
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: e.target.value})}
                />
              </div>
            </div>

            {/* Row 3: Company & Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Company Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Global Trading Ltd"
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Expected Shipping Timeline</label>
                <div className="relative">
                  <select 
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none appearance-none cursor-pointer"
                    value={formData.timeline}
                    onChange={e => setFormData({...formData, timeline: e.target.value})}
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="Planning Phase">Planning Phase / Future Inquiry</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <i className="fas fa-clock text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Specific Requirements */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Specific Requirements</label>
                  {isSummarizing && (
                    <span className="text-[10px] font-bold text-amber-600 animate-pulse uppercase tracking-widest flex items-center">
                      <i className="fas fa-spinner fa-spin mr-1"></i> AI Summarizing...
                    </span>
                  )}
                </div>
                <textarea 
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                  placeholder="Please describe technical specifications, required certifications (e.g., ISO, GOTS, CE), packaging preferences, and target port of delivery..."
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                ></textarea>
              </div>

              {/* AI Summary Loading State - Mimics Requirement Summary Block */}
              {isSummarizing && !formData.aiSummary && (
                <div className="bg-slate-900/5 p-4 rounded-xl border-l-4 border-slate-200 animate-pulse">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                    <div className="h-2 bg-slate-200 rounded w-24"></div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                </div>
              )}

              {/* AI Summary Display */}
              {formData.aiSummary && (
                <div className={`bg-slate-900 text-white p-4 rounded-xl border-l-4 border-amber-500 transition-all duration-500 ${isSummarizing ? 'opacity-50' : 'opacity-100'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <i className={`fas ${isSummarizing ? 'fa-spinner fa-spin' : 'fa-magic'} text-amber-500 text-xs`}></i>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Requirement Summary</span>
                  </div>
                  <p className="text-sm italic font-light leading-relaxed">
                    "{formData.aiSummary}"
                  </p>
                </div>
              )}
            </div>

            {/* Row 5: Payment Options Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-slate-800">
                <i className="fas fa-credit-card text-amber-500"></i>
                <h3 className="font-bold">Trade Payment Options</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                We support standardized international trade payment instruments to ensure security for both parties. 
                <strong> LC:</strong> Irrevocable at sight. <strong> TT:</strong> Advanced or balanced against BL. 
                <strong> Documents:</strong> CAD or DP through bank channels.
              </p>
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Preferred Payment Method</label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none appearance-none cursor-pointer text-sm font-medium"
                  value={formData.paymentMethod}
                  onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                >
                  <option value="Letter of Credit (LC)">Letter of Credit (LC)</option>
                  <option value="Telegraphic Transfer (TT)">Telegraphic Transfer (TT)</option>
                  <option value="Payment Against Documents (DP/CAD)">Payment Against Documents (DP/CAD)</option>
                  <option value="Open Account">Open Account (Existing Partners Only)</option>
                </select>
                <div className="absolute right-4 bottom-3 pointer-events-none text-slate-400">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>

            {/* Row 6: File Upload & AI Document Analysis */}
            <div className="space-y-4">
              <div className={`bg-slate-50 border-2 border-dashed rounded-xl p-6 transition-all group ${isAnalyzingFile ? 'border-amber-500 bg-amber-50/30' : 'border-slate-200 hover:border-amber-500'}`}>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Product Specifications / Images</label>
                  {isAnalyzingFile && (
                    <span className="text-[10px] font-bold text-amber-600 animate-pulse uppercase tracking-widest flex items-center">
                      <i className="fas fa-microchip fa-spin mr-1"></i> AI Analyzing Document...
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer" onClick={() => !isAnalyzingFile && fileInputRef.current?.click()}>
                  <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm transition-transform ${isAnalyzingFile ? 'animate-spin' : 'group-hover:scale-110'}`}>
                    <i className={`fas ${isAnalyzingFile ? 'fa-sync-alt' : 'fa-cloud-upload-alt'} text-slate-400 ${isAnalyzingFile ? 'text-amber-500' : 'group-hover:text-amber-500'}`}></i>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-slate-600">
                      {isAnalyzingFile ? 'Processing file content...' : (formData.attachment ? formData.attachment.name : 'Click to upload files (PDF, JPG, PNG)')}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">AI automatically extracts data from PDFs/Images</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    disabled={isAnalyzingFile}
                  />
                </div>
                {formData.attachment && !isAnalyzingFile && (
                  <div className="mt-4 flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 animate-in slide-in-from-bottom-2">
                    <div className="flex items-center space-x-2 truncate">
                      <i className="fas fa-file-alt text-amber-500"></i>
                      <span className="text-xs font-medium text-slate-700 truncate">{formData.attachment.name}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({...formData, attachment: null, extractedData: null, aiDocSummary: ''});
                      }}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Document Analysis Loading State - Structural Skeleton Mimicry */}
              {isAnalyzingFile && (
                <div className="space-y-6 animate-pulse">
                  {/* Extracted Grid Skeleton - Mimics bg-amber-50 box */}
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-10 bg-slate-200 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-10 bg-slate-200 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-10 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Summary Skeleton - Mimics bg-slate-900 executive summary */}
                  <div className="bg-slate-200 h-28 rounded-2xl border-l-4 border-slate-300 p-5">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      <div className="h-2 bg-slate-300 rounded w-1/4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-300 rounded w-full"></div>
                      <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                    </div>
                  </div>
                  
                  {/* Table Skeleton - Mimics Structured Breakdown Table */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                      <div className="h-4 bg-slate-200 rounded-full w-16"></div>
                    </div>
                    <div className="p-0">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex border-b border-slate-100 last:border-0">
                          <div className="w-1/3 bg-slate-50/50 p-6 h-16">
                            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                          </div>
                          <div className="w-2/3 p-6 h-16">
                            <div className="h-3 bg-slate-100 rounded w-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Extracted Information Display */}
              {formData.extractedData && !isAnalyzingFile && (
                <div className="space-y-6 animate-in zoom-in duration-500">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs shadow-md">
                        <i className="fas fa-brain"></i>
                      </div>
                      <h4 className="font-bold text-slate-900">Extracted from Document</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Specifications</div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{formData.extractedData.specs}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Quantity</div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{formData.extractedData.quantity}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Delivery Terms</div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{formData.extractedData.deliveryTerms}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Cohesive Summary of the Document */}
                  {formData.aiDocSummary && (
                    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border-l-4 border-amber-500 shadow-xl animate-in slide-in-from-bottom duration-700">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-file-invoice text-amber-500 text-xs"></i>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Document Executive Summary</span>
                      </div>
                      <p className="text-sm italic font-light leading-relaxed border-b border-slate-800 pb-3 mb-2">
                        "{formData.aiDocSummary}"
                      </p>
                      <div className="flex items-center space-x-2 text-[9px] text-slate-500 uppercase tracking-tighter">
                        <i className="fas fa-shield-alt"></i>
                        <span>SGG AI Verification Passed • Trade compliance pre-check active</span>
                      </div>
                    </div>
                  )}

                  {/* Structured Extracted Data Table */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Document Analysis Breakdown</h5>
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified Extraction</span>
                    </div>
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          <th className="px-6 py-3 w-1/3">Trade Attribute</th>
                          <th className="px-6 py-3">Extracted Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-50/30">Technical Specifications</td>
                          <td className="px-6 py-4 text-slate-600 leading-relaxed">{formData.extractedData.specs}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-50/30">Quantity / Volume</td>
                          <td className="px-6 py-4 text-slate-600 leading-relaxed">{formData.extractedData.quantity}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-50/30">Shipping & Delivery Terms</td>
                          <td className="px-6 py-4 text-slate-600 leading-relaxed">{formData.extractedData.deliveryTerms}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 italic px-2">
                    <i className="fas fa-info-circle"></i>
                    <span>Please review for accuracy before submission. Values are used for pre-qualification.</span>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" disabled={isAnalyzingFile} className={`w-full bg-slate-900 text-white font-bold py-4 rounded-lg shadow-xl transition-all transform flex items-center justify-center space-x-2 ${isAnalyzingFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black active:scale-[0.98]'}`}>
              <i className={`fas ${isAnalyzingFile ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-amber-500`}></i>
              <span>{isAnalyzingFile ? 'PROCESSING DOCUMENT...' : 'SUBMIT SECURE QUOTE REQUEST'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 space-y-8">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <i className="fas fa-shield-alt text-6xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 relative">Trade Confidence</h3>
            <ul className="space-y-4 text-sm text-slate-300 relative">
              <li className="flex items-start space-x-3">
                <i className="fas fa-check-circle text-amber-500 mt-1"></i>
                <span>Direct factory sourcing without middlemen.</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-check-circle text-amber-500 mt-1"></i>
                <span>Full transparency on port-to-port logistics.</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-check-circle text-amber-500 mt-1"></i>
                <span>GOTS, ISO, and SGS verified shipments.</span>
              </li>
            </ul>
          </div>

          <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm">
            <h3 className="font-bold mb-2">Live Support</h3>
            <p className="text-sm text-slate-500 mb-4">Our AI Sales Engineer is ready to assist with technical specifications instantly.</p>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">24/7 Global Line</div>
                <div className="font-bold text-slate-900">+91 (800) EXPORT-SGG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQ;
