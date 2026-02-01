import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import About from './pages/AboutPage'
import Profile from './pages/ProfilePage'
import SignIn from './pages/SignInPage'
import Signup from './pages/SignupPage'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import ListingPage from './pages/ListingPage'
import UpdateListinPage from './pages/UpdateListinPage'
import ListingDetailPage from './pages/ListingDetailPage'
import Search from './pages/Search';

// import Header from './components/Header'

function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/search" element={<Search />} />

        <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/listing" element={<ListingPage/>} />
    <Route path="/listing-update/:id" element={<UpdateListinPage/>} />
  </Route>
  
      </Routes>
    </>
  )
}

export default App
