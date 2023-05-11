import Blog from "../database/entities/blog";
import connectDB from "../config/ormconfig";

class BlogServices {
    /**
     * Find all blogs
     * @param {}
     * @returns Promise
     */
    findBlogs = async (): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).findAndCount();

        if (!result) {
            return null;
        }

        return result;
    };

    /**
     * Find one blog
     * @param {}
     * @returns Promise
     */
    findOneBlog = async (id: number): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).findOne({ 
            where: { id }
         });

        if (!result) {
            return null;
        }

        return result;
    };

    /**
     * Create a new blog
     * @param data
     * @returns Promise
     */
    createBlog = async (data: object): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).insert(data);

        if (!result) {
            return null;
        }

        return result;
    };

    /**
     * Update a blog by Id
     * @param data
     * @returns Promise
     */
    updateBlog = async (id: number, data: object): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).update(id, data);

        if (!result) {
            return null;
        }

        return result;
    };

    /**
     * Delete a blog by Id
     * @param data
     * @returns Promise
     */
    deleteBlog = async (id: number): Promise<any | null> => {
        const result = await connectDB.getRepository(Blog).delete({ id });

        if (!result) {
            return null;
        }
        
        return result;
    };
}

export default BlogServices;