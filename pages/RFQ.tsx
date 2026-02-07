import { useState } from "react";

const RFQ = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">
        Request For Quotation (RFQ)
      </h1>

      <p className="text-slate-600 mb-10 max-w-2xl">
        Submit your requirements and our export team will contact you with
        pricing and delivery details.
      </p>

      {submitted ? (
        <div className="bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg">
          ✅ Thank you! Your RFQ has been submitted successfully.
          <br />
          Our team will contact you shortly.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-sm border grid gap-6"
        >
          {/* COMPANY */}
          <div>
            <label className="block font-semibold mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="Your company name"
              className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* CONTACT PERSON */}
          <div>
            <label className="block font-semibold mb-1">Contact Person</label>
            <input
              type="text"
              required
              placeholder="Full name"
              className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* PRODUCT */}
          <div>
            <label className="block font-semibold mb-1">Product Required</label>
            <input
              type="text"
              required
              placeholder="e.g. Steel coils, Chemicals"
              className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="block font-semibold mb-1">
              Estimated Quantity
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 100 MT"
              className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block font-semibold mb-1">
              Additional Details
            </label>
            <textarea
              rows={4}
              placeholder="Quality specs, destination port, timeline..."
              className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-400 outline-none"
            ></textarea>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-md transition"
          >
            SUBMIT RFQ
          </button>
        </form>
      )}
    </div>
  );
};

export default RFQ;
