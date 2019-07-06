import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';

import * as _ from "underscore"

import 'fabric';
declare const fabric: any;

import { EditSettingsService } from '../../shared/services/edit-settings.service';
import { GenerateImageService } from '../../shared/services/generate-image.service';
import { ImageFilterService } from '../../shared/services/image-filter.service';

@Component({
  selector: 'app-canvas-select',
  templateUrl: 'canvas-select.component.html',
  styleUrls: ['canvas-select.component.css'],
})
export class CanvasSelectComponent implements AfterViewInit, OnInit {

  // @ViewChild('photoCanvas') canvasArtboard: ElementRef;

  @Input() canvasSettings: any;
  @Input() imageSettings: any;
  @Input() sizeSettings: any;
  @Input() textSettings: any;
  @Input() logoSettings: any;

  private headerProps: any = {
    width: 200,
    top: 50,
    left: 500 / 2 - 100,
    fontSize: 21,
    hasRotatingPoint: false,
    color: 'black',
    textAlign: 'center'
  };

  private bodyProps: any = {
    width: 200,
    top: 700 / 2,
    left: 500 / 2 - 100,
    fontSize: 21,
    hasRotatingPoint: false,
    color: 'black',
    textAlign: 'center'
  };

  private captionProps: any = {
    width: 200,
    top: 700 - 50,
    left: 500 / 2 - 100,
    fontSize: 21,
    hasRotatingPoint: false,
    color: 'black',
    textAlign: 'center'
  };

  private controlsVisibility: any = {
    mt: false,
    mb: false,
    ml: true,
    mr: true,
    br: false,
    bl: false,
    bm: false,
    tl: false,
    tr: false
  }

  constructor(private editSettingsService: EditSettingsService,
    private generateImageService: GenerateImageService,
    private imageFilterService: ImageFilterService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    let selectedSize = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex]

    this.headerProps.top = 100
    this.headerProps.left = (selectedSize.width / 2) - (this.headerProps.width / 2)

    this.bodyProps.top = (selectedSize.height / 2)
    this.bodyProps.left = (selectedSize.width / 2) - (this.bodyProps.width / 2)

    this.captionProps.top = selectedSize.height - 100
    this.captionProps.left = (selectedSize.width / 2) - (this.bodyProps.width / 2)

    // fabric test
    var canvas = window["_canvas"] = new fabric.Canvas('canvas-photo');

    canvas.selection = false;

    var headerText = window["_headerText"] = new fabric.Textbox('Double-click to edit', this.headerProps).setControlsVisibility(this.controlsVisibility);

    var bodyText = window["_bodyText"] = new fabric.Textbox('Double-click to edit', this.bodyProps).setControlsVisibility(this.controlsVisibility);

    var captionText = window["_captionText"] = new fabric.Textbox('Double-click to edit', this.captionProps).setControlsVisibility(this.controlsVisibility);

    canvas.add(headerText);
    canvas.add(bodyText);
    canvas.add(captionText);

    headerText.opacity = this.textSettings.hasHeader ? 1 : 0;
    headerText.selectable = this.textSettings.hasHeader;

    bodyText.opacity = this.textSettings.hasBody ? 1 : 0;
    bodyText.selectable = this.textSettings.hasBody;

    captionText.opacity = this.textSettings.hasCaption ? 1 : 0;
    captionText.selectable = this.textSettings.hasCaption;

    let center = canvas.getCenter();
    fabric.Image.fromURL(this.imageSettings.images[this.imageSettings.selectedImageUniqueId].url, function (img) {
      // add background image
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.height / img.height,
        scaleY: canvas.height / img.height,
        top: center.top,
        left: center.left,
        originX: 'center',
        originY: 'center'
      });
    });

    canvas.on('object:selected', (e) => {
      this.editSettingsService.updateEditText(e.target);
    })

    canvas.on('selection:cleared', (e) => {
      this.editSettingsService.updateEditText(e.deselected[0]);
    })

    canvas.on('object:moving', (e) => {

      var obj = e.target;
      // if object is too big ignore
      if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
        obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
        obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
      }
    });

    // //subscribe
    // this.editSettingsService.storeCanvas.subscribe(() => this.onUpdateCanvas());
    // this.imageFilterService.store.subscribe(() => this.onUpdateFilter());
    // this.generateImageService.store.subscribe(() => this.onGenerateDownloadableImage());
  }

  // load image into canvas
  private onUpdateCanvas() {

    let image = new Image();
    let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    let modelMatch = _.find(this.imageSettings.images, (i: any) => { return i.uniqueId == this.imageSettings.selectedImageUniqueId });
    image.src = this.editSettingsService.processImgUrl(modelMatch['url'], sizeData.width, sizeData.height);
    image.crossOrigin = "Anonymous";

    // //clean canvas
    // this.ctx.clearRect(0, 0, sizeData.width, sizeData.height);

    // //provide imageFilterService with a new canvas
    // this.imageFilterService.updateCanvasReference(this.canvasArtboard.nativeElement);

    // //update canvas
    // image.onload = () => this.ctx.drawImage(image, 0, 0);
  }

  // private onGenerateDownloadableImage() {
  //   let image = new Image();
  //   image.src = this.canvasArtboard.nativeElement.toDataURL("image/png");
  //   image.crossOrigin = "Anonymous";
  //   this.canvasSettings.downloadableImage = image;
  // }

  private onUpdateFilter() {
    // console.log('update filter: likely use the imageFilterService canvas ref');
  }

  private onClearOverlaysSelection() {
    this.editSettingsService.updateOverlays(true);
  }

}
