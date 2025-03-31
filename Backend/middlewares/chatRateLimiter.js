const rateLimit = {};

const chatRateLimiter = (req, res, next) => {
  const ip = req.ip;

  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 0, time: Date.now() };
  }

  const timeDiff = Date.now() - rateLimit[ip].time;

  // Reset after 1 day
  if (timeDiff > 60 * 60 * 24 * 1000) {
    rateLimit[ip].count = 0;
    rateLimit[ip].time = Date.now();
  }

  if (rateLimit[ip].count >= 3 && !req.user) {
    return res.status(429).json({
      message: 'Limit reached. Please log in for unlimited chats.'
    });
  }

  rateLimit[ip].count++;
  next();
};

export default chatRateLimiter;
