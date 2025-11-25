
import React, {useState} from 'react'
import DashboardPage from './components/DashboardPage'
import ProductsPage from './components/ProductsPage'
import OrdersPage from './components/OrdersPage'

export default function App(){
  const [route, setRoute] = useState('dashboard')
  return (
    <div>
      <header className="header"><div className="logo">متجر الإلكترونيات — لوحة التحكم</div></header>
      <div className="layout">
        <aside className="sidebar">
          <div className={"nav-item "+(route==='dashboard'?'active':'')} onClick={()=>setRoute('dashboard')}>Dashboard</div>
          <div className={"nav-item "+(route==='products'?'active':'')} onClick={()=>setRoute('products')}>Products</div>
          <div className={"nav-item "+(route==='orders'?'active':'')} onClick={()=>setRoute('orders')}>Orders</div>
          <div style={{height:12}}></div>
          <div className="footer-note">Signed in as <strong>Admin</strong></div>
        </aside>
        <main className="main">
          {route==='dashboard' && <DashboardPage/>}
          {route==='products' && <ProductsPage/>}
          {route==='orders' && <OrdersPage/>}
        </main>
      </div>
    </div>
  )
}
