import React from 'react'

const FileUploader = ({
  children,
  triggerInput,
  inputRef,
  status,
  onChange,
}) => {
  let hiddenInputStyle = {}
  // If user passes in children, display children and hide input.
  if (children) {
    hiddenInputStyle = {
      position: 'absolute',
      top: '-9999px',
    }
  }

  return (
    <div
      className={status === 'IDLE' ? 'cursor-pointer' : ''}
      onClick={triggerInput}
    >
      <input
        style={hiddenInputStyle}
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple
        onChange={onChange}
      />
      <div className='uploader'>{children}</div>
    </div>
  )
}

export default FileUploader
