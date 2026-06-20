import filter from 'leo-profanity'

filter.loadDictionary('en')

// Optional: You can explicitly add custom terms if needed
// filter.add(['customBadWord1', 'customBadWord2'])

export const checkProfanity = (fieldsToValidate = []) => {
  return (req, res, next) => {
    const violations = []

    fieldsToValidate.forEach(field => {
      const value = req.body[field]

      if (value && typeof value === 'string') {
        if (filter.check(value)) {
          violations.push(field)
        }
      }
    })

    if (violations.length > 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: `Profanity detected in the following fields: ${violations.join(', ')}. Please keep the content clean.`,
      })
    }

    next()
  }
}
