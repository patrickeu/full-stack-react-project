import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

//study the synxtax here
/*The { [variable]: … } operator resolves the string stored in the variable to a key
name for the created object. So, if our variable contains 'createdAt', the resulting object
will be { createdAt: … }. */
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}
export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ ussername: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

//Defining the get single post, update and delete post functions
export async function getPostById(postId) {
  return await Post.findById(postId)
}
export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}
export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}

/* 
We could
still extend this code to first fetch the post with the given ID, check if it exists (if not, return
a 404 Not Found error), and if it does exist, verify that the author is the currently logged-in
user (if not, return a 403 Forbidden error).
*/