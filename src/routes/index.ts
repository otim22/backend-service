import { Request, Response, Application } from "express";
import BlogController from "../controllers/blog.controller";
import UserController from "../controllers/auth.controller";
import { middlewares } from "../middlewares/index";
import { authMiddleware } from "../middlewares/authMidddleware";

const { responses, messages, codes } = middlewares;
const Blog = new BlogController();
const User = new UserController();

class Routes {
  public router = (app: Application): any => {
    app.get("/", (req: Request, res: Response) => {
        responses.ok(codes.ok(), messages.welcomeMessage(), res);
    });

    app.get("/api/v1/blogs", authMiddleware, Blog.findBlogs);
    app.get("/api/v1/blogs/:id", Blog.findOneBlog);
    app.post("/api/v1/blogs/create", Blog.createBlog);
    app.put("/api/v1/blogs/update/:id", Blog.updateBlog);
    app.delete("/api/v1/blogs/delete/:id", Blog.deleteBlog);
    
    app.post("/api/v1/login", User.login);
    app.post("/api/v1/register", User.register);
    app.get("/api/v1/authenticatedUser", User.authenticatedUser);
    app.post("/api/v1/refreshPage", User.refreshPage);
    app.get("/api/v1/logout", User.logout);

    app.all("*", (req: Request, res: Response) => {
        responses.ok(codes.notFound(), messages.pageNotFound(), res);
    });
  };
}

export const route = new Routes().router;