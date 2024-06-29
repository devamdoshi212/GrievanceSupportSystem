import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import ErrorElement from "./components/ErrorElement";
import Home from "./pages/Home";
import Login from "./components/Login";
import { loginLoader, verifyLoader } from "./loaders/verifyLoader";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";

function Main() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      loader: loginLoader,
    },
    {
      path: "/register",
      element: <Register />,
      // loader: loginLoader,
    },
    {
      path: "/admin",
      element: <Home />,
      loader: verifyLoader,
      errorElement: <ErrorElement />,
      children: [
        { path: "", element: <Dashboard /> },
        // { path: "institutes", element: <Institutes /> },
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
