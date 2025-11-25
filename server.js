
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Premium Laptop Pro", price: 2199, category: "Laptops", stock: 25, sku: "LP-PRO-01" },
  { id: 2, name: "UltraPhone X", price: 1199, category: "Smartphones", stock: 120, sku: "UP-X-11" },
  { id: 3, name: "NoiseCancel Headphones", price: 299, category: "Audio", stock: 200, sku: "NC-200" }
];

let orders = [
  { id: 101, customer: "Aisha", total: 2199, status: "Processing", date: "2025-11-20" },
  { id: 102, customer: "Omar", total: 1498, status: "Shipped", date: "2025-11-21" }
];

app.get('/api/products', (req,res)=> res.json(products));
app.post('/api/products', (req,res)=> {
  const p = { id: Date.now(), ...req.body };
  products.push(p);
  res.json(p);
});
app.put('/api/products/:id', (req,res)=> {
  const id = Number(req.params.id);
  products = products.map(p => p.id===id ? {...p, ...req.body} : p);
  res.json({ok:true});
});
app.delete('/api/products/:id', (req,res)=> {
  const id = Number(req.params.id);
  products = products.filter(p => p.id!==id);
  res.json({ok:true});
});

app.get('/api/orders', (req,res)=> res.json(orders));
app.put('/api/orders/:id', (req,res)=> {
  const id = Number(req.params.id);
  orders = orders.map(o => o.id===id ? {...o, ...req.body} : o);
  res.json({ok:true});
});

app.listen(4000, ()=> console.log('Backend running on http://localhost:4000'));
