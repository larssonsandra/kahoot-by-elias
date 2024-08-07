// import { login, signup } from './actions'

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/ui/SubmitButton";
import { login, signup, signout } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // const signIn = async (formData: FormData) => {
  //   "use server";

  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/protected");
  // };

  // const signUp = async (formData: FormData) => {
  //   "use server";

  //   const origin = headers().get("origin");
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/login?message=Check email to continue sign in process");
  // };

  return (
    <div className="flex h-screen justify-center items-center font-semibold">
      <form className="flex flex-col justify-center gap-2 py-10 px-10 text-foreground border border-gray-200 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Logga in</h2>
        <label className="text-md" htmlFor="email">
          Användarnamn eller e-postadress
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          // placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Lösenord
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          // placeholder="••••••••"
          required
        />
        <p>Glömt lösenordet? Återställ ditt lösenord</p>
        <SubmitButton
          formAction={login}
          className="bg-primary rounded-md px-4 py-2 text-white mb-2"
          pendingText="Signing In..."
        >
          Logga in
        </SubmitButton>
        <SubmitButton
          formAction={signup}
          className="border border-foreground/20 rounded-md px-4 py-2 bg-primary text-white mb-2"
          pendingText="Signing Up..."
        >
          Skapa konto
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <div className="relative flex items-center w-full">
          <hr className="flex-1 border-t border-gray-400" />
          <span className="px-2 bg-white text-grey-500">eller</span>
          <hr className="flex-1 border-t border-gray-400" />
        </div>
      </form>
    </div>
  );
}
