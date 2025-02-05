import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageListingPage } from './pages/image-listing-page';

function App() {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <ImageListingPage />
      <ToastContainer />
    </ConfigProvider>
  );
}

export default App;
