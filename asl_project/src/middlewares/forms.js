const quizIsValid = (req, res, next) => {
    const { name, weight } = req.body
    req.errors = []
    if(name.length <= 0){ req.errors.push('Quiz name cannot be blank!')}
    if(weight.length <=0){ req.errors.push('Weight name cannot be empty!')}
    next()
}

const questionIsValid = (req, res, next) =>{
    const { name } = req.body
    req.errors = []

    if(name.length <= 0){ req.errors.push('Quiz name cannot be blank!')}

}
module.exports ={
    quizIsValid,questionIsValid
}