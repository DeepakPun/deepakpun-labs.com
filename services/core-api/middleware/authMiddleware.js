import ErrorHandler from '../utils/ErrorHandler.js'

export const protectRoute = (req, res, next) => {
  // 1. Extract the key token from custom request header tags
  const apiKey = req.headers['x-api-key']

  // 2. Validate the key existence and authenticity
  const secretKey = process.env.API_SECRET_KEY

  if (!apiKey || apiKey !== secretKey) {
    // Blocks execution instantly and handles structured communication back to the caller
    return next(
      new ErrorHandler(
        'Access Denied. A valid security clearance token (x-api-key) is required to alter timelines.',
        401,
      ),
    )
  }

  // 3. Clear authorization check: pass control cleanly to the next controller function
  next()
}
