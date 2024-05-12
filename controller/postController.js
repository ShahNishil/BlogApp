import dataBaseAccess from "../database.js";

export const addPostController = (req, res) => {
    const { user_id, title, content, tags } = req.body;
    
    dataBaseAccess.query("INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)", [user_id, title, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error in creating post" });
        } else {
            const postId = result.insertId;
            if (tags && tags.length > 0) {
                const tagValues = tags.map(tag => [postId, tag]);
                dataBaseAccess.query("INSERT INTO post_tags (post_id, tag_id) VALUES ?", [tagValues], (tagErr, tagResult) => {
                if (tagErr) {
                    return res.status(500).json({ error: "Error in associating tags with the post" });
                } else {
                    res.status(201).json({ message: "Post created successfully", postId });
                }
                });
            } else {
                res.status(201).json({ message: "Post created successfully", postId });
            }
        }
    });
};

export const updatePostController = (req, res) => {
    const postId = req.params.id;
    const { title, content, tags } = req.body;
    
    dataBaseAccess.query("UPDATE posts SET title = ?, content = ? WHERE post_id = ?", [title, content, postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error in updating post" });
        } else {
            if (tags && tags.length > 0) {
                const tagValues = tags.map(tag => [postId, tag]);
                dataBaseAccess.query("DELETE FROM post_tags WHERE post_id = ?", [postId], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: "Error in updating tags for the post" });
                    } else {
                        dataBaseAccess.query("INSERT INTO post_tags (post_id, tag_id) VALUES ?", [tagValues], (err, result) => {
                            if (err) {
                                return res.status(500).json({ error: "Error in updating tags for the post" });
                            } else {
                                res.status(200).json({ message: "Post updated successfully" });
                            }
                        });
                    }
                });
            } else {
                res.status(200).json({ message: "Post updated successfully" });
            }
        }
    });
};

export const deletePostController = (req, res) => {
    const postId = req.params.id;

    dataBaseAccess.query("DELETE FROM posts WHERE post_id = ?", [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error in deleting post" });
        } else {
            res.status(200).json({ message: "Post deleted successfully" });
        }
    });
};

export const getAllPostsController = (req, res) => {
    const {user_id} = req.body;

    dataBaseAccess.query(`
    SELECT
        p.post_id,
        p.title,
        p.content,
        p.created_at,
        p.updated_at,
        GROUP_CONCAT(t.tag_name) AS tags
    FROM
        posts p
    LEFT JOIN
        post_tags pt ON p.post_id = pt.post_id
    LEFT JOIN
        tags t ON pt.tag_id = t.tag_id
    WHERE
        p.user_id = ?
    GROUP BY
        p.post_id;

    `, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error in fetching posts" });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: "No posts found" });
            }
            const posts = results.map(post => ({
                post_id: post.post_id,
                title: post.title,
                content: post.content,
                created_at: post.created_at,
                updated_at: post.updated_at,
                tags: post.tags ? post.tags.split(",") : []
            }));
            res.status(200).json({posts: posts});
        }
    });
};


export const getPostByIdController = (req, res) => {
    const postId = req.params.id;

    dataBaseAccess.query(`
    SELECT
        p.post_id,
        p.title,
        p.content,
        p.created_at,
        p.updated_at,
        GROUP_CONCAT(t.tag_name) AS tags
    FROM
        posts p
    LEFT JOIN
        post_tags pt ON p.post_id = pt.post_id
    LEFT JOIN
        tags t ON pt.tag_id = t.tag_id
    WHERE
        p.post_id = ?
    GROUP BY
        p.post_id;
    `, [postId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error in fetching posts" });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: "No posts found" });
            }
            const post = results.map(post => ({
                post_id: post.post_id,
                title: post.title,
                content: post.content,
                created_at: post.created_at,
                updated_at: post.updated_at,
                tags: post.tags ? post.tags.split(",") : []
            }));
            res.status(200).json({post: post});
        }
    });
};