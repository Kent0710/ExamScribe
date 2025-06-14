import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    return createBrowserClient(
        "https://ngfqfzgjwagqpoxcxpdd.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZnFmemdqd2FncXBveGN4cGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODU0ODIsImV4cCI6MjA2NTQ2MTQ4Mn0.VJCq-3Xv4Xl5P9gvjsdJRbDlVYCx796NyH0WdJEjlBM"
    );
}
