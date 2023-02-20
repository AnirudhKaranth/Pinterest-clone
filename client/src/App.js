import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth';
import CreatePin from './components/CreatePin';
import CreatorProfile from './components/CreatorProfile';
import DeleteAccount from './components/DeleteAccount';
import EditProfile from './components/EditProfile';
import Home from './components/Home'
import Landing from './components/Landing';
import PinDetails from './components/PinDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Today from './components/Today';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute> }/>
      <Route path='/delete-account' element={<ProtectedRoute><DeleteAccount/> </ProtectedRoute> }/>
      <Route path='/today' element={<ProtectedRoute><Today/></ProtectedRoute>}/>
      <Route path='/userProfile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
      <Route path='/createPin' element={<ProtectedRoute><CreatePin/></ProtectedRoute>}/>
      <Route path='/editProfile/:id' element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
      <Route path='/creatorProfile/:id' element={<ProtectedRoute><CreatorProfile/></ProtectedRoute>}/>
      <Route path='/pinDetail/:id' element={<ProtectedRoute><PinDetails/></ProtectedRoute>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
