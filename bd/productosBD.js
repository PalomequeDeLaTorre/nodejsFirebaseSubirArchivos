var conexion=require("./conexion").conexionProductos;
var Producto=require("../modelos/Producto");

async function mostrarProductos(){
    var products=[];
    try{
       
        var productos=await conexion.get();
        productos.forEach(producto => {
            var product=new Producto(producto.id, producto.data());
            if (product.bandera === 0){
                products.push(product.obtenerDatosP());
              
            }
            
        });  

    }

    catch(err){
        console.log("Error al recuperar usuarios de la base de datos"+err);

    }

    return products;
 
}

async function buscarProductoPorID(id){
    var product;

    try {
        var producto=await conexion.doc(id).get();
        var productoObjeto=new Producto(producto.id, producto.data());
        if (productoObjeto.bandera === 0){
            product=productoObjeto.obtenerDatosP();
            console.log(product);
        }

    }

    catch(err){
        console.log("Error al recuperar al producto" + err);
        
    }

    return product;

}

async function nuevoProducto(datos){
    var product=new Producto(null, datos);
    console.log(product);
    var error=1;
    if (product.bandera === 0){
    try{
        console.log(product.obtenerDatosP());
        await conexion.doc().set(product.obtenerDatosP());
        console.log("Producto insertado a la BD");
        error=0;
    }

    catch(err){
        console.log("Error al capturar el nuevo producto"+err);

    }

  }
  return error;

}

async function modificarProducto(datos){
    var error=1;
    var respuestaBuscarProducto=await buscarProductoPorID(datos.id);
    if(respuestaBuscarProducto!=undefined){
    var product=new Producto(datos.id,datos)
    if (product.bandera === 0){
        try{
            await conexion.doc(product.id).set(product.obtenerDatosP());
            console.log("Producto actualizado");
            error=0;

        }
        catch(err){
            console.log("Error al modificar el producto"+err);

        }
    }

}
    return error;

}

async function borrarProducto(id){
    var error=1;
    var product=await buscarProductoPorID(id);
    if(product!=undefined){
    try{
       
        await conexion.doc(id).delete();
        console.log("Producto borrado");
        error=0;

    }

    catch(err){
        console.log("Error al borrar el producto" + err);

    }

}

return error;

}

module.exports={
    mostrarProductos,
    buscarProductoPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
}