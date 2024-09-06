import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // QueryClient와 QueryClientProvider 가져오기
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import reportWebVitals from './reportWebVitals';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// ReactDOM.render 호출
const root = ReactDOM.createRoot(document.getElementById('root'));

// App 컴포넌트를 QueryClientProvider로 감싸기
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// 성능 측정을 시작하려면 reportWebVitals를 호출합니다.
reportWebVitals();
