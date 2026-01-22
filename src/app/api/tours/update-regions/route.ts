import { NextResponse } from 'next/server';
import { updateToursWithRegions } from '@/scripts/updateToursWithRegions';

export async function POST() {
    try {
        await updateToursWithRegions();
        return NextResponse.json({ 
            success: true, 
            message: 'Tours updated with region information successfully' 
        });
    } catch (error: any) {
        console.error('Error updating tours with regions:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to update tours with regions' 
            }, 
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ 
        message: 'Use POST method to update tours with region information' 
    });
}