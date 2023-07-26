import express from 'express'

import CrawlerController from '../controllers/crawler-controller'
import QueueController from '../controllers/queue-controller'

const router = express.Router()

router.get('/crawl', CrawlerController.show)

router.post('/queue', QueueController.pushToQueue)

router.get('/queue', QueueController.consumeChannel)

export default router
