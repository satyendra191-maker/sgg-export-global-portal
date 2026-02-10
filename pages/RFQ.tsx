import React, { useState } from "react";
import { supabase } from "../services/supabase";

const RFQ: React.FC = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !email || !product || !quantity) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("rfqs").insert([
      {
        company,
        email,
        product,
        quantity,
        requirements,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      alert("Error: " + error.message);
    } else {
      alert("RFQ submitted successfully ✅");

      // reset form
      setCompany("");
      setEmail("");
      setProduct("");
      setQuantity("");
      setRequirements("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-slate-900">
          Request For Quotation (RFQ)
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Your company name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="your@email.com"
            />
          </div>

          {/* Product */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product *
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Product name"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Quantity *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Required quantity"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Additional Requirements
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Packaging, delivery, specs, etc."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? "Submitting..." : "Submit RFQ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RFQ;
