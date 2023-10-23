import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { Button, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { REGISTER_URL } from '@/api/config'
import { ROUTE_LOGIN, ROUTE_FORGOT_PASSWORD } from '@/navigation/constants'
import colors from '@/lib/Colors.module.scss'
import styles from './Register.module.scss'

const registerFormSchema = z.object({
  firstName: z.string().min(2, { message: 'You must have initials at least' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 letters long' }),
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

const initialValues = {
  firstName: '',
  email: '',
  password: '',
}

export const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const form = useForm<RegisterFormValues>({
    initialValues,
    validate: zodResolver(registerFormSchema),
  })

  const onSubmit = form.onSubmit(async ({ firstName, email, password }) => {
    setLoading(true)

    try {
      const response = await axios.post(REGISTER_URL, {
        firstName,
        email,
        password,
      })

      if (response.status === 201) {
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
      <Title order={1}>Register</Title>
      <Title order={4}>Enter your details to sign up</Title>

      <form onSubmit={onSubmit} className={styles.formContainer}>
        <TextInput
          label="First name"
          placeholder="First name"
          autoCapitalize="none"
          {...form.getInputProps('firstName')}
        />

        <TextInput
          label="Email"
          placeholder="Email"
          autoCapitalize="none"
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
            Register
          </Button>
        )}
      </form>

      <div className={styles.buttonsContainer}>
        <Button
          variant="transparent"
          size="lg"
          color={colors.puertoRico}
          onClick={() => navigate(ROUTE_LOGIN)}>
          Already have an account? Login here
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
