import React from 'react'

interface DatabaseNoticeProps {}

export default function DatabaseNotice({}: DatabaseNoticeProps): React.JSX.Element {
  return (
    <div
      className='bg-blue-950/40 border border-blue-800 text-blue-200 p-3 rounded-lg text-xs md:text-sm my-4 flex items-center gap-2'
      role='status'
      aria-live='polite'
    >
      <span aria-hidden='true'>🚀</span>
      <p>
        <strong className='font-semibold text-blue-100'>Live Timeline:</strong>{' '}
        This developer sandbox maintains a rolling feed of the latest 24
        entries. Older theories auto-recycle to save space.
      </p>
    </div>
  )
}
