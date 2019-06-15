import { useReducer, useRef, useEffect } from 'react'

const api = {
  uploadFile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 550)
    })
  },
}

const logUploadedFile = (num, color = 'green') => {
  const msg = `%cUploaded ${num} files.`
  const style = `color:${color};font-weight:bold;`
  console.log(msg, style)
}

// Constants
const IDLE = 'IDLE'
const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
  files: [],
  fileNames: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  uploadError: null,
  status: IDLE,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        files: action.files,
        fileNames: action.fileNames,
        status: LOADED,
      }
    case 'submit':
      return { ...state, uploading: true, pending: state.files, status: INIT }
    case 'next':
      return {
        ...state,
        next: action.next,
        status: PENDING,
      }
    case 'file-uploaded':
      return {
        ...state,
        next: null,
        pending: action.pending,
        uploaded: {
          ...state.uploaded,
          [action.prev.id]: action.prev.file,
        },
      }
    case 'files-uploaded':
      return { ...state, uploading: false, status: FILES_UPLOADED }
    case 'set-upload-error':
      return { ...state, uploadError: action.error, status: UPLOAD_ERROR }
    default:
      return state
  }
}

const useApp = ({ inputRef }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSubmit = (e) => {
    e.preventDefault()
    if (state.files.length) {
      dispatch({ type: 'submit' })
    } else {
      window.alert("You don't have any files loaded.")
    }
  }

  const onChange = (e) => {
    e.persist()
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files)
      const fileNames = []
      const files = arrFiles.reduce((acc, file) => {
        if (!state.fileNames.includes(file.name)) {
          fileNames.push(file.name)
          const src = window.URL.createObjectURL(file)
          acc.push({ file, id: file.name, src })
        }
        return acc
      }, [])
      const nextFiles = [...state.files, ...files]
      dispatch({ type: 'load', files: nextFiles, fileNames })
    }
  }

  const triggerInput = (e) => {
    e.persist()
    inputRef.current.click()
  }

  const getFileUploaderProps = (opts) => ({
    inputRef,
    triggerInput,
    onChange,
    status: state.status,
    ...opts,
  })

  // Sets the next file when it detects that its ready to go
  useEffect(() => {
    if (state.pending.length && state.next == null) {
      const next = state.pending[0]
      dispatch({ type: 'next', next })
    }
  }, [state.next, state.pending])

  const countRef = useRef(0)

  // Processes the next pending thumbnail when ready
  useEffect(() => {
    if (state.pending.length && state.next) {
      const { next } = state
      api
        .uploadFile(next)
        .then(() => {
          const prev = next
          logUploadedFile(++countRef.current)
          const pending = state.pending.slice(1)
          dispatch({ type: 'file-uploaded', prev, pending })
        })
        .catch((error) => {
          console.error(error)
          dispatch({ type: 'set-upload-error', error })
        })
    }
  }, [state])

  // Ends the upload process
  useEffect(() => {
    if (!state.pending.length && state.uploading) {
      dispatch({ type: 'files-uploaded' })
    }
  }, [state.pending.length, state.uploading])

  return {
    ...state,
    onSubmit,
    onChange,
    triggerInput,
    getFileUploaderProps,
  }
}

export default useApp
