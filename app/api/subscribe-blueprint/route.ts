// app/api/subscribe-blueprint/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, date } = await request.json();

  // Basic validation
  if (!email || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = 16; // The new list ID for the blueprint

  if (!BREVO_API_KEY) {
    console.error('Brevo API key is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [BREVO_LIST_ID],
        attributes: {
          NAME: name,
          DATE: date,
        },
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      return NextResponse.json({ error: 'Failed to subscribe contact.' }, { status: response.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}