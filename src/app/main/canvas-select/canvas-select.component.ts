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
    fill: 'white',
    textAlign: 'center'
  };

  private bodyProps: any = {
    width: 200,
    top: 700 / 2,
    left: 500 / 2 - 100,
    fontSize: 21,
    hasRotatingPoint: false,
    fill: 'white',
    textAlign: 'center'
  };

  private captionProps: any = {
    width: 200,
    top: 700 - 50,
    left: 500 / 2 - 100,
    fontSize: 21,
    hasRotatingPoint: false,
    fill: 'white',
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

    headerText.set({
      opacity: this.textSettings.hasHeader ? 1 : 0,
      selectable: this.textSettings.hasHeader,
      hoverCursor: this.textSettings.hasHeader ? 'move' : 'arrow' 
    });

    bodyText.set({
      opacity: this.textSettings.hasBody ? 1 : 0,
      selectable: this.textSettings.hasBody,
      hoverCursor: this.textSettings.hasBody ? 'move' : 'arrow' 
    });

    captionText.set({
      opacity: this.textSettings.hasCaption ? 1 : 0,
      selectable: this.textSettings.hasCaption,
      hoverCursor: this.textSettings.hasCaption ? 'move' : 'arrow' 
    });

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

    // canvas.renderAll();

    canvas.on('object:selected', (e) => {
      if (e.target.isType('image')) {
        return;
      }

      this.editSettingsService.updateEditText({
        elem: e.target,
        selected: true
      });
    })

    canvas.on('object:scaling', (e) => {
      if (e.target.isType('image')) {
        return;
      } else {
        this.editSettingsService.updateEditText({
          elem: e.target,
          reposition: true
        });
        if(e.pointer.x <= 0 || e.pointer.x >= canvas.width) {

          if(e.transform.corner == 'mr') {
            if(true) {

            }
          } else {

          }

          console.log(e);
          // return;
        }
      }
    })

    canvas.on('object:scaled', (e) => {
      if (e.target.isType('image')) {
        return;
      }
    })

    canvas.on('selection:updated', (e) => {
      if (e.target.isType('image')) {
        this.editSettingsService.updateEditText({
          elem: e.deselected[0],
          selected: false
        });
        
        return;
      }

      this.editSettingsService.updateEditText({
        elem: e.target,
        selected: true
      });
    });

    canvas.on('selection:cleared', (e) => {
      if (e.deselected[0].isType('image')) {
        return;
      }

      this.editSettingsService.updateEditText({
        elem: e.deselected[0],
        selected: false
      });
    })

    canvas.on('object:moving', (e) => {
      var obj = e.target;

      if (obj.isType('image')) {
        obj.set({
          top: this.clamp(obj.top, 0, obj.canvas.height - obj.height * obj.scaleY),
          left: this.clamp(obj.left, 0, obj.canvas.width - obj.width * obj.scaleX),
        });
      } else {
        obj.set({
          top: this.clamp(obj.top, 0, obj.canvas.height - obj.height),
          left: this.clamp(obj.left, 0, obj.canvas.width - obj.width),
        });
        this.editSettingsService.updateEditText({
          elem: e.target,
          reposition: true
        });

      }
      obj.setCoords();
      canvas.renderAll();
    });
  }

  private clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  };

  // load image into canvas
  private onUpdateCanvas() {

    let image = new Image();
    let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    let modelMatch = _.find(this.imageSettings.images, (i: any) => { return i.uniqueId == this.imageSettings.selectedImageUniqueId });
    image.src = this.editSettingsService.processImgUrl(modelMatch['url'], sizeData.width, sizeData.height);
    image.crossOrigin = "Anonymous";
  }

  private onUpdateFilter() {
    // console.log('update filter: likely use the imageFilterService canvas ref');
  }

  private onClearOverlaysSelection() {
    this.editSettingsService.updateOverlays(true);
  }

}
