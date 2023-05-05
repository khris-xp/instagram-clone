import NextAuth, { DefaultSession, NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT, getToken } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters";

interface AuthSession extends Session {
    user: {
        uuid: string | undefined,
        name: string,
        email: string,
        image: string,
    };
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async session({ session, token, user }: { session: AuthSession, token: JWT, user: AdapterUser } | any) {
            session.user = session.user ?? {};
            session.user.uuid = token.sub;
            session.user.name = session?.user?.name?.split(" ").join("").toLowerCase()!;
            session.user.email = session?.user?.email?.split(" ").join("").toLowerCase()!;
            session.user.image = session?.user?.image?.split(" ").join("").toLowerCase()!;
            return session;
        },
    },
    secret: process.env.SECRET!,
};

export default NextAuth(authOptions);