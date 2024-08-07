import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful signin
    async signIn({ profile }) {
      // connect to db
      // check if user exists
      // if not, create
      // return true to allow sign in
    },
    // session callback function that modifies the session object
    async session({ session }) {
      // get user from db
      // assign user id from session
      // return session
    },
  },
};
