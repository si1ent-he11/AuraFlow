import { createRoot } from 'react-dom/client'
import Main from './pages/Main/Main.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ModalPageLayout from './layouts/ModalPageLayout/ModalPageLayout.tsx'
import SignUp from "./pages/SignUp/SignUp.tsx"
import Support from './pages/Support/Support.tsx'
import SignIn from './pages/SignIn/SignIn.tsx'
import MainPageLayout from './layouts/MainPageLayout/MainPageLayout.tsx'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import HomePage from './pages/HomePage/HomePage.tsx'
import HomeLayout from './layouts/HomeLayout/HomeLayout.tsx'

const router = createBrowserRouter([
    {element: <MainPageLayout />, children: [
        {path: "/", element: <Main />},
        {path: "*", element: <Main />},
    ]},
    {element: <ModalPageLayout />, children: [
        {path: "/support", element: <Support />},
        {path: "/signup", element: <SignUp />},
        {path: "/signin", element: <SignIn />},
        {path: "/error", element: <ErrorPage />}
    ]},
    {element: <HomeLayout />, children: [
        {path: "/home", element: <HomePage />}
    ]}
])

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)
