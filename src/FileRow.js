import React from 'react'
import Spinner from './Spinner'

const getReadableSizeFromBytes = (bytes) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let l = 0
  let n = parseInt(bytes, 10) || 0
  while (n >= 1024 && ++l) n /= 1024
  // include a decimal point and a tenths-place digit if presenting
  // less than ten of KB or greater units
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

const Caption = ({ children, label, block, ...rest }) => (
  <div
    style={{ display: block ? 'block' : 'flex', alignItems: 'center' }}
    {...rest}
  >
    <span style={{ color: '#fff' }}>{label}: </span>
    <span style={{ color: '#2b8fba' }}>{children}</span>
  </div>
)

const FileRow = ({ isUploaded, isUploading, file, src, id, index }) => (
  <div
    style={{
      opacity: isUploaded ? 0.2 : 1,
    }}
    className='file-row'
  >
    {isUploading && (
      <Spinner center xs>
        Uploading...
      </Spinner>
    )}
    <div className='file-row-thumbarea'>
      <img src={src} alt='' />
      <Caption className='file-row-filename' label='File Name' block>
        {file.name}
      </Caption>
    </div>
    <div className='file-row-additional-info'>
      <Caption className='file-row-filesize' label='File Size'>
        {getReadableSizeFromBytes(file.size)}
      </Caption>
    </div>
  </div>
)

const isEqual = (currProps, nextProps) => {
  if (currProps.index !== nextProps.index) {
    return false
  }
  if (currProps.isUploaded !== nextProps.isUploaded) {
    return false
  }
  if (currProps.isUploading !== nextProps.isUploading) {
    return false
  }
  return true
}

export default React.memo(FileRow, isEqual)
