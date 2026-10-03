const Ticket = require('../models/Ticket');

const VALID_TRANSITIONS = {
  Open: 'In Progress',
  'In Progress': 'Resolved',
};

const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({ message: 'Priority must be Low, Medium, or High' });
    }
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user.userId,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTickets = async (req, res) => {
  try {
    let tickets;
    if (req.user.role === 'Agent') {
      tickets = await Ticket.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });
    }
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('createdBy', 'name email');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (req.user.role === 'Customer' && ticket.createdBy._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const { status } = req.body;
    const allowed = VALID_TRANSITIONS[ticket.status];

    if (!allowed || allowed !== status) {
      return res.status(400).json({ message: 'Invalid status transition' });
    }

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTicket, getTickets, getTicketById, updateTicketStatus };
