import { Hono } from "hono";
import user from "../pages/user";
import blog from "../pages/blog";
const router = new Hono();

router.route('/user', user);
router.route('/blog',blog);

export default router;