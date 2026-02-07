export default function RFQ() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Request For Quotation (RFQ)
      </h1>

      {/* FORM SUBMIT TO EMAIL */}
      <form
        action="https://formsubmit.co/satyendra191@gmail.com"
        method="POST"
        className="space-y-4"
      >
        {/* Required for FormSubmit */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <input
          type="text"
          name="Company Name"
          required
          placeholder="Company Name"
          className="w-full border px-4 py-2"
        />

        <input
          type="email"
          name="Email"
          required
          placeholder="Email Address"
          className="w-full border px-4 py-2"
        />

        <input
          type="text"
          name="Product"
          required
          placeholder="Product Name"
          className="w-full border px-4 py-2"
        />

        <input
          type="number"
          name="Quantity"
          required
          placeholder="Required Quantity"
          className="w-full border px-4 py-2"
        />

        <textarea
          name="Requirements"
          rows={4}
          placeholder="Additional Requirements"
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
