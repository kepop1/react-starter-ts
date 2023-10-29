import { useNavigate } from 'react-router'
import { Button, Title, Text } from '@mantine/core'
import { ROUTE_REGISTER } from '@/navigation/constants'
import styles from './Welcome.module.scss'

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Title order={1}>React Starter App</Title>

      <div className={styles.content}>
        <Text size="md">
          This app will provide you with a starter structure, auth screens, but
          it purposely barebones for you to craft!
        </Text>

        <Text size="md">
          Make sure you have started the server in a new terminal tab.
        </Text>
      </div>

      <Button
        onClick={() => navigate(ROUTE_REGISTER)}
        variant="filled"
        size="lg"
        radius="md">
        Try it out
      </Button>
    </div>
  )
}
