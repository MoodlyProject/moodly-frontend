import { Component, OnInit } from "@angular/core";
import { PictureService } from "../service/picture-service"

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    constructor(private pictureService: PictureService) {
    }

    takePhoto(): void {
        console.log("take picture was pressed");
        this.pictureService.onTakePictureTap();
    }

    uploadPhoto(): void {
        console.log('uploading photo')
    }


    ngOnInit(): void {
    }
}
