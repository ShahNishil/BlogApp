import dataBaseAccess from "../database.js";

export const getTagController =  (req, res) => {
    try {
        const sql = "SELECT * FROM tags";
        dataBaseAccess.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(200).json({ tags: result });
            }
        });
    }catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};