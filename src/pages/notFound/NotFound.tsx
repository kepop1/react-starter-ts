import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTE_MAIN } from '../../navigation/constants'
import styles from './NotFound.module.scss'

export const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate(ROUTE_MAIN)
    }, 4000)
  }, [navigate])

  return (
    <div className={styles.container}>
      <h1>Oops, this page can&apos;t be found</h1>
      <p>We&apos;ll redirect you back to the main page...</p>
    </div>
  )
}
