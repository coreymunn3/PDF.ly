import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, privateProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server';
import db from "@/db";
import {z} from 'zod'
 
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(user){
      if(!user.id || !user.email){
        throw new TRPCError({code: 'UNAUTHORIZED'})
      }
  
      // check if user is in the database, if not create then
      const dbUser = await db.user.findFirst({
        where: {
          id: user.id
        }
      })
      // if no db user, then this is a new user that has never used this app
      // create the user
      if(!dbUser){
        const newUser = await db.user.create({
          data: {
            id: user.id,
            email: user.email
          }
        })
      }
       
      return {success: true}
      
    }
  }),
  getUserFiles: privateProcedure.query(async ({ctx}) => {
    const {userId} = ctx
    const files = await db.file.findMany({
      where: {
        userId: userId
      }
    })
    return files
  }),
  getFile: privateProcedure.input(z.object({key: z.string()})).mutation(async ({ctx, input}) => {
    const {userId} = ctx
    const file = await db.file.findFirst({
      where: {
        key: input.key,
        userId
      }
    })
    if(!file) throw new TRPCError({code: 'NOT_FOUND'})
    return file
  }),
  deleteUserFile: privateProcedure.input(
    z.object({id: z.string()})
  ).mutation(async ({ctx, input}) => {
    const {userId} = ctx
    const file = await db.file.findFirst({
      where: {
        id: input.id,
        userId,
      }
    })
    if (!file){
      throw new TRPCError({code: "NOT_FOUND"})
    }
    await db.file.delete({
      where: {
        id: input.id,
        userId
      }
    })
    return file
  })
});
 

export type AppRouter = typeof appRouter;