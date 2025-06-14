"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getMaterials(subjectId: string) {
    const supabase = await createClient();

    const { data: materials, error } = await supabase
        .from("Material")
        .select()
        .eq("subjectId", subjectId);

    if (!materials || error) {
        console.error("Error retreiving materials for section", error.message);
        return {
            success : false,
            materials : [],
            error : error.message
        }
    };

    return {
        success : true,
        materials : materials,
        error : null
    }
}
