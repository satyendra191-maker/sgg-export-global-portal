import { useState } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AdminAI() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const askAI = async () => {
    if (!API_KEY) return alert("Gemini API key missing");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    setResult(
      data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h3 className="font-bold mb-3">Admin AI Assistant 🤖</h3>

      <textarea
        className="border p-2 w-full mb-3 h-24"
        placeholder="Write page content for About Us, Products, etc"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={askAI}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Generate
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-3 rounded whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
}
