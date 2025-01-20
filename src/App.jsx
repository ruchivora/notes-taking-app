import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {

  return (
    <div className="notesApp">
      <h2>Secure Notes App</h2>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
