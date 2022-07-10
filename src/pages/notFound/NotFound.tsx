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
      <h1 className={styles.header}>Oops, this page can't be found</h1>
      <p className={styles.body}>We'll redirect you back to the main page...</p>
    </div>
  )
}
