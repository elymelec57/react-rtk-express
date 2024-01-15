import './App.css';
import EmployesList from './componets/EmployesList';
import FormEmploye from './componets/formEmployes';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className='flex items-center justify-center h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployesList/>}></Route>
          <Route path='/create' element={<FormEmploye/>}></Route>
          <Route path='/edit/:id' element={<FormEmploye/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
