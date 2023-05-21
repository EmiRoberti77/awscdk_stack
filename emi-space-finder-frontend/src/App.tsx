import { Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import NavBar from './components/NavBar';
import './App.css';
import { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import { AuthService } from './service/AuthService';
import CreateSpace from './components/CreateSpace';
import { DataService } from './service/DataService';
import Spaces from './components/Spaces';

const authService = new AuthService();
const dataService = new DataService(authService);

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  
  const router =  createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName}/>
          <Outlet />
        </>
      ), 
      children: [
        {
          path:'/',
          element:<div>Hello World</div>
        },
        {
          path:'/login',
          element:<div><LoginComponent authService={authService} setUserNameCB={setUserName} /></div>
        },
        {
          path: "/profile",
          element: <div>Profile page</div>,
        },
        {
          path: "/createSpace",
          element: <div><CreateSpace dataService={dataService} /></div>,
        },
        {
          path: "/spaces",
          element: <div><Spaces dataService={dataService}/></div>,
        },
      ]
    }
  ])

  return (
    <div className="Wrapper">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
