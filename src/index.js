import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from '~/components/GlobalStyles';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <ConfigProvider locale={viVN}>
                <App />
            </ConfigProvider>
        </GlobalStyles>
    </React.StrictMode>,
);

reportWebVitals();
