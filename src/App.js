import './App.css';
import { Route , Routes } from 'react-router-dom'
import FormCompo from './components/FormCompo';
import DataTable from './components/DataTable';
import { Link } from 'react-router-dom';
function App() {
  return (
   <>
    <div className='md:flex '>
      <div className='md:w-4/5 pt-24'>
      <Routes>
        <Route path='/' element = {<FormCompo/>}/>
        <Route path='/all' element = {<DataTable/>}/>

      </Routes>
      </div>
      <div className="md:w-1/5 w-full md:bg-gray-200 p-4 fixed md:right-0 gap-5 md:h-full flex justify-center md:justify-start md:flex-col ">
      <Link to="/"  className=" bg-blue-500 text-white py-2 px-4 rounded">Add Data</Link>
      <Link to="/all"  className="bg-blue-500 text-white py-2 px-4 rounded">View all Data</Link>
  </div>
  </div>
   </>
  );
}

export default App;
