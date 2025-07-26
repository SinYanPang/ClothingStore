import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Product from './src/product.jsx'
import Customer from './src/Customer.jsx'
import Order from './src/order.jsx'
import Signup from './src/Signup.jsx'
import Signin from './src/Signin.jsx'
import Signout from './src/Signout.jsx'

const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/order" element={<Order />} />
        

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </div>
  )
}

export default MainRouter
