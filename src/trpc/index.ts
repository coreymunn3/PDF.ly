import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, privateProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server';
import db from "@/db";
 
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
  })
});
 

export type AppRouter = typeof appRouter;