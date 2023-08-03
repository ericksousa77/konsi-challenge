import Joi from 'joi'

const queueValidator = (req, res, next) => {
  const queueSchema = Joi.array()
    .items(
      Joi.object({
        cpf: Joi.string()
          .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
          .required()
          .messages({
            'string.pattern.base':
              'O CPF deve estar no formato XXX.XXX.XXX-XX, onde X é um dígito numérico.',
            'any.required': 'O campo "cpf" é obrigatório.',
            'string.empty': 'O campo "cpf" não pode ser vazio.'
          }),
        login: Joi.string().required().messages({
          'any.required': 'O campo "login" é obrigatório.',
          'string.empty': 'O campo "login" não pode ser vazio.'
        }),
        senha: Joi.string().required().messages({
          'any.required': 'O campo "senha" é obrigatório.',
          'string.empty': 'O campo "senha" não pode ser vazio.'
        })
      })
    )
    .min(1)
    .messages({
      'array.min': 'Deve haver pelo menos um objeto no array.'
    })

  const { error } = queueSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

export default queueValidator
