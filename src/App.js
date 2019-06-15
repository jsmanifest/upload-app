import React from 'react'
import { Link } from '@reach/router'
import { MdArrowDownward } from 'react-icons/md'
import useApp from './useApp'
import FileUploader from './FileUploader'
import FileUploaderScreen from './FileUploaderScreen'
import FileRow from './FileRow'
import SVGScaleLoop from './SVGScaleLoop'
import './styles.css'

const App = ({ children }) => {
  const inputRef = React.createRef()
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    uploadError,
    status,
    onSubmit,
    onChange,
    triggerInput,
    getFileUploaderProps,
  } = useApp({ inputRef })

  const initialFileUploaderProps = getFileUploaderProps({
    triggerInput: status === 'IDLE' ? triggerInput : undefined,
    onChange: status === 'IDLE' ? onChange : undefined,
  })

  return (
    <form className='form' onSubmit={onSubmit}>
      <div className='uploader'>
        <FileUploader {...initialFileUploaderProps}>
          <FileUploaderScreen
            triggerInput={triggerInput}
            getFileUploaderProps={getFileUploaderProps}
            files={files}
            pending={pending}
            status={status}
            uploadError={uploadError}
          />
        </FileUploader>
      </div>
      <div className={files.length ? 'file-list' : ''}>
        {files.map(({ id, ...rest }, index) => (
          <FileRow
            key={`thumb${index}`}
            isUploaded={!!uploaded[id]}
            isUploading={next && next.id === id}
            id={id}
            {...rest}
          />
        ))}
      </div>
      {status === 'FILES_UPLOADED' && (
        <div className='next-step'>
          <SVGScaleLoop>
            <MdArrowDownward className='arrow-down' />
          </SVGScaleLoop>
          <Link to='/review'>
            <button type='button'>Next Page</button>
          </Link>
        </div>
      )}
      {children}
    </form>
  )
}

export default App
