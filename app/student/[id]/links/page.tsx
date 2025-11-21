import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import Image from 'next/image';
import {
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaSpotify,
  FaFacebook,
  FaTwitter,
  FaThreads,
  FaSnapchat,
  FaArrowRight,
  FaUser,
  FaGraduationCap,
} from 'react-icons/fa6';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaUniversity } from 'react-icons/fa';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    await dbConnect();
    const student = await Student.findOne({ publicLink: `/student/${id}` });

    if (student) {
      return {
        title: `${student.name} - Links`,
        description: `View ${student.name}'s social media links and contact information`,
      };
    }
  } catch (error) {

  }

  return {
    title: 'Student Links',
  };
}

const socialConfig: {
  [key: string]: {
    icon: any;
    label: string;
    color: string;
    hoverColor: string;
    textColor: string;
    gradient?: string;
  }
} = {
  github: {
    icon: FaGithub,
    label: 'GitHub',
    color: 'bg-gray-900 border-gray-900',
    hoverColor: 'hover:bg-gray-800 hover:border-gray-800',
    textColor: 'text-white',
    gradient: 'from-gray-900 to-gray-800'
  },
  linkedin: {
    icon: FaLinkedin,
    label: 'LinkedIn',
    color: 'bg-blue-600 border-blue-600',
    hoverColor: 'hover:bg-blue-700 hover:border-blue-700',
    textColor: 'text-white',
    gradient: 'from-blue-600 to-blue-700'
  },
  cvUrl: {
    icon: FaFilePdf,
    label: 'CV / Resume',
    color: 'bg-red-600 border-red-600',
    hoverColor: 'hover:bg-red-700 hover:border-red-700',
    textColor: 'text-white',
    gradient: 'from-red-600 to-red-700'
  },
  whatsapp: {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    color: 'bg-green-500 border-green-500',
    hoverColor: 'hover:bg-green-600 hover:border-green-600',
    textColor: 'text-white',
    gradient: 'from-green-500 to-green-600'
  },
  instagram: {
    icon: FaInstagram,
    label: 'Instagram',
    color: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 border-transparent',
    hoverColor: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
    textColor: 'text-white',
    gradient: 'from-purple-600 via-pink-600 to-orange-500'
  },
  tiktok: {
    icon: FaTiktok,
    label: 'TikTok',
    color: 'bg-black border-black',
    hoverColor: 'hover:bg-gray-800 hover:border-gray-800',
    textColor: 'text-white',
    gradient: 'from-black to-gray-800'
  },
  spotify: {
    icon: FaSpotify,
    label: 'Spotify',
    color: 'bg-green-600 border-green-600',
    hoverColor: 'hover:bg-green-700 hover:border-green-700',
    textColor: 'text-white',
    gradient: 'from-green-600 to-green-700'
  },
  facebook: {
    icon: FaFacebook,
    label: 'Facebook',
    color: 'bg-blue-600 border-blue-600',
    hoverColor: 'hover:bg-blue-700 hover:border-blue-700',
    textColor: 'text-white',
    gradient: 'from-blue-600 to-blue-700'
  },
  x: {
    icon: FaTwitter,
    label: 'X (Twitter)',
    color: 'bg-black border-black',
    hoverColor: 'hover:bg-gray-800 hover:border-gray-800',
    textColor: 'text-white',
    gradient: 'from-black to-gray-800'
  },
  threads: {
    icon: FaThreads,
    label: 'Threads',
    color: 'bg-black border-black',
    hoverColor: 'hover:bg-gray-800 hover:border-gray-800',
    textColor: 'text-white',
    gradient: 'from-black to-gray-800'
  },
  snapchat: {
    icon: FaSnapchat,
    label: 'Snapchat',
    color: 'bg-yellow-400 border-yellow-400',
    hoverColor: 'hover:bg-yellow-500 hover:border-yellow-500',
    textColor: 'text-black',
    gradient: 'from-yellow-400 to-yellow-500'
  },
};

export default async function LinksPage({ params }: PageProps) {
  await dbConnect();
  const { id } = await params;
  const student = await Student.findOne({ publicLink: `/student/${id}` });

  if (!student) {
    notFound();
  }

  const socialLinks = Object.entries(socialConfig)
    .filter(([key]) => student[key])
    .map(([key, config]) => ({
      key,
      url: student[key],
      ...config
    }));

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {student.profileImage ? (
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring-4 ring-white ring-offset-4 ring-offset-purple-100 shadow-lg">
                  <Image
                    src={student.profileImage}
                    alt={student.name}
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center ring-4 ring-white ring-offset-4 ring-offset-purple-100 shadow-lg">
                <FaUser className="text-4xl text-white" />
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {student.name}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
            {student.major && (
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                <FaGraduationCap className="text-purple-600" />
                {student.major}
              </span>
            )}
            {student.university && (
              <>
                <span className="hidden sm:block text-purple-300 text-xl">•</span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                  <FaUniversity className="text-blue-600" />
                  {student.university}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-500 text-sm">
            Connect with me through my social profiles
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-4 mb-8">
          {socialLinks.map(({ key, url, icon: Icon, label, color, hoverColor, textColor, gradient }) => (
            <Link
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group flex items-center w-full p-4 rounded-xl transition-all duration-200
                border-2 shadow-md hover:shadow-lg
                ${color} ${hoverColor} ${textColor}
              `}
            >
              {/* Icon Container */}
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg mr-4
                ${gradient ? `bg-linear-to-r ${gradient}` : 'bg-white bg-opacity-20'}
                border-2 border-white border-opacity-30
              `}>
                <Icon className={`text-xl ${textColor === 'text-black' ? 'text-black' : 'text-white'}`} />
              </div>

              {/* Text Content */}
              <div className="flex-1 text-left">
                <div className="font-semibold text-lg">{label}</div>
                <div className="text-xs opacity-90 mt-1">
                  Click to visit {label}
                </div>
              </div>

              {/* Arrow */}
              <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                <FaArrowRight className="text-lg" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {socialLinks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No links available yet</h3>
              <p className="text-gray-500">
                This profile doesn't have any social links added yet.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 font-medium">
              <span className="text-purple-600 font-bold">{socialLinks.length}</span>
              {' '}link{socialLinks.length !== 1 ? 's' : ''} available
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Last updated {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}