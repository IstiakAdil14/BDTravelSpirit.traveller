import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const operators = Array.isArray(body) ? body : [body];
    
    const savedOperators = [];
    
    for (const operatorData of operators) {
      const existingOperator = await TourOperator.findOne({ id: operatorData.id });
      
      if (existingOperator) {
        const updatedOperator = await TourOperator.findOneAndUpdate(
          { id: operatorData.id },
          operatorData,
          { new: true }
        );
        savedOperators.push(updatedOperator);
      } else {
        const newOperator = new TourOperator(operatorData);
        const savedOperator = await newOperator.save();
        savedOperators.push(savedOperator);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${savedOperators.length} operator(s) saved successfully`,
      data: savedOperators
    }, { status: 201 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to save tour operators',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const operators = await TourOperator.find({}).sort({ rating: -1 });
    
    return NextResponse.json({
      success: true,
      data: operators
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tour operators',
      error: error.message
    }, { status: 500 });
  }
}