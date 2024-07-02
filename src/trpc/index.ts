import { publicProcedure, router } from './trpc'
 
export const appRouter = router({
  test: publicProcedure.query(async () => {
    return [10,20,30]
  })
});
 

export type AppRouter = typeof appRouter;