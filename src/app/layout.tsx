'use client'

import generateColorsCss from '@/lib/colors'
import { ToastContainer } from 'react-toastify'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../../public/scss/main.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import Provider from '@/state/provider'

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
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <style type="text/css">{generateColorsCss()}</style>
        <ToastContainer />

        <Provider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  )
}
