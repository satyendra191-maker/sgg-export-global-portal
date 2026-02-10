const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

export async function getChatResponseWithMedia(
  prompt: string
): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API key missing");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from Gemini"
  );
}
