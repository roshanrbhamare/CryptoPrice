import express from "express"
import ejs from "ejs"
import axios from "axios"
const port=3000
const app= express()

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/p", async (req,res)=>{
    try{
        let sy =req.body.code.trim()
        sy=sy.toUpperCase();
        console.log(req.body.code)
       const result= await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${sy}-USD`)
       const d= result.data
       console.log(d);
       res.render("index.ejs", {blockType:d.symbol, price:d.last_trade_price })
    }
    catch{
        res.render("index.ejs",{para:"This CryptoCurrency data is not available"})
    }
})

app.listen(port, ()=>{
    console.log(`app is listening on http://localhost:${port}`)
})