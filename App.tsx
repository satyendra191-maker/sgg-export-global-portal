import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  is_visible: boolean;
};

export default function Admin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    content: "",
    image_url: "",
  });

  const loadPages = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });
    setPages(data || []);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const savePage = async () => {
    if (!form.slug || !form.title) return alert("Slug & title required");

    await supabase.from("pages").upsert({
      ...form,
      is_visible: true,
    });

    setForm({ slug: "", title: "", content: "", image_url: "" });
    loadPages();
  };

  const toggle = async (p: Page) => {
    await supabase
      .from("pages")
      .update({ is_visible: !p.is_visible })
      .eq("id", p.id);
    loadPages();
  };

  const del = async (id: string) => {
    if (!confirm("Delete page?")) return;
    await supabase.from("pages").delete().eq("id", id);
    loadPages();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin CMS</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-3">
        <input
          placeholder="slug (about, products...)"
          className="border p-2 w-full"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          placeholder="title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="image URL"
          className="border p-2 w-full"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />
        <textarea
          placeholder="content"
          className="border p-2 w-full h-32"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button
          onClick={savePage}
          className="bg-amber-500 px-6 py-2 font-bold rounded"
        >
          Save Page
        </button>
      </div>

      {/* LIST */}
      {pages.map((p) => (
        <div
          key={p.id}
          className="border p-4 rounded mb-3 flex justify-between items-center"
        >
          <div>
            <b>{p.title}</b> <span className="text-sm">/{p.slug}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggle(p)}
              className="border px-3 py-1 rounded"
            >
              {p.is_visible ? "Hide" : "Show"}
            </button>
            <button
              onClick={() => del(p.id)}
              className="border px-3 py-1 rounded text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
