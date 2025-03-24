import mysql from 'mysql';

export const conn=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})
