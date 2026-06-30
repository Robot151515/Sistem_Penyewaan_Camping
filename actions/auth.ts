'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email dan password harus diisi' }
  }

  // SIMULASI LOGIN: Siapapun bisa masuk
  const cookieStore = await cookies()
  cookieStore.set('simulated_session', 'true', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 minggu
  })

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function register(formData: FormData) {
  const fullname = formData.get('fullname') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!fullname || !email || !password) {
    return { error: 'Semua field harus diisi' }
  }

  // SIMULASI REGISTER: Bolehkan semua
  // Kita coba simpan ke Prisma untuk simulasi, jika error abaikan saja agar simulasi tetap jalan.
  try {
    await prisma.users.create({
      data: {
        fullname,
        email,
        password: '[SIMULATED]', 
      },
    })
  } catch (dbError) {
    // Ignore error in simulation (e.g. duplicate email)
    console.log("Simulated register DB error ignored:", dbError)
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('simulated_session')
  
  revalidatePath('/', 'layout')
  redirect('/login')
}
