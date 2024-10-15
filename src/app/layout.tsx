'use client'

import generateColorsCss from '@/lib/colors'
import { ToastContainer } from 'react-toastify'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../../public/scss/main.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import Provider from '@/state/provider'
import { Layout } from '@/components/shared'
import { usePathname } from 'next/navigation'
import routes from '@/lib/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  }
})

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const IS_DASHBOARD_LAYOUT = pathname.includes(routes.dashboard.entry.path)

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <style type="text/css">{generateColorsCss()}</style>
        <ToastContainer />

        <Provider>
          <QueryClientProvider client={queryClient}>
            {IS_DASHBOARD_LAYOUT ? children : <Layout>{children}</Layout>}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  )
}
