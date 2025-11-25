
import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function ProductsPage(){
  const [products,setProducts]=useState([])
  const [query,setQuery]=useState('')
  const [editing,setEditing]=useState(null)
  const [form,setForm]=useState({name:'',price:'',category:'',stock:'',sku:''})
  function load(){ axios.get('/api/products').then(r=>setProducts(r.data)) }
  useEffect(load,[])
  function startAdd(){ setEditing(null); setForm({name:'',price:'',category:'',stock:'',sku:''}) }
  function startEdit(p){ setEditing(p.id); setForm(p) }
  function remove(id){ if(!confirm('حذف المنتج؟')) return; axios.delete('/api/products/'+id).then(load) }
  function submit(e){ e.preventDefault(); const payload = {...form, price:Number(form.price), stock:Number(form.stock)}; if(editing) axios.put('/api/products/'+editing,payload).then(load); else axios.post('/api/products',payload).then(load); setEditing(null); setForm({name:'',price:'',category:'',stock:'',sku:''}) }
  const filtered = products.filter(p=> p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()) || (p.sku||'').toLowerCase().includes(query.toLowerCase()))
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Manage Products</h2>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div className="search"><input placeholder="Search products by name, category, sku" value={query} onChange={e=>setQuery(e.target.value)} /></div>
          <button className="btn-primary" onClick={startAdd}>Add Product</button>
        </div>
      </div>
      <div className="panel" style={{marginBottom:16}}>
        <table className="table">
          <thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>SKU</th><th></th></tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td>{p.name}</td><td>${p.price}</td><td>{p.category}</td><td>{p.stock}</td><td>{p.sku}</td>
                <td style={{textAlign:'right'}}>
                  <button className="btn-ghost" onClick={()=>startEdit(p)}>Edit</button>
                  <button className="btn" style={{marginLeft:8,background:'#e44',color:'#fff'}} onClick={()=>remove(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h3>{editing? 'Edit Product' : 'Add Product'}</h3>
        <form className="form" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required />
          <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} required />
          <input placeholder="SKU" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} />
          <button className="btn-primary" style={{marginTop:8}}>{editing? 'Save changes':'Create product'}</button>
        </form>
      </div>
    </div>
  )
}
