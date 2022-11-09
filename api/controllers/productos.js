const fs = require('fs')
const filename = '../../files/productos.json';
const path = require('path');
    
// save(Object): Number - Recibe un objeto, lo guarda en el file, devuelve el id asignado.
const save = async (objProduct)  =>{
    let productos = [];
    const data = await fs.promises.readFile(path.resolve(__dirname, `${filename}`),"utf-8")
    if(data){
        productos = JSON.parse(data);
        const id = productos.length +1;
        objProduct.id = id;
        objProduct.timestamp = Date.now();     
        productos.push(objProduct);
            let productsString = JSON.stringify(productos);
            await fs.promises.writeFile(path.resolve(__dirname, `${filename}`), productsString);
            return objProduct;
        }
        else{
            objProduct.id = 1;        
            objProduct.timestamp = Date.now();   
            productos.push(objProduct);
            const productsString = JSON.stringify(productos);
            await fs.promises.writeFile(path.resolve(__dirname, `${filename}`), productsString);
            return objProduct;
        }      
}

// Metodo getById(Number)
const getById = async (id) => {
    if (fs.existsSync(path.resolve(__dirname, `${filename}`))){
        const data = fs.readFileSync(path.resolve(__dirname, `${filename}`), 'utf-8');
        if (data) {
            const dataParseada = JSON.parse(data);
            const producto = dataParseada.find((producto) => producto.id == id);
            if (producto) {
                return producto;
            }
        }
    }
    return {"mensaje": "Producto no encontrado"};
}

// Metodo getAll()
const getAll = async () =>{
    if (fs.existsSync(path.resolve(__dirname, `${filename}`))){
        const data = fs.readFileSync(path.resolve(__dirname, `${filename}`), 'utf-8');
        if (data) {
            const dataParseada = JSON.parse(data);
            return dataParseada;
        }else{
            return {"mensaje": "Productos no encontrados"};
        }
    }
    return  {"mensaje": "Archivo no encontrado"};
}

// Metodo deleteById(Number)
const deleteById = async (id) => {
    if (fs.existsSync(path.resolve(__dirname, `${filename}`))){
        const data = fs.readFileSync(path.resolve(__dirname, `${filename}`), "utf-8");
        const dataParseada = JSON.parse(data);
        const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
        const dataString = JSON.stringify(dataFiltrada);
        fs.writeFileSync(path.resolve(__dirname, `${filename}`), dataString);
        return {"mensaje": "Producto borrado"};
    }
}

// Metodo updateById(id, prodcut)
const updateById = async (id, productNew)=> {
    if (fs.existsSync(path.resolve(__dirname, `${filename}`))){
        const data = fs.readFileSync(path.resolve(__dirname, `${filename}`), 'utf-8');
        const dataParseada = JSON.parse(data);
        if (dataParseada) {
            const producto = dataParseada.find((producto) => producto.id == id);
            if (producto) {
                const productToUpdate = { id, timestamp, ...productNew };
                let productFiltered = dataParseada.filter((objeto) => objeto.id !== id);
                productFiltered.push(productToUpdate);
                const dataString = JSON.stringify(productFiltered);
                console.log(dataString);
                fs.writeFileSync(path.resolve(__dirname, `${filename}`), dataString);
                return productToUpdate;
            }
        }
    }
    return {"mensaje": "Producto no encontrado"};
}

module.exports = {
    save,
    getById,
    getAll,
    deleteById,
    updateById
};

