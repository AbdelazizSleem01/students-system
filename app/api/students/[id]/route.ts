import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    let findQuery;
    if (mongoose.isValidObjectId(id)) {
      findQuery = { _id: id };
    } else {
      const trimmed = id.replace('/edit', '').replace('/links', '');
      findQuery = { publicLink: `/student/${trimmed}` };
    }

    const student = await Student.findOne(findQuery);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;

    const { _id, createdAt, updatedAt, ...updateBody } = body;

    let findQuery;
    if (mongoose.isValidObjectId(id)) {
      findQuery = { _id: id };
    } else {
      const trimmed = id.replace('/edit', '').replace('/links', '');
      findQuery = { publicLink: `/student/${trimmed}` };
    }

    const student = await Student.findOneAndUpdate(findQuery, { $set: updateBody }, { new: true });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating student' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    let findQuery;
    if (mongoose.isValidObjectId(id)) {
      findQuery = { _id: id };
    } else {
      const trimmed = id.replace('/edit', '').replace('/links', '');
      findQuery = { publicLink: `/student/${trimmed}` };
    }

    const student = await Student.findOneAndDelete(findQuery);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting student' },
      { status: 500 }
    );
  }
}
