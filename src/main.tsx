import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import { AppRouter } from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <RouterProvider router={AppRouter} />
            </StyledEngineProvider>
        </Provider>
    </StrictMode>,
)
