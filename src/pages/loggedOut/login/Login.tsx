import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Button, TextButton, TextInput } from '@/lib'
import { ROUTE_REGISTER, ROUTE_FORGOT_PASSWORD } from '@/navigation/constants'
import { useAuth } from '@/stores/auth'
import { LOGIN_URL } from '@/api/config'
import styles from './Login.module.scss'

type LoginFormValues = {
  email: string
  password: string
}

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialValues,
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
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
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <h2>Enter your details to sign in</h2>

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

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              autoCapitalize="none"
              type="password"
            />
          )}
        />
        {!!errors.password && <p className={styles.error}>This is required.</p>}
      </div>

      {!!apiError && <p className={styles.error}>{apiError}</p>}

      <div className={styles.buttonsContainer}>
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} label="Login" />
        )}

        <TextButton
          onClick={() => navigate(ROUTE_REGISTER)}
          label="No account? Register here"
          styleOverride={styles.link}
        />

        <TextButton
          onClick={() => navigate(ROUTE_FORGOT_PASSWORD)}
          label="Forgotten your password?"
          styleOverride={styles.forgotPassword}
        />
      </div>
    </div>
  )
}
