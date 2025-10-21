import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.API_NINJAS_KEY;
    
    if (!apiKey) {
      // Return mock data if no API key is configured
      return NextResponse.json({
        rates: [
          { loanType: '30-Year Fixed', rate: 7.12 },
          { loanType: '15-Year Fixed', rate: 6.38 },
          { loanType: '5/1 ARM', rate: 6.85 },
          { loanType: 'FHA 30-Year', rate: 6.95 },
          { loanType: 'VA 30-Year', rate: 6.75 },
        ],
        source: 'mock',
        lastUpdated: new Date().toISOString(),
      });
    }

    // Fetch from API Ninjas
    const response = await fetch('https://api.api-ninjas.com/v1/mortgagerate', {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch mortgage rates');
    }

    const data = await response.json();
    
    return NextResponse.json({
      rates: [
        { loanType: '30-Year Fixed', rate: data.rate_30_year || 7.12 },
        { loanType: '15-Year Fixed', rate: data.rate_15_year || 6.38 },
        { loanType: '5/1 ARM', rate: data.rate_5_1_arm || 6.85 },
        { loanType: 'FHA 30-Year', rate: data.fha_30_year || 6.95 },
        { loanType: 'VA 30-Year', rate: data.va_30_year || 6.75 },
      ],
      source: 'api-ninjas',
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching mortgage rates:', error);
    
    // Return mock data as fallback
    return NextResponse.json({
      rates: [
        { loanType: '30-Year Fixed', rate: 7.12 },
        { loanType: '15-Year Fixed', rate: 6.38 },
        { loanType: '5/1 ARM', rate: 6.85 },
        { loanType: 'FHA 30-Year', rate: 6.95 },
        { loanType: 'VA 30-Year', rate: 6.75 },
      ],
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    });
  }
}
