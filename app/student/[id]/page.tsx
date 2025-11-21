
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEnvelope,
  FaUniversity,
  FaBook,
  FaGraduationCap,
  FaIdCard,
  FaCalendarAlt,
  FaCheckCircle,
  FaLinkedin,
  FaGithub,
  FaFilePdf,
  FaCopy,
  FaLink,
} from 'react-icons/fa';
import { Metadata } from 'next';
import DocumentsGallery from './DocumentsGallery';
import CopyProfileButton from './CopyProfileButton';
import VisitTracker from '@/components/VisitTracker';
import SocialLinksClient from '@/components/SocialLinksClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const student = await Student.findOne({ publicLink: `/student/${id}` });

  return {
    title: student ? `${student.name} - Student Profile` : 'Student Profile',
    description: student
      ? `${student.name} - ${student.major} at ${student.university}`
      : 'Student Profile',
  };
}

const sanitizeImageUrl = (url?: string | null): string | undefined => {
  if (!url?.trim()) return undefined;
  return url.startsWith('http') || url.startsWith('/') || url.startsWith('data:') ? url : undefined;
};

export default async function StudentPublicPage({ params }: PageProps) {
  await dbConnect();
  const { id } = await params;
  const student = await Student.findOne({ publicLink: `/student/${id}` });
  if (!student) notFound();

  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/student/${id}`;

  const sanitizedImages = {
    officialDocumentsImage: sanitizeImageUrl(student.officialDocumentsImage),
    nationalIdImage: sanitizeImageUrl(student.nationalIdImage),
    universityCardImage: sanitizeImageUrl(student.universityCardImage),
    scheduleImage: sanitizeImageUrl(student.scheduleImage),
    certificate1Image: sanitizeImageUrl(student.certificate1Image),
  };

  const formatDate = (date?: string) =>
    !date ? 'N/A' : new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const socialLinks = [
    student.linkedin
      ? { icon: 'linkedin' as const, analyticsUrl: `/api/analytics/linkedin/${id}`, actualUrl: student.linkedin, label: 'LinkedIn' }
      : null,
    student.github
      ? { icon: 'github' as const, analyticsUrl: `/api/analytics/github/${id}`, actualUrl: student.github, label: 'GitHub' }
      : null,
    student.cvUrl
      ? {
          icon: 'cv' as const,
          analyticsUrl: undefined,
          actualUrl: student.cvUrl,
          label: 'CV/Resume',
          isDownload: true,
          downloadName: student.cvFileName,
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: 'github' | 'linkedin' | 'cv';
    analyticsUrl?: string;
    actualUrl: string;
    label: string;
    isDownload?: boolean;
    downloadName?: string;
  }>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <VisitTracker studentId={id} />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-indigo-700 px-8 py-8 text-white text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Student Profile</h1>
            <p className="text-indigo-100 text-center mt-2 text-lg sm:text-xl">
              {student.university || 'University Student'}
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">

            {/* Profile Image + Name */}
            <div className="flex flex-col items-center text-center gap-8 mb-10">
              <div className="relative shrink-0">
                {student.profileImage ? (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-8 ring-white shadow-2xl overflow-hidden border-4 border-indigo-500">
                    <Image
                      src={student.profileImage}
                      alt={student.name}
                      width={160}
                      height={160}
                      className="rounded-full object-cover w-full h-full"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-2xl">
                    <FaGraduationCap className="text-6xl sm:text-7xl text-white" />
                  </div>
                )}
              </div>

              <div className="w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
                  {student.name}
                </h2>

                {(student.faculty || student.major) && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {student.faculty && (
                      <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-3 rounded-full font-semibold shadow-md text-sm sm:text-base">
                        <FaUniversity className="text-lg" />
                        <span>{student.faculty}</span>
                      </div>
                    )}
                    {student.major && (
                      <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-5 py-3 rounded-full font-semibold shadow-md text-sm sm:text-base">
                        <FaGraduationCap className="text-lg" />
                        <span>{student.major}</span>
                      </div>
                    )}
                    {student.status === 'active' && (
                      <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl border-4 border-white text-sm sm:text-base">
                        <FaCheckCircle className="text-lg" />
                        Active Student
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Info List */}
            <div className="space-y-4 mb-12">
              {student.email && <InfoRow icon={FaEnvelope} label="Email" value={student.email} isEmail />}
              {student.university && <InfoRow icon={FaUniversity} label="University" value={student.university} />}
              {student.faculty && <InfoRow icon={FaGraduationCap} label="Faculty" value={student.faculty} />}
              {student.major && <InfoRow icon={FaBook} label="Major" value={student.major} />}
              {student.universityId && <InfoRow icon={FaIdCard} label="University ID" value={student.universityId} />}
              {student.academicYear && <InfoRow icon={FaCalendarAlt} label="Academic Year" value={student.academicYear} />}
              {student.enrollmentDate && (
                <InfoRow icon={FaCalendarAlt} label="Member Since" value={formatDate(student.enrollmentDate)} color="text-green-600" />
              )}
              {student.validUntil && (
                <InfoRow icon={FaCheckCircle} label="Valid Until" value={formatDate(student.validUntil)} color="text-indigo-600" />
              )}
            </div>

            {socialLinks.length > 0 && <SocialLinksClient links={socialLinks} />}

            {/* Documents Gallery */}
            <div className="my-14">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center px-4">
                Official Documents
              </h3>
              <DocumentsGallery 
                {...sanitizedImages} 
                scheduleImageFileName={student.scheduleImageFileName}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-14">
              <CopyProfileButton studentId={id} />
              <Link
                href={`/student/${id}/links`}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105 text-lg w-full sm:w-auto text-center"
              >
                <FaLink className="text-xl" />
                View All Links
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// مكون InfoRow محسن ريسبونسيف 100%
function InfoRow({ 
  icon: Icon, 
  label, 
  value, 
  isEmail = false, 
  color = "text-gray-700" 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  isEmail?: boolean; 
  color?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 px-6 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        <div className="text-indigo-600 shrink-0">
          <Icon className="text-2xl" />
        </div>
        <span className="text-gray-600 font-medium text-sm sm:text-base">
          {label}
        </span>
      </div>

      <div className="sm:text-right">
        {isEmail ? (
          <a 
            href={`mailto:${value}`} 
            className={`font-bold ${color} hover:underline break-all text-sm sm:text-base block`}
          >
            {value}
          </a>
        ) : (
          <span className={`font-bold ${color} wrap-break-word text-sm sm:text-base block`}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
}