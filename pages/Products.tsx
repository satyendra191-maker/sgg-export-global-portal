import React from "react";
import { MOCK_PRODUCTS } from "../constants";

const Products: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* PAGE HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Our Products
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Explore our range of globally sourced, export-ready commodities.
          All products comply with international quality standards.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition overflow-hidden border"
          >
            {/* IMAGE */}
            <div className="h-56 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <span className="text-xs uppercase tracking-wide text-amber-600 font-semibold">
                {product.category}
              </span>

              <h2 className="text-xl font-bold mt-2 mb-3">
                {product.name}
              </h2>

              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-slate-500">
                  Min Order:{" "}
                  <span className="font-semibold text-slate-900">
                    {product.minOrder}
                  </span>
                </span>

                <a
                  href="#/rfq"
                  className="text-amber-600 font-bold hover:underline"
                >
                  ENQUIRE →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
