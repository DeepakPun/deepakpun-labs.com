import ErrorHandler from '../utils/ErrorHandler.js'

export const globalErrorHandler = (err, req, res, next) => {
  // Use a fallback object container
  let error = {
    statusCode: err.statusCode || 500,
    message:
      err.message || 'An unexpected temporal distortion disrupted our servers.',
  }

  // 1. Check native "err.name" instead of the shallow copy object
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid timeline coordinate format: ${err.value}`
    error = new ErrorHandler(message, 400)
  }

  // 🫵 UPGRADE: Convert validation text into a key-value dictionary mapping layer
  // 🫵 FIX: Update the conditional check to intercept both error traits definitively
  if (
    err.name === 'ValidationError' ||
    (err.message && err.message.includes('validation failed'))
  ) {
    const errorFieldsMap = {}

    // Guard Clause: If err.errors doesn't exist for some reason, extract from message
    if (err.errors) {
      Object.keys(err.errors).forEach(key => {
        errorFieldsMap[key] = err.errors[key].message
      })
    } else {
      // Fallback parser in case a raw string error was generated manually
      errorFieldsMap['global'] = err.message
    }

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Form validation failed.',
      errors: errorFieldsMap,
    })
  }

  // 3. Check native "err.code" for duplicate collection keys
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(err.keyValue)} already exists in the datastore.`
    error = new ErrorHandler(message, 400)
  }

  // 4. Send the cleaned, formatted error package response
  return res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
