import { useAuth } from '../../../stores/auth'
// Example of importing sass variables to be used in js
import colors from '../../../lib/_Colors.scss'
import font from '../../../lib/_Font.scss'
import spacing from '../../../lib/_Spacing.scss'
import styles from './Main.module.scss'

export const Main = () => {
  const { authToken } = useAuth()

  // Example of using JS overrides in styling ... don't do this normally ... please :pray:
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: colors.cyberGrape }}>
      <p className={styles.text} style={{ marginTop: spacing.medium }}>
        This is the main page! Do what you will with this page going forwards!
      </p>
      <p className={styles.text} style={{ marginTop: spacing.medium }}>
        Who knows maybe this will be a fancy menu or dashboard someday! {'\n'}
      </p>
      <p className={styles.italicText} style={{ fontSize: font.body }}>
        User Object: {JSON.stringify(authToken, null, 2)}
      </p>
    </div>
  )
}
