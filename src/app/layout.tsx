import type { Metadata } from 'next'
import '@/style/globals.css';
import { AuthContextProvider } from './context/user'
import { Toaster } from "react-hot-toast";


// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Toaster position="top-center" reverseOrder={false}/>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}