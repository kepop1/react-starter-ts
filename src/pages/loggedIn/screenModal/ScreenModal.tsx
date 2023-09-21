import { useLocation } from 'react-router-dom'
import { Modal } from '@/lib'
import styles from './ScreenModal.module.scss'

export const ScreenModal = () => {
  const location = useLocation()

  // Check location.state content - if it's empty then a user's navigated directly to this url
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isFromHome = !!location.state

  return (
    <Modal>
      <div className={styles.container}>
        <h1>This is a screen modal, a bit like a Twitter post modal</h1>
        <p>
          You can access this directly to the route at &apos;/screen-modal&apos;
          or you can navigate to it and see the app behind the modal!
        </p>
      </div>
    </Modal>
  )
}
