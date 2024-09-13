// /server/api/room/message/list.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const roomMessageListSchema = z.object({
  roomId: z.number(),
});


const t = initTRPC.create();


export const roomMessageListRouter = t.router({
  getRoomMessages: t.procedure
    .input(roomMessageListSchema) 
    .query(async ({ input }) => {
      try {
        const messages = await prisma.message.findMany({
          where: { roomId: input.roomId },
          orderBy: { messageId: 'asc' },
        });
        return { code: 0, messages };
      } catch (error) {
        console.error(error);
        return { code: -1, message: 'Failed to fetch room messages' }; 
      }
    }),
});


export default roomMessageListRouter