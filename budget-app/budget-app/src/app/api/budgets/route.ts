import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {

    const budgets = await prisma.budget.findMany();

    return NextResponse.json(budgets);

  } catch (error) {

    console.error("BUDGET ERROR:", error);

    return NextResponse.json(
      [],
      { status: 200 }
    );

  }
}


export async function POST(request: Request) {

  const body = await request.json();

  console.log("BUDGET RECEIVED:", body);

  const budget = await prisma.budget.upsert({
    where: {
      category: body.category,
    },
    update: {
      amount: body.amount,
    },
    create: {
      category: body.category,
      amount: body.amount,
    },
  });

  return NextResponse.json(budget);
}
export async function PUT(request: Request) {

  const body = await request.json();

  const budget = await prisma.budget.update({
    where: {
      id: Number(body.id),
    },
    data: {
      category: body.category,
      amount: Number(body.amount),
    },
  });

  return NextResponse.json(budget);

}


export async function DELETE(request: Request) {

  const body = await request.json();

  const budget = await prisma.budget.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json(budget);

}