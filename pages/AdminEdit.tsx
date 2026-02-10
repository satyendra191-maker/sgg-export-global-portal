import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function AdminEdit() {
  const slug = window.location.hash.split("/").pop();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    if (data) {
      setTitle(data.title);
      setContent(data.content || "");
    }
    setLoading(false);
  };

  const savePage = async () => {
    await supabase
      .from("pages")
      .update({ title, content })
      .eq("slug", slug);

    alert("Page updated successfully");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Edit Page: {slug}
      </h1>

      <input
        className="border p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        rows={12}
        className="border p-3 w-full mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={savePage}
        className="bg-amber-500 px-6 py-2 rounded font-bold"
      >
        Save Page
      </button>
    </div>
  );
}
