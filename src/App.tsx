import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./utils/PrivateRoute";
import { Page404 } from "./components/404/Page404";
import { Auth } from "./components/auth/Auth";
import { Restaurant } from "./components/restaurant/Restaurant";
import { Order } from "./components/restaurant/Order/Order";
import { Recipes } from "./components/restaurant/Recipes/Recipes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/restaurant" element={<Restaurant />}></Route>
          <Route path="/restaurant/order" element={<Order />}></Route>
          <Route path="/restaurant/order/:id" element={<Recipes />}></Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/" element={<Auth />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
