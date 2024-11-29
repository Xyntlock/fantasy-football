import type React from 'react'

interface PageProps {
  children: React.ReactNode
}

const Page = ({ children }: PageProps) => (
  <div className="mx-16">{children}</div>
)

export default Page
