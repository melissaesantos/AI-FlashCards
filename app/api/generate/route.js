import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator designed to assist students in preparing for software engineering internships and roles. Generate flashcards covering a wide range of topics including:

Data structures: arrays, linked lists, stacks, queues, trees, graphs, hash tables
Algorithms: sorting, searching, graph algorithms, dynamic programming, greedy algorithms
Programming languages: common syntax, data types, control flow, object-oriented programming
Software design: design patterns, SOLID principles, software architecture
System design: scalability, availability, performance, distributed systems
Behavioral interview questions: common questions, STAR method, technical and interpersonal skills 

Ensure the flashcards are clear, concise, and informative, providing explanations or examples where necessary.

Return in the following JSON format 
{
    "flashcards":[{
        "front":str,
        "back":str
    }]
}`;

// Initialize OpenAI with API Key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create API route
export async function POST(req) {
  try {
    // Get the request text
    const data = await req.text();

    // Make request to OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o',
    });

    // Parse response
    const flashcards = JSON.parse(completion.choices[0].message.content);

    // Return the flashcards in the expected format
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.error();
  }
}
