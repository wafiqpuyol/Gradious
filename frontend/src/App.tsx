import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  }
])
const App = () => {

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App;
