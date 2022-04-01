import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
const AllProducts = React.lazy(() => import("./Pages/AllProducts"));
const ProductsList = React.lazy(() => import("./Pages/ProductsList"));
const AddProducts = React.lazy(() => import("./Pages/AddProducts"));
const queryClient = new QueryClient();
const App = () => (
  <div className="mr-8 ml-8">
    <QueryClientProvider client={queryClient}>
      <Header />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="list" element={<ProductsList />} />
          <Route path="add" element={<AddProducts />} />
        </Routes>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
