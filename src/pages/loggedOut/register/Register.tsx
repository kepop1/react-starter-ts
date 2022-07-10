import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { REGISTER_URL, getRequestHeaders } from '../../../api/config'
import { Button, TextButton, TextInput } from '../../../lib'
import { ROUTE_LOGIN } from '../../../navigation/constants'
import styles from './Register.module.scss'

type RegisterFormValues = {
  firstName: string
  email: string
  password: string
}

const initialValues = {
  firstName: '',
  email: '',
  password: '',
}

export const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async ({
    firstName,
    email,
    password,
  }) => {
    setLoading(true)

    try {
      const headers = getRequestHeaders()

      const response = await axios.post(
        REGISTER_URL,
        {
          firstName,
          email,
          password,
        },
        { headers: headers },
      )

      if (response.status === 201) {
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
      <h1 className={styles.header}>Register</h1>

      <div className={styles.formContainer}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              autoCapitalize="none"
              type="text"
              autoFocus
            />
          )}
        />
        {!!errors.firstName && (
          <p className={styles.error}>This is required.</p>
        )}

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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Button onClick={handleSubmit(onSubmit)} label="Register" />
      )}

      <TextButton
        onClick={() => navigate(ROUTE_LOGIN)}
        label="Already have an account? Login!"
      />
    </div>
  )
}
