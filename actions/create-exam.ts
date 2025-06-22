'use server'

import { createClient } from '@/lib/db/supabase/server';
import { createManualExamFormSchema } from '@/types/form-schema';
import { redirect } from 'next/navigation';
import { z } from "zod";

export default async function createExam(subjectId : string, values : z.infer<typeof createManualExamFormSchema>) {
    const supabase = await createClient();

    const isoString = `${values.dueDate}T${values.dueTime}:00`;

    const { data : createdExam, error } = await supabase.from('Exam').insert({
        subjectId : subjectId,
        examDuration : parseInt(values.examDuration),
        examDescription : values.examDescription,
        dueDate : isoString,
        type : values.type,
        title : values.examTitle,
    }).select().single()

    if (!createdExam || error) {
        console.error('Error on creating exam', error?.message);
        return {
            success : false,
            error : error?.message
        }
    };

    redirect(`/exam/${createdExam.id}`)
}