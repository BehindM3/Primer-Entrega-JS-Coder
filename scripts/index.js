let TiposDeSushi = ["Nigiri", "Maki", "Uramaki", "Temari", "Oshi", "Hosomaki", "Temaki", "Futomaki"];
let PreciosSushi = [1000, 2000, 3000, 2500, 3000, 2000, 1500, 3000];
let CarritoSushi = new Array(TiposDeSushi.length).fill(0);
const adminClave = "Admin123";

//Funciones referidas al Menu
function unificarListaMenu(){
    
    let ListaAuxiliar = []; 

    for(let sushi in TiposDeSushi){
        ListaAuxiliar.push(`${Number(sushi)+1}) ${TiposDeSushi[sushi]} \t ${PreciosSushi[sushi]} $.\n`); 
    }

    return ListaAuxiliar.join("");
}

function listaMenu(){
    
    const menu = "Bienvenidos a Sushi-San\n\n";
    const solicitud = "\nPor favor ingrese el numero que corresponda al sushi que desee agregar al carrito:";

    return prompt(menu.concat(unificarListaMenu(), solicitud));
}

function muestraListaCarrito(){

    let totalPagar = 0, totalProducto = 0;
    const mensajeInicial = `Muchas gracias por su compra de ${estadoCarrito()} sushis:\n\n`;
    const mensajeCarrito = [];
    const mensajeTotal  = ["____________________________\n"];

    for (let sushi in CarritoSushi ){

        if( CarritoSushi[sushi] != 0 ){
            totalProducto = (Number(CarritoSushi[sushi])) * Number(PreciosSushi[sushi]);
            totalPagar += totalProducto;
            mensajeCarrito.push(`${CarritoSushi[sushi]}x ${TiposDeSushi[sushi]}     ${totalProducto}$\n`);
        }
    }

    mensajeTotal.push(`Total a pagar    ${totalPagar}$`);

    return mensajeInicial.concat(mensajeCarrito.join(""), mensajeTotal.join(""));
}

function resumenCompra(){

    if(estadoCarrito() > 0 ){
        alert(muestraListaCarrito());
    }
    else{
        alert("Lamentamos que no haya encontrado lo que buscaba");
    }

}

function menuComprarSushi(){
    
    let opcion, salida;

    do{
        opcion = parseInt(listaMenu());
        
        if(opcion > 0  && opcion <= TiposDeSushi.length ){

            agregarCompra(opcion);
            salida = confirm("¿Desea agregar otro producto al carrito?");
            
        }
        else{
            salida = confirm("La opcion ingresada no es valida\n¿Desea volver al menu de compras?");
        }
    }
    while( salida );

    resumenCompra();
}


//Opciones admin

function listaAdmin(salida){

    const bienvenida = "Bienvenido al menu del Administrador\n";
    const opcionesMenu = `\n1) Agregar Sushi.\n2) Eliminar Sushi.\n3) Modificar tabla de precios.\n4) Modificar tabla de tipos de sushi.\n5) Visualizar lista Tipo/Precios de los sushis.\n${salida}) Salir.\n`
    const solicitud = "\nIntroduzca la opcion que desee:";

    return bienvenida.concat(opcionesMenu,solicitud);
}

function agregarSushiConsulta(){

    let nuevoTipoSushi = capitalizacionPrimerLetra(prompt("Ingrese el nombre del nuevo tipo de sushi:"));
    let precioNuevoSushi;

    if( TiposDeSushi.includes(nuevoTipoSushi) ){
        alert(`El tipo de sushi [${nuevoTipoSushi}] que desea agregar ya existe, en caso de querer modificarlo vuelva al menu de administrador e ingrese la opcion correspondiente.`);
    }
    else{
        precioNuevoSushi = prompt(`Por favor ingrese el precio correspondiente al ${nuevoTipoSushi}: `);
        agregarSushi(nuevoTipoSushi, precioNuevoSushi);
        alert(`El sushi [ ${nuevoTipoSushi} ] por un valor de [ ${precioNuevoSushi} $] fue aregado correctamente a la lista`);
    }

}

function eliminarSushiConsulta(){

    const mensajeInicial = "A continuacion se listara los tipos de sushi que hay en el menu actualmente:\n\n-";
    const mensajeConsulta = "\n\nIngrese el nombre del tipo de sushi que desea eliminar:"
    const mensajeFinal = mensajeInicial.concat(TiposDeSushi.join("\n-"), mensajeConsulta);

    let sushiEliminar = capitalizacionPrimerLetra(prompt(mensajeFinal));
    let indiceEliminar = TiposDeSushi.indexOf(sushiEliminar);

    if( indiceEliminar != -1){
        TiposDeSushi = eliminarSushi(indiceEliminar, TiposDeSushi);
        PreciosSushi = eliminarSushi(indiceEliminar, PreciosSushi);
        CarritoSushi = eliminarSushi(indiceEliminar, CarritoSushi);
    }
    else{
        alert("El elemento a eliminar no corresponde a una opcion valida de la lista.");
    }
}

function modificarPrecios(){

    const mensajeInicial = "A continuacion se listaran los tipos de sushi con sus precios correspondiente que hay en el menu actualmente:\n\n";
    const mensajeConsulta = "\n\nIngrese el nombre del tipo de sushi al que desee modificar su precio:"
    const mensajeFinal = mensajeInicial.concat(unificarListaMenu(), mensajeConsulta);

    let tipoSushiModificar = capitalizacionPrimerLetra(prompt(mensajeFinal));
    let indiceModificar= TiposDeSushi.indexOf(tipoSushiModificar);
    let precioSushiModificar;

    if( indiceModificar != -1 ){
        precioSushiModificar = Number(prompt(`Actualmente el precio del ${TiposDeSushi[indiceModificar]} esta en ${PreciosSushi[indiceModificar]} $.\n\nIngrese el nuevo precio: `));
        alert(`El precio del [${TiposDeSushi[indiceModificar]}] se cambio correctamente de [ ${PreciosSushi[indiceModificar]} $ ]  --> [ ${precioSushiModificar} $ ]`);
        PreciosSushi[indiceModificar] = precioSushiModificar;
    }
    else{
        alert("La opcion ingresada no corresponde a un opcion valida d ela lista.");
    }

}

function modificarTipos(){
    
    const mensajeInicial = "A continuacion se listaran los tipos de sushi con sus precios correspondiente que hay en el menu actualmente:\n\n";
    const mensajeConsulta = "\n\nIngrese el nombre del tipo de sushi que desee modificar:"
    const mensajeFinal = mensajeInicial.concat(unificarListaMenu(), mensajeConsulta);

    let tipoSushiModificar = capitalizacionPrimerLetra(prompt(mensajeFinal));
    let indiceModificar= TiposDeSushi.indexOf(tipoSushiModificar);
    let nombreSushiModificar;

    if( indiceModificar != -1 ){
        nombreSushiModificar = prompt(`Ingrese el nuevo tipo de sushi que remplazara a [ ${TiposDeSushi[indiceModificar]} ] :`);
        alert(`Se cambio correctamente de [ ${TiposDeSushi[indiceModificar]} ]  --> [ ${nombreSushiModificar} ]`);
        TiposDeSushi.splice(indiceModificar,1,nombreSushiModificar);
    }
    else{
        alert("La opcion ingresada no corresponde a un opcion valida d ela lista.");
    }

}

function menuAdmin(){

    let opcionMenu, condicionSalida = 6;

    do{
        opcionMenu = parseInt(prompt(listaAdmin(condicionSalida)));

        switch(opcionMenu){

            case 1:
                agregarSushiConsulta()
                break;
            
            case 2:
                eliminarSushiConsulta();
                break;

            case 3:
                modificarPrecios();
                break;

            case 4:
                modificarTipos();
                break;

            case 5:
                visualizarLista();
                break;

            case opcionMenu:
                alert("Muchas gracias por utilizar el menu de administrador.");
                break;

            default: 
                alert("La opcion ingresada no corresponde a una opcion valida.");
        }

    }while(opcionMenu != condicionSalida);

    
} 

function ingresoAdmin(){

    const claveIngresada = prompt("Ingrese la contraseña: ");

    if(validarAdmin(claveIngresada)){
        menuAdmin();
    }
    else{
        alert("La clave ingresada es incorrecta.")
    }
}

//Menu Global

function muestraMenuInicio(){

    const bienvenida = "|Bienvenido al menu principal de Sushi-San|\n\n";
    const opciones = "1) Acceder como cliente.\n2) Acceder como administrador.\n3) Salir del menu.\n";
    const solicitud = "\nIngrese la opcion a la que desee ingresar: ";

    return bienvenida.concat(opciones, solicitud);
}

function menuIncio(){

    let opcionMenu;
    let salidaMenu = 3;

    do{
        opcionMenu = parseInt(prompt(muestraMenuInicio()));
        
        switch(opcionMenu){
            
            case 1:
                menuComprarSushi();
                reiniciarCarrito();
                break;
            
            case 2:
                ingresoAdmin();
                break;
            
            case salidaMenu:
                alert("Muchas gracias por utilizar nuestro servicio de Sushi-San.");
                break;
            
            default: 
                alert("La opcion ingresada no corresponde a una opcion valida.");
                
        }

    }while(opcionMenu != salidaMenu);

}

//Funciones flecha
const agregarCompra = posicion => CarritoSushi[posicion-1]++;
const estadoCarrito = () => {
    let cantidad = 0;

    for (productos in CarritoSushi){
        cantidad += CarritoSushi[productos];
   }

   return Number(cantidad);
}
const agregarSushi = (nombreSushi, precioSushi) => {
    TiposDeSushi.push(nombreSushi);
    PreciosSushi.push(precioSushi);
    CarritoSushi.push(0);
};
const eliminarSushi = (indice, cortarArray) => cortarArray.slice(0,indice).concat(cortarArray.slice(indice+1));
    const capitalizacionPrimerLetra = (nombreSushi) => {
    if(!nombreSushi){
        return null;
    }

    return nombreSushi.charAt(0).toUpperCase().concat(nombreSushi.slice(1).toLowerCase());
}
const visualizarLista = () => {
    let titulo = "La lista de tipos/precio de sushi es:\n\n"
    return alert(titulo.concat(unificarListaMenu()))
}
const validarAdmin = claveIngresada => claveIngresada === adminClave;
const reiniciarCarrito = () => CarritoSushi = Array(TiposDeSushi.length).fill(0);


menuIncio();