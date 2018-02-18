// const express = require('express')
// const bodyParser = require('body-parser')

import * as express from "express"
import * as bodyParser from "body-parser"
import * as mongoose from "mongoose"
import { v4 } from "uuid"
import * as fs from "fs"
import { noDupli } from "./helpers/filters"
// Setting up Database
mongoose.connect("mongodb://localhost:27017/local", err =>
	console.log(err ? err : "connected!")
)
const db = mongoose.connection
const POST_SCHEMA = new mongoose.Schema({
	Title: String,
	Tags: [String],
	Content: [
		{
			Subtitle: String,
			Body: String
		}
	],
	Author: String
})
const Post = db.model("Post", POST_SCHEMA)
// -----
// const HP = new Post({
// 	Title: "Hello World",
// 	Tags: ["Hello", "Post"],
// 	Content: [{ Subtitle: "How bout de?", Body: "Nothing" }],
// 	Author: "Shadow",
// })
// HP.save()
// 	.then(val => console.log(val))
// 	.catch(err => console.log(err))
//
// Express App
const app = express()
// app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.set("Content-Type", "text/plain")
	res.send("Welcome on my Home Page!")
})

app.get("/api/posts-list/", async (req, res, next) => {
	interface _Post {
		Title: string,
		Tags: string[],
		Content: [
			{
				Subtitle: string,
				Body: string
			}
		], 
		Author: string
	}
	await Post.find()
		// .then(data => Array.from(data).filter(noDupli))
		.then(data => {
			// console.dir(data, {colors: true})
			res.set("Content-Type", "application/json")
			res.statusCode = 200
			res.send(JSON.stringify(data))
			res.end()
		})
		.catch(err => next(err))
})

app.get("/api/posts/:id", async (req, res, next) => {
	const id = req.params.id
	const posts = await Post.findById(id)
		.then(data => {
			res.send(JSON.stringify(data._doc))
			// res.end()
		})
		.catch(err => {
			next(err)
		})
})
// -----
const HTTP_SERVER_ERROR = 500
app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err)
	}

	return res.status(err.status || HTTP_SERVER_ERROR).send("500")
})
const port = parseInt(process.env.port as string)
	? parseInt(process.env.port as string)
	: 5000
app.listen(port, () => console.log(`listening at ${port}`))
