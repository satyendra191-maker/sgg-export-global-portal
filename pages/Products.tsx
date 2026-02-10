import { supabase } from "../services/supabase";

import { useEffect, useState } from "react";


export default function Products() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("products").select("*").then(r => setItems(r.data || []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-6">
      {items.map(p=>(
        <div key={p.id} className="border rounded-xl p-4">
          {p.image_url && <img src={p.image_url} className="h-40 w-full object-cover mb-3" />}
          <h2 className="font-bold text-xl">{p.title}</h2>
          <p className="text-sm">{p.description}</p>
          <b>{p.price}</b>
        </div>
      ))}
    </div>
  );
}
