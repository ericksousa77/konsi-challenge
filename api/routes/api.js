import express from 'express'

import UserBenefitsController from '../controllers/user-benefits-controller'
import QueueController from '../controllers/queue-controller'
import queueValidator from '../validators/queue-validator'
import userBenefitsValidator from '../validators/user-benefits-validator'

const router = express.Router()

router.get('/user-benefits', userBenefitsValidator, UserBenefitsController.show)

router.get('/test/cache', UserBenefitsController.testSetAndGetOnRedis)

router.post('/queue', queueValidator, QueueController.pushToQueue)

router.get('/', UserBenefitsController.indexView)

export default router
