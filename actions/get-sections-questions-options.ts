// SERVER ACTION FOR GETTING THE DATA OF AN EXAM
// THIS INCLUDES THE SECTIONS, QUESTIONS, AND OPTIONS
// THEY ARE ALSO ALREADY FORMATTED FOR UI RENDERING

"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getSectionsQuestionsOptions(examId: string) {
    // THE FINAL FORMATTED DATA FOR UI
    let data = [];

    const supabase = await createClient();

    // GET THE SECTIONS FROM THE DB THAT HAS THE EXAMID
    const { data: sectionsData, error: sectionsError } = await supabase
        .from("Section")
        .select()
        .eq("examId", examId)

    if (!sectionsData || sectionsError) {
        console.error("Error on getting the sections: ", sectionsError.message);
        return {
            success: false,
            error: "No questions can be found for this exam. Refresh if not expected.",
        };
    };

    // THE SECTIONSDATA IS NOW AN ARRAY
    // WITH THE FIELDS: ID, TITLE, AND EXAMID
    // USE THE EXAMID TO FETCH THE QUESTIONS PER SECTION
    sectionsData.map((sectionData)=>{
        
    });


}
