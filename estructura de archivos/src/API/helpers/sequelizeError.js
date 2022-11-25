module.exports = (error) => { // recibe el error
    if(!error.errors){ // si no contiene un array de errores
        return error.message || "Se encontró un error, por favor, comuníquese con el administrador" // retornamos mensaje de error, si no tiene, lo asignamos por defecto
    }

    let errorsObject = {}
    
    error.errors.forEach(error => { // recorremos la estructura de los errores que vienen de sequelize
        errorsObject = {
            ...errorsObject,
            [error.path] : error.message // error.path es el error que viene de un determinado campo (ej: name, email, etc)
        }
    });

    return errorsObject;
}