'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Signup error:', error.message) // Enhanced error logging
    redirect('/error')
    return // Ensure we exit the function after redirecting
  }

  revalidatePath('host', 'layout')
  redirect('/host/dashboard')
}

export async function loginWithGoogle() {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`, // Adjust the redirect URL as needed
      scopes: 'openid profile email',
    },
  });

  if (error) {
    console.error('Google login error:', error.message); // Enhanced error logging
    redirect('/error');
    return; // Ensure we exit the function after redirecting
  }

  revalidatePath('host', 'layout');
  redirect('/host/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,

  }

  const { error } = await supabase.auth.signUp(data)
  

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/auth/login', 'layout')
  redirect('/host/dashboard')
}

export async function signout() {
    
    const supabase = createClient()
  
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      console.error('Error signing out:', error.message)
      redirect('/error')
    }
  
    // Revalidate any paths that might have session-dependent data
    revalidatePath('/auth/login', 'layout')
  
    // Redirect to the homepage or login page
    redirect('/auth/login')
}