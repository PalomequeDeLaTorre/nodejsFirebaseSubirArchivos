var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var micuenta=admin.firestore();
var conexionUsuarios=micuenta.collection("miejemploBD"); 
var conexionProductos=micuenta.collection("productosBD"); 

module.exports={
    conexionUsuarios,
    conexionProductos
};
