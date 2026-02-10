import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string | null;
};

export default function PageEditor({ slug }: { slug: string }) {
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    if (data) {
      setPage(data);
      setTitle(data.title);
      setContent(data.content || "");
      setImageUrl(data.image_url || "");
    }
  };

  const savePage = async () => {
    if (!page) return;

    setLoading(true);

    await supabase
      .from("pages")
      .update({
        title,
        content,
        image_url: imageUrl,
      })
      .eq("id", page.id);

    setLoading(false);
    alert("✅ Page Updated Successfully");
  };

  if (!page) {
    return (
      <div className="p-10 text-center text-red-600">
        ❌ Page not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Page: {page.slug}
      </h1>

      {/* TITLE */}
      <label className="block font-bold mb-1">
        Page Title
      </label>
      <input
        className="border p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* IMAGE URL */}
      <label className="block font-bold mb-1">
        Image URL
      </label>
      <input
        className="border p-2 w-full mb-4"
        placeholder="https://image-url.jpg"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          className="mb-4 rounded max-h-64"
        />
      )}

      {/* CONTENT */}
      <label className="block font-bold mb-1">
        Page Content (HTML allowed)
      </label>
      <textarea
        className="border p-3 w-full h-64 mb-6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={savePage}
        disabled={loading}
        className="bg-amber-500 px-6 py-2 rounded font-bold"
      >
        {loading ? "Saving..." : "Save Page"}
      </button>
    </div>
  );
}
