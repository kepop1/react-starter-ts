// This is important, disabled for you to decide how to handle
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import styles from './Modal.module.scss'

type Props = {
  onCancel?: () => void
  children: ReactNode
}

export const Modal = ({ children, onCancel }: Props) => {
  const navigate = useNavigate()
  return createPortal(
    <div
      className={styles.background}
      onClick={event => {
        // Means we don't need to wrap the children with a div with an onClick event.stopPropogation()
        if (event.target === event.currentTarget) {
          if (onCancel) {
            onCancel()
          } else {
            navigate(-1)
          }
        }
      }}>
      {children}
    </div>,
    document.getElementById('modal_root')!,
  )
}
