import { initDatabase } from "../db/init.js";
import { Post } from "../db/models/post.js"

/*The initDatabase() function we defined earlier is an async function, so we need to
await it; otherwise, we would be attempting to access the database before we are connected to it */
await initDatabase()

//create object from model
const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Daniel Bugl',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

//save to database
const createdPost = await post.save()

//demo update 
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello again, Mongoose' },
})

//use find() to list all objects for that model
const posts = await Post.find()
console.log(posts)

//To-dos, add other functions like 'delete'...etc