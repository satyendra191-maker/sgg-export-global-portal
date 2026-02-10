import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function DynamicPage({ slug }: { slug: string }) {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("is_visible", true)
      .single()
      .then(({ data }) => setPage(data));
  }, [slug]);

  if (!page) return <div className="p-10">Page not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      {page.image_url && (
        <img
          src={page.image_url}
          className="mb-6 rounded"
          alt=""
        />
      )}
      <p className="whitespace-pre-wrap">{page.content}</p>
    </div>
  );
}
