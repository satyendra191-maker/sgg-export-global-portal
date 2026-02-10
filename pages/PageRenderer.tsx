import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function PageRenderer({ slug }: { slug: string }) {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    setPage(data);
  };

  if (!page) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
