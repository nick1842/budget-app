import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const goals = await prisma.savingsGoal.findMany({
      include: {
        contributions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(goals);

  } catch (error) {

    console.error("GET SAVINGS ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );

  }
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



export async function PUT(request: Request) {
  try {

    const body = await request.json();


    const contribution =
      await prisma.savingsContribution.create({

        data: {
          amount: Number(body.amount),
          goalId: Number(body.goalId),
        },

      });


    return NextResponse.json(contribution);


  } catch (error) {

    console.error("PUT SAVINGS ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}



export async function PATCH(request: Request) {
  try {

    const body = await request.json();


    const goal =
      await prisma.savingsGoal.update({

        where: {
          id: Number(body.id),
        },

        data: {
          name: body.name,
          target: Number(body.target),
        },

      });


    return NextResponse.json(goal);


  } catch (error) {

    console.error("PATCH SAVINGS ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}



export async function DELETE(request: Request) {
  try {

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


  } catch (error) {

    console.error("DELETE SAVINGS ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}