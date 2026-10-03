const express = require('express');
const { auth, agentOnly } = require('../middleware/auth');
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
} = require('../controllers/ticketController');

const router = express.Router();

router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.get('/:id', auth, getTicketById);
router.patch('/:id/status', auth, agentOnly, updateTicketStatus);

module.exports = router;
