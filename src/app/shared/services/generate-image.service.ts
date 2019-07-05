import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { Subject } from "rxjs";

@Injectable()
export class GenerateImageService {

  private service: any = new Subject();
  public store: Observable<any> = this.service.asObservable();

  public generateImage() {
    // window.open(window["_canvas"].toDataURL('png'));
    let donwloadButton = document.getElementById('download-a');
    let canvas: any = document.getElementById('canvas-photo');
    let img = canvas.toDataURL('image/png');
    donwloadButton.setAttribute('href', img);
    donwloadButton.click()
    // this.service.next();
  }

}
