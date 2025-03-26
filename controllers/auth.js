import { conn } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const Register = (req, res) => {
    //    first check user exists or not
    let user = `select * from users where username=? or email=?`;
    conn.query(user, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.status(209).json('no record found');
        if (data.length) {
            return res.status(201).json("Username or Email already exist!")
        } else {
            let insertNewUser = "insert into users(username,email,password,avatar) values (?)";
            var salt = bcrypt.genSaltSync(10);
            var password = bcrypt.hashSync(req.body.password, salt);
            let values = [req.body.username,req.body.email,password,req.body.avatar]
            conn.query(insertNewUser, [values], (err, data) => {
                if (err) return res.status(209).json(err);
                res.status(200).json("User has been created successfully!");
            })
        }


    })


}


export const Login = (req, res) => {
    let user = `select * from users where username=? limit 1`;
    conn.query(user, [req.body.username], (err, data) => {
        if (err) return res.status(401).json(err);
        if(data.length===0) return res.status(404).json('User not found!')
        const isPasswordCorrect=bcrypt.compareSync(req.body.password,data[0].password)
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!")
        let tokan=jwt.sign({uid:data[0].uid},"jwtKey");
        let {password,...other}=data[0];
        res.cookie('access_token',tokan,{
            httpOnly:true
        }).status(200).json(other);
    })
}

export const LogOut = (req, res) => {
    res.clearCookie('access_token',{
        sameSite:"none",
        secure:true
    }).status(200).json('user has been logged out.');
}