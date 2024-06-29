import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import ErrorElement from "./components/ErrorElement";
import Home from "./pages/Home";
import Login from "./components/Login";
import { loginLoader, verifyLoader } from "./loaders/verifyLoader";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import AddPerson from "./pages/Admin/AddPerson";
import AddGrievance from "./pages/Admin/AddGrievance";
import ViewGrievance from "./pages/Admin/ViewGrievance";
import RaiseGrievence from "./pages/Employee/RaiseGrievence";
import ViewAllGrievance from "./pages/Admin/ViewAllGrievance";
import AdminGrievence from "./pages/Admin/Grievance";
import EmployeeViewAllGrievance from "./pages/Employee/ViewAllGrievance";
import EmployeeGrievance from "./pages/Employee/Grievance";
import HRViewAllGrievance from './pages/HR/ViewAllGrievance'
import HRGrievance from './pages/HR/Grievance';

function Main() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      loader: loginLoader,
    },
    {
      path: "/admin",
      element: <Home />,
      loader: verifyLoader,
      errorElement: <ErrorElement />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "hr", element: <AddPerson /> },
        { path: "grievance", element: <AddGrievance /> },
        { path: "allgrievance", element: <ViewGrievance /> },
        { path: "allgrievance/:hrId", element: <ViewAllGrievance /> },
        { path: "allgrievance/view/:id", element: <AdminGrievence /> },
      ],
    },
    {
      path: "/employee",
      element: <Home />,
      loader: verifyLoader,
      errorElement: <ErrorElement />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "grievance", element: <RaiseGrievence /> },
        { path: "allgrievance", element: <EmployeeViewAllGrievance /> },
        { path: "allgrievance/view/:id", element: <EmployeeGrievance /> },
      ],
    },
    {
      path: "/hr",
      element: <Home />,
      loader: verifyLoader,
      errorElement: <ErrorElement />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "allgrievance", element: <HRViewAllGrievance /> },
        { path: "allgrievance/view/:id", element: <HRGrievance /> },
      ],
    },
    {
      path: "*",
      element: <ErrorElement />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

const App = () => {
  const value = {
    ripple: true,
  };
  return (
    <>
      <PrimeReactProvider value={value}>
        <Main />
      </PrimeReactProvider>
    </>
  );
};

export default App;
