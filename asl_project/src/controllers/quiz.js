const express = require('express')
const router = express.Router()
const { Quiz, Question, Choice } = require('../models')
const { quizIsValid } = require('../middlewares/forms')
const { isAuthenticated } = require('../middlewares/auth')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))

router.get('/', async (req,res,)=>{
    const quizzes = await Quiz.findAll({
        include:[
            {
                model: Question, include:[Choice]
            }
        ]
    })
   res.json(quizzes)
})

router.post('/', quizIsValid, async (req, res) =>{
    if(req.errors.length > 0){
        res.render('quizzes/create',{
            errors: req.errors
        })
    }else{
        const quiz = await Quiz.create( req.body )
        res.redirect('/quizzes')
    }
})

router.get('/new', async (req,res) => {
    res.render('quiz/create')
})


router.get('/:id',async (req,res)=>{
const quiz = await Quiz.findByPk( Number(req.params.id),{
    include: [
        {
            model: Question, include: [Choice]
        }
    ]
})
res.json(quiz)

})


router.post('/:id', quizIsValid, async (req,res)=>{
  if(req.errors.length === 0){
    var quiz = await Quiz.update(req.body, {
        where: {id: Number(req.params.id)}
    })
  }var quiz = await Quiz.findByPk( Number(req.params.id))
  res.render('quizzes/edit', { quiz, errors: req.errors})
  
})

router.get('/:id/edit', async (req, res) => {
	var quiz = await Quiz.update( req.body, {
	  where: { id: Number(req.params.id) }
	})
	var quiz = await Quiz.findByPk( Number(req.params.id) )
	res.render('quizzes/edit', { quiz })
})

router.get('/:id/delete', async (req, res) => {
	const deleted = await Quiz.destroy({
		where: { id: Number(req.params.id) }
	})
	res.redirect('/quizzes')
})

module.exports = router