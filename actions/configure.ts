'use server'

import { createClient } from "@/lib/db/supabase/server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function configure(role : string) {
    const supabase = await createClient();

    const { data : { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
        console.error('Error retreiving user from configure server')
        return {
            success : false,
            error : error?.message,
        }
    };

    const { error : insertError } = await supabase.from('Account').insert({
        auth_user_id : user.id,
        role : role
    })

    if (insertError) {
        console.error('Error configuring and creating account from server', insertError);
        return {
            success : false,
            error : insertError.message
        }
    };

    const cookieStore = await cookies();
    cookieStore.set({
        name : 'role',
        value : role,
        httpOnly : true,
        path : '/',
        secure : true,
    })

    redirect('/dashboard')
}