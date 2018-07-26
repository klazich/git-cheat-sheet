import jwt from 'jsonwebtoken'

export const jwtFromAuthHeader = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      req.decoded = decoded
      next() // thou shall pass
    } catch (err) {
      res.json({
        // thou shall not pass
        error: true,
        message: 'JWT verification failed',
      })
    }
  } else {
    // no token -> 403/forbidden
    return res.status(403).json({
      error: true,
      message: 'no token found in header',
    })
  }
}
