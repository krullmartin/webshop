import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  sizes = ["36", "38", "40", "42", "44",]

  constructor() { }
}
