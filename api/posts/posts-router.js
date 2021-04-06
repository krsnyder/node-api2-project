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
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The post with the specified ID does not exist"
        })
      } else {
        console.log(user)
        res.status(200).json(user)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved",
        err: err.message
    })
  })
})

module.exports = router