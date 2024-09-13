import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { roomAddArgsSchema, roomAddResSchema } from '~/server/types';

const prisma = new PrismaClient();

async function createRoom(roomName: string, creator: string): Promise<number> {
    const existingUser = await prisma.user.findUnique({
        where: { name: creator },
    });

    if (!existingUser) {
        throw new Error('Creator not found');
    }

    const newRoom = await prisma.room.create({
        data: {
            name: roomName,
            creatorId: existingUser.id, // 假设字段名为 creatorId
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    return newRoom.id;
}

const t = initTRPC.create();

export const addRoomRouter = t.router({
    addRoom: t.procedure
        .input(roomAddArgsSchema) // 使用预定义的 Zod 模式
        .mutation(async ({ input }) => {
            const roomId = await createRoom(input.roomName, input.user)
                .catch((error) => {
                    console.error(error);
                    throw new Error('Failed to create room');
                });
            return { code: 0, data: { roomId } };
        }),
});

export default addRoomRouter