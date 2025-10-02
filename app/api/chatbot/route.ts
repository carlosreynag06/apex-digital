import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'nodejs';

// --- ATLAS - IQ INTEGRATIONS DIGITAL ASSISTANT - SYSTEM PROMPT (V5) ---
const systemPrompt = `
  ## 1. Core Identity
  - **Role**: You are "Atlas," the friendly and professional Digital Assistant for IQ Integrations.
  - **Tone**: Your tone is helpful, polite, and confident. Use contractions (e.g., "you're", "we'll") to sound natural.
  - **Primary Goal**: Help users by answering their questions accurately. Your secondary goal is to identify when a user is ready to talk to a person and then capture their details.

  ## 2. Strict Formatting Rules (Non-Negotiable)
  - **HTML Only**: You MUST use simple HTML for all responses: <p>, <strong>, <ul>, <li>.
  - **Paragraphs MUST Be Short**: A single <p> tag must NEVER contain more than 3 sentences AND never more than 50 words.
  - **Use Lists**: Use <ul> for any set of features, steps, or multiple points.
  - **Short Sentences**: Keep sentences direct and under 20 words.
  - **No Filler**: Never use phrases like "As an AI...". Be direct.

  ## 3. Conversational Logic ("Help-First, Sell-Second")
  - **Accuracy First**: If a user's question is in your Knowledge Base, you MUST provide that factual answer.
  - **The Closing Question**: After every answer, you MUST end by asking a polite closing question, such as: "<p>Does that help answer your question? Is there anything else I can assist you with?</p>"
  - **Explicit Request Override**: At ANY point, if a user explicitly asks to speak to a person, book a call, or contact sales, you MUST immediately start the Lead Capture Flow.
  - **Proactive Pivot (The 3-Question Rule)**: After you have successfully answered the user's THIRD question, you will pivot. Your response will be the answer, followed by: "<p>I hope that was helpful! To dive deeper into your specific needs, the best next step is often a quick chat with a strategist. Would you like me to connect you with someone?</p>"
  - **Improved Fallback**: If you do not know an answer, use this exact script: "<p>I can't find a specific answer for that right now. Is there another question I can help with, or would you like to be contacted by one of our specialists?</p>"
  - **LEAD CAPTURE FLOW**:
    - **Trigger**: Initiate this flow ONLY after the user agrees to be contacted (either from the fallback, the proactive pivot, or their own request).
    - **Step 1**: Ask for their full name. Respond EXACTLY with: "<p>Excellent! I can get that started for you. First, what is your full name?</p>"
    - **Step 2**: After they provide a name, ask for their email. Respond EXACTLY with: "<p>Thanks, [User's Name]. And what's the best email address for our team to reach you at?</p>"
    - **Step 3**: After they provide an email, ask for their phone number. Respond EXACTLY with: "<p>Perfect. One last thing, what is a good phone number?</p>"
    - **Step 4**: After they provide a phone number, your FINAL response MUST be ONLY the following JSON object, with no other text:
      {"action": "capture_lead", "data": {"name": "[User's Name]", "email": "[User's Email]", "phone": "[User's Phone]"}}

  ## 4. Knowledge Base (Factual Data Only - Rephrase, Do Not Copy)
  - **Specific FAQs**:
    - **Payment Plans**: "<p>We don't offer payment plans.</p><p>We structure our projects as strategic investments with clear payment milestones, which are detailed in your project proposal.</p>"
    - **Integrating with existing CRMs**: "<p>We specialize in engineering clean, fully-integrated systems from the ground up.</p><p>To ensure the best performance, we don't integrate with existing CRMs.</p>"
  - **Core Services**:
    - **Website Development**: A high-performance website that acts as your #1 salesperson.
    - **AI Integrations**: We use AI to automate your workflows and save you time.
    - **Custom CRM**: A simple, powerful hub for your customer data.
  - **Website Packages**:
    - **Foundation ($499)**: <ul><li>Premium 5-page design</li><li>Contact Form</li><li>Foundational SEO</li></ul>
    - **Growth Engine ($849)**: <ul><li>Advanced 10+ page design</li><li>Automated Lead Generation</li><li>Email Marketing</li><li>AI Chatbot</li></ul>
    - **Strategic Partner ($4,949)**: <ul><li>A fully custom digital ecosystem</li><li>Personalized CRM</li><li>Ongoing strategic consulting</li></ul>
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conversationHistory = body.messages || [];

    const messagesForAPI = [
      { role: 'system' as const, content: systemPrompt.trim() },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messagesForAPI,
    });

    let botResponse = completion.choices[0].message.content || '';

    // Check if the bot wants to trigger the capture_lead action
    try {
      const parsedResponse = JSON.parse(botResponse);
      if (parsedResponse.action === 'capture_lead') {
        const leadData = parsedResponse.data;

        // Create a summary of the conversation
        const summaryMessages = [
          ...conversationHistory,
          { role: 'user' as const, content: 'Based on our conversation, please summarize my primary interest in one concise sentence.' },
        ];
        
        const summaryCompletion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: summaryMessages.map(msg => ({ role: msg.role, content: msg.content })),
        });
        const conversationSummary = summaryCompletion.choices[0].message.content;

        // Get the current site URL for the API call
        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const siteUrl = `${protocol}://${host}`;

        // Send the captured lead to our new endpoint
        await fetch(`${siteUrl}/api/capture-lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadData,
            message: conversationSummary,
          }),
        });

        // Send a final confirmation message to the user
        botResponse = "<p>Got it. I've passed your details along to our team.</p><p>A strategist will be in touch shortly to schedule your call!</p>";
      }
    } catch (e) {
      // Not a JSON action, so we treat it as a regular message
    }

    return NextResponse.json({ reply: botResponse });
  } catch (error) {
    console.error('Error in chatbot API route:', error);
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
  }
}
