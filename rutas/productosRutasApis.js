var ruta = require("express").Router();
var subirArchivo=require("../middlewares/subirArchivo");
var { mostrarProductos, nuevoProducto, modificarProducto, buscarProductoPorID, borrarProducto } = require("../bd/productosBD");
const fs = require('fs').promises; 

ruta.get("/api/mostrarProductos",async(req, res) => {
    var productos = await mostrarProductos();
    if(productos.length>0)
    res.status(200).json(productos);
    else
        res.status(400).json("No hay productos");

});

ruta.post("/api/nuevoproductoApi",subirArchivo(), async(req, res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado");

    }
    else{
        res.status(400).json("Datos incorrectos");
    }

});

ruta.get("/api/buscarProductosPorId/:id",async(req, res)=>{
    var product=await buscarProductoPorID(req.params.id);
    console.log(product);
    if(product==""){
        res.status(400).json("No se encontro ese producto");
    }

    else {
        res.status(200).json(product);
    }

});

ruta.post("/api/editarProductoApi", subirArchivo(), async (req, res) => {
  try {
    const { id, borrar } = req.body;
    const productoAnterior = await buscarProductoPorID(id);
    const fotoAnterior = productoAnterior ? productoAnterior.foto : null;
    if (req.file) {
      if (fotoAnterior) {
        await fs.unlink(`./web/images/${fotoAnterior}`);
      }
      req.body.foto = req.file.originalname;
    }
    var error = await modificarProducto(req.body);
    if (borrar === "true") {
      if (fotoAnterior) {
        await fs.unlink(`./web/images/${fotoAnterior}`);
      }
      await borrarProducto(id);
    }
    
    if (error === 0) {
      res.status(200).json("Producto actualizado");
    } else {
      res.status(400).json("Error al actualizar el producto");
    }
  } catch (error) {
    console.error('Error al editar la foto o producto:', error);
    res.status(500).json("Error al editar la foto o producto");
  }
});

ruta.get("/api/borrarProductoApi/:id", async (req, res) => {
    try {
      const producto = await buscarProductoPorID(req.params.id);
      if (!producto) {
        return res.status(404).json("Producto no encontrado");
      }
      await fs.unlink(`./web/images/${producto.foto}`);
      const error = await borrarProducto(req.params.id);
      if (error === 0) {
        res.status(200).json("Producto borrado");
      } else {
        res.status(400).json("Error al borrar el producto");
      }
    } catch (error) {
      console.error('Error al borrar la foto o producto:', error);
      res.status(500).json("Error al borrar la foto o producto");
    }
  });
  

module.exports = ruta;
