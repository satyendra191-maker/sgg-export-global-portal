
import React from 'react';
import { Product, BlogPost } from './types';

export const COLORS = {
  primary: '#0F172A', // Slate 900
  secondary: '#B45309', // Amber 700
  accent: '#F59E0B', // Amber 500
};

export const NAV_LINKS = [
  { name: 'Home', href: '#/' },
  { name: 'About', href: '#/about' },
  { name: 'Products', href: '#/products' },
  { name: 'Services', href: '#/services' },
  { name: 'Blog', href: '#/blog' },
  { name: 'RFQ', href: '#/rfq' },
  { name: 'Contact', href: '#/contact' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice',
    category: 'Agriculture',
    description: 'Long-grain, aromatic aged basmati rice sourced from the finest Himalayan foothills.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    minOrder: '20 Tons'
  },
  {
    id: '2',
    name: 'Industrial Grade Solar Panels',
    category: 'Energy',
    description: 'High-efficiency monocrystalline PV modules for large scale industrial deployments.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    minOrder: '500 Units'
  },
  {
    id: '3',
    name: 'Raw Organic Cotton',
    category: 'Textiles',
    description: 'Sustainably harvested raw cotton fiber, GOTS certified for international garment export.',
    image: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=800',
    minOrder: '10 Bales'
  },
  {
    id: '4',
    name: 'Spices & Seasonings',
    category: 'Agriculture',
    description: 'Hand-picked organic spices including Turmeric, Cardamom, and Black Pepper.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    minOrder: '5 MT'
  },
  {
    id: '5',
    name: 'Eco-Friendly Jute Bags',
    category: 'Textiles',
    description: 'Biodegradable heavy-duty jute bags for industrial packaging and retail.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    minOrder: '5000 Units'
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Global Logistics Trends 2025',
    excerpt: 'Discover how AI is revolutionizing the supply chain for international exporters.',
    author: 'SGG Analyst',
    date: 'Jan 15, 2025',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Sustainability in Textile Exports',
    excerpt: 'The rising demand for GOTS certified organic cotton in the European market.',
    author: 'Elena Vance',
    date: 'Dec 12, 2024',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'
  }
];
