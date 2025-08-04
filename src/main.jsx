import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Home from './components/PublicHome/PublicHome.jsx';

import Root from './components/Root/Root.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Tasks from './components/Tasks/Tasks.jsx';
import Profile from './components/Profile/Profile.jsx';
import Leaderboard from './components/Leaderboard/Leaderboard.jsx';
import Reports from './components/Reports/Reports.jsx';
import Contact from './components/Contact/Contact.jsx';

import Services from './components/Services/Services.jsx';
 
import LandingLayout from './components/LandingLayout/LandingLayout.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Login from './components/Login/Login.jsx';
import PublicAboutUs from './components/PublicAboutUs/PublicAboutUs.jsx';

const router = createBrowserRouter([


  {
    path: "/",
    Component: LandingLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component: Home },

      { path: "contact-us", Component: Contact },
      { path: "signup", Component: SignUp },
      { path: "login", Component: Login },
      {path: "about-us", Component: PublicAboutUs },
      { path: "services", Component: Services }
    ],
  },
  {
    path: "/app",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      
      

      {
        path: "dashboard",
        Component: Dashboard
      },
      {
        path: "tasks",
        Component: Tasks
      },
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "leaderboard",
        Component: Leaderboard
      },
      {
        path: "reports",
        Component: Reports
      },
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
