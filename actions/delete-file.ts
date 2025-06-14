"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function deleteFile(materialId: string) {
    const supabase = await createClient();

    const { data: deleteData, error: deleteError } = await supabase
        .from("Material")
        .delete()
        .match({ id: materialId })
        .select()
        .single();

    if (!deleteData || deleteError) {
        console.error("Error deleting row from database", deleteError?.message);
        return {
            success: false,
            error: deleteError?.message,
        };
    }

    const link = deleteData.link as string;
    const publicPrefix =
        "https://ngfqfzgjwagqpoxcxpdd.supabase.co/storage/v1/object/public/";

    if (!link.startsWith(publicPrefix)) {
        return {
            success: false,
            error: "Invalid file link format",
        };
    }

    const relativePath = link.replace(publicPrefix, "");
    const [bucket, ...pathParts] = relativePath.split("/");
    const filePath = decodeURIComponent(pathParts.join("/"));

    const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (storageError) {
        console.error("Error deleting file from storage", storageError.message);
        return {
            success: false,
            error: storageError.message,
        };
    }

    return {
        success: true,
        error : null
    };
}
