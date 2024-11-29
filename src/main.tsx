import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import { Flowbite } from 'flowbite-react'
import { BrowserRouter, Route, Routes } from 'react-router'
import outputs from '../amplify_outputs.json'
import { Navbar } from './app/components/Navbar/Navbar.tsx'
import EditSquadPage from './app/pages/EditSquad/EditSquadPage.tsx'
import HomePage from './app/pages/Home/HomePage.tsx'
import LeaderboardPage from './app/pages/Leaderboard/LeaderboardPage.tsx'
import VersusPage from './app/pages/Versus/VersusPage.tsx'
import ViewSquadPage from './app/pages/ViewSquad/ViewSquadPage.tsx'

Amplify.configure(outputs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Flowbite>
    <React.StrictMode>
      <Authenticator>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/edit-squad" element={<EditSquadPage />} />
            <Route path="/view-squad" element={<ViewSquadPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/versus" element={<VersusPage />} />
          </Routes>
        </BrowserRouter>
      </Authenticator>
    </React.StrictMode>
  </Flowbite>
)
