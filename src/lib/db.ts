import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pomqztgracelstbwsooz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2FwxLMIqML0pLb22NurSjA_xcDwl1_h";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface UploadedImage {
  id: string;
  src: string; // Stored as a public URL from Supabase Storage
  cat: string;
  h: "tall" | "med" | "short";
  timestamp: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  message: string;
  timestamp: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  desc: string;
  img: string; // Stored as a public URL from Supabase Storage
  timestamp: number;
}

// Utility to convert Base64 string to Blob for uploading to Storage
function base64ToBlob(base64Data: string): Blob {
  const parts = base64Data.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

// --- GALLERY IMAGES ---

export async function saveUploadedImage(image: UploadedImage): Promise<void> {
  let publicUrl = image.src;

  // If the image is in Base64 format, upload it to Storage first
  if (image.src.startsWith("data:")) {
    const blob = base64ToBlob(image.src);
    const fileExt = blob.type.split("/")[1] || "jpg";
    const filePath = `gallery/${image.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("sk-events")
      .upload(filePath, blob, {
        contentType: blob.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("sk-events").getPublicUrl(filePath);
    publicUrl = data.publicUrl;
  }

  const { error } = await supabase.from("gallery").upsert({
    id: image.id,
    src: publicUrl,
    cat: image.cat,
    h: image.h,
    timestamp: image.timestamp,
  });

  if (error) throw error;
}

export async function getUploadedImages(): Promise<UploadedImage[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return (data || []) as UploadedImage[];
}

export async function deleteUploadedImage(id: string): Promise<void> {
  // First, get the record to find the file extension from the URL
  const { data: item, error: fetchError } = await supabase
    .from("gallery")
    .select("src")
    .eq("id", id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

  if (item && item.src) {
    const fileExt = item.src.split("?")[0].split(".").pop() || "jpg";
    const filePath = `gallery/${id}.${fileExt}`;

    await supabase.storage.from("sk-events").remove([filePath]);
  }

  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
}

// --- CONTACT INQUIRIES ---

export async function saveContactMessage(message: ContactMessage): Promise<void> {
  const { error } = await supabase.from("messages").upsert(message);
  if (error) throw error;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return (data || []) as ContactMessage[];
}

// --- TEAM MEMBERS ---

export async function saveTeamMember(member: TeamMember): Promise<void> {
  let publicUrl = member.img;

  if (member.img.startsWith("data:")) {
    const blob = base64ToBlob(member.img);
    const fileExt = blob.type.split("/")[1] || "jpg";
    const filePath = `team/${member.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("sk-events")
      .upload(filePath, blob, {
        contentType: blob.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("sk-events").getPublicUrl(filePath);
    publicUrl = data.publicUrl;
  }

  const { error } = await supabase.from("team").upsert({
    id: member.id,
    name: member.name,
    role: member.role,
    desc: member.desc,
    img: publicUrl,
    timestamp: member.timestamp,
  });

  if (error) throw error;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return (data || []) as TeamMember[];
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { data: item, error: fetchError } = await supabase
    .from("team")
    .select("img")
    .eq("id", id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

  if (item && item.img) {
    const fileExt = item.img.split("?")[0].split(".").pop() || "jpg";
    const filePath = `team/${id}.${fileExt}`;

    await supabase.storage.from("sk-events").remove([filePath]);
  }

  const { error } = await supabase.from("team").delete().eq("id", id);
  if (error) throw error;
}
