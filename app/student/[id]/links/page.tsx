// app/student/[id]/links/page.tsx
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaTwitter,
  FaSnapchat,
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaSpotify,
  FaUser,
} from 'react-icons/fa6';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'My Links',
  description: 'All my social media and contact links in one place.',
  };

const iconMap: Record<string, any> = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebook,
  x: FaTwitter,
  twitter: FaTwitter,
  snapchat: FaSnapchat,
  github: FaGithub,
  linkedin: FaLinkedin,
  cvUrl: FaFilePdf,
  spotify: FaSpotify,
};

const platformColors: Record<string, string> = {
  whatsapp: '#25D366',
  instagram: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400',
  tiktok: '#000000',
  facebook: '#1877F2',
  x: '#000000',
  twitter: '#000000',
  snapchat: '#FFFC00',
  github: '#333333',
  linkedin: '#0A66C2',
  cvUrl: '#EF4444',
  spotify: '#1DB954',
};

export default async function LinksPage({ params }: PageProps) {
  await dbConnect();
  const { id } = await params;
  const student = await Student.findOne({ publicLink: `/student/${id}` });

  if (!student) notFound();

  const links = [
    { key: 'whatsapp', url: student.whatsapp },
    { key: 'instagram', url: student.instagram },
    { key: 'tiktok', url: student.tiktok },
    { key: 'facebook', url: student.facebook },
    { key: 'x', url: student.x || student.twitter },
    { key: 'snapchat', url: student.snapchat },
    { key: 'github', url: student.github },
    { key: 'linkedin', url: student.linkedin },
    { key: 'cvUrl', url: student.cvUrl },
    { key: 'spotify', url: student.spotify },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-700 via-amber-800 to-amber-900 flex items-center justify-center px-4 py-8">
      {/* Main Container */}
      <div className="w-full max-w-lg shadow-2xl rounded-3xl p-8">

        {/* Profile Section */}
        <div className="text-center mb-10">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            {student.profileImage ? (
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-8 ring-white ring-opacity-30 shadow-2xl">
                  <Image
                    src={student.profileImage}
                    alt={student.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-amber-600 to-amber-800 flex items-center justify-center ring-8 ring-white ring-opacity-30 shadow-2xl">
                <FaUser className="text-5xl text-white" />
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-white mb-2">
            {student.name}
          </h1>

          {student.bio && (
            <p className="text-amber-100 text-lg italic mb-6">
              {student.bio}
            </p>
          )}

          <div className="flex justify-center gap-5 mb-10 text-white text-2xl">
            {student.whatsapp && (
              <Link href={student.whatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:opacity-80 transition-opacity" />
              </Link>
            )}
            {student.instagram && (
              <Link href={student.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:opacity-80 transition-opacity" />
              </Link>
            )}
            {student.tiktok && (
              <Link href={student.tiktok} target="_blank" rel="noopener noreferrer">
                <FaTiktok className="hover:opacity-80 transition-opacity" />
              </Link>
            )}
            {student.facebook && (
              <Link href={student.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="hover:opacity-80 transition-opacity" />
              </Link>
            )}
            {student.x && (
              <Link href={student.x} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="hover:opacity-80 transition-opacity" />
              </Link>
            )}
            {student.snapchat && (
              <Link href={student.snapchat} target="_blank" rel="noopener noreferrer">
                <FaSnapchat className="hover:opacity-80 transition-opacity" />
              </Link>
            )}
          </div>
        </div>

        {/* Links List */}
        <div className="space-y-5">
          {links.map(({ key, url }) => {
            const Icon = iconMap[key];
            const color = platformColors[key] || '#ffffff';
            const isGradient = key === 'instagram';

            // Determine the link URL - use analytics endpoints for GitHub and LinkedIn
            let linkUrl = url!;
            if (key === 'github') {
              linkUrl = `/api/analytics/github/${id}`;
            } else if (key === 'linkedin') {
              linkUrl = `/api/analytics/linkedin/${id}`;
            }

            if (key === 'cvUrl') {
              return (
                <a
                  key={key}
                  href={url!}
                  download
                  className="block"
                >
                  <div className="bg-amber-100 rounded-full shadow-xl p-4 flex items-center gap-5 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${
                        isGradient ? color : ''
                      }`}
                      style={!isGradient ? { backgroundColor: color } : undefined}
                    >
                      <Icon />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        CV / Resume
                      </h3>
                      <p className="text-gray-500 text-sm">Download</p>
                    </div>
                  </div>
                </a>
              );
            } else {
              return (
                <Link
                  key={key}
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-amber-100 rounded-full shadow-xl p-4 flex items-center gap-5 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${
                        isGradient ? color : ''
                      }`}
                      style={!isGradient ? { backgroundColor: color } : undefined}
                    >
                      <Icon />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <p className="text-gray-500 text-sm">Tap to open</p>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-amber-200 text-sm">
          <p>© {new Date().getFullYear()} {student.name}</p>
          <p className="mt-2 opacity-70">Powered by StudentHub</p>
        </div>
      </div>
    </div>
  );
}
