const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch {
    return res.status(401).json({ message: 'Authentication required' });
  }
};

const agentOnly = (req, res, next) => {
  if (req.user.role !== 'Agent') {
    return res.status(403).json({ message: 'Agent access required' });
  }
  next();
};

module.exports = { auth, agentOnly };
