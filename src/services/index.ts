import BlogService from "./blog.service";
import AuthService from "./auth.service";

const Blog = new BlogService();
const User = new AuthService();

const Service = {
  Blog,
  User
};

export default Service;