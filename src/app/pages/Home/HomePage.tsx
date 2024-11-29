import { signOut } from 'aws-amplify/auth'
import { Button } from 'flowbite-react'

const HomePage = () => {
  const handleClick = () => {
    signOut()
  }

  return (
    <div>
      Home Page
      <Button pill onClick={handleClick}>
        Sign Out
      </Button>
    </div>
  )
}

export default HomePage
