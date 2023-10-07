class Producto {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.categoria = data.categoria;
        this.precio = data.precio;
        this.foto = data.foto;
    }

    set id(id) {
        if (id != null)
            id.length > 0 ? (this._id = id) : (this.bandera = 1);
    }

    set nombre(nombre) {
        nombre.length > 0 ? (this._nombre = nombre) : (this.bandera = 1);
    }

    set descripcion(descripcion) {
        descripcion.length > 0 ? (this._descripcion = descripcion) : (this.bandera = 1);
    }

    set categoria(categoria) {
        categoria.length > 0 ? (this._categoria = categoria) : (this.bandera = 1);
    }

    set precio(precio) {
        precio.length > 0 ? (this._precio = precio) : (this.bandera = 1);
    }

    set foto(foto){
        foto.length>0?this._foto=foto:this.bandera=1;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get categoria() {
        return this._categoria;
    }

    get precio() {
        return this._precio;
    }

    get foto(){
        return this._foto;
    }

    obtenerDatosP() {
        if (this._id != null)
            return {
                id: this.id,
                nombre: this.nombre,
                descripcion: this.descripcion,
                categoria: this.categoria,
                precio: this.precio,
                foto:this.foto,
            };
        else {
            return {
                nombre: this.nombre,
                descripcion: this.descripcion,
                categoria: this.categoria,
                precio: this.precio,
                foto:this.foto,
            };
        }
    }
}

module.exports = Producto;
