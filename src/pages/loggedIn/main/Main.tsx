import { useAuth } from '@/stores/auth'
// Example of importing sass variables to be used in js
import colors from '@/lib/Colors.module.scss'
import font from '@/lib/Font.module.scss'
import spacing from '@/lib/Spacing.module.scss'
import styles from './Main.module.scss'

export const Main = () => {
  const { authToken } = useAuth()

  console.log({
    colors,
    font,
    spacing,
    styles,
  })
  // Example of using JS overrides in styling ... you wouldn't do this normally
  return (
    <div className={styles.container}>
      <div
        className={styles.content}
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
    </div>
  )
}
