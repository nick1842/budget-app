import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

  try {

    const transactions =
      await prisma.transaction.findMany({
        orderBy: {
          date: "desc",
        },
      });


    return NextResponse.json(transactions);


  } catch (error) {

    console.error("GET TRANSACTIONS ERROR:", error);


    return NextResponse.json(
      [],
      {
        status: 200,
      }
    );

  }

}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const transaction = await prisma.transaction.create({
      data: {
  amount: body.amount,
  type: body.type,
  category: body.category,
  note: body.note,
  date: new Date(body.date),
},
    });

    return NextResponse.json(transaction);

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const transaction = await prisma.transaction.update({
      where: {
        id: Number(body.id),
      },
      data: {
  amount: body.amount,
  type: body.type,
  category: body.category,
  note: body.note,
  date: new Date(body.date),
},
    });

    return NextResponse.json(transaction);

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    console.log("DELETE BODY:", body);

    const transaction = await prisma.transaction.delete({
      where: {
        id: Number(body.id),
      },
    });

    return NextResponse.json(transaction);

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

