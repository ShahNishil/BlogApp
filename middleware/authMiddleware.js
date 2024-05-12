import jwt from "jsonwebtoken";

const auth =  async(req, res, next) => {
    try{
        const token = req.headers["authorization"]?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodeToken)=>{
            if(err){
                return res.status(401).json({ message: "Invalid token" });
            }

            req.user=decodeToken;
            next();
        });


    }catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

export default auth;