import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

import { ImageListingPage } from './pages/image-listing-page';

function App() {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <ImageListingPage />
    </ConfigProvider>
  );
}

export default App;
