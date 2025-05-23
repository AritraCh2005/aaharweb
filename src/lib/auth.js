import clientPromise from '../libs/mongoConnect'
import * as mongoose from 'mongoose'
import { User } from '../app/models/User'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from '@auth/mongodb-adapter'

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
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
}