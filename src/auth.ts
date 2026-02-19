import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      // Allow all routes for now — no protected routes yet.
      // To protect routes in the future, check auth?.user and
      // the request URL here, then return false or a redirect.
      void auth;
      return true;
    },
  },
});
