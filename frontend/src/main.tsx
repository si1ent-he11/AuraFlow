import { createRoot } from 'react-dom/client'
import Main from './pages/Main/Main.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {path: "/", element: <Main />},
    {path: "*", element: <Main />}
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
