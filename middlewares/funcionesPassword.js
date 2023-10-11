var crypto =  require("crypto");

function encriptarPassword(password){
    var salt=crypto.randomBytes(32);
    var hash=crypto.scryptSync(password,salt,100000,64,'sha512').toString('hex');
    return {
        salt, 
        hash
    }
}

function validarPassword(password, hash, salt){
    var hashEvaluar=crypto.scryptSync(password,salt,100000,64,'sha512').toString('hex');
    return hashEvaluar === hash

}

//var {salt,hash}=encriptarPassword("hola");
//console.log(hash);
//console.log(validarPassword("hola", hash, salt));

module.exports={
    encriptarPassword,
    validarPassword
}