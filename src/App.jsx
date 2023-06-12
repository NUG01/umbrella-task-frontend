import { Route, Routes } from "react-router-dom";
import AddCategoryPage from "./pages/AddCategoryPage";
import AddProductPage from "./pages/AddProductPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/admin" element={<AdminPage />}>
        <Route path="add-product" element={<AddProductPage />}></Route>
        <Route path="add-category" element={<AddCategoryPage />}></Route>
      </Route>
    </Routes>
  );
}
export default App;
