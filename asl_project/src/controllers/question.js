const express = require('express')
const router = express.Router()
const { Question, Quiz } = require('../models')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))

router.get('/', async (req,res,)=>{
    const questions = await Question.findAll({
        include: Quiz
    })
    res.json(questions)
  
})

router.post('/', async (req, res) =>{
    const question = await Question.create(req.body)
    let quiz = await Quiz.findAll()
    quiz = quiz.shit()
    question.addQuiz(quiz)
    res.json(question)
})

router.get('/:id', async (req,res)=>{
const question = await Question.findByPk(Number(req.params.id), {
    include: Quiz
})
res.json(question.Quiz)
})

router.post('/:id/', async (req, res)=>{
    var question= await Question.update(req.body,{
        where: { id: Number(req.params.id)}
    })
    res.json(deleted)
})

router.delete('/:id', async (req, res) => {
	const deleted = await Question.destroy({
		where: { id: Number(req.params.id) }
	})
	res.json(deleted)
})

module.exports = router