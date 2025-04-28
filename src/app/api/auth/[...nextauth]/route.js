import NextAuth from 'next-auth'
import { authOptions } from '../../../../lib/auth'

// Create the handler using the imported authOptions
const handler = NextAuth(authOptions)

// Export only the HTTP method handlers
export { handler as GET, handler as POST }