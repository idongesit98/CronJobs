const express = require('express')
const routes = express.Router()
const BirthdayController = require('../Controllers/birthday_controller')


routes.get('/all',BirthdayController.GetAllBirthday)
routes.get('/single/:userId',BirthdayController.GetBirthday)
routes.post('/create',BirthdayController.CreateBirthday)
routes.put('/update/:userId',BirthdayController.UpdateBirthday)

module.exports = routes