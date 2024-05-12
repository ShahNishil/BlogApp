import dataBaseAccess from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async(req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  try{
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await getUserByUsernameOrEmail(username, email);
    if (existingUser) {
      return res.status(400).json({error: "Username or email already exists"});
    }

    const result = await insertUser(username, email, hashedPassword, first_name, last_name);
    if(result){
      res.status(201).json({message: "User registered successfully"});
    }
  }catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function getUserByUsernameOrEmail(username, email) {
  return new Promise((resolve, reject) => {
    dataBaseAccess.query("SELECT * FROM user WHERE username = ? OR email = ?", [username, email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function insertUser(username, email, password, first_name, last_name) {
  return new Promise((resolve, reject) => {
    dataBaseAccess.query("INSERT INTO user (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)", [username, email, password, first_name, last_name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


export const loginController = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await findUser(email);

    if (!user) {
      return res.status(401).json({error: "User not found"});
    }

    const hashPassword = await bcrypt.compare(password, user?.password);        
        
    if (!hashPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }else{
      const data = {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_IN});   
      res.status(200).json({message: "User authenticated successfully", data: data, token: token});
    }
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

async function findUser(email) {
  return new Promise((resolve, reject) => {
    dataBaseAccess.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
}