const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const _ = require('lodash');

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/blogDB');


const blogSchema = new mongoose.Schema({
    postTitle: String,
    postBody: String
})

// Collection
const Blog = mongoose.model('blog', blogSchema);

// const blog = new Blog({
//      postTitle: 'Zildjian',
//      postBody: 'Hello'

//     });

// Fruit.insertMany([blog], (err, result)=>{})

// blog.save().then(() => console.log('meow'));

// Blog.find({}, (err, response)=>{
//     Blog.forEach((item)=>{
//         console.log("Done")
//     })
// })




// const db = [
//     {postTitle: "Assignment 29 30",
//      postBody: "What a life"   
//     }
// ];

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
    res.redirect('/')
})


// app.get(`/postM/:postItem`, function (req, res, next) {

//    let route = req.params.id;
    
//     console.log(`${route}`);
    
//     res.send(`${route}`);
    
//     next();
// })

app.post('/compose', (req, res)=>{
    // const post = {
    //     postTitle: req.body.postTitle,
    //     postBody: req.body.postBody,
    //     title: req.body.postTitle
    // }
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
    // const deleteItem = req.body.delete;
    // if(deleteItem === ""){
    //     console.log('clicked')
    // }
    console.log(req.body)
    Blog.findOneAndRemove({_id: req.body.delete}, (err, response)=>{
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