import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async session({ session, token, user }: any): Promise<any> {
            session.user.username = session.user.name.split(" ").join("").toLowerCase();

            session.user.uuid = token.sub;
            return session;
        }
    },
    secret: process.env.SECRET!,
};

export default NextAuth(authOptions);