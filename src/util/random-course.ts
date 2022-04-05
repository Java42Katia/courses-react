import { Course } from "../models/Course";

export default function  getCourse(minId: number, maxId: number, minHours: number, maxHours: number, lecturers: string[],
     courseNames: string[], minYear: number, maxYear: number, minCost: number,
      maxCost:number) : Course {
   
     return {
         id: getRandomNumber(minId, maxId),
          course: getRandomElement(courseNames),
           lecturer: getRandomElement(lecturers),
           hours: getRandomNumber(minHours, maxHours),
           cost: getRandomNumber(minCost, maxCost),
           openingDate: getRandomDate(minYear, maxYear)
         }
 }
 /***************************************************** */
 //It should be in the separate file
 function getRandomNumber (min: number, max: number): number {
    return  min + Math.round(Math.random() * (max - min));
 } 
 function getRandomElement (array: any[]): any {
    return  array[getRandomNumber(0, array.length - 1)];
 }
 function getRandomDate(minYear: number, maxYear: number): Date {
     const res: Date = new Date();
    res.setDate(getRandomNumber(1, 28));
    res.setMonth(getRandomNumber(0, 11));
    res.setFullYear(getRandomNumber(minYear, maxYear));
    return res;
 }
  
 /********************************************************* */
 