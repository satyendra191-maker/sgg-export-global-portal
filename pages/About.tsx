import { supabase } from "../services/supabase";
import { useEffect, useState } from "react";

export default function About() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", "about")
        .single();

      if (error) {
        console.error("About page error:", error.message);
      } else {
        setContent(data?.content || "");
      }

      setLoading(false);
    };

    loadPage();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
