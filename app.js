
/**
 * Ejercicio de Bellatrix
 **/

/**
 * Comentarios sobre este código
 *
 * Se puede mejorar de muchas maneras empezando por un approach con los arreglos.
 * Creo que podría utilizar prototypes para hacer objetos según el tipo de sección.
 * Y que cada objeto sepa cómo debe mostrarse en la página. Además creo que debería
 * hacer aún más atómicas las funciones para que sea testeable.
 *
 * Lo hice con javascript vanilla porque me gustó el desafio y creo que fue más
 * entretenido y complejo al mismo tiempo.
 *
 * Para probar esto hay que correrlo en la consola del navegador como se muestra
 * en la linea de ejemplo y luego hay que hacerlo pasar en orden por las funciones
 * de abajo.
 * Por ejemplo:
 * var texto = "01 Lima / 50 Lima / 203 San Isidro";
 * texto = ordenarContenido(texto);
 * texto = cortarAbuelo(texto);
 * texto = revisarContenido(texto);
 * placeLine(texto);
 **/
var linea_texto = "“01 Lima / 50 Lima / 203 San Isidro”"; //linea de ejemplo
// con esta variable determino a qué sección pertenece la linea de texto
var section = 0;

/**
 * Separa y ordena la linea de texto a partir de las barras
 * @param original_txt
 * @returns {Array.<T>}
 */
function ordenarContenido(original_txt) {
    // separa a partir de las barras
    original_txt = original_txt.split(" / ");
    // si el último elemento es vacío lo elimina
    if (original_txt[original_txt.length - 1] === "")
        original_txt = original_txt.slice(0, original_txt.length - 1);

    // si queda adelante una barra vacía entonces es departamento
    if(original_txt[0] === " /"){
        section = 1;
    } else {
        // sino es provincia (2) o distrito (3)
        section = original_txt.length;
    }

    // invierte el orden de los elementos
    return original_txt.reverse();
}

/**
 * Elimina el último elemento porque no nos interesa
 * @param texto
 * @returns {Array}
 */
function cortarAbuelo(texto) {
    var contenido = [];
    // si el arreglo es de tres elementos debemos eliminar el último
    if (texto.length === 3)
        contenido = texto.slice(0, texto.length - 1);
    return contenido;
}

/**
 * Organiza el arreglo por código y nombre, no importa padre-hijo
 * @param contenido
 * @returns {Array}
 */
function revisarContenido(contenido) {
    // arreglo con el resultado de la seperación del contenido
    var resultado = [];
    // añade al arreglo elemento a elemento
    contenido.forEach(function (t) {
        // debe revisar los nombres con artículos
        resultado.push.apply(resultado, isSpaced(t));
    });
    return resultado;
}

/**
 * Me aseguro de que los nombres con artículos queden bien formados
 * @param word
 * @returns {Array}
 */
function isSpaced(word) {
    // si el espacio está en el mismo lugar entonces no es un nombre con artículo
    var resultado = [];
    if(word.indexOf(" ") === word.lastIndexOf(" ")){
        resultado = word.split(" ");
        return resultado;
    }
    // toma el número de código
    var id_text = word.slice(0, word.indexOf(" "));
    // corta esa misma parte, suma uno para correr un lugar y quitar el espacio, menos el resto
    var name = word.slice(word.indexOf(" ")+1, word.length);
    resultado.push(id_text);
    resultado.push(name);
    return resultado;
}

/**
 * Toma el contenido y según qué tipo de linea en la tabla que corresponde
 * @param elemento
 */
function placeLine(elemento){
    switch (section) {
        case 1:
            addContent("department", elemento);
            break;
        case 2:
            addContent("province", elemento);
            break;
        case 3:
            addContent("district", elemento);
    }
}

/**
 * Agrega contenido a una tabla específica
 * @param tableId
 * @param content
 */
function addContent(tableId, content){
    var table_element = document.getElementById(tableId);
    var new_tr = document.createElement('tr');
    // recibe un arrelgo con la info para cargar en la tabla
    content.forEach(function (t) {
        // agrega una celda a partir de la última
        var x = new_tr.insertCell(new_tr.length);
        // setea el contenido
        x.innerHTML = t;
    });

    // insertar antes del parentNode
    table_element.appendChild(new_tr);
}

