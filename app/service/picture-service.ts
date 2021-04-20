import { Injectable } from '@angular/core';
import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { ImageSource } from 'tns-core-modules/image-source';
import * as fs from "tns-core-modules/file-system";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class PictureService {

    constructor(private http: HttpClient) { }

    private saveToGallery: boolean = true;
    public cameraImage: ImageAsset;
    private options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
    private bstring;
    private b64image;
    private saveImage;
    private picHeight;
    private baseUrl = 'http/asdasdsad/sadasd'

    onTakePictureTap(args?) {
        requestPermissions().then(
            () => this.capture(),
            () => alert('permissions rejected')
        );
    }

    private capture() {
        takePicture(this.options)
            .then((imageAsset: any) => {
                console.log(imageAsset);
                this.cameraImage = imageAsset;
                const imgPhoto = new ImageSource();
                const that = this;
                imgPhoto.fromAsset(imageAsset).then((imgSrc) => {
                    if (imgSrc) {

                        // This is the base64 string, I saved it to a global variable to be used later
                        that.bstring = imgSrc.toBase64String("jpg");

                        console.log(that.bstring);

                        // This bit saves it as an 'Image' to the app
                        const mil = new Date().getTime();
                        const folder = fs.knownFolders.documents();
                        const path = fs.path.join(folder.path, `SaveImage${mil}`);
                        const saved = imgPhoto.saveToFile(path, "png");

                        // This saves the image to the global variable which will be used to display it on the screen
                        that.saveImage = path;
                        that.picHeight = imgSrc.height;

                    } else {
                        alert("Image source is bad.");
                    }
                });

            }, (error) => {
                console.log("Error: " + error);
            });
    }

    uploadImage(image = null) {

        let imageString;

        if (image) {
            imageString = image
        } else {
            imageString = this.b64image
        }

        // This is where you create the object to be sent up to the API, in this example I'm sending up a description aswell, so I've added the property here
        const data = {
            B64String: imageString,
            //Description: this.imageDescription
        };

        // This is where i create my headers, in this case I'm using authorization
        const headers = new HttpHeaders({
            Authorization: "Bearer " + 'safsdfsdfsdff'
        });

        // This is my API call
        this.http.post(this.baseUrl + "/emotion", data, { headers })
            .subscribe((res) => {
                console.log(res)
            }, (error) => {
                console.log(error)
            });

    }

}