var conexion=require("./conexion").conexionUsuarios;
var Usuario=require("../modelos/Usuario");

async function mostrarUsuarios(){
    var users=[];
    try{
        var usuarios=await conexion.get();
        usuarios.forEach(usuario => {
            var user=new Usuario(usuario.id, usuario.data());
            if (user.bandera === 0){
                users.push(user.obtenerDatos);
    
            }
            
        });  

    }

    catch(err){
        console.log("Error al recuperar usuarios de la base de datos"+err);

    }

    return users;
 
}

async function buscarPorID(id){
    var user;

    try {
        var usuario=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuario.id, usuario.data());
        if (usuarioObjeto.bandera === 0){
            user=usuarioObjeto.obtenerDatos;
        }

    }

    catch(err){
        console.log("Error al recuperar al usuario" + err);
        
    }

    return user;

}

async function nuevoUsuario(datos){
    var user=new Usuario(null,datos);
    console.log(user);
    var error=1;
    if (user.bandera === 0){
    try{ 
        await conexion.doc().set(user.obtenerDatos);
        console.log("Usuario insertado a la BD");
        error=0;
    }

    catch(err){
        console.log("Error al capturar al nuevo usuario"+err);

    }

  }
  return error;

}

async function modificarUsuario(datos){
    var error=1;
    var respuestaBuscar=await buscarPorID(datos.id);
    if(respuestaBuscar!=undefined){
    var user=new Usuario(datos.id,datos)
    if (user.bandera === 0){
        try{
            await conexion.doc(user.id).set(user.obtenerDatos);
            console.log("Usuario actualizado");
            error=0;

        }
        catch(err){
            console.log("Error al modificar el usuario"+err);

        }
    }

}
    return error;

}

async function borrarUsuario(id){
    var error=1;
    var user=await buscarPorID(id);
    if(user!=undefined){
    try{
        await conexion.doc(id).delete();
        console.log("Usuario borrado");
        error=0;
    }

    catch(err){
        console.log("Error al borrar el usuario" + err);

    }

    }

    return error;

}

module.exports={
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario
}