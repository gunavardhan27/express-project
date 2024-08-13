const express = require('express')
const router = express('router')
const {getContacts,getContact,createContact,updateContact,deleteContact} = require('../controllers/contactControllers')
const validateToken = require('../middleware/validateTokenHandler')
// to save space we can actually join the routes with similar parameters
router.use(validateToken)
router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)


module.exports = router