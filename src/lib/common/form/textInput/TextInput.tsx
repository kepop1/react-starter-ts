import cx from 'classnames'
import { HTMLProps } from 'react'
import styles from './TextInput.module.scss'

type TextInputProps = HTMLProps<HTMLInputElement> & {
  styleOverride?: string
}

export const TextInput = ({ styleOverride, ...rest }: TextInputProps) => (
  <input className={cx(styles.input, styleOverride)} {...rest} />
)
