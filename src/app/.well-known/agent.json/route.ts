import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Napoli Pizzeria Agent",
    version: "1.0.0",
    description:
      "AI agent interface for Napoli Pizzeria ordering and reservations system",

    capabilities: {
      ordering: {
        endpoint: "/api/order",
        method: "POST",
        description: "Create food orders (pizza, pasta, drinks, etc.)",
        inputSchema: {
          items: [
            {
              itemId: "string",
              name: "string",
              quantity: "number",
              price: "number",
            },
          ],
          customerName: "string",
          tableNumber: "number (optional)",
          deliveryAddress: "string (required if delivery)",
          orderType: "dine-in | takeaway | delivery",
          specialInstructions: "string (optional)",
        },
      },

      reservations: {
        endpoint: "/api/reservations",
        methods: ["GET", "POST"],
        description: "Create and manage restaurant reservations",
        inputSchema: {
          name: "string",
          email: "string",
          phone: "string",
          date: "YYYY-MM-DD",
          time: "HH:mm",
          guests: "number (1-12)",
          specialRequests: "string (optional)",
        },
      },
    },

    endpoints: {
      order: "/api/order",
      reservations: "/api/reservations",
    },

    interactionModel: {
      type: "REST",
      auth: "none",
      contentType: "application/json",
    },

    examples: {
      order: {
        url: "/api/order",
        method: "POST",
        body: {
          items: [
            {
              itemId: "margherita",
              name: "Margherita Pizza",
              quantity: 2,
              price: 12.5,
            },
          ],
          customerName: "John Doe",
          orderType: "dine-in",
          tableNumber: 5,
        },
      },

      reservation: {
        url: "/api/reservations",
        method: "POST",
        body: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+123456789",
          date: "2026-06-10",
          time: "19:30",
          guests: 4,
        },
      },
    },

    protocol: "a2a-lite",
  });
}