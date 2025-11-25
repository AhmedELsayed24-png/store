
import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function DashboardPage(){
  const [products,setProducts]=useState([])
  const [orders,setOrders]=useState([])
  useEffect(()=>{ axios.get('/api/products').then(r=>setProducts(r.data)); axios.get('/api/orders').then(r=>setOrders(r.data)) },[])
  return (
    <div>
      <div className="top-cards">
        <div className="card"><h3>إجمالي المبيعات</h3><p>${orders.reduce((s,o)=>s+o.total,0)}</p></div>
        <div className="card"><h3>إجمالي الطلبات</h3><p>{orders.length}</p></div>
        <div className="card"><h3>المنتجات</h3><p>{products.length}</p></div>
      </div>
      <div className="panel">
        <h2>آخر الطلبات</h2>
        <table className="table">
          <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {orders.map(o=>(
              <tr key={o.id}><td>{o.id}</td><td>{o.customer}</td><td>${o.total}</td><td>{o.status}</td><td>{o.date}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
