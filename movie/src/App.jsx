import "./App.css";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MovieId from "./components/MovieId";
import Popular from "./components/Popular";
import Series from "./components/Series";
import Trending from "./components/Trending";
const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Home />} />
        <Route path="movies/:id" element={<MovieId />} />
        <Route path="/series" element={<Series />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
      </Route>
    )
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
