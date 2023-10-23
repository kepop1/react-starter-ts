import { useLocation, useNavigate } from 'react-router-dom'
import { Modal, Text, Title } from '@mantine/core'
import styles from './ScreenModal.module.scss'

export const ScreenModal = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Check location.state content - if it's empty then a user's navigated directly to this url
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isFromHome = !!location.state

  return (
    <Modal opened={true} onClose={() => navigate(-1)} centered>
      <div className={styles.container}>
        <Title order={1}>
          This is a screen modal, a bit like a Twitter post modal
        </Title>
        <Text size="md">
          You can access this directly to the route at &apos;/screen-modal&apos;
          or you can navigate to it and see the app behind the modal!
        </Text>
      </div>
    </Modal>
  )
}
