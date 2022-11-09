const esAdministrador = (administrador) => {
    return (req, res, next) => {
        if(administrador === true){
            next();
        }else{
            res.send({status:"error",error: `ruta /api/productos${req.url} método ${req.method} no autorizado`})
        }
    }
}

module.exports = esAdministrador