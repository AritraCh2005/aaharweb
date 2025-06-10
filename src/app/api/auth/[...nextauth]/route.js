
// import clientPromise from '../../../../libs/mongoConnect'
// import * as mongoose from 'mongoose'
// import { User } from '../../../models/User'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import bcrypt from 'bcrypt'
// import GoogleProvider from 'next-auth/providers/google'
// import { MongoDBAdapter } from '@auth/mongodb-adapter'  // using @auth version

// const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const email = credentials?.username
//         const password = credentials?.password

//         await mongoose.connect(process.env.MONGO_URL)
//         const user = await User.findOne({ email })

//         const passwordOk = user && bcrypt.compareSync(password, user.password)
//         if (passwordOk) return user
//         return null
//       },
//     }),
//   ],
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { User } from '../../../models/User' // Adjust path as needed
import clientPromise from '../../../../libs/mongoConnect'// Declare the clientPromise variable

const authOptions = {
  // Fix: Use NEXTAUTH_SECRET instead of SECRET
  secret: process.env.NEXTAUTH_SECRET,
  //adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.username
        const password = credentials?.password

        await mongoose.connect(process.env.MONGO_URL)
        const user = await User.findOne({ email })

        const passwordOk = user && bcrypt.compareSync(password, user.password)
        if (passwordOk) return user
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
