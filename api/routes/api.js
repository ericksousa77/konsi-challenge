import express from 'express'

import CrawlerController from '../controllers/crawler-controller'

const router = express.Router()

router.post('/crawl', CrawlerController.create)

router.get('/crawl', CrawlerController.show)

export default router
