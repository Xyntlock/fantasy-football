import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify'
import './index.css'
import outputs from '../amplify_outputs.json'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './app/pages/Home/HomePage.tsx'
import { Authenticator } from '@aws-amplify/ui-react'

Amplify.configure(outputs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<Authenticator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
