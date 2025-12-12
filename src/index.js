// 1) sumPositive: suma sólo los números positivos de un array
// Pista: filtra los números válidos (> 0) y luego suma; recuerda ignorar NaN.
// Nivel: 🟡 Intermedio
function sumPositive(arr) {
  let sumPositive = 0
  arr.forEach(el => {
    if (el > 0) {
      sumPositive = sumPositive + el
    }
  });
  return sumPositive
}



// 2) mapToLengths: devuelve las longitudes de los elementos (strings) en un array
// Pista: convierte cada elemento a un string y luego obtiene su longitud.
// Nivel: 🟢 Introductorio
function mapToLengths(arr) {



  const lengths = arr.map(elm => String(elm).length);
  return lengths
}




// 3) filterDigits: devuelve sólo los caracteres numéricos de la cadena
// Pista: recorre cada carácter y conserva solo los que sean dígitos.
// Nivel: 🟡 Intermedio
function filterDigits(str) {


  let myString = str
  let myArray = myString.split('');
  let numbers = "";
  for (let i = 0; i < myArray.length; i++) {
    if (!isNaN(myArray[i]) && myArray[i] !== "") {
      numbers += myArray[i];
    }

  }
  return numbers.trim()
}





// 4) flattenAndFilter: aplana un nivel y elimina elementos falsy
// Pista: expande un nivel de anidación y después filtra los valores falsy.
// Nivel: 🔴 Desafío
function flattenAndFilter(arr) {
  let flattenedArr = arr.flat()
  let filteredFlatArr = flattenedArr.filter(Boolean)
  return filteredFlatArr
}

// 5) groupByType: agrupa elementos por `typeof` en un objeto
// Pista: usa `typeof` para la clave y acumula elementos en arrays.
// Nivel: 🔴 Desafío
function groupByType(arr) {
  //*arr.forEach(elm=>{
  //* if(Array.isArray(elm)){
  //* grouppedElm.push(elm);
  //*}
  //*else if(typeof arr==="string"){
  //* grouppedElm=grouppedElm.push(arr)}
  //* return grouppedElm //*
  let grouppedArr = {
    function: [],
    symbol: [],
    string: [],
    number: [],
    object: [],
    boolean: [],
  }
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const type = typeof arr[i]
    if (type === 'number') {
      grouppedArr.number.push(type)

    }
    return grouppedArr

  }
}




// 6) takeUntilNegative: devuelve elementos desde el inicio hasta el primer negativo (sin incluirlo)
// Pista: recorre en orden y para cuando encuentres el primer número < 0.
// Nivel: 🟢 Introductorio
function takeUntilNegative(arr) {
  function takeUntilNegative(arr) {
    const negativeIndex = arr.findIndex(el => el < 0);
    if (negativeIndex === -1) {
      return [...arr];
    }
    return arr.slice(0, negativeIndex);
  }

}

// 7) unique: devuelve elementos únicos (orden original)
// Pista: incluye solo la primera aparición de cada valor (comparación ===).
// Nivel: 🟡 Intermedio
function unique(arr) {

}

// 8) countTruthyValues: cuenta los valores truthy de un objeto
// Pista: toma `Object.values(obj)` y cuenta los elementos que son truthy.
// Nivel: 🟢 Introductorio
function countTruthyValues(obj) {
  const values = Object.values(obj);
  const valuesTruthy = values.filter(value => value);
  const counter = valuesTruthy.length;
  return counter

}

// 9) mapWithIndex: aplica `fn(value, index)` a cada elemento (práctica de map con índice)
// Pista: pasa el índice al callback y utilízalo si lo necesitas; maneja fn no-función.
// Nivel: 🟢 Introductorio
function mapWithIndex(arr, fn) {

}

// 10) selectEveryN: selecciona cada n-ésimo elemento (n >= 1) 
// Pista: valida que `n` sea entero positivo y selecciona índices con `i % n === 0`.
// Nivel: 🟡 Intermedio
function selectEveryN(arr, n) {

}
