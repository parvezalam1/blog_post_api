import { conn } from "../db.js";
import jwt from 'jsonwebtoken';
export const getPosts = (req, res) => {
    let cat = req.query.cat;
    let q = cat ? `select * from posts where cat=?` : "select * from posts"
    conn.query(q, [cat], (err, data) => {
        if (err) return res.status(404).json(err)
        res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    let q = "select username,title,description,postImage,cat,postDate,pid from users u join posts p on u.id=p.uid where pid=?"
    conn.query(q, [req.params.pid], (err, data) => {
        if (err) return res.status(404).json(err)
        res.status(200).json(data[0])
    })
}



export const addPost = async (req, res) => {
    const q = "insert into posts (`title`,`description`,`postImage`,`uid`,`cat`,`postDate`) values (?)";
    let values = [
        req.body.title,
        req.body.description,
        req.body.postImage,
        req.body.uid,
        req.body.cat,
        req.body.Date
    ]
    conn.query(q,[values],(err,data)=>{
        if(err) return res.status(404).json("Something went wrong!")
        res.status(200).json("User post has been uploaded Successfully!")
    })
}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(404).json('Not Authenticated!');
    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json('token is not valid!')

        let q = "delete from posts where uid=? and pid=?"
        conn.query(q, [userInfo.id, req.params.postId], (err, data) => {
            if (err) return res.status(401).json('You can delete only your post!')
            if (data) return res.status(200).json("User post has been deleted!")
            res.status(201).json('Something went wrong!')
        })
    })
}


export const updatePost=async(req,res)=>{
    let q="update posts set title=?,description=?,postImage=?,uid=?,cat=?,postDate=? where pid=?";
    let values=[
        req.body.title,
        req.body.description,
        req.body.postImage,
        req.body.uid,
        req.body.cat,
        req.body.Date
    ]
    conn.query(q,[...values,req.params.postId],(err,data)=>{
        if(err) return res.status(404).json("You can only update your post!")
        res.status(200).json('User post has been updated!')
    })
}


// INSERT INTO posts (title,description,postImage,postDate,uid,cat) VALUES ('ii','sd','sdf.jpg','2025/02/22','0','food')