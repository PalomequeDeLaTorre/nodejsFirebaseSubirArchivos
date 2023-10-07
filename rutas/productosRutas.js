var ruta = require("express").Router();
var subirArchivo=require("../middlewares/subirArchivo");
var { mostrarProductos, nuevoProducto, modificarProducto, buscarProductoPorID, borrarProducto } = require("../bd/productosBD");
const fs = require('fs').promises;

ruta.get("/productos", async (req, res) => {
    var productos = await mostrarProductos();
    res.render("productos/mostrar", { productos });
});

ruta.get("/nuevoproducto", async (req, res) => {
    res.render("productos/nuevo");
});

ruta.post("/nuevoproducto",subirArchivo(), async (req, res) => {
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/productos");
});

ruta.get("/editarProducto/:id", async (req, res) => {
    var producto = await buscarProductoPorID(req.params.id);
    res.render("productos/modificar", { producto });
});

ruta.post("/editarProducto", subirArchivo(), async (req, res) => {
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

    res.redirect("/productos");
  } catch (error) {
    console.error('Error al editar la foto o producto:', error);
    res.status(500).send("Error al editar la foto o producto");
  }
});

ruta.get("/borrarProducto/:id", async (req, res) => {
    try {
      const producto = await buscarProductoPorID(req.params.id);
      if (!producto) {
        return res.status(404).send("Producto no encontrado");
      }
      await fs.unlink(`./web/images/${producto.foto}`);
      await borrarProducto(req.params.id);
  
      res.redirect("/");
    } catch (error) {
      console.error('Error al borrar la foto o producto:', error);
      res.status(500).send("Error al borrar la foto o producto");
    }
  });


module.exports = ruta;
