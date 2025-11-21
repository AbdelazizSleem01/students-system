import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    await dbConnect();
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    const baseName = body.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const randomSuffix = Math.floor(Math.random() * 10000).toString(); 
    const randomId = `${baseName}_${randomSuffix}`;

    const editPassword = '123456789';

    const student = await Student.create({
      ...body,
      publicLink: `/student/${randomId}`,
      privateLink: `/student/${randomId}/edit`,
      editPassword,
    });

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating student' },
      { status: 500 }
    );
  }
}
