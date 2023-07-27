import express from 'express'

import UserBenefitsController from '../controllers/user-benefits-controller'
import QueueController from '../controllers/queue-controller'

const router = express.Router()

router.get('/user-benefits', UserBenefitsController.show)

router.post('/queue', QueueController.pushToQueue)

export default router
