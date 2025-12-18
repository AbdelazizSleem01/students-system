export interface Student {
  _id: string;
  name: string;
  email?: string;
  status: 'active' | 'inactive';
  academicYear: string;
  enrollmentDate: string;
  faculty: string;
  major: string;
  profileImage?: string;
  university: string;
  universityId: string;
  validUntil: string;
  cvUrl?: string;
  cvFileName?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  instagram?: string;
  tiktok?: string;
  spotify?: string;
  facebook?: string;
  x?: string;
  threads?: string;
  snapchat?: string;
  publicLink: string;
  privateLink: string;
  editPassword: string;
  createdAt: Date;
  updatedAt: Date;
  officialDocumentsImage?: string;
  nationalIdImage?: string;
  universityCardImage?: string;
  scheduleImage?: string;
  scheduleImageFileName?: string;
  certificate1Image?: string;
  visitCount: number;
  lastViewed?: Date;
  linkedinClicks: number;
  githubClicks: number;
  instagramClicks: number;
  tiktokClicks: number;
  instapay?: string;
}

export interface Admin {
  password: string;
}
