import cx from 'classnames'
import styles from './TextButton.module.scss'

type TextButtonProps = {
  onClick: () => void
  label: string
  styleOverride?: string
}

// need the concat styles thing
export const TextButton = ({
  onClick,
  label,
  styleOverride,
}: TextButtonProps) => (
  <button onClick={onClick} className={cx(styles.textButton, styleOverride)}>
    {label}
  </button>
)
