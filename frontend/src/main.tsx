import { createRoot } from 'react-dom/client'
import Main from './pages/Main/Main.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/ModalPageLayout/ModalPageLayout.tsx'
import SignUp from "./pages/SignUp/SignUp.tsx"
import Support from './pages/Support/Support.tsx'
import SignIn from './pages/SignIn/SignIn.tsx'
import MainPageLayout from './layouts/MainPageLayout/MainPageLayout.tsx'

const router = createBrowserRouter([
    {element: <MainPageLayout />, children: [
        {path: "/", element: <Main />},
        {path: "*", element: <Main />},
    ]},
    {element: <AuthLayout />, children: [
        {path: "/support", element: <Support />},
        {path: "/signup", element: <SignUp />},
        {path: "/signin", element: <SignIn />}
    ]}
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
