import mongoose, { Schema } from 'mongoose'

//create Schema
const postSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  contents: String,
  tags: [String],
},
  {
    //add 'creation' and 'last update' dates
    // timestamps: true

    //if createdAt only, no 'last update'
    timestamps: {
      createdAt: true,
      // updatedAt: false
      updatedAt: true

    }
  })

//create model
export const Post = mongoose.model('post', postSchema)