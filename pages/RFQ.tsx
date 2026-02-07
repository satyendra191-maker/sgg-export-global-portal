export default function RFQ() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Request For Quotation (RFQ)
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          className="w-full border px-4 py-2"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border px-4 py-2"
        />

        <input
          type="text"
          placeholder="Product Name"
          className="w-full border px-4 py-2"
        />

        <input
          type="number"
          placeholder="Required Quantity"
          className="w-full border px-4 py-2"
        />

        <textarea
          placeholder="Additional Requirements"
          rows={4}
          className="w-full border px-4 py-2"
        ></textarea>

        <button
          type="submit"
          className="bg-amber-500 px-6 py-2 font-bold rounded hover:bg-amber-600"
        >
          Submit RFQ
        </button>
      </form>
    </div>
  );
}
