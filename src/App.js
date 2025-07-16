import Header from "../src/components/Header/header";
import Home from "./pages/Home";
import "../src/Global/GlobalStyle.scss";
import "./App.scss"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from "./components/Footer/footer";
import About from "./pages/About/about";
import ProductsList from "./pages/Products";
import Contact from "./pages/Contact";
import ProductsDetail from "./pages/Products/ProductsDetail";
import MyManage from "./pages/My/Manage";
import MySpend from "./pages/My/Spend";
import MyReview from "./pages/My/Review";
import MyInfo from "./pages/My/Info";
import News from "./pages/News/";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/Order/OrderSuccess";
import Register from "./pages/Register";
import ManagePage from "./pages/Admin";
import Banner from "./components/Banner/banner";
import NewDetail from "./pages/News/NewDetail";
import Policy from "./pages/Policy";
import ProductsCate from "./pages/Products/ProductsCate";
import LoginAdmin from "./pages/Admin/Login";
import { useEffect, useState } from "react";
import Search from "./pages/Search";

function AppWrapper() {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname) || location.pathname.startsWith('/admin');
  const banner = location.pathname;
  const success = location.pathname;
  const [cb, setCB] = useState(false);
  const [cart, setCart] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL
  useEffect(() => {
    fetch(`${apiURL}/cart`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setCart(data))
    console.log('again');
    
    setCB(false)
  }, [cb]);

  return (
    <div className="App">
      {!hideLayout && <Header cart={cart.length}/>}
      {banner === "/" && <Banner props={true}/>}
      <div className={success === '/order/success' && 'container_order_sucess'}></div>
      <div className={hideLayout ? 'admin_container' : 'container'}>
        <div className='container_child'>
          <Routes>
            <Route path="/" element={<Home setCB={setCB}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewDetail />} />
            <Route path="/products" element={<ProductsList setCB={setCB}/>} />
            <Route path="/order" element={<Order setCB={setCB}/>} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/cart" element={<Cart setCB={setCB}/>} />
            <Route path="/products/:id" element={<ProductsDetail setCB={setCB}/>} />
            <Route path="/category" element={<ProductsCate setCB={setCB}/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my/manage" element={<MyManage />} />
            <Route path="/my/spend" element={<MySpend />} />
            <Route path="/my/review" element={<MyReview />} />
            <Route path="/my/info" element={<MyInfo />} />
            <Route path="/my/info/:method" element={<MyInfo />} />
            <Route path="/policy/:type" element={<Policy />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/search" element={<Search />} />

            {/* Manage page */}
            <Route path="/admin" element={<ManagePage />}></Route>
            <Route path="/admin/products" element={<ManagePage />}></Route>
            <Route path="/admin/orders" element={<ManagePage />}></Route>
            <Route path="/admin/users" element={<ManagePage />}></Route>
            <Route path="/admin/dash" element={<ManagePage />}></Route>
            <Route path="/admin/contact" element={<ManagePage />}></Route>
            <Route path="/admin/reviews" element={<ManagePage />}></Route>
            <Route path="/admin/cate" element={<ManagePage />}></Route>
            <Route path="/admin/news" element={<ManagePage />}></Route>
            <Route path="/admin/add/:id" element={<ManagePage />}></Route>
            <Route path="/admin/edit" element={<ManagePage />}></Route>
            <Route path="/admin/contact" element={<ManagePage />}></Route>
            {/* <Route path="/admin/revenue" element={<ManagePage />}></Route> */}
          </Routes>
        </div>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
