import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await Admin.create({ password: hashedPassword });
      
      return NextResponse.json({
        success: true,
        message: 'Admin initialized successfully',
        password: 'admin123'
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Admin already exists'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Initialization failed'
    }, { status: 500 });
  }
}