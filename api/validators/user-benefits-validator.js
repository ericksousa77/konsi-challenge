import Joi from 'joi'

const userBenefitsValidator = (req, res, next) => {
  const userBenefitsSchema = Joi.object({
    cpf: Joi.string()
      .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .required()
      .messages({
        'string.pattern.base':
          'O CPF deve estar no formato XXX.XXX.XXX-XX, onde X é um dígito numérico.',
        'any.required': 'O campo "cpf" é obrigatório.',
        'string.empty': 'O campo "cpf" não pode ser vazio.'
      }),
    page: Joi.number().min(1).integer().optional().messages({
      'number.base': 'O campo "page" deve ser um número inteiro.',
      'number.min': 'O campo "page" deve ser maior ou igual a 1.'
    }),
    pageSize: Joi.number().min(1).optional().messages({
      'number.base': 'O campo "pageSize" deve ser um número inteiro.',
      'number.min': 'O campo "pageSize" deve ser maior ou igual a 1.'
    })
  })

  const { error } = userBenefitsSchema.validate(req.query)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

export default userBenefitsValidator
