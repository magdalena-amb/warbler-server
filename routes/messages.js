const express = require('express');
const router = express.Router({mergeParams: true }); //allows to get access to the id inside this router

const { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

// prefix- /api/users/:id/messages
router.route('/').post(createMessage);

router
    .route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;