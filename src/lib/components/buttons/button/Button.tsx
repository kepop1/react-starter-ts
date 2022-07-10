import cx from 'classnames'
import styles from './Button.module.scss'

type ButtonProps = {
  onClick: () => void
  label: string
  styleOverride?: string
}

export const Button = ({ onClick, label, styleOverride }: ButtonProps) => (
  <button
    className={cx(styles.button, styleOverride)}
    style={{ color: 'black' }}
    onClick={onClick}>
    {label}
  </button>
)
