import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Button, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { ROUTE_LOGIN } from '@/navigation/constants'
import { FORGOT_PASSWORD_URL } from '@/api/config'
import colors from '@/lib/Colors.module.scss'
import styles from './ForgotPassword.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const registeredEmail = params.get('email')

  const initialValues = {
    email: registeredEmail || '',
  }

  const form = useForm<ForgotPasswordValues>({
    initialValues,
    validate: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = form.onSubmit(async ({ email }) => {
    setLoading(true)

    try {
      const response = await axios.post(FORGOT_PASSWORD_URL, {
        email,
      })

      if (response.data.success) {
        navigate(`${ROUTE_LOGIN}?email=${email}`)
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
      <Title order={1}>Forgot Password</Title>
      <Title order={4}>
        Enter your email to get your password reset, hint it will be:
        password123
      </Title>

      <form onSubmit={onSubmit} className={styles.formContainer}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          type="email"
          {...form.getInputProps('email')}
        />

        {loading ? (
          <Text size="md">Loading ...</Text>
        ) : (
          <Button type="submit" variant="filled" size="lg" radius="md">
            Submit Email
          </Button>
        )}
      </form>

      {!!apiError && <p className={styles.error}>{apiError}</p>}

      <div className={styles.buttonsContainer}>
        <Button
          variant="transparent"
          size="lg"
          color={colors.puertoRico}
          onClick={() => navigate(ROUTE_LOGIN)}>
          All sorted? Sign in here
        </Button>
      </div>
    </div>
  )
}
