import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
 
    /* Pour le fermer qu'importe là ou on clique

        @HostBinding('class.open') isOpen = false;
        @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
            this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
        }
        constructor(private elRef: ElementRef) {}
    */
}