import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al recuperar post:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo recuperar post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.delete({ where: { id: parseInt(id) } });

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al eliminar post:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo eliminar post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
