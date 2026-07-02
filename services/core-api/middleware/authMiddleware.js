export const protectRoute = (req, res, next) => {
  const receivedKey = req.headers["x-api-key"]?.trim()
  const validKey = process.env.API_SECRET_KEY?.trim()

  // Debug logs - remove after it works
  console.log("Received x-api-key:", receivedKey)
  console.log("Expected API_KEY:", validKey)
  console.log("Match:", receivedKey === validKey)

  if (!receivedKey) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message:
        "Access Denied. A valid security clearance token (x-api-key) is required to alter timelines.",
    })
  }

  if (receivedKey !== validKey) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access Denied. Invalid security clearance token.",
    })
  }

  next()
}
