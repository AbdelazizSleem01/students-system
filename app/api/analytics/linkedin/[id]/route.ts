import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const student = await Student.findOne({ publicLink: `/student/${id}` });

    if (!student) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    await Student.updateOne(
      { _id: student._id },
      { $inc: { linkedinClicks: 1 } }
    );

    if (student.linkedin) {
      return NextResponse.redirect(student.linkedin);
    } else {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  } catch (error) {
    console.error('Error handling LinkedIn click:', error);
    return NextResponse.redirect(new URL('/404', request.url));
  }
}
