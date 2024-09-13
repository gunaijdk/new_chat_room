// /server/api/message/add.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 定义 Zod 模式
const messageAddSchema = z.object({
  roomId: z.number(),
  content: z.string(),
  sender: z.string(),
});

// 创建 tRPC 实例
const t = initTRPC.create();

// 创建 tRPC 路由
export const messageAddRouter = t.router({
  addMessage: t.procedure
    .input(messageAddSchema) 
    .mutation(async ({ input }) => {
      try {
       
        await createMessage(input.roomId, input.content, input.sender);
        return { code: 0, message: 'Message added successfully' }; // 成功响应
      } catch (error) {
        console.error(error);
        return { code: -1, message: 'Failed to add message' }; // 错误响应
      }
    }),
});

// 添加消息的函数
async function createMessage(roomId: number, content: string, sender: string): Promise<void> {

  const time = new Date().getTime();
  await prisma.message.create({
    data: {
      roomId,
      content,
      sender,
      time,
    },
  });
}


export default messageAddRouter