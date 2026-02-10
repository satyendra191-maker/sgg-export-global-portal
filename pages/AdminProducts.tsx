import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Item = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  is_visible: boolean;
};

export default function AdminProducts() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addItem = async () => {
    await supabase.from("products").insert([
      {
        title,
        description,
        is_visible: true,
      },
    ]);
    setTitle("");
    setDescription("");
    load();
  };

  const toggle = async (id: string, v: boolean) => {
    await supabase
      .from("products")
      .update({ is_visible: !v })
      .eq("id", id);
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Products / Services
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={addItem}
        className="bg-amber-500 px-4 py-2 rounded font-bold"
      >
        Add
      </button>

      <hr className="my-6" />

      {items.map((i) => (
        <div
          key={i.id}
          className="border p-3 mb-2 flex justify-between"
        >
          <div>
            <b>{i.title}</b>
            <p className="text-sm text-gray-600">
              {i.description}
            </p>
          </div>

          <button
            onClick={() => toggle(i.id, i.is_visible)}
            className="text-sm border px-3 rounded"
          >
            {i.is_visible ? "Hide" : "Show"}
          </button>
        </div>
      ))}
    </div>
  );
}
