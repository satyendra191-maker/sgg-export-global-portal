
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponseWithMedia } from '../services/geminiService';
import { MOCK_PRODUCTS } from '../constants';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string, file?: { name: string, type: string }}[]>([
    { role: 'bot', text: 'Welcome to SGG Export. I am your AI Sales Engineer. You can ask for recommendations or upload a spec sheet for analysis. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachedFile) || loading) return;

    const userMsg = input;
    const currentFile = attachedFile;
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsg, 
      file: currentFile ? { name: currentFile.name, type: currentFile.type } : undefined 
    }]);
    
    setInput('');
    setAttachedFile(null);
    setLoading(true);

    try {
      let fileData;
      if (currentFile) {
        const base64 = await fileToBase64(currentFile);
        fileData = { data: base64, mimeType: currentFile.type };
      }

      const response = await getChatResponseWithMedia(userMsg || "Please analyze this document.", fileData);
      setMessages(prev => [...prev, { role: 'bot', text: response || '' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble processing your request. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  // Helper to detect product names in AI response and show mini-cards
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <div className="space-y-3">
        <p className="whitespace-pre-wrap leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const productName = part.slice(2, -2);
              const product = MOCK_PRODUCTS.find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
              if (product) {
                return (
                  <span key={i} className="group relative inline-block cursor-help">
                    <span className="text-amber-600 font-bold underline decoration-dotted">{productName}</span>
                    <div className="absolute bottom-full left-0 mb-2 w-48 hidden group-hover:block z-50 bg-white shadow-2xl rounded-lg p-2 border border-slate-100 animate-in zoom-in duration-200">
                      <img src={product.image} className="w-full h-24 object-cover rounded mb-2" alt="" />
                      <div className="text-[10px] font-bold text-slate-900">{product.name}</div>
                      <div className="text-[8px] text-slate-500 line-clamp-2">{product.description}</div>
                      <a href="#/products" className="block text-[8px] text-amber-600 font-bold mt-1 text-right">VIEW DETAILS</a>
                    </div>
                  </span>
                );
              }
              return <strong key={i}>{productName}</strong>;
            }
            return part;
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-[400px] h-[600px] rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-900">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <div className="font-bold text-sm">SGG AI Sales Engineer</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Global Desk Active</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {m.file && (
                    <div className="bg-amber-100 text-amber-800 text-[10px] px-3 py-1.5 rounded-t-xl border border-amber-200 flex items-center space-x-2 mb-0.5 shadow-sm">
                      <i className={`fas ${m.file.type.includes('pdf') ? 'fa-file-pdf' : 'fa-file-image'}`}></i>
                      <span className="font-bold truncate max-w-[120px]">{m.file.name}</span>
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}>
                    {m.role === 'bot' ? renderMessageContent(m.text) : m.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase ml-2">Analyzing Trade Data...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
            {attachedFile && (
              <div className="mb-3 flex items-center justify-between bg-amber-50 p-2.5 rounded-xl border border-amber-100 animate-in slide-in-from-bottom-2">
                <div className="flex items-center space-x-3 truncate">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-amber-600 shadow-sm">
                    <i className={`fas ${attachedFile.type.includes('pdf') ? 'fa-file-pdf' : 'fa-file-image'}`}></i>
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-bold text-slate-900 truncate">{attachedFile.name}</div>
                    <div className="text-[8px] text-slate-400 uppercase">Ready for analysis</div>
                  </div>
                </div>
                <button 
                  onClick={() => setAttachedFile(null)}
                  className="w-6 h-6 rounded-full hover:bg-amber-100 text-amber-600 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button 
                onClick={handleFileClick}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${attachedFile ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
              >
                <i className="fas fa-paperclip text-lg"></i>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={attachedFile ? "Add details or press send..." : "Recommend a product..."}
                className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className={`bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-600 hover:scale-105 active:scale-95'}`}
              >
                <i className={`fas ${loading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={onFileChange}
              accept="image/*,application/pdf"
            />
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-amber-600 text-white w-16 h-16 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        >
          <i className="fas fa-robot text-2xl group-hover:rotate-12 transition-transform"></i>
          <span className="text-[8px] font-bold uppercase tracking-tighter mt-1">SGG AI</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-slate-900 font-black animate-pulse">
            !
          </div>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
