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
import Home from './pages/Home/Home.tsx'
import HomeLayout from './layouts/HomeLayout/HomeLayout.tsx'
import SpaceIntro from './pages/SpaceIntro/SpaceIntro.tsx'
import SpaceLayout from './layouts/SpaceLayout/SpaceLayout.tsx'
import Space from './pages/Space/Space.tsx'
import Members from './pages/Members/Members.tsx'
import Admins from './pages/Admins/Admins.tsx'
import OwnerSpaceSetting from './pages/OwnerSpaceSetting/OwnerSpaceSetting.tsx'
import GradeTablePage from './pages/GradeTablePage/GradeTablePage.tsx'
import Analytics from './pages/Analytics/Analytics.tsx'
import TaskGroupList from './pages/TasksGroupsList/TasksGroupsList.tsx'
import TaskGroup from './pages/TaskGroup/TaskGroup.tsx'
import TaskPage from './pages/Task/Task.tsx'
import UrgentTasks from './pages/UrgentTasks/UrgentTasks.tsx'

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
        {path: "/home", element: <Home />},
        {path: "/spaces/info/:id", element: <SpaceIntro />}
    ]},
    {element: <SpaceLayout />, children: [
        {path: "/spaces/:id", element: <Space />},
        {path: "/spaces/members", element: <Members />},
        {path: "/spaces/admins", element: <Admins />},
        {path: "/spaces/setting", element: <OwnerSpaceSetting />},
        {path: "/spaces/grade", element: <GradeTablePage />},
        {path: "/spaces/analytics", element: <Analytics />},
        {path: "/spaces/task-group-list", element: <TaskGroupList />},
        {path: "/spaces/task-group/:id", element: <TaskGroup />},
        {path: "/spaces/:id/tasks/", element: <UrgentTasks />},
        {path: "/spaces/task-group/tasks/:id", element: <TaskPage/>}
    ]}
])

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)
