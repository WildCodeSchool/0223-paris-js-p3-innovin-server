const validator = (schema) => {
   
    return (req, res, next) => {
        console.log(req.body)
        const { error } = schema.validate(req.body);
        (error) ? console.log(error)  : next();
    }
};

module.exports = validator;