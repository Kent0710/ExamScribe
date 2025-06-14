"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function uploadFile(file: File | null) {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
        .from("materials") // your bucket name
        .upload(`public/${file.name}`, file, {
            cacheControl: "3600",
        });
}
