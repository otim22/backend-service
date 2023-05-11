import Blog from "../database/entities/blog";
import connectDB from "../config/ormconfig";

class BlogServices {
   
    findBlogs = async (): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).findAndCount();

        if (!result) return;

        return result;
    };

    findOneBlog = async (id: number): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).findOne({ 
            where: { id }
         });

         if (!result) return;

        return result;
    };

    createBlog = async (data: object): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).insert(data);

        if (!result) return;

        return result;
    };

    updateBlog = async (id: number, data: object): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).update(id, data);

        if (!result) return;

        return result;
    };

    deleteBlog = async (id: number): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).delete({ id });

        if (!result) return;
        
        return result;
    };
}

export default BlogServices;