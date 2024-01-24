import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService, { AuthService } from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])



  return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
          <div className='w-full block'>
            <Header/>
            <Footer/>
          </div>
        </div>
      ) : null;
}

export default App
