import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env file.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: 'system',
      content: `You are a helpful mortgage and real estate assistant. You help users understand:
- Mortgage calculations and payment breakdowns
- Different types of mortgages (fixed-rate, ARM, FHA, VA loans)
- Interest rates and how they affect payments
- Down payments and closing costs
- Home buying process and tips
- Refinancing options
- Credit score impacts on mortgages

Be friendly, clear, and provide accurate financial information. If users ask about specific calculations, 
guide them through the process step by step. Always remind users to consult with financial advisors for 
personalized advice.`,
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0].message;

    return NextResponse.json({
      message: assistantMessage.content,
      role: assistantMessage.role,
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to get response from AI';
    
    if (error.status === 401) {
      errorMessage = 'Invalid OpenAI API key. Please check your .env file.';
    } else if (error.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again in a moment.';
    } else if (error.status === 500) {
      errorMessage = 'OpenAI service error. Please try again later.';
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorMessage = 'Network error. Please check your internet connection.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message 
      },
      { status: 500 }
    );
  }
}
