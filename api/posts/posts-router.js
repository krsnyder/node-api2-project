const express = require('express')
const router = express.Router()

const Post = require('./posts-model')

router.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.statusCode(500).json({
        message: "The posts information could not be retrieved",
        err: err.message
      })
  })
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist"
        })
      } else {
        console.log(post)
        res.status(200).json(post)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved",
        err: err.message
    })
  })
})

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post"
    })
  } else {
    Post.insert(req.body)
      .then(newId => {
        return(Post.findById(newId.id))
      })
      .then(post => {
        console.log(post)
        res.status(201).json(post)
      })
    .catch(err => {
      console.log(err)
      res.status(500).json({ 
        message: "Fail",
        err: err.message
      })
    })
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params;

})


module.exports = router