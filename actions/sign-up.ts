'use server'

import {z} from 'zod'
import { loginFormSchema } from "@/types/form-schema";
import { createClient } from '@/lib/db/supabase/server';

export default async function signUp(values : z.infer<typeof loginFormSchema>) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email : values.username + '@gmail.com',
        password : values.password
    });

    if (error) {
        console.log('Error on signing up from the server.')
        return {
            success : false,
            error : error
        }
    };

    return {
        success : true,
        error : null,
    }
}