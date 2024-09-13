// /server/api/room/message/getUpdate.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const roomMessageGetUpdateSchema = z.object({
  roomId: z.number(),
  sinceMessageId: z.number(),
});


const t = initTRPC.create();

export const roomMessageGetUpdateRouter = t.router({
  getUpdatedMessages: t.procedure
    .input(roomMessageGetUpdateSchema)
    .query(async ({ input }) => {
      try {
        const messages = await prisma.message.findMany({
          where: { roomId: input.roomId, messageId: { gt: input.sinceMessageId } },
          orderBy: { messageId: 'asc' },
        });
        return { code: 0, messages };
      } catch (error) {
        console.error(error);
        return { code: -1, message: 'Failed to fetch updated messages' }; 
      }
    }),
});

export default roomMessageGetUpdateRouter