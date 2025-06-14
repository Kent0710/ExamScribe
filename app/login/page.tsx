import Header from "@/components/reusables/header";
import LoginForm from "./login-form";
import { createClient } from "@/lib/db/supabase/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const supabase = await createClient();
    const { data : { user } } = await supabase.auth.getUser()
    if (user) redirect('/dashboard')

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            <Header />
            <div className="flex items-center justify-center my-[5rem]">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
