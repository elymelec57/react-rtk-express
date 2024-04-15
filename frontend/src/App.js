import './App.css';
import EmployesList from './componets/EmployesList';
import FormEmploye from './componets/formEmployes';
import Register from './componets/Register';
import Login from './componets/Login';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import ProtectedRouter from './protectedRoute/ProtectedRoute';
import Profile from './componets/Profile';
import Auth from './protectedRoute/Auth';

function App() {
  return (
    <div className="">
      <div className='flex items-center justify-center h-full'>
      <BrowserRouter>
        <Routes>
          <Route element={< Auth />}>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Route>

          <Route element={< ProtectedRouter />}>
            <Route path='/employes' element={<EmployesList/>}></Route>
            <Route path='/create' element={<FormEmploye/>}></Route>
            <Route path='/edit/:id' element={<FormEmploye/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
