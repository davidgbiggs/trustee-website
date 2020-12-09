import React from 'react'
import './style-layout.scss'

type Props = {
  children?: React.ReactNode
}

const StyleLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default StyleLayout
