import react from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Base from "./pages/Base"
import Create_Product from "./pages/Create_Product"
import Bank from "./pages/Bank"
import Cart from "./pages/Cart"

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function BaseWay() {
  localStorage.clear()
  return <Base />
}

function BankApp() {
  return <Bank />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home/:username"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        <Route path="/" element={<BaseWay />}></Route>
        <Route path="/products" element={<Create_Product />}></Route>
        <Route path="/bank/:username" element={<BankApp />}></Route>
        <Route path="/cart/:username" element={<Cart />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App