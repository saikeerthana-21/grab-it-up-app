import React, { useState } from "react";
import "./App.css";

function App() {

const [login,setLogin] = useState(false)
const [user,setUser] = useState("")
const [search,setSearch] = useState("")
const [category,setCategory] = useState("All")
const [selected,setSelected] = useState(null)
const [cart,setCart] = useState([])
const [orders,setOrders] = useState([])

const recipes = [

{
name:"Chicken Biryani",
category:"Lunch",
image:"https://biriyanizone.com/images/763x848_img1.png",
ingredients:[
{name:"Rice",price:80},
{name:"Chicken",price:220},
{name:"Spices",price:40}
],
steps:[
"Wash rice",
"Cook chicken masala",
"Mix rice and chicken",
"Cook for 10 minutes"
]
},

{
name:"Masala Dosa",
category:"Breakfast",
image:"https://hellotempayy.com/cdn/shop/articles/masala_dosa_1.jpg?v=1669795854",
ingredients:[
{name:"Dosa Batter",price:50},
{name:"Potato",price:30}
],
steps:[
"Prepare batter",
"Cook dosa",
"Add potato masala"
]
},

{
name:"Idli",
category:"Breakfast",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycAfCHffce6BXb4PrdLqifaFT60HKH5Fa8w",
ingredients:[
{name:"Rice",price:40},
{name:"Dal",price:30}
],
steps:[
"Prepare batter",
"Steam idli",
"Serve hot"
]
},

{
name:"Fried Rice",
category:"Lunch",
image:"https://cookingfromheart.com/wp-content/uploads/2016/02/Veg-Fried-Rice-4-500x500.jpg",
ingredients:[
{name:"Rice",price:50},
{name:"Vegetables",price:30}
],
steps:[
"Cook rice",
"Fry vegetables",
"Mix together"
]
},

{
name:"Noodles",
category:"Snacks",
image:"https://images.getrecipekit.com/20241008094433-blog-20templates-20-3.webp",
ingredients:[
{name:"Noodles",price:40}
],
steps:[
"Boil noodles",
"Add vegetables",
"Cook"
]
},

{
name:"Chicken Curry",
category:"Dinner",
image:"https://burmawalakitchen.com/wp-content/uploads/2024/07/Chicken-Curry-no-onions-1-1024x575.jpg",
ingredients:[
{name:"Chicken",price:220}
],
steps:[
"Cook masala",
"Add chicken",
"Cook 20 min"
]
},

{
name:"Samosa",
category:"Snacks",
image:"https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg",
ingredients:[
{name:"Potato",price:30}
],
steps:[
"Prepare filling",
"Fill samosa",
"Fry"
]
},

{
name:"Chole Bhature",
category:"Lunch",
image:"https://sitaramdiwanchand.com/blog/wp-content/uploads/2024/04/Image-1-1-1024x576.webp",
ingredients:[
{name:"Chole",price:60}
],
steps:[
"Cook chole",
"Prepare bhature"
]
},

{
name:"Rajma",
category:"Lunch",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7dLYNmSz8soMD4hh6Z04Agdxmw5HujeqBRQ&s",
ingredients:[
{name:"Rajma",price:60}
],
steps:[
"Soak rajma",
"Cook rajma"
]
},

{
name:"Egg Curry",
category:"Dinner",
image:"https://allwaysdelicious.com/wp-content/uploads/2024/12/egg-curry-in-pan-11.jpg",
ingredients:[
{name:"Egg",price:60}
],
steps:[
"Boil eggs",
"Prepare gravy"
]
},

{
name:"Butter Chicken",
category:"Dinner",
image:"https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken--600x600.jpg",
ingredients:[
{name:"Chicken",price:240}
],
steps:[
"Cook chicken",
"Prepare butter gravy"
]
}

]

const handleLogin=()=>{
if(user){
setLogin(true)
}else{
alert("Enter Name")
}
}

const filtered = recipes.filter(item =>
(category==="All" || item.category===category) &&
item.name.toLowerCase().includes(search.toLowerCase())
)

const addToCart=(item)=>{
setCart([...cart,item])
}

const removeFromCart=(index)=>{
setCart(cart.filter((_,i)=>i!==index))
}

const buyItem=(item)=>{
setOrders([...orders,item])
}

const buyAll=()=>{
setOrders([...orders,...cart])
setCart([])
}

const total = cart.reduce((sum,item)=>sum+item.price,0)

if(!login){
return(
<div className="login">
<h1>🍛 Recipe App</h1>
<input placeholder="Enter Name" onChange={(e)=>setUser(e.target.value)} />
<button onClick={handleLogin}>Login</button>
</div>
)
}

return(

<div className="container">

<h1>Explore Dishes</h1>

<div className="searchBox">

<input 
className="search"
placeholder="Search Dish"
onChange={(e)=>setSearch(e.target.value)}
/>

<select onChange={(e)=>setCategory(e.target.value)}>
<option>All</option>
<option>Breakfast</option>
<option>Lunch</option>
<option>Dinner</option>
<option>Snacks</option>
</select>

</div>

<div className="grid">

{filtered.map((item,index)=>(

<div className="card" key={index}>

<img src={item.image} alt="food"/>

<h3>{item.name}</h3>

<button onClick={()=>setSelected(item)}>
View Recipe
</button>

</div>

))}

</div>

{selected && (

<div className="recipe">

<h2>{selected.name}</h2>

<img src={selected.image} alt="dish"/>

<h3>Ingredients</h3>

{selected.ingredients.map((i,index)=>(

<div key={index}>

<p>{i.name} ₹{i.price}</p>

<button onClick={()=>addToCart(i)}>Add</button>

<button onClick={()=>buyItem(i)}>Buy</button>

</div>

))}

<h3>Steps</h3>

{selected.steps.map((step,index)=>(

<p key={index}>
{index+1}. {step}
</p>

))}

</div>

)}

<div className="cart">

<h2>Cart</h2>

{cart.map((item,index)=>(

<div key={index}>

<p>{item.name} ₹{item.price}</p>

<button onClick={()=>removeFromCart(index)}>
Remove
</button>

</div>

))}

<h3>Total ₹{total}</h3>

<button onClick={buyAll}>Buy All</button>

</div>

<div className="orders">

<h2>Orders</h2>

{orders.map((item,index)=>(

<p key={index}>
{item.name} ₹{item.price}
</p>

))}

</div>

</div>

)

}

export default App;
