import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const goals = await prisma.savingsGoal.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      contributions: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });


  const formattedGoals = goals.map((goal) => ({
    id: goal.id,
    name: goal.name,
    target: goal.target,
    createdAt: goal.createdAt,
    saved: goal.contributions.reduce(
      (total, contribution) =>
        total + contribution.amount,
      0
    ),
    contributions: goal.contributions,
  }));


  return NextResponse.json(formattedGoals);
}
export async function PUT(request: Request) {
  const body = await request.json();

  const contribution = await prisma.savingsContribution.create({
    data: {
      amount: Number(body.amount),
      goalId: Number(body.goalId),
    },
  });

  return NextResponse.json(contribution);
}
export async function PATCH(request: Request) {
  const body = await request.json();

  const goal = await prisma.savingsGoal.update({
    where: {
      id: Number(body.id),
    },
    data: {
      name: body.name,
      target: Number(body.target),
    },
  });

  return NextResponse.json(goal);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  if (body.type === "contribution") {

    await prisma.savingsContribution.delete({
      where: {
        id: Number(body.id),
      },
    });

  } else {

    await prisma.savingsGoal.delete({
      where: {
        id: Number(body.id),
      },
    });

  }

  return NextResponse.json({
    success: true,
  });
}



export async function POST(request: Request) {
  try {
    const body = await request.json();

    const goal = await prisma.savingsGoal.create({
      data: {
        name: body.name,
        target: Number(body.target),
      },
    });

    return NextResponse.json(goal);

  } catch (error) {
    console.error("POST SAVINGS ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}