import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./utils/PrivateRoute";
import { Page404 } from "./components/404/Page404";
import { Auth } from "./components/404/auth/Auth";
import { Restaurant } from "./components/restaurant/Restaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/restaurant" element={<Restaurant />}></Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/" element={<Auth />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
