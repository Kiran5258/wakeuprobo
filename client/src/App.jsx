import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Course  from './pages/Course'
import Signin from './pages/Signin'
import Header from './components/Header'
import Blog from './pages/Blog'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Privateprofile from './components/Privateprofile'
import Createpost from './pages/Createpost'
import OnlyAdmin from './components/OnlyAdmin'
import EditPost from './pages/EditPost'
import Coursepost from './pages/Coursepost'
import Registration from './pages/Registration'
import PrivateRoute from './components/PrivateRoute'
import AdminRegistrations from './components/AdminRegistrations'
import ScrollTop from './components/ScrollTop'
import MyCourses from './pages/Mycourse'
export default function App() {
  return (
   <BrowserRouter>
   <Header/>
   <ScrollTop/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/course/' element={<Course/>}/>
    <Route element={<PrivateRoute/>}>
          <Route path="/course/:postslug/register" element={<Registration />} />
    </Route>
    <Route path='/course/:postslug' element={<Coursepost/>}/>
    <Route path='/Signin' element={<Signin/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Blog'element={<Blog/>}/>
    <Route element={<Privateprofile/>}>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/mycourse' element={<MyCourses/>}/>
     <Route path="/getregistration"element={<AdminRegistrations/>}/>
    </Route>
    <Route element={<OnlyAdmin/>}>
    <Route path="/Createpost" element={<Createpost/>}/>
    <Route path="/EditPost/:postId" element={<EditPost/>}/>
    </Route>
   </Routes>
   <Footer/>
   </BrowserRouter>

  )
}
