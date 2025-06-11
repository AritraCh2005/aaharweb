"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(false)
  const [error, setError] = useState(false)

  async function handleFormSubmit(ev) {
    ev.preventDefault()
    setCreatingUser(true)
    setError(false)
    setUserCreated(false)

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
      setUserCreated(true)
      setEmail("")
      setPassword("")
    } else {
      setError(true)
    }

    setCreatingUser(false)
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-center text-gray-800 font-bold text-3xl">Create an Account</h1>

        {userCreated && (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center">
            Account created!{" "}
            <Link href="/login" className="underline font-medium">
              Log in &raquo;
            </Link>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg text-center">
            Oops! Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              disabled={creatingUser}
              onChange={(ev) => setEmail(ev.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              disabled={creatingUser}
              onChange={(ev) => setPassword(ev.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={creatingUser}
            className="w-full flex justify-center items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
          >
            {creatingUser ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center text-gray-500">or continue with</div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <Image src="/google.png" alt="Google logo" width={20} height={20} />
          <span className="ml-3 text-gray-700 font-medium">Sign in with Google</span>
        </button>

        <div className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="underline font-medium">
            Log in &raquo;
          </Link>
        </div>
      </div>
    </section>
  )
}
