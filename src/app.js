import express from 'express';
import productsRoute from './routes/products.routes.js';
import cartsRoute from './routes/carts.routes.js';
import loginRoute from './routes/users.routes.js';
import views from './routes/views.routes.js';
import { Server } from "socket.io";
import { Products, Chat } from './dao/Factory.js';
import __dirname from './utils.js';
import config from './config/config.js';
import cluster from 'cluster';
import os from 'os'
import { addLogger, logger } from './services/LoggerService.js';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import cookieParser from 'cookie-parser'

const app = express()
const PORT = config.app.port || 8080;
const CPUs = os.cpus().length;
const procArgv = process.argv[2];

if(procArgv == 'CLUSTER') {
    if(cluster.isPrimary) {
        logger.info(`Proceso primario con PID ${process.pid} ejecutandose`)
        for (let i = 0; i < (CPUs/2); i++) {
            cluster.fork()
        }
    } else {
        logger.info(`Proceso worker con PID ${process.pid} ejecutandose`)
        app.listen(PORT, () => console.log("Listening..."))
    }
} else {
    logger.info(`Proceso PID ${process.pid} ejecutandose`)
    const server = app.listen(PORT, () => console.log("Listening..."))

    const io = new Server(server)

    const productos = new Products
    const chatMessage = new Chat

    io.on('connection', async socket => {
        logger.info('Socket has been connected')

        io.emit('productos', await productos.getAll())

        socket.on('message', async data => {
            await chatMessage.save(data)
            const message = await chatMessage.getAll()
            socket.emit('logs', message)
            io.emit('logs', message)
        })

        socket.on('authenticated', data => {
            socket.broadcast.emit('newUserConnected', data)
        })
    })
}

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Proyecto Ecommerce de Backend con React Js',
            description: 'API privada para el uso de un ecommerce'
        }
    },
    apis: [ `${__dirname}/docs/**/*.yaml` ]
}

const specs = swaggerJSDoc(swaggerOptions)

// conecta con el logger
app.use(addLogger)

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// <--- RUTAS --->
app.use('/', views)
app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))
app.use('/api/products', productsRoute)
app.use('/api/carts', cartsRoute)
app.use('/api', loginRoute)

// * son rutas que no existen
app.get('*', (req, res) => {
    const warn = "No existe la ruta"
    req.logger.warning(`Método ${req.method} en ${req.url} - ${warn}`)
    res.status(400).send({status: "error", error: warn})
})