require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const _ = require('lodash');

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const port = 3200;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODBCLOUD || "mongodb://localhost:27017/blogDB");
console.log(process.env.MONGODBCLOUD)


const blogSchema = new mongoose.Schema({
    postTitle: String,
    postBody: String
})

// Collection
const Blog = mongoose.model('blog', blogSchema);



app.get('/', (req, res)=>{
    Blog.find({}, (err, response)=>{
        res.render('index', {postM: response})
    })
    
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/contact', (req, res)=>{
    res.render('contact')
})

app.get('/compose', (req, res)=>{
    res.render('compose')
})




app.post('/compose', (req, res)=>{
    const newTitle = req.body.postTitle;
    const newBody = req.body.postBody;

    const newPost = new Blog({
        postTitle: newTitle,
        postBody: newBody
    })
    newPost.save()
    // db.push(post);
    res.redirect('/');
})

app.post('/delete', (req, res)=>{
    
    // console.log(req.body)
    Blog.findOneAndRemove({_id: req.body.delete}, (err, response)=>{
        console.log("Removed User : ", response);
        res.redirect('/');
    })
})

app.get('/postM/:postItem', (req, res)=> {
    
    Blog.find({_id: req.params.postItem}, (err, response)=>{
        console.log(req.params) 
        console.log(response);
    response.forEach((blogDetails)=>{
        console.log(blogDetails)

        res.render("post", {postTitle: blogDetails.postTitle, postBody: blogDetails.postBody });
    })   
        
        
    })
    
    
})


app.listen(process.env.PORT || port, ()=>{
    console.log(`server is running at ${port}`);
})