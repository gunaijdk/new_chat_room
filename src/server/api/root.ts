import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import RoomMessageGetUpdateRouter from '../api/room/message/getUpdate';
import MessageAddRouter from './message/add';
import RoomMessageListRouter from './room/message/list';
import RoomAddRouter from './room/add';
import RoomDeleteRouter from './room/delete';
import RoomListRouter from './room/list';
import {setNameRouter} from './SetName';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  addRoom: RoomAddRouter,
  // 删除房间
  deleteRoom: RoomDeleteRouter,
  // 列出房间信息
  listRooms: RoomListRouter,
  // 获取房间消息更新
  getRoomMessageUpdate: RoomMessageGetUpdateRouter,
  // 添加消息
  addMessage: MessageAddRouter,
  // 列出房间消息
  listRoomMessages: RoomMessageListRouter,
  //设置名字
  setName:setNameRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
