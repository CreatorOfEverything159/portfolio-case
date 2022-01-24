const Router = require('express')
const router = new Router()
const personController = require('../conroller/person.controller')

router.post('/person', personController.createPerson)
router.get('/people', personController.getPeople)
router.get('/person/:id', personController.getOnePerson)
router.put('/person', personController.updatePerson)
router.delete('/person/:id', personController.deletePerson)
router.post('/find', personController.findPeople)

module.exports = router
