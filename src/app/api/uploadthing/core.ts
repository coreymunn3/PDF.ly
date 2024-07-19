import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from '@/db'
 
const f = createUploadthing();

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    // do auth stuff here
    .middleware(async ({ req }) => {
      const {isAuthenticated, getUser} = getKindeServerSession()
      if (!isAuthenticated){
        throw new Error('Unauthorized')
      }
      const user = await getUser()
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // when we're done uploading to uploadThing, we want to save the file key in our own db
      console.log(metadata, file)
      const createdFile = await db.file.create({data: {
        key: file.key,
        name: file.name,
        userId: metadata.userId,
        url: file.url,
        uploadStatus: 'PROCESSING'
      }})
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;