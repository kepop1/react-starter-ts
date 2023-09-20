import { useNavigate } from 'react-router'
import { ROUTE_REGISTER } from '@/navigation/constants'
import { Button } from '@/lib'
import styles from './Welcome.module.scss'

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1>React Starter App</h1>

      <div className={styles.content}>
        <p>
          This app will provide you with a starter structure, auth screens, but
          it purposely barebones for you to craft!
        </p>

        <p>Make sure you have started the server in a new terminal tab.</p>
      </div>

      <Button
        onClick={() => navigate(ROUTE_REGISTER)}
        label="Try it out"
        styleOverride={styles.button}
      />
    </div>
  )
}
