
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Header />
  }
])
function App() {

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
