import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { FormContextProvider } from './components/context/FormContext'
import { ProductContextProvider } from './components/context/ProductContext'
import { NavContextProvider } from './components/context/NavContext'
import { ProfileContextProvider } from './components/context/ProfileContext'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FormContextProvider>
        <ProductContextProvider>
          <ProfileContextProvider>
            <NavContextProvider>
              <App />
            </NavContextProvider>
          </ProfileContextProvider>
        </ProductContextProvider>
      </FormContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
