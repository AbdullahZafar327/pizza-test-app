import { NextRequest, NextResponse } from "next/server";

export type OrderItem = {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
};

export type OrderRequest = {
  items: OrderItem[];
  customerName: string;
  tableNumber?: number;
  deliveryAddress?: string;
  orderType: "dine-in" | "takeaway" | "delivery";
  specialInstructions?: string;
};

export type OrderResponse = {
  orderId: string;
  status: "confirmed" | "preparing" | "ready" | "delivered";
  estimatedMinutes: number;
  total: number;
  items: OrderItem[];
  customerName: string;
  orderType: string;
  timestamp: string;
  message: string;
};

function generateOrderId(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    if (!body.customerName) {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }

    if (!body.orderType) {
      return NextResponse.json(
        { error: "Order type is required (dine-in, takeaway, or delivery)" },
        { status: 400 }
      );
    }

    if (body.orderType === "delivery" && !body.deliveryAddress) {
      return NextResponse.json(
        { error: "Delivery address is required for delivery orders" },
        { status: 400 }
      );
    }

    const total = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const estimatedMinutes =
      body.orderType === "delivery"
        ? 35 + Math.floor(Math.random() * 10)
        : body.orderType === "takeaway"
        ? 15 + Math.floor(Math.random() * 5)
        : 20 + Math.floor(Math.random() * 10);

    const response: OrderResponse = {
      orderId: generateOrderId(),
      status: "confirmed",
      estimatedMinutes,
      total: Math.round(total * 100) / 100,
      items: body.items,
      customerName: body.customerName,
      orderType: body.orderType,
      timestamp: new Date().toISOString(),
      message: `Order confirmed! Your ${body.orderType} order will be ready in approximately ${estimatedMinutes} minutes.`,
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const sampleOrders: OrderResponse[] = [
    {
      orderId: "ORD-SAMPLE-001",
      status: "preparing",
      estimatedMinutes: 18,
      total: 47.97,
      items: [
        { itemId: "pizza-margherita", name: "Margherita", quantity: 2, price: 14.99 },
        { itemId: "drink-wine-red", name: "Chianti Classico", quantity: 2, price: 9.99 },
      ],
      customerName: "Marco Rossi",
      orderType: "dine-in",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      message: "Order is being prepared in the kitchen.",
    },
  ];

  return NextResponse.json({
    orders: sampleOrders,
    total: sampleOrders.length,
  });
}