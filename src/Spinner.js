import React from 'react'
import MDSpinner from 'react-md-spinner'
import cx from 'classnames'

const Spinner = ({
  children,
  containerProps,
  spinnerProps,
  xs,
  sm,
  center,
}) => (
  <div
    className={cx('spinner-container', {
      'flex-center': !!center,
    })}
    {...containerProps}
  >
    <div>
      <div>
        <MDSpinner
          size={xs ? 15 : sm ? 50 : 100}
          borderSize={xs ? 1 : 2}
          {...spinnerProps}
        />
      </div>
      <h4
        className={cx('spinner', {
          'spinner-xs': !!xs,
        })}
      >
        {children}
      </h4>
    </div>
  </div>
)

export default Spinner
