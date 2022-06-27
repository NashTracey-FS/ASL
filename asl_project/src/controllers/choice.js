const express = require('express')
const router = express.Router()
const { Choice , Question} = require('../models')

router.get('/', async (req, res) => {
	const choices = await Choice.findAll({
		include: Question
	})
	res.json(choices)
})

router.post('/', async (req, res) => {
	const choice = await Choice.create( req.body )
	res.json(choice)
})

router.get('/:id', async (req, res) => {
	const choice = await Choice.findByPk( Number(req.params.id), {
		include: Question
	})
	res.json(choice.Quiz)
})

router.post('/:id', async (req, res) => {
	var choice = await Choice.update( req.body, {
	  where: { id: Number(req.params.id) }
	})
	var choice = await Choice.findByPk( Number(req.params.id) )
	res.json(choice)
})

router.delete('/:id', async (req, res) => {
	const deleted = await Choice.destroy({
		where: { id: Number(req.params.id) }
	})
	res.json(deleted)
})

module.exports = router