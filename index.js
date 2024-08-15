import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import { ROUTES } from "./config/route-constants.js";
import { pearlRoute } from "./api/routes/routes.js";
import path from 'path'


const swaggerDocument=JSON.parse(fs.readFileSync(path.resolve('./api/swagger.json'),'utf-8'));

dotenv.config()

const app=express();
app.use(express.json());

app.use(ROUTES.SWAGGER_ROUTE,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
)

app.use(cors())

app.use(ROUTES.BASE_ROUTE,pearlRoute)

export default app