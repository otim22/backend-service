import { Request, Response, Application } from "express";
import BlogController from "../controllers/blog.controller";
import { middlewares } from "../middlewares/index";

const { responses, messages, codes } = middlewares;
const Blog = new BlogController();

class Routes {
  public router = (app: Application): any => {
    app.get("/", (req: Request, res: Response) => {
        responses.ok(codes.ok(), messages.welcomeMessage(), res);
    });

    app.get("/blogs", Blog.findBlogs);
    app.get("/blogs/:id", Blog.findOneBlog);
    app.post("/create", Blog.createBlog);
    app.put("/update/:id", Blog.updateBlog);
    app.delete("/delete/:id", Blog.deleteBlog);

    app.all("*", (req: Request, res: Response) => {
        responses.ok(codes.notFound(), messages.pageNotFound(), res);
    });
  };
}

export const route = new Routes().router;