import { z } from 'zod';

const messageSchema = z.object({
  messageId: z.number(),
  roomId: z.number(),
  sender: z.string(),
  content: z.string(),
  time: z.number(),
});


const roomPreviewInfoSchema = z.object({
  roomId: z.number(),
  roomName: z.string(),
  lastMessage: z.union([messageSchema, z.null()]),
});

const roomAddArgsSchema = z.object({
  user: z.string(),
  roomName: z.string(),
});


const roomAddResSchema = z.object({
  roomId: z.number(),
});


const messageAddArgsSchema = z.object({
  roomId: z.number(),
  content: z.string(),
  sender: z.string(), 
});


const roomDeleteArgsSchema = z.object({
  user: z.string(),
  roomId: z.number(),
});


export {
  messageSchema,
  roomPreviewInfoSchema,
  roomAddArgsSchema,
  roomAddResSchema,
  messageAddArgsSchema,
  roomDeleteArgsSchema,
};