import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const student = await Student.findOne({ publicLink: `/student/${id}` });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    await Student.updateOne(
      { _id: student._id },
      {
        $inc: { visitCount: 1 },
        $set: { lastViewed: new Date() }
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}
