require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorHandler')
const NotesRouter = require('./Notes/notes-router')
const FoldersRouter = require('./Folders/folders-router')

const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://tranquil-shore-99373.herokuapp.com/api"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(cors())
app.use(helmet())

app.use('/api/notes', NotesRouter)
app.use('/api/folders', FoldersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app