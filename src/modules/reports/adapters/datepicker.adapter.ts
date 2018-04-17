import { Component, Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a Native Date adapter
 */
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<string> {

  // fromModel(date: Date): NgbDateStruct {
  //   console.log("fromModel(date", date)
  //   return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
  // }


  fromModel(date: string): NgbDateStruct {
    return (date && Number(date.substring(0, 4)) && Number(date.substring(5, 7) + 1) && Number(date.substring(8, 10))) ?
      {
        year: Number(date.substring(0, 4)),
        month: Number(date.substring(5, 7)),
        day: Number(date.substring(8, 10))
      } : null;
  }

  toModel(date: NgbDateStruct): string {
    return date ? date.year.toString() + '-' + String('00' + date.month).slice(-2)
      + '-' + String('00' + date.day).slice(-2) : null;
  }
}



  // fromModel(date: string): NgbDateStruct {
  //   if (!date) { return null }
  //   console.log("fromModel(date", date)
  //   const d = new Date(date)
  //   if (!d.getFullYear) { return null }
  //   return {
  //     year: d.getFullYear(),
  //     month: d.getMonth() + 1,
  //     day: d.getDate()
  //   }
  // }

  // toModel(date: NgbDateStruct): string {
  //   if (!date) { return null }
  //   console.log("toModel(date", date)
  //   return (new Date(date.year, date.month - 1, date.day)).toISOString().split('T')[0]
  // }
// }