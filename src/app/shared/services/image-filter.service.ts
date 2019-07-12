import { Injectable, OnInit } from '@angular/core';

import { Observable } from "rxjs";
import { Subject } from 'rxjs';

declare var fabric: any;

@Injectable()
export class ImageFilterService {

  private service: any = new Subject();
  public store: Observable<any> = this.service.asObservable();

  private webglBackend;
  private canvas2dBackend = new fabric.Canvas2dFilterBackend()

  private canvas: HTMLCanvasElement;

  constructor() {
    console.log('imagefilterservice');
    try {
      this.webglBackend = new fabric.WebglFilterBackend();
    } catch (e) {
      console.log(e)
    }
    if (this.webglBackend) {
      fabric.filterBackend = this.canvas2dBackend;
    } else {
      fabric.filterBackend = this.canvas2dBackend;
    }
    console.log(fabric.filterBackend);
  }

  public updateCanvasReference(payload: HTMLCanvasElement) {
    this.canvas = payload;
  }

  public updateFilter(payload: any) {
    let canvasBG = window['_canvas'].backgroundImage;
    let f = fabric.Image.filters;
    console.log(payload, canvasBG);
    this.applyFilterValue(f, canvasBG, payload.method, payload.value);
    canvasBG.applyFilters();
    window['_canvas'].renderAll();
  }

  private applyFilterValue(f, el, method, value) {
    console.log(value);

    switch (method) {
      case 'none':
        this.resetFilter(el);
        break;
      case 'contrast':
        this.resetFilter(el);
        el.filters[0] = new f.Contrast({
          contrast: value
        });
        break;
      case 'blur':
        this.resetFilter(el);
        el.filters[0] = new f.Blur({
          blur: value
        });
        break;
      case 'greyscale':
        this.resetFilter(el);
        el.filters[0] = new f.Grayscale();
        break;
      case 'blur-greyscale':
        this.resetFilter(el);
        el.filters[0] = new f.Blur({
          blur: value
        });
        el.filters[1] = new f.Grayscale();
        break;
      case 'gamma':
        this.resetFilter(el);
        el.filters[0] = new f.Gamma({
          gamma: value
        });
        break;
      default:
        this.resetFilter(el);
        break;
    }
  }

  public resetFilter(el) {
    console.log('reset filter');
    el.filters = [];
    el.applyFilters();
    window['_canvas'].renderAll();
  }

}
