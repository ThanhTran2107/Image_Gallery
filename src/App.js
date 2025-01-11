import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageListingPage } from './pages/image-listing-page';

function App() {
  return (
    <>
      <ImageListingPage />
      <ToastContainer />
    </>
  );
}

export default App;
