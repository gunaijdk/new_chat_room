import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { roomDeleteArgsSchema } from '~/server/types';

const prisma = new PrismaClient();

const t = initTRPC.create();

export const roomDeleteRouter = t.router({
  deleteRoom: t.procedure
    .input(roomDeleteArgsSchema) 
    .mutation(async ({ input }) => {
      try {
        const room = await prisma.room.findUnique({
          where: { id: input.roomId },
          include: { creator: true }
        });
        if (!room || room.creator.name !== input.user) {
          throw new Error('Unauthorized to delete this room');
        }
        await prisma.room.delete({
          where: { id: input.roomId }
        });
        return { code: 0, message: 'Room deleted successfully!' };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete room');
      }
    }),
});

export default roomDeleteRouter