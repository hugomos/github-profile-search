'use client'
import { FormEvent, useState } from 'react'
import {
  Archive,
  GithubLogo,
  Users,
  WarningCircle,
  X,
  Share,
} from '@phosphor-icons/react'

/* eslint-disable @next/next/no-img-element */

export interface User {
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  bio: string
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [user, setUser] = useState<User | null>(null)

  const [showError, setShowError] = useState(false)

  const getUserData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowError(false)

    const res = await fetch(`https://api.github.com/users/${search}`)
    if (!res.ok) {
      setShowError(true)
      return
    }

    const data = await res.json()
    setUser(data)
  }

  return (
    <main className="h-screen w-full bg-zinc-950">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        {user ? (
          <div className="flex w-80 flex-col items-center justify-center gap-4 rounded bg-zinc-900 p-4">
            <div className="flex w-full items-center justify-between">
              <button className="group rounded-sm p-1 transition-colors hover:bg-zinc-800">
                <Share className="h-6 w-6 fill-zinc-600 transition-colors group-hover:fill-green-500" />
              </button>
              <button
                className="group rounded-sm p-1 transition-colors hover:bg-zinc-800"
                onClick={() => setUser(null)}
              >
                <X className="h-6 w-6 fill-zinc-600 transition-colors group-hover:fill-red-500" />
              </button>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="h-36 w-36 rounded-full ring-2 ring-blue-700"
              />
              <div className="flex w-full flex-col items-center gap-2 p-4">
                <div className="flex w-full flex-col items-center justify-center">
                  <a
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm bg-blue-700 bg-opacity-0 p-1 text-lg font-medium text-zinc-50 transition-colors hover:bg-opacity-20"
                  >
                    {user.login}
                  </a>
                  <p className="text-sm text-zinc-500">{user.bio}</p>
                </div>
                <div className="flex w-full justify-around">
                  <span className="flex items-center gap-2 text-zinc-50">
                    <Users className="h-5 w-5" />
                    {user.followers}
                  </span>
                  <span className="flex items-center gap-2 text-zinc-50">
                    <Archive className="h-5 w-5" />
                    {user.public_repos}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <GithubLogo className="h-24 w-24 fill-zinc-100" />
            </div>
            <form
              onSubmit={getUserData}
              className="flex w-80 flex-col gap-3 p-2"
            >
              <div>
                <input
                  type="text"
                  placeholder="Busque por um usuario no Github"
                  className={`w-full rounded-sm bg-zinc-900 p-2 text-zinc-200 outline-none ring-1  placeholder:text-sm placeholder:text-zinc-500 focus:ring-zinc-500 ${
                    showError ? 'ring-red-500' : 'ring-transparent'
                  }`}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {showError && (
                  <span className="flex items-center gap-1 py-1 text-xs text-red-500">
                    <WarningCircle />
                    Usuario não encontrado, tente novamente
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-zinc-800 p-2 text-center font-medium text-zinc-50 transition-colors hover:bg-zinc-700"
              >
                Buscar
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
