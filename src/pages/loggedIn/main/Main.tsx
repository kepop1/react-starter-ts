import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/stores/auth'
// Example of importing sass variables to be used in js
import colors from '@/lib/Colors.module.scss'
import font from '@/lib/Font.module.scss'
import spacing from '@/lib/Spacing.module.scss'
import { Button, LocalStorageKeys, Modal } from '@/lib'
import { ROUTE_SCREEN_MODAL } from '@/navigation/constants'
import styles from './Main.module.scss'

export const Main = () => {
  const navigate = useNavigate()
  const { resetAuthStore } = useAuth()
  // We can make use of the location here to determine how to render the screen modal depending on if there's content behind it or not.
  // See more here: https://github.com/remix-run/react-router/discussions/9864#discussioncomment-6350903
  const location = useLocation()

  const [showModal, setShowModal] = useState(false)

  const authToken = localStorage.getItem(LocalStorageKeys.authToken)

  // Example of using JS overrides in styling ... you wouldn't do this normally
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.content}
          style={{ backgroundColor: colors.cyberGrape }}>
          <p className={styles.text} style={{ marginTop: spacing.medium }}>
            This is the main page! Do what you will with this page going
            forwards!
          </p>
          <p className={styles.text} style={{ marginTop: spacing.medium }}>
            Who knows maybe this will be a fancy menu or dashboard someday!{' '}
            {'\n'}
          </p>
          <p className={styles.italicText} style={{ fontSize: font.body }}>
            User Object: {JSON.stringify(authToken, null, 2)}
          </p>
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => setShowModal(true)}
            label="Open Regular Modal"
            styleOverride={styles.regularModal}
          />

          <Button
            onClick={() =>
              // How we pass parameters to routes - more specifically the location / navigation state.
              navigate(ROUTE_SCREEN_MODAL, { state: location })
            }
            label="Go to Screen Modal"
            styleOverride={styles.screenModal}
          />
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => resetAuthStore()}
            label="Remove auth and reload"
            styleOverride={styles.screenModal}
          />
        </div>
      </div>

      {showModal && (
        <Modal onCancel={() => setShowModal(false)}>
          <div className={styles.modalContainer}>
            <h1>This is a normal modal</h1>
            <p>I hope it is everything you want</p>
          </div>
        </Modal>
      )}

      {/* Allows for the nested screen modals */}
      <Outlet />
    </>
  )
}
