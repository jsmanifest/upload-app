import React from 'react'

const SVGScaleLoop = ({ className, children, ...props }) => (
  <span className='scale-loop' {...props}>
    {children}
  </span>
)

export default SVGScaleLoop
