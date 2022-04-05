import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './redux/store';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// let number = 10;
// number = 20;

// let flag: boolean = true;

// function compare (num1: number = 10, num2: number = 20): 0 | -1 | 1 {
//   let result: 0 | -1 | 1;
//   if(num1 === num2){
//     result = 0;
//   } else if (num1 > num2) {
//     result = 1
//   } else {
//     result = -1;
//   }
//   return result;
// }
// compare()

// type Person = {
//   id: number | string;
//   name: string;
//   age?: number;   // ? -> может быть а может и нет
// }
// const person: Person = {id: 23, name: "Max", age: 35};

// type comparator = (num1: number, num2: number) => number
// let funComp: comparator;
// funComp = compare

// /*** map ***/
// const map: Map<string, number> = new Map();
// map.set("str1", 3);
// console.log(map);
// map.set("str2", 6);
// map.set("str1", 5); 
// console.log(map);
// map.set("str3", -2);

// if(map.has("str3")) {
//   console.log("str3 exists")
// } else {
//   console.log("does not exists")
// }

// console.log(map.get("str4"));

/**INTERVIEW QUESTION**/
// function displayOccurrences(strings: string[]): void {
//   const map: Map<string, number> = strings.reduce((m,s) => m.set(s,1 + (m.get(s) || 0)), new Map<string,number>());
//   const ar: [string, number][] = Array.from(map); // converting from map to json array
//   console.log(ar);
//   ar.sort((pare1, pare2) => pare2[1] - pare1[1]);  // sorting array
//   ar.forEach( p => console.log(`${p[0]} : ${p[1]}`))
//  // map.forEach((v,k) => console.log(`${k} : ${v}`));
// }
// displayOccurrences(["a","ab","lmn","lmn","ab","lmn","a","a","a"])
/**INTERVIEW QUESTION**/


// const data = ["lmn", "lmn", "lmn", "ab", "ab", "a"]

// let countMap = data.reduce(
//   (map, value) => { map.set(value, (map.get(value) || 0) + 1); return map },
//   new Map()
// )
// console.log(countMap);