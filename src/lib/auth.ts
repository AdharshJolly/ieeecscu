import CredentialsProvider from "next-auth/providers/credentials"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set")
}

export async function authorize(credentials: Record<"username" | "password", string> | undefined) {
  if (
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD &&
    credentials?.username === process.env.ADMIN_USERNAME &&
    credentials?.password === process.env.ADMIN_PASSWORD
  ) {
    return { id: "1", name: "Admin" }
  }
  return null
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize,
    })
  ],
  pages: {
    signIn: '/login',
  }
};
