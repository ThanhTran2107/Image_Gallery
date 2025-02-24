import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import React from 'react';

import { IntlProvider } from 'contexts/intl-provider.context';
import { LocaleProvider } from 'contexts/locale.context';

import { ImageListingPage } from './pages/image-listing-page';

function App() {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <LocaleProvider>
        <IntlProvider>
          <ImageListingPage />
        </IntlProvider>
      </LocaleProvider>
    </ConfigProvider>
  );
}

export default App;
