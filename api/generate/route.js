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

//now we are creating our API routes 
export async function POST(req){
    const openai= OpenAI()
    const data = await req.text

    const completion = await openai.chat.completion.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role:'user', content: data},
        ],
        model: "gpt-4o",
        response_format:{type: 'json_object'}
    })
    const flashcards = JSON.parse(completion.choices[0].message.content)
    
//here we are returning the list of objects x
    return NextResponse.json(flashcards.flashcards)
}

