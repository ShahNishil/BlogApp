import {Router} from "express";
import { getTagController } from "../controller/tagController.js";
import { loginController, registerController } from "../controller/authController.js";
import { addPostController, deletePostController, getAllPostsController, getPostByIdController, updatePostController } from "../controller/postController.js";
import { login, register } from "../validations/authValidation.js";
import validation from "../middleware/validation.js";
import { addPost, editPost, getAllPost } from "../validations/postValidation.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/users", validation(register),registerController);
router.post("/userAuthentication", validation(login), loginController);
router.post("/posts", auth, validation(addPost), addPostController);

router.get("/posts", auth, validation(getAllPost), getAllPostsController);
router.get("/posts/:id", auth, getPostByIdController);
router.get("/tags", auth, getTagController);

router.put("/posts/:id", auth, validation(editPost), updatePostController);

router.delete("/posts/:id", auth, deletePostController);

export default router;