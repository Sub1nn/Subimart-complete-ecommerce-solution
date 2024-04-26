import express from "express"
import userRoutes from "./user/user.route.js"
import { connectDb } from "./connect.db.js"
import productRoutes from "./product/product.route.js"
import cartRoutes from "./cart/cart.route.js"
import orderRoutes from "./order/order.route.js"
import paymentRoutes from "./payment/payment.route.js"
import cors from "cors"

const app = express()

// to make app understand json
app.use(express.json())

//cors
app.use(cors())

// connect database
connectDb()

// register routes
app.use(userRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(paymentRoutes)
app.use(orderRoutes)

// port
const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
