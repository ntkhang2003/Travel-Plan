const Post = require("../models/Post");
const router = require("express").Router();
//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch(err) {
        res.status(500).json(err)
    }
})

//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            await post.updateOne({$set:req.body})
            res.status(200).json("The post has been updated")
        } else {
            res.status(403).json("You can only update your post")
        }
    } catch(err) {
        res.status(500).json(err)
    }
})
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        await post.deleteOne()
    } catch(err) {
        res.status(500).json(err)
    }
})

//get a post by username/place
router.get('/:slug', async (req, res) => {
    try {
        const decodedSlug = decodeURIComponent(req.params.slug)
        const post1 = await Post.find({place: decodedSlug})
        const post2 = await Post.find({username: decodedSlug})
        if (post1 != '') return res.status(200).json(post1)
        else if (post2 != '') return res.status(200).json(post2)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
  });

module.exports = router