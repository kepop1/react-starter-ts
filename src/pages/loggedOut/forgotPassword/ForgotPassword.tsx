import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Button, TextButton, TextInput } from '@/lib'
import { ROUTE_LOGIN } from '@/navigation/constants'
import { FORGOT_PASSWORD_URL, getRequestHeaders } from '@/api/config'
import styles from './ForgotPassword.module.scss'

type ForgotPasswordValues = {
  email: string
}

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const registeredEmail = params.get('email')

  const initialValues = {
    email: registeredEmail || '',
    password: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    defaultValues: initialValues,
  })

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async ({ email }) => {
    setLoading(true)

    try {
      const headers = getRequestHeaders()

      const response = await axios.post(
        FORGOT_PASSWORD_URL,
        {
          email,
        },
        { headers: headers },
      )

      if (response.data.success) {
        navigate(`${ROUTE_LOGIN}?email=${email}`)
      }

      return response
    } catch (error: any) {
      if (error?.data?.message) setApiError(`${error?.data.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Forgot Password</h1>
      <h2>
        Enter your email to get your password reset, hint it will be:
        password123
      </h2>

      <div className={styles.formContainer}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            validate: value => /.+\@.+\..+/.test(value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              autoCapitalize="none"
              type="email"
            />
          )}
        />
        {!!errors.email && <p className={styles.error}>This is required.</p>}
      </div>

      {!!apiError && <p className={styles.error}>{apiError}</p>}

      <div className={styles.buttonsContainer}>
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} label="Submit email" />
        )}

        <TextButton
          onClick={() => navigate(ROUTE_LOGIN)}
          label="All sorted? Sign in here"
          styleOverride={styles.link}
        />
      </div>
    </div>
  )
}
