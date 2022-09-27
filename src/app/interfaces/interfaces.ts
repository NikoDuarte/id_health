/*************************/
//? -> Interface de categorias
interface _categorys {
    _id: string;
    nombre: string;
    usuario: {
        _id: string;
        nombre: string;
    }
}
//? -> Interface de productos
interface _productos {
    precio: number;
    _id: string;
    nombre: string;
    categoria: {
        _id: string;
        nombre: string;
    };
    usuario: {
        _id: string;
        nombre: string;
    };
}
/*************************/
// TODO -> Modulo de esportacion
export {
    _categorys,
    _productos
}