import yup from "yup";

export const addPost = yup.object({
    user_id: yup.number().required(),
    title: yup.string().required(),
    content: yup.string().required(),
});

export const editPost = yup.object({
    title: yup.string(),
    content: yup.string(),
});

export const getAllPost = yup.object({
    user_id: yup.number().required(),
});