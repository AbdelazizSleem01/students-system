import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaLink,
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaUniversity,
  FaIdCard,
  FaBook,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaShareAlt,
  FaWhatsapp,
  FaGlobe,
} from 'react-icons/fa';
import type { Metadata } from 'next';
import DocumentsGallery from './DocumentsGallery';

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
        title: `${student.name} - Student Profile`,
        description: `View ${student.name}'s profile - ${student.major} student at ${student.university}`,
        openGraph: {
          title: `${student.name} - Student Profile`,
          description: `${student.major} student at ${student.university}`,
          type: 'profile',
          images: student.profileImage ? [student.profileImage] : [],
        },
      };
    }
  } catch (error) {
  }

  return {
    title: 'Student Profile',
  };
}

const sanitizeImageUrl = (url: string | undefined | null): string | undefined => {
  if (!url) return undefined;

  if (typeof url !== 'string') return undefined;

  const trimmedUrl = url.trim();
  if (trimmedUrl === '') return undefined;

  if (trimmedUrl.startsWith('http://') ||
    trimmedUrl.startsWith('https://') ||
    trimmedUrl.startsWith('/') ||
    trimmedUrl.startsWith('data:image')) {
    return trimmedUrl;
  }

  return undefined;
};

export default async function StudentPublicPage({ params }: PageProps) {
  await dbConnect();
  const { id } = await params;
  const student = await Student.findOne({ publicLink: `/student/${id}` });

  if (!student) {
    notFound();
  }

  const sanitizedImages = {
    officialDocumentsImage: sanitizeImageUrl(student.officialDocumentsImage),
    nationalIdImage: sanitizeImageUrl(student.nationalIdImage),
    universityCardImage: sanitizeImageUrl(student.universityCardImage),
    scheduleImage: sanitizeImageUrl(student.scheduleImage),
    certificate1Image: sanitizeImageUrl(student.certificate1Image),
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const socialLinks = [
    { platform: 'GitHub', url: student.github, icon: FaGithub, color: 'hover:bg-gray-800 hover:text-white', text: "GitHub" },
    { platform: 'LinkedIn', url: student.linkedin, icon: FaLinkedin, color: 'hover:bg-blue-600 hover:text-white', text: "LinkedIn" },
    { platform: 'CV/Resume', url: student.cvUrl, icon: FaFilePdf, color: 'hover:bg-red-600 hover:text-white', text: "CV" },
    { platform: 'WhatsApp', url: student.whatsapp, icon: FaWhatsapp, color: 'hover:bg-green-500 hover:text-white', text: "WhatsApp" },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        {/* Main Profile Card */}
        <div className="card bg-white shadow-xl rounded-2xl overflow-hidden mb-6 sm:mb-8 border border-gray-200">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">

              {/* Profile Image Section */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="relative">
                  {student.profileImage ? (
                    <div className="avatar">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-white shadow-2xl transition-all duration-300 hover:scale-105">
                        <Image
                          src={student.profileImage}
                          alt={student.name}
                          width={160}
                          height={160}
                          className="object-cover rounded-2xl"
                          priority
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
                      <FaUser className="text-4xl sm:text-5xl text-white" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <span className={`badge badge-md ${student.status === 'active' ? 'bg-linear-to-r from-green-500 to-emerald-500' : 'bg-linear-to-r from-red-500 to-pink-500'} text-white border-2 border-white shadow-lg gap-1 font-bold px-4 py-2`}>
                      {student.status === 'active' ? <FaCheckCircle className="text-sm" /> : null}
                      <span className="text-xs">{student.status?.toUpperCase() || 'ACTIVE'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="flex-1 text-center lg:text-left w-full">
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
                    {student.name}
                  </h1>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-4">
                    <div className="flex items-center gap-2 text-lg text-gray-700 bg-blue-50 px-4 py-2 rounded-full">
                      <FaGraduationCap className="text-blue-600" />
                      <span className="font-semibold">{student.major || 'Student'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                      <FaUniversity className="text-gray-500" />
                      <span>{student.university || 'University'}</span>
                    </div>
                  </div>

                  {student.faculty && (
                    <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-full border border-purple-200">
                      <FaBook className="text-purple-600 text-sm" />
                      <span className="text-purple-700 font-medium">{student.faculty}</span>
                    </div>
                  )}
                </div>

                {/* Social Links Grid */}
                {socialLinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-center lg:justify-start gap-2">
                      <FaShareAlt className="text-blue-500" />
                      Connect With Me
                    </h3>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {socialLinks.map(({ platform, url, icon: Icon, color, text }) => (
                        <Link
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn text-gray-600 border-gray-400 border-2 btn-sm lg:btn-md gap-2 transition-all duration-300 ${color} rounded-xl font-medium min-h-12 h-12`}
                          title={platform}
                        >
                          <Icon className="text-base lg:text-lg" />
                          <span className="text-xs lg:text-sm">{text}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 max-w-full">
                  <div className="text-center p-3 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="text-xl font-bold text-blue-600">
                      {student.academicYear || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 font-medium">Academic Year</div>
                  </div>

                  <div className="text-center p-3 bg-linear-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="text-xl font-bold text-green-600">
                      {student.enrollmentDate ? new Date(student.enrollmentDate).getFullYear() : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 font-medium">Enrolled</div>
                  </div>

                  <div className="text-center p-3 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="text-xl font-bold text-purple-600 font-mono">
                      {student.universityId ?
                        student.universityId.length > 8 ?
                          `${student.universityId.substring(0, 6)}...` :
                          student.universityId
                        : 'N/A'
                      }
                    </div>
                    <div className="text-xs text-gray-600 mt-1 font-medium">Student ID</div>
                  </div>

                  <div className="text-center p-3 bg-linear-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                    <div className="text-xl font-bold text-orange-600">
                      {socialLinks.length}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 font-medium">Social Links</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      

        {/* Information Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">

          {/* Academic Information */}
          <div className="card bg-white shadow-lg rounded-2xl border border-gray-200">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-linear-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white shadow-lg">
                  <FaGraduationCap className="text-xl" />
                </div>
                <h2 className="card-title text-xl text-gray-800">Academic Information</h2>
              </div>

              <div className="space-y-4">
                <InfoItem
                  label="University"
                  value={student.university}
                  icon={FaUniversity}
                  gradient="from-blue-500 to-blue-600"
                />
                <InfoItem
                  label="University ID"
                  value={student.universityId}
                  icon={FaIdCard}
                  gradient="from-purple-500 to-purple-600"
                />
                <InfoItem
                  label="Faculty"
                  value={student.faculty}
                  icon={FaBook}
                  gradient="from-green-500 to-green-600"
                />
                <InfoItem
                  label="Major"
                  value={student.major}
                  icon={FaGraduationCap}
                  gradient="from-indigo-500 to-indigo-600"
                />
                <InfoItem
                  label="Academic Year"
                  value={student.academicYear}
                  icon={FaCalendarAlt}
                  gradient="from-orange-500 to-orange-600"
                />
                <InfoItem
                  label="Status"
                  value={student.status}
                  icon={FaCheckCircle}
                  badge
                  gradient="from-emerald-500 to-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card bg-white shadow-lg rounded-2xl border border-gray-200">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-linear-to-r from-green-500 to-green-600 p-3 rounded-xl text-white shadow-lg">
                  <FaUser className="text-xl" />
                </div>
                <h2 className="card-title text-xl text-gray-800">Personal Information</h2>
              </div>

              <div className="space-y-4">
                <InfoItem
                  label="Email"
                  value={student.email}
                  icon={FaEnvelope}
                  isEmail
                  gradient="from-blue-500 to-cyan-500"
                />
                <InfoItem
                  label="Enrollment Date"
                  value={formatDate(student.enrollmentDate)}
                  icon={FaCalendarAlt}
                  gradient="from-purple-500 to-pink-500"
                />
                <InfoItem
                  label="Valid Until"
                  value={formatDate(student.validUntil)}
                  icon={FaCalendarAlt}
                  gradient="from-orange-500 to-red-500"
                />
              </div>
            </div>
          </div>

            {/* Documents Gallery */}
        <DocumentsGallery
          officialDocumentsImage={sanitizedImages.officialDocumentsImage}
          nationalIdImage={sanitizedImages.nationalIdImage}
          universityCardImage={sanitizedImages.universityCardImage}
          scheduleImage={sanitizedImages.scheduleImage}
          certificate1Image={sanitizedImages.certificate1Image}
        />

        </div>

        {/* Call to Action */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Explore All My Links</h3>
              <p className="text-blue-100 mb-6 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Visit my dedicated links page to discover all my social media profiles, projects, portfolio, and contact information in one beautifully organized space.
              </p>
              <Link
                href={`/student/${id}/links`}
                className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-0 gap-3 font-bold px-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl"
              >
                <FaExternalLinkAlt className="text-sm" />
                View All Links
                <FaGlobe className="text-sm" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <span>Profile last updated:</span>
            <span className="font-semibold">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isEmail?: boolean;
  isLink?: boolean;
  badge?: boolean;
  gradient?: string;
}

function InfoItem({ label, value, icon: Icon, isEmail = false, isLink = false, badge = false, gradient = "from-gray-500 to-gray-600" }: InfoItemProps) {
  if (!value || value === 'N/A') return null;

  const content = isEmail ? (
    <a
      href={`mailto:${value}`}
      className="text-blue-600 hover:text-blue-700 hover:underline break-all text-left font-medium transition-colors duration-200"
    >
      {value}
    </a>
  ) : badge ? (
    <span className={`badge badge-lg ${value === 'active' ? 'bg-linear-to-r from-green-500 to-emerald-500' : 'bg-linear-to-r from-red-500 to-pink-500'} text-white font-bold px-3 py-2 border-0`}>
      {value.toUpperCase()}
    </span>
  ) : (
    <span className="text-gray-800 font-semibold wrap-break-word text-left">{value}</span>
  );

  return (
    <div className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300 group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {Icon && (
          <div className={`bg-linear-to-r ${gradient} p-2 rounded-lg text-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="text-sm" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-gray-700 text-sm block mb-1">{label}</span>
          <div className="min-w-0">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
