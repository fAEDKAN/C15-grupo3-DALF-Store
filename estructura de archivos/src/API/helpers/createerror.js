module.exports=(status, msg)=>{

    let error = new Error(msg);
    error.status = status;

    return error
}