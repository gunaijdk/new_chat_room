import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import { roomPreviewInfoSchema } from '~/server/types';

const prisma = new PrismaClient();

const t = initTRPC.create();

export const roomListRouter = t.router({
  listRooms: t.procedure
    .query(async () => {
      try {
        // 查询所有房间
        const rooms = await prisma.room.findMany({
          include: {
            messages: {
              orderBy: {
                time: 'desc',
              },
              take: 1, // 只取最后一条消息
            },
          },
        });

        // 映射房间数据到 RoomPreviews 这里改了很久类型
        const roomPreviews = rooms.map(room => {
          const lastMessage = room.messages.length > 0 ? room.messages[0] : null;
          return {
            roomId: room.id,
            roomName: room.name,
            lastMessage: lastMessage ? roomPreviewInfoSchema.parse(lastMessage) : null,
          };
        });

        return { code: 0, data: { rooms: roomPreviews } };
      } catch (error) {
        console.error(error);
        return { code: -1, message: 'Failed to fetch room list' };
      }
    }),
});

export default roomListRouter