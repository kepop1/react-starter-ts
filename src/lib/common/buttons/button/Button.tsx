import type { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void
  label: string
  isLoading?: boolean
  styleOverride?: string
}

export const Button = ({
  onClick,
  label,
  styleOverride,
  isLoading,
  type,
  ...rest
}: Props) => {
  return (
    <button
      className={cx(styles.button, styleOverride)}
      type={type}
      onClick={onClick}
      disabled={isLoading}
      {...rest}>
      {label}
    </button>
  )
}
