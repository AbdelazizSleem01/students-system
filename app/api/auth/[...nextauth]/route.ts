import NextAuth, { type SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        const admin = await Admin.findOne();

        if (!admin || !credentials?.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isValid) {
          return null;
        }

        return { id: '1', name: 'Admin' };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/admin/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
