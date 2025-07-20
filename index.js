import express from "express"
import dotenv from "dotenv"
import path from "path"
import ContactRoutes from "./routes/contacts.routes.js"
import { fileURLToPath } from 'url';
import { connectDB } from "./config/database.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Connection
connectDB()

// Middleware
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

// Routes
app.use("/",ContactRoutes)

app.listen(PORT, () => {
  console.log(`Server started Successfully on port ${PORT}.`)
})