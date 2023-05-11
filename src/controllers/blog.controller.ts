import { Request, Response } from "express";
import { middlewares } from "../middlewares";
import Service from "../services";

const { responses, messages, codes } = middlewares;
const { Blog } = Service;

class BlogController {
  /**
   * Find all blogs
   * @param req
   * @param res
   * @returns response
   */
  findBlogs = async (req: Request, res: Response) => {
    const response = await Blog.findBlogs();

    if (!response) {
      return responses.error(codes.error(), messages.error(), res);
    }

    return responses.success(
      codes.ok(),
      messages.ok(),
      {
        count: response[1],
        data: response[0],
      },
      res
    );
  };

  /**
   * Find one blog
   * @param req
   * @param res
   * @returns response
   */
  findOneBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Blog.findOneBlog(parseInt(id));

    if (!response) {
      return responses.error(codes.error(), messages.notFound(), res);
    }

    return responses.success(codes.ok(), messages.ok(), response, res);
  };

  /**
   * Create a new blog
   * @param req
   * @param res
   * @returns response
   */
  createBlog = async (req: Request, res: Response) => {
    const {
      title,
      description,
    }: {
      title: string;
      description: string;
    } = req.body;

    const response = await Blog.createBlog({
      title,
      description,
    });

    if (!response) {
      return responses.error(codes.error(), messages.notFound(), res);
    }

    const id = response.raw.insertId;

    return responses.success(
      codes.created(),
      messages.created(),
      { id, title, description },
      res
    );
  };

  /**
   * Update one blog
   * @param req
   * @param res
   * @returns response
   */
  updateBlog = async (req: Request, res: Response) => {
    const {
      title,
      description,
    }: {
      title: string;
      description: string;
    } = req.body;

    const { id } = req.params;

    const response = await Blog.updateBlog(parseInt(id), {
      title,
      description,
    });

    if (!response) {
      return responses.error(codes.error(), messages.error(), res);
    }

    return responses.success(
      codes.ok(),
      messages.ok(),
      { id, title, description },
      res
    );
  };

  /**
   * Update one blog
   * @param req
   * @param res
   * @returns response
   */
  deleteBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Blog.deleteBlog(parseInt(id));

    if (!response) {
      return responses.error(codes.error(), messages.error(), res);
    }

    return responses.ok(codes.ok(), messages.ok(), res);
  };
}

export default BlogController;