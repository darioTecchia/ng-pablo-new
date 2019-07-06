import { Component, Input, OnInit, Output } from '@angular/core';

import * as _ from "underscore";
import * as $ from 'jquery';

declare var fabric: any;

import { EditSettingsService } from '../shared/services/edit-settings.service';
import { GenerateImageService } from '../shared/services/generate-image.service';
import { ImageFilterService } from '../shared/services/image-filter.service';
import { CanvasSelectComponent } from './canvas-select/canvas-select.component';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  providers: [EditSettingsService, GenerateImageService, ImageFilterService]
})
export class MainComponent implements OnInit {

  @Output() sizes: any;
  @Output() selectedSize: any;

  @Output() filters: any;
  @Output() selectedFilter: any;

  @Output() imageSettings: any;
  @Output() canvasSettings: any;
  @Output() sizeSettings: any;
  @Output() filterSettings: any;
  @Output() textSettings: any;
  @Output() logoSettings: any;

  constructor(private editSettingsService: EditSettingsService,
    private generateImageService: GenerateImageService,
    private imageFilterService: ImageFilterService) { }

  ngOnInit() {

    //images
    this.imageSettings = {
      selectedImageUniqueId: 0,
      images: [
        {
          url: "../assets/images/photo-1460500063983-994d4c27756c.jpg",
          name: "Cool Beach",
          author: "Michael Durana",
          location: "Big Sur, United States",
          tags: "water, ocean, rocks, nature, sky, sun",
          uniqueId: 0
        }, {
          url: "../assets/images/photo-1460378150801-e2c95cb65a50.jpg",
          name: "Snowscape",
          author: "Joe Reed",
          location: "Hole-in-the-Wall, Penrith, United Kingdom",
          tags: "nature, mountains, snow, sky, cold, winter",
          uniqueId: 1
        }, {
          url: "../assets/images/photo-1458400411386-5ae465c4e57e.jpg",
          name: "Lift Chairs",
          author: "Geoffrey Arduini",
          location: "Morillon, France",
          tags: "snow, winter, cold, nature, outside, chairs, ski, snowboard",
          uniqueId: 2
        }, {
          url: "../assets/images/photo-1452827073306-6e6e661baf57.jpg",
          name: "Flower Gift",
          author: "Leonardo Wong",
          location: "Singapore",
          tags: "rose, gift, petal, flower, scent",
          uniqueId: 3
        }, {
          url: "../assets/images/photo-1452215199360-c16ba37005fe.jpg",
          name: "Mountains Backdrop",
          author: "Caryle Tylkowski",
          location: "Unknown",
          tags: "mountains, sky, blue, rocky, nature",
          uniqueId: 4
        }, {
          url: "../assets/images/photo-1442551382982-e59a4efb3c86.jpg",
          name: "NY Skyline",
          author: "Nirzar Pangarkar",
          location: "New York, United States",
          tags: "sky, skyline, new york, buildings, water",
          uniqueId: 5
        }, {
          url: "../assets/images/photo-1440613905118-99b921706b5c.jpg",
          name: "Bridge in City",
          author: "valor kopeny",
          location: "Dumbo , New York, USA",
          tags: "city, bridge, outside, structures",
          uniqueId: 6
        }, {
          url: "../assets/images/photo-1423784346385-c1d4dac9893a.jpg",
          name: "iPhone Habit",
          author: "Gilles Lambert",
          location: "Unknown",
          tags: "iphone, tech, habit, people, screen",
          uniqueId: 7
        }, {
          url: "../assets/images/imNop2O1Rit190cSkxXv_1-7069.jpg",
          name: "Flowers on Stand",
          author: "Julia Janeta",
          location: "Unknown",
          tags: "rose, gift, petal, flower, scent, drawer, white",
          uniqueId: 8
        }
      ],
      filterQuery: ''
    };

    //canvas
    this.canvasSettings = {
      downloadableImage: ''
    };

    //sizes
    this.sizeSettings = {
      selectedSizeIndex: 0,
      sizes: [
        {
          name: "Pinterest",
          width: 500,
          height: 700
        },
        {
          name: "Instagram",
          width: 800,
          height: 800
        },
        {
          name: "Twitter and Facebook",
          width: 500,
          height: 300
        }
      ]
    };

    //filters
    this.filterSettings = {
      selectedFilterIndex: 0,
      filters: [
        {
          name: "None",
          method: "channels",
          args: [{
            red: 0,
            green: 0,
            blue: 0
          }]
        }, {
          name: "Light Contrast",
          method: "contrast",
          args: [10]
        }, {
          name: "Heavy Contrast",
          method: "contrast",
          args: [20]
        }, {
          name: "Grayscale",
          method: "greyscale",
          args: null
        }, {
          name: "Red Tint",
          method: "channels",
          args: [{
            red: 30,
            green: 0,
            blue: 0
          }]
        }, {
          name: "Green Tint",
          method: "channels",
          args: [{
            red: 0,
            green: 30,
            blue: 0
          }]
        }, {
          name: "Blue Tint",
          method: "channels",
          args: [{
            red: 0,
            green: 0,
            blue: 30
          }]
        }
      ]
    }

    //text
    this.textSettings = {
      hasHeader: false,
      hasBody: true,
      hasCaption: false,
      selectedModelUniqueId: -1,
      models: [
        { uniqueId: 0, type: 'header', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 0, sizeIndex: 0, isBold: false, isItalic: false },
        { uniqueId: 1, type: 'body', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false },
        { uniqueId: 2, type: 'caption', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false },
      ],
      selectedQuoteIndex: 0,
      quotes: [{
        text: "So it goes."
      }, {
        text: "Whatever you are, be a good one."
      }, {
        text: "Try and fail, but never fail to try."
      }
      ],
      options: {
        align: ['align-left', 'align-center', 'align-right'],
        sizes: ['normal', 'large', 'largest'],
        sizePercentage: ['100', '110', '120'],
        fonts: [
          { name: 'Arial', family: 'Arial, Helvetica, sans-serif' },
          { name: 'Times', family: '"Times New Roman", Times, serif' }
        ],
        colors: ['Black', '#9C27B0', '#2196F3', '#009688', '#CDDC39', '#FF9800']
      }
    };

    //logo
    this.logoSettings = {
      isGraphicHidden: false,
      selectedFile: null,
      size: 50,
      radius: 0
    };
  }

  onShuffleImages() {
    let center = window['_canvas'].getCenter();
    this.imageSettings.images = _.shuffle(this.imageSettings.images);
    fabric.Image.fromURL(this.imageSettings.images[0].url, function (img) {
      window["_canvas"].setBackgroundImage(img, window['_canvas'].renderAll.bind(window["_canvas"]), {
        scaleX: window['_canvas'].height / img.height,
        scaleY: window['_canvas'].height / img.height,
        top: center.top,
        left: center.left,
        originX: 'center',
        originY: 'center',
        crossOrigin: 'anonymous'
      })
    })

    this.imageSettings.selectedImageUniqueId = this.imageSettings.images[0].uniqueId;
    this.editSettingsService.updateCanvas();
  }

  onImageSettingsChange(payload) {
    let center = window['_canvas'].getCenter();
    fabric.Image.fromURL(payload.images[payload.selectedImageUniqueId].url, function (img) {
      // add background image
      window["_canvas"].setBackgroundImage(img, window["_canvas"].renderAll.bind(window["_canvas"]), {
        scaleX: window['_canvas'].height / img.height,
        scaleY: window['_canvas'].height / img.height,
        top: center.top,
        left: center.left,
        originX: 'center',
        originY: 'center',
        crossOrigin: 'anonymous'
      });
    });
    // this.editSettingsService.updateCanvas();
    window["_canvas"].renderAll();
  }

  onCanvasReposition() {
    // console.log("canvas reposition");
  }

  onSizeSettingsChange(payload) {
    console.log(payload);
    window["_canvas"].setWidth(payload.sizes[payload.selectedSizeIndex].width);
    window["_canvas"].setHeight(payload.sizes[payload.selectedSizeIndex].height);
    let center = window['_canvas'].getCenter();
    window["_canvas"].backgroundImage.set(
      {
        scaleX: window['_canvas'].height / window["_canvas"].backgroundImage._element.height,
        scaleY: window['_canvas'].height / window["_canvas"].backgroundImage._element.height,
        top: center.top,
        left: center.left,
        originX: 'center',
        originY: 'center',
        crossOrigin: 'anonymous'
      }
    )

    let selectedSize = payload.sizes[payload.selectedSizeIndex]

    window['_headerText'].top = 100;
    window['_headerText'].left = (selectedSize.width / 2) - (window['_headerText'].width / 2);
    window['_headerText'].setCoords();


    window['_bodyText'].top = selectedSize.height / 2;
    window['_bodyText'].left = (selectedSize.width / 2) - (window['_bodyText'].width / 2);
    window['_bodyText'].setCoords();

    window['_captionText'].top = selectedSize.height - 100;
    window['_captionText'].left = (selectedSize.width / 2) - (window['_captionText'].width / 2);
    window['_captionText'].setCoords();

    window["_canvas"].calcOffset();
  }

  onFilterReset() {
    this.filterSettings.selectedFilterIndex = 0;
    this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onFilterSettingsChange(payload) {
    this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
    console.log(payload);
  }

  onTextSettingsChange(payload) {
    window["_headerText"].opacity = payload.hasHeader ? 1 : 0;
    window["_headerText"].selectable = payload.hasHeader;

    window["_bodyText"].opacity = payload.hasBody ? 1 : 0;
    window["_bodyText"].selectable = payload.hasBody;

    window["_captionText"].opacity = payload.hasCaption ? 1 : 0;
    window["_captionText"].selectable = payload.hasCaption;

    window["_canvas"].renderAll();
  }

  onLogoSettingsChange(payload) {
    this.editSettingsService.updateOverlays();
  }

  onDownload() {
    this.generateImageService.generateImage();
  }
}
