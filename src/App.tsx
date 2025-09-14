import { AppRoutes } from './routes/AppRoutes';
import './App.css'
import { Toaster } from "sonner";

function App() {

  return (
    <>
      <AppRoutes />
      <Toaster
        theme="dark"
        closeButton          
        position="top-center"
      />
    </>
  );

}

export default App
