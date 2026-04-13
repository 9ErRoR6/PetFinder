import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ScrollToTop from './components/ScrollToTop/index.tsx'
import './index.css'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
				<App />
		</BrowserRouter>
  </Provider>
)
