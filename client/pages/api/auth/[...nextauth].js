import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/mangoDB";
import User from "../../../models/User"
const bcrypt = require("bcrypt")

 const authOptions = {
    providers: [
        // EmailProvider({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        //     sendVerificationRequest({
        //         identifier: email,
        //         url,
        //         provider: {server, from}
        //     }) {
        //     },
        // }),
        CredentialsProvider({
            name: "Credentials",
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const response = await dbConnect()
                    if (response) {
                        const {login, password} = credentials;
                        const identified = await User.findOne({ login });
                        if (identified) {
                            const passCheck = await bcrypt.compare(password, identified.password);
                            if (passCheck) {
                                return {login: true}
                            } else {
                                throw new Error('Wrong password')
                            }
                        } else{
                            throw new Error('Login not found')
                        }
                    }
                } catch(error){
                    console.log(error);
                    throw new Error('Error to login');
                }

                // if (login !== 'maria' || password !== 'maria' ) {
                //     throw new Error('invalid login or password')
                // } else {
                //     return {login: true}
                // }

            }
        })
    ],
    // secret: process.env.SECRET,
     pages: {
        signIn: "/login"
     },
    session: {
        jwt: true
    },
    theme:  {
    colorScheme: "light",
}
}

export default NextAuth(authOptions)
