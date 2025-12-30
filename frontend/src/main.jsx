import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './Layout'
import Root from './Root'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import About from './Pages/About'
import Homepage from './Pages/Homepage';

const routing = createBrowserRouter([
  {
    path: '/'
    , element: <Root />,
    children: [
      { path: "login", element: <Login /> }, 
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> }
    ]
  },
  {
    path: '/'
    , element: <Layout />,
    children: [
      { path: "homepage", element: <Homepage /> }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={routing} />
  </StrictMode>,
)
