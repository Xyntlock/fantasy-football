import { signOut } from 'aws-amplify/auth'
import { Button } from 'flowbite-react'
import Page from '../Page'

const HomePage = () => {
  const handleClick = () => {
    signOut()
  }

  return (
    <Page>
      Home Page
      <Button pill onClick={handleClick}>
        Sign Out
      </Button>
    </Page>
  )
}

export default HomePage
