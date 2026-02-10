import { supabase } from "./supabase";

export async function uploadImage(file: File) {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
