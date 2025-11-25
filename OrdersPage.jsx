
import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function OrdersPage(){
  const [orders,setOrders]=useState([])
  useEffect(()=> axios.get('/api/orders').then(r=>setOrders(r.data)),[])
  function updateStatus(id,status){ axios.put('/api/orders/'+id,{status}).then(()=> axios.get('/api/orders').then(r=>setOrders(r.data))) }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Orders</h2>
      </div>
      <div className="panel">
        <table className="table">
          <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr></thead>
          <tbody>
            {orders.map(o=>(
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.customer}</td><td>${o.total}</td><td>{o.status}</td><td>{o.date}</td>
                <td style={{textAlign:'right'}}>
                  <button className="btn-ghost" onClick={()=>updateStatus(o.id,'Shipped')}>Mark Shipped</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
