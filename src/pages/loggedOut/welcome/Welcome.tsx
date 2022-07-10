import { useNavigate } from 'react-router'

import { ROUTE_LOGIN, ROUTE_REGISTER } from '../../../navigation/constants'
import { Button, TextButton } from '../../../lib'
import styles from './Welcome.module.scss'

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>React Starter App</h1>
      <p className={styles.text}>
        This app will give you some different things out the box. It might seem
        a little barebones or OTT but give it a while and even make it your own!
      </p>

      <Button onClick={() => navigate(ROUTE_REGISTER)} label="Register" />
      <TextButton
        onClick={() => navigate(ROUTE_LOGIN)}
        label="Already have an account? Login!"
      />
    </div>
  )
}
