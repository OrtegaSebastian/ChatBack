import normalizeData from '../utils/normalizeData.js';

class FSContainer {
    // * get, post, put, delete
    // * CRUD
    constructor(ruta) {
        this.ruta = ruta;
    }

    async traeArchivo() {
		try {
			const archivo = JSON.parse(
				await fs.promises.readFile(this.ruta, 'utf-8')
			);
			return archivo;
		} catch (error) {
			console.log(error);
			return [];
		}
	}

    async traeMensajesNormalizados() {
		const archivo = await this.traeArchivo();
		return normalizeData(archivo);
	}

	async save(mensaje) {
		const archivo = await this.traeArchivo();
		const mensajes = archivo.mensajes;
		mensajes.push({ ...mensaje });
		try {
			await fs.promises.writeFile(this.ruta, JSON.stringify(archivo));
		} catch (error) {
			throw new Error(`Hubo un error al guardar el archivo ${error}`);
		}
	}
}


export default FSContainer;