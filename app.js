const express = require('express');
const app = express();

const mysql = require('mysql');

//create database connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

//connect to database
db.connect((err)=> {
    if(err)throw err;
    console.log('Mysql Connected');
});

//insert post
app.get('/addPost1', (req, res) => {
    let post = {title: 'post_one', body: 'body of post'};
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err)throw err;
         console.log('Post added');
         res.send('<h1>POST 1 ADDED</h1>');
    });
});

//select posts
app.get('/getposts', (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, result) => {
        if(err)throw err;
         console.log(result);
         res.send('<h1>Post fetched</h1>');
    });
});

//Select single posts
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err)throw err;
         console.log(result);
         res.send('<h1>Post fetched</h1>');
    });
});

//Update posts
app.get('/updatepost/:id', (req, res) =>{
    let update = 'updated title';
    let sql= `UPDATE posts SET title = '${update}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=> {
        if(err)throw err;
         console.log(result);
         res.send('<h1>Post updated</h1>');
    });
});

//Delete post
app.get('/deletepost/:id', (req, res) =>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`<h1>Post ${req.params.id} deleted</h1>`);
    })
});

//route
app.get('/', (req, res) => {
    res.send('<h1>Awesome</h1>');
});
//connect to server port
const PORT = process.env.PORT || 5000;
app.listen (PORT, ()=> console.log(`Server started on port ${PORT}`));
