import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * protected routes, from https://trpc.io/docs/server/authorization
 */
export const privateProcedure = t.procedure.use(async (opts) => {
  // see if we have a logged in user
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  if(!user || !user.id){
    throw new TRPCError({code: 'UNAUTHORIZED'})
  }
  // ensure all future methods can access this user
  return opts.next({
    ctx: {
      userId: user.id,
      user,
    }
  })
})

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;