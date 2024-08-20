import { NextResponse } from "next/server";
import Stripe from "stripe";

// Create the Stripe object with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to format the amount for Stripe (convert dollars to cents)
const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100); // Ensure the conversion is correct
};

// GET request to retrieve the checkout session
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const session_id = searchParams.get('session_id');

    try {
        if (!session_id) {
            throw new Error('Session ID is required');
        }

        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

        return NextResponse.json(checkoutSession);
    } catch (error) {
        console.error('Error retrieving checkout session:', error);
        return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    }
}

// Consolidated POST request to create a new checkout session
export async function POST(req) {
    try {
        const rawBody = await req.text();
        console.log('Raw request body:', rawBody);

        if (!rawBody) {
            throw new Error('Request body is empty');
        }

        // Parse the request body as JSON
        const data = JSON.parse(rawBody);

        if (typeof data.amount !== 'number' || data.amount < 0) {
            throw new Error('Invalid amount. It should be a positive number.');
        }

        const params = {
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Pro Subscription',
                        },
                        unit_amount: formatAmountForStripe(data.amount),
                        recurring: {
                            interval: 'month',
                            interval_count: 1,
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);

        return NextResponse.json({ id: checkoutSession.id }, { status: 200 });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    }
}
