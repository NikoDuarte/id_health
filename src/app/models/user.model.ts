export class User {
    constructor(
        public rol: string,
        public estado: boolean,
        public google: boolean,
        public nombre: string,
        public correo: string,
        public uid: string
    ) {}
}