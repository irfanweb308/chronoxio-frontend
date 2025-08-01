import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
 
import Home from './components/Home/Home.jsx';
 
import Root from './components/Root/Root.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Tasks from './components/Tasks/Tasks.jsx';
import Profile from './components/Profile/Profile.jsx';
import Leaderboard from './components/Leaderboard/Leaderboard.jsx';
import Reports from './components/Reports/Reports.jsx';
import Contact from './components/Contact/Contact.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import Services from './components/Services/Services.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root, 
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"/about-us",
        Component:AboutUs
      },
      {
        path:"/services",
        Component:Services
      },
      {
        path:"/contact-us",
        Component:Contact
      },
      {
        path:"/dashboard",
        Component:Dashboard
      },
      {
        path:"/tasks",
        Component:Tasks
      },
      {
        path:"/profile",
        Component:Profile
      },
      {
        path:"/leaderboard",
        Component:Leaderboard
      },
      {
        path:"/reports",
        Component:Reports
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
