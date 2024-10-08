import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ClothingSelector from './pages/clothing';

// import Home from './pages/Home';
// import Detail from './pages/Detail';
// import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Success from './pages/Success';
// import OrderHistory from './pages/OrderHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // error: <NoMatch />,
    children: [
      {
        index: true, 
        // element: <Home />
        element: <ClothingSelector />
      }, {
        path: "/graphic-images",
        element: <ImageSelector />
      },
      {
        path: '/checkout',
        element: <CheckoutPage />
      },
      {

        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
      // {
      //   path: '/success',
      //   element: <Success />
      // }, {
      //   path: '/orderHistory',
      //   element: <OrderHistory />
      // }, {
      //   path: '/products/:id',
      //   element: <Detail />
      // }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
