const express = require('express')
const mongoose =require('mongoose')

//importing the model here
const BlogModel =  mongoose.model('Blog')



let helloWorldFunction = (req, res) => res.send('Hello World!')
let printExample = (req, res) => res.send('Example!')


module.exports = {
    helloWorld : helloWorldFunction,
    printExample : printExample
}