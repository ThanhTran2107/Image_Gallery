import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import React from 'react';

import { ImageListingPage } from 'pages/image-listing-page';

import { queryClient } from 'utilities/constant';

import { IntlProvider } from 'contexts/intl-provider.context';
import { LocaleProvider } from 'contexts/locale.context';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ hashed: false }}>
        <LocaleProvider>
          <IntlProvider>
            <ImageListingPage />
          </IntlProvider>
        </LocaleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
