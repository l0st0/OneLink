import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Navigate, Outlet } from 'react-router-dom'
import HC from '@hcaptcha/react-hcaptcha'
import { useAdminPrefetch } from 'src/frontend/store/queries/useAdminPrefetch'
import { LoadingButton } from '@/components'
import { ClaimForm, LoadingData } from '@/features'
import { AdminLayout, BlankLayout } from '@/layouts'
import { useAboutQuery, useIsAuthQuery, useUserQuery, useVerifyUser } from '@/store'

export const AdminRoute = () => {
  const { isAuth, isLoading: isLoadingAuth } = useIsAuthQuery()
  const { user, isFetching: isLoadingUser } = useUserQuery()
  const { verifyUserAsync, error, isLoading } = useVerifyUser()

  useAboutQuery()
  useAdminPrefetch()

  const HCaptchaRef = React.useRef<HC>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ token: string }>({
    defaultValues: {
      token: '',
    },
  })

  const resetToken = () => {
    setValue('token', '')
  }

  const onSubmit = async ({ token }: { token: string }) => {
    await verifyUserAsync({ principal: user?.principal || '', token })
    HCaptchaRef?.current?.resetCaptcha()
    resetToken()
  }

  if (isLoadingAuth || isLoadingUser)
    return (
      <BlankLayout className="gap-4">
        <LoadingData />
      </BlankLayout>
    )

  if (!isAuth || !user) return <Navigate to="/" />

  if (!user.isVerified)
    return (
      <BlankLayout>
        <div className="flex flex-col">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <h5>Please verify yourself</h5>

            <Controller
              render={({ field: { onChange } }) => (
                <HC
                  id="token"
                  ref={HCaptchaRef}
                  onError={resetToken}
                  onExpire={resetToken}
                  onVerify={onChange}
                  theme="dark"
                  sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
                />
              )}
              rules={{
                required: 'Token is required.',
              }}
              name="token"
              control={control}
            />

            {!!errors && <div>{errors.token?.message}</div>}
            {!!error && <div>{String(error)}</div>}

            <LoadingButton button="outline" loading={isLoading} type="submit">
              Verify
            </LoadingButton>
          </form>
        </div>
      </BlankLayout>
    )

  if (!user.hasName)
    return (
      <BlankLayout>
        <div className="flex flex-col">
          <h5>Pick the name to continue</h5>
          <ClaimForm />
        </div>
      </BlankLayout>
    )

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
