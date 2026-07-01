'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-hytek-yellow border-t-transparent" />
      </div>
    )
  }

  return (
    <main className="flex-1 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HYTEK Budget</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {profile?.full_name ?? user.email} ({profile?.role ?? 'unknown role'})
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm"
        >
          Sign out
        </button>
      </header>

      <section className="rounded-2xl bg-card p-6 shadow">
        <h2 className="mb-2 text-lg font-semibold">Quick-Log</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Log a progress claim against your current job.
        </p>
        <a
          href="/log"
          className="inline-block rounded-lg bg-hytek-yellow px-4 py-3 font-semibold text-hytek-black"
        >
          Log a claim
        </a>
      </section>
    </main>
  )
}
