import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/mangoDB";
import User from "../../../models/User"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const response = await dbConnect()
                    if (response) {
                        const { login, password } = credentials;
                        const identified = await User.findOne({ login });
                        if (identified) {
                            const passCheck = await bcrypt.compare(password, identified.password);
                            if (passCheck) {

                                return identified
                            } else {
                                throw new Error('Wrong password')
                            }
                        } else {
                            throw new Error('Login not found')
                        }
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error('Error to login');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session, }) {
            if (trigger === 'update' && session) {
                token._doc.firstName = session.firstName
                token._doc.lastName = session.lastName
                token._doc.avatar = session.avatar
                return { ...token, ...user }
            }

            return { ...token, ...user }
        },
        async session({ session, user, token }) {
            const extractUserData = (obj) => {
                const { sub, _doc: { firstName, lastName, login, avatar } } = obj;
                return { sub, firstName, lastName, login, avatar };
            }
            session.user = extractUserData(token);

            return session
        },
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.SECRET,
    session: {
        jwt: true
    },

}

export default NextAuth(authOptions)
