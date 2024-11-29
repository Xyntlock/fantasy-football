import type React from 'react'

interface PageProps {
  children: React.ReactNode
}

const Page = ({ children }: PageProps) => (
  <div className="mx-8 mt-4">{children}</div>
)

export default Page
