import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "ca-map-modal-button",
    templateUrl: "./map-modal-button.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./map-modal-button.component.css"]
})
export class MapModalButtonComponent implements OnInit {

    @Input() postcode: string;
    closeResult: string;
    realHtml: SafeHtml;
    modalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private domSanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.realHtml = this.domSanitizer.bypassSecurityTrustHtml(this.iframeTemplate());
    }

    iframeTemplate(): string {
        return `<iframe id="mapFrame" class="embed-responsive-item" 
            src="https://www.google.com/maps/embed/v1/place?q=${encodeURI(this.postcode)}%2CUnited%20Kingdom&key=AIzaSyDGSi9F7T9xOONATGg0UIB5yjQkIj7Xzgk"></iframe>`;
    }

    open(content): void {
        this.modalRef = this.modalService.open(content, {windowClass: "primary-modal"});

        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    close(): void {
        this.modalRef.close();
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return "by pressing ESC";
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return "by clicking on a backdrop";
        } else {
            return `with: ${reason}`;
        }
    }
}