import { signOut } from 'aws-amplify/auth'
import {
  DarkThemeToggle,
  Navbar as FlowbiteNavbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react'
import { Button } from '../Button/Button'

export const Navbar = () => {
  const handleClick = () => {
    signOut()
  }

  return (
    <FlowbiteNavbar fluid>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/edit-squad">Edit Squad</NavbarLink>
        <NavbarLink href="/view-squad">View Squad</NavbarLink>
        <NavbarLink href="/leaderboard">Leaderboard</NavbarLink>
        <NavbarLink href="/versus">Versus</NavbarLink>
      </NavbarCollapse>
      <div className="flex flex-wrap items-center">
        <Button size="xs" margin-x="sm" onClick={handleClick}>
          Sign Out
        </Button>
        <DarkThemeToggle />
      </div>
    </FlowbiteNavbar>
  )
}
