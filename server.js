import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ContainerFake from './src/containers/ContainFake.js';
import FSContainer from './src/containers/ContainFs.js';
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productos = new ContainerFake();
const mensajes = new FSContainer('./mensajes.json');

// conexión con socket
io.on('connection', async (socket) => {
	console.log('Un cliente se ha conectado');

	const chat = await mensajes.traeMensajesNormalizados();
	console.log(chat);
	socket.emit('chat', chat);

	socket.on('new-message', async (data) => {
		await mensajes.save(data);
		const chat = await mensajes.traeMensajesNormalizados();
		io.sockets.emit('chat', chat);
	});
});
app.set("views", path.join(__dirname, "/views"));
app.use("/", express.static(path.join(__dirname, "/views")))
const hbs = handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + "/views",
})
app.engine("hbs", hbs);
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render("index", {layout:"chat"});
});


app.get('/api/productos-test', (req, res) => {
	res.json(productos.traerProductos());
});

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => {
	console.log(
		`Servidor Http con Websockets en el puerto ${srv.address().port}`
	);
});
srv.on('error', (error) => console.log(`Error en servidor ${error}`));