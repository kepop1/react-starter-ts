import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { Button, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { ROUTE_REGISTER, ROUTE_FORGOT_PASSWORD } from '@/navigation/constants'
import { useAuth } from '@/stores/auth'
import { LOGIN_URL } from '@/api/config'
import colors from '@/lib/Colors.module.scss'
import styles from './Login.module.scss'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 letters long' }),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export const Login = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { setLoggedIn, setUserItemsInLocalStorage } = useAuth()

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const registeredEmail = params.get('email')

  const initialValues = {
    email: registeredEmail || '',
    password: '',
  }

  const form = useForm<LoginFormValues>({
    initialValues,
    validate: zodResolver(loginFormSchema),
  })

  const onSubmit = form.onSubmit(async ({ email, password }) => {
    setLoading(true)

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      })

      if (response.status === 200) {
        // This will trigger te authToken conditional and switch to the AppNavigator.
        setLoggedIn(true)
        setUserItemsInLocalStorage({
          email,
          authToken: response.data.authToken,
          refreshToken: response.data.refreshToken,
        })
      }

      return response
    } catch (error: any) {
      if (error?.data?.message) setApiError(`${error?.data.message}`)
    } finally {
      setLoading(false)
    }
  })

  return (
    <div className={styles.container}>
      <Title order={1}>Login</Title>
      <Title order={4}>Enter your details to sign in</Title>

      <form onSubmit={onSubmit} className={styles.formContainer}>
        <TextInput
          label="Email"
          placeholder="hello@findadesk.com"
          type="email"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="not-password-123"
          {...form.getInputProps('password')}
        />

        {!!apiError && <p className={styles.error}>{apiError}</p>}

        {loading ? (
          <Text size="md">Loading ...</Text>
        ) : (
          <Button type="submit" variant="filled" size="lg" radius="md">
            Login
          </Button>
        )}
      </form>

      <div className={styles.buttonsContainer}>
        <Button
          variant="transparent"
          size="lg"
          color={colors.puertoRico}
          onClick={() => navigate(ROUTE_REGISTER)}>
          No account? Register here
        </Button>

        <Button
          variant="transparent"
          size="lg"
          onClick={() => navigate(ROUTE_FORGOT_PASSWORD)}>
          Forgotten your password?
        </Button>
      </div>
    </div>
  )
}
