import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from '@/models/Usuario';
import Role from '@/models/Role';
import jwt from 'jsonwebtoken';


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      },
    })
  ],
  secret: process.env.JWT_KEY,
  session: {
    jwt: true,
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {

      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.jwt = token.jwt

        if (token.user) {
          session.user = token.user
        }
      }

      return session
    },
    async jwt({ token, account, user }) {

      if (account) {

        if (!token.jwt && account.provider === 'google') {
          // Persist the OAuth access_token and or the user id to the token right after signin
          await connectMongoDB();
          const userFound = await User.findOne({ googleId: token.sub }).populate({ path: 'roles', model: Role });
          if (userFound) {
            token.jwt = jwt.sign({
              _id: userFound._id,
            },
              process.env.JWT_KEY
              ,
              {

                expiresIn: '5d' // expires in 5 days

              }
            );
            token.role = userFound.roles[0].nombre
          }
        }

      }

      return token
    },
    async signIn({ account, profile }) {

      if (account.provider === "google") {
        await connectMongoDB();

        const userExists = await User.findOne({ googleId: profile.sub })
          .populate({ path: 'roles', model: Role });

        if (profile.email.endsWith("@champoton.tecnm.mx")) {
          if (userExists) {
            profile.user = userExists;
            return true;
          }
          else {
            const roleAlumno = await Role.findOne({ nombre: "alumno" });

            const newUser = new User({
              username: profile.name,
              googleId: profile.sub,
              correo: profile.email,
              roles: [roleAlumno._id]
            })

            await newUser.save().then(data => {
              profile.user = data;
            }).catch(err => {
              console.log(err)
            })

            return true;
          }
        }
        else{
          return false;
        }

      }
    }
  },
  pages: {
    signIn: '/login', // on successfully signin    
    signOut: '/login', // on signout redirects users to a custom login page.
    error: '/auth/error',  // displays authentication errors
  }
};
export default NextAuth(authOptions);