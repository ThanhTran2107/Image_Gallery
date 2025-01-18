import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageUploadPage } from './pages/ImageUploadPage';

function App() {
  return (
    <div>
      <ImageUploadPage />
      <ToastContainer />
    </div>
  );
}

export default App;
