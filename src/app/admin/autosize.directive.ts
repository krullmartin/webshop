import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autosize]'
})
export class AutosizeDirective {

  constructor(public element: ElementRef) {
    // element.nativeElement.style.backgroundColor = "lightgray";
    const textArea = element.nativeElement.style;
    textArea.width = "50%";
    textArea.borderRadius = "5px";
    textArea.padding = "5px";
   }

  @HostListener('input', ['$event.target'])
  adjust() {
    const textArea = this.element.nativeElement;
    if (textArea) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }

}