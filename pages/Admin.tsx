import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

/* ================= TYPES ================= */
type Menu = {
  id: string;
  title: string;
  slug: string;
  position: number;
  is_visible: boolean;
};

type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string | null;
};

/* ================= ADMIN AI ================= */
function AdminAI() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
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
    } catch {
      setResult("AI Error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-12">
      <h2 className="text-xl font-bold mb-4">
        🤖 Admin AI Assistant
      </h2>

      <textarea
        placeholder="Ask AI to write product / page content..."
        className="border p-3 w-full mb-3"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={askAI}
        className="bg-black text-white px-4 py-2 rounded font-bold"
      >
        {loading ? "Thinking..." : "Generate"}
      </button>

      {result && (
        <textarea
          className="border p-3 w-full mt-4"
          rows={6}
          value={result}
          readOnly
        />
      )}
    </div>
  );
}

/* ================= MAIN ADMIN ================= */
export default function Admin() {
  /* ===== MENUS ===== */
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuSlug, setMenuSlug] = useState("");

  /* ===== PAGES ===== */
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  useEffect(() => {
    loadMenus();
    loadPages();
  }, []);

  /* ===== LOAD ===== */
  const loadMenus = async () => {
    const { data } = await supabase
      .from("menus")
      .select("*")
      .order("position");
    setMenus(data || []);
  };

  const loadPages = async () => {
    const { data } = await supabase.from("pages").select("*");
    setPages(data || []);
  };

  /* ===== MENU ACTIONS ===== */
  const addMenu = async () => {
    if (!menuTitle || !menuSlug) return;
    await supabase.from("menus").insert([
      {
        title: menuTitle,
        slug: menuSlug,
        position: menus.length + 1,
        is_visible: true,
      },
    ]);
    setMenuTitle("");
    setMenuSlug("");
    loadMenus();
  };

  const toggleMenu = async (id: string, visible: boolean) => {
    await supabase
      .from("menus")
      .update({ is_visible: !visible })
      .eq("id", id);
    loadMenus();
  };

  const deleteMenu = async (id: string) => {
    await supabase.from("menus").delete().eq("id", id);
    loadMenus();
  };

  /* ===== PAGE ACTIONS ===== */
  const savePage = async () => {
    if (!selectedPage) return;
    await supabase
      .from("pages")
      .update({
        title: selectedPage.title,
        content: selectedPage.content,
        image_url: selectedPage.image_url,
      })
      .eq("id", selectedPage.id);
    loadPages();
    alert("Page updated");
  };

  const deletePage = async (id: string) => {
    await supabase.from("pages").delete().eq("id", id);
    setSelectedPage(null);
    loadPages();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">
        Admin CMS Dashboard
      </h1>

      {/* ================= MENUS ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="font-bold mb-4">Navbar Menus</h2>

        <input
          placeholder="Menu Title"
          className="border p-2 w-full mb-2"
          value={menuTitle}
          onChange={(e) => {
            setMenuTitle(e.target.value);
            setMenuSlug(
              e.target.value.toLowerCase().replace(/\s+/g, "-")
            );
          }}
        />

        <input
          placeholder="Slug"
          className="border p-2 w-full mb-3"
          value={menuSlug}
          onChange={(e) => setMenuSlug(e.target.value)}
        />

        <button
          onClick={addMenu}
          className="bg-amber-500 px-4 py-2 rounded font-bold"
        >
          Add Menu
        </button>

        {menus.map((m) => (
          <div
            key={m.id}
            className="flex justify-between items-center border p-3 rounded mt-3"
          >
            <div>
              <b>{m.title}</b> /{m.slug}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleMenu(m.id, m.is_visible)}
                className="border px-3 py-1 rounded"
              >
                {m.is_visible ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => deleteMenu(m.id)}
                className="border px-3 py-1 rounded text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGES ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Pages</h2>

        <select
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setSelectedPage(
              pages.find((p) => p.id === e.target.value) ||
                null
            )
          }
        >
          <option>Select a page</option>
          {pages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} /{p.slug}
            </option>
          ))}
        </select>

        {selectedPage && (
          <>
            <input
              className="border p-2 w-full mb-2"
              value={selectedPage.title}
              onChange={(e) =>
                setSelectedPage({
                  ...selectedPage,
                  title: e.target.value,
                })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Image URL"
              value={selectedPage.image_url || ""}
              onChange={(e) =>
                setSelectedPage({
                  ...selectedPage,
                  image_url: e.target.value,
                })
              }
            />

            <textarea
              className="border p-3 w-full mb-3"
              rows={6}
              value={selectedPage.content}
              onChange={(e) =>
                setSelectedPage({
                  ...selectedPage,
                  content: e.target.value,
                })
              }
            />

            <div className="flex gap-3">
              <button
                onClick={savePage}
                className="bg-green-600 text-white px-4 py-2 rounded font-bold"
              >
                Save
              </button>
              <button
                onClick={() => deletePage(selectedPage.id)}
                className="bg-red-600 text-white px-4 py-2 rounded font-bold"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* ================= AI ================= */}
      <AdminAI />
    </div>
  );
}
