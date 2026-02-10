import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Page = {
  title: string;
  content: string;
};

export default function Home() {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    const { data, error } = await supabase
      .from("pages")
      .select("title, content")
      .eq("slug", "home")
      .eq("is_visible", true)
      .single();

    if (!error) {
      setPage(data);
    }
  };

  if (!page) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Home Page...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
