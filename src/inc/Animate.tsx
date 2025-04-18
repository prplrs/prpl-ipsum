import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'

interface AnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
// react element type
export const Animate = (props: AnimateProps) => {
  const [anim] = useAutoAnimate()

  return (
    <div className={props.className} ref={anim}>{props.children}</div>
  )
}