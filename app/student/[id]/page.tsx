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
    !date ? 'N/A' : new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });

  const socialLinks = [
    { Icon: FaLinkedin, url: student.linkedin, label: 'LinkedIn' },
    { Icon: FaGithub, url: student.github, label: 'GitHub' },
    { Icon: FaFilePdf, url: student.cvUrl, label: 'CV' },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-indigo-700 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold text-center">Student Profile</h1>
            <p className="text-indigo-100 text-center mt-1 text-lg">{student.university || 'University Student'}</p>

          </div>

          <div className="p-8 pb-12">


            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 relative">

              {/* Profile Image */}
              <div className="relative shrink-0">
                {student.profileImage ? (
                  <div className="w-36 h-36 rounded-full ring-4 ring-indigo-500 ring-offset-4 ring-offset-white shadow-2xl overflow-hidden">
                    <Image
                      src={student.profileImage}
                      alt={student.name}
                      width={144}
                      height={144}
                      className="rounded-full object-cover w-full h-full"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-36 h-36 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-2xl">
                    <FaGraduationCap className="text-6xl text-white" />
                  </div>
                )}

              </div>

              <div className="text-center sm:text-left flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
                  {student.name}
                </h2>

                {(student.faculty || student.major) && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start items-center">
                    {student.faculty && (
                      <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-full font-semibold shadow-md text-base">
                        <FaUniversity />
                        <span>{student.faculty}</span>
                      </div>
                    )}
                    {student.major && (
                      <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-6 py-3 rounded-full font-semibold shadow-md text-base">
                        <FaGraduationCap />
                        <span>{student.major}</span>
                      </div>
                    )}
                    {student.status === 'active' && (
                      <div className="  bg-green-500 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl whitespace-nowrap border-4 border-white">
                        <FaCheckCircle className="text-lg" />
                        <span>Active</span>
                      </div>
                    )}
                  </div>
                )}

               
              </div>
            </div>

            {/* Info List */}
            <div className="space-y-4 mb-10">
              {student.email && <InfoRow icon={FaEnvelope} label="Email:" value={student.email} isEmail />}
              {student.university && <InfoRow icon={FaUniversity} label="University:" value={student.university} />}
              {student.faculty && <InfoRow icon={FaGraduationCap} label="Faculty:" value={student.faculty} />}
              {student.major && <InfoRow icon={FaBook} label="Major:" value={student.major} />}
              {student.universityId && <InfoRow icon={FaIdCard} label="University ID:" value={student.universityId} />}
              {student.academicYear && <InfoRow icon={FaCalendarAlt} label="Academic Year:" value={student.academicYear} />}
              {student.enrollmentDate && (
                <InfoRow icon={FaCalendarAlt} label="Member Since:" value={formatDate(student.enrollmentDate)} color="text-green-600" />
              )}
              {student.validUntil && (
                <InfoRow icon={FaCheckCircle} label="Valid Until:" value={formatDate(student.validUntil)} color="text-indigo-600" />
              )}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-5 my-8">
                {socialLinks.map(({ Icon, url, label }) => (
                  <Link
                    key={label}
                    href={url}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-110 shadow-lg font-medium"
                  >
                    <Icon className="text-xl" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Documents Gallery */}
            <div className="my-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Official Documents</h3>
              <DocumentsGallery {...sanitizedImages} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-12">
              <CopyProfileButton studentId={id} />
              <Link
                href={`/student/${id}/links`}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105 text-lg"
              >
                <FaLink />
                View All Links
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, isEmail = false, color = "text-gray-700" }: any) {
  return (
    <div className="flex items-center gap-5 py-4 px-6 bg-gray-50 rounded-2xl border border-gray-200">
      <div className="text-indigo-600">
        <Icon className="text-2xl" />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <span className="text-gray-600 font-medium">{label}</span>
        {isEmail ? (
          <a href={`mailto:${value}`} className="font-semibold text-indigo-600 hover:underline">
            {value}
          </a>
        ) : (
          <span className={`font-semibold ${color}`}>{value}</span>
        )}
      </div>
    </div>
  );
}
