import { ImageListingPage } from './pages/image-listing-page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ImageListingPage />
      <ToastContainer />
    </div>
  );
}

export default App;
