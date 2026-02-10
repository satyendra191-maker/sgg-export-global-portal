import { useState } from "react";
import { supabase } from "../services/supabase";

export default function AdminImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `pages/${fileName}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      setImageUrl(data.publicUrl);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="font-bold mb-4 text-xl">
        Upload Image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            uploadImage(e.target.files[0]);
          }
        }}
      />

      {uploading && (
        <p className="text-sm mt-2">Uploading...</p>
      )}

      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-64 rounded mb-2"
          />
          <p className="text-xs break-all">
            {imageUrl}
          </p>
        </div>
      )}
    </div>
  );
}
