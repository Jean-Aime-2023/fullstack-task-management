import prisma from '@/app/utils/connect';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    console.log('TASK DELETED');
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error deleting task', status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const body = await req.json();
    const { title, description, isCompleted, isImportant } = body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        isCompleted,
        isImportant,
      },
    });

    console.log('TASK UPDATED');
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error updating task', status: 500 });
  }
}
