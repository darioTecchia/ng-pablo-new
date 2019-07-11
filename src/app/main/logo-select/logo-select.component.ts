import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var fabric: any;

@Component({
  selector: 'app-logo-select',
  templateUrl: 'logo-select.component.html',
  styleUrls: ['logo-select.component.css']
})
export class LogoSelectComponent {

  @Input() logoSettings: any;
  @Output() logoSettingsChange: EventEmitter<any> = new EventEmitter();

  private controlsVisibility: any = {
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    br: false,
    bl: false,
    bm: false,
    tl: false,
    tr: false
  }

  onVisibilityToggle() {
    this.logoSettings.isGraphicHidden = !this.logoSettings.isGraphicHidden;
    this.logoSettingsChange.emit(this.logoSettings);
  }

  onRemove() {
    this.logoSettings.selectedFile = null;
    this.logoSettings.isGraphicHidden = false;
    window['_canvas'].remove(window['_logo']);
    delete window['_logo'];
    window['_canvas'].renderAll();
  }

  onSelectFileChange($event) {
    //cancel check
    let files = $event.srcElement.files;
    if (files.length > 0) {

      //base64 encode file (TODO extract to a service)
      let reader = new FileReader();
      reader.onload = (e) => {
        let url = (<FileReader>e.target).result;
        let file = { url: url, name: 'Uploaded Image' };

        this.logoSettings.selectedFile = file;

        fabric.Image.fromURL(this.logoSettings.selectedFile.url, (img) => {
          let imageWidth = this.logoSettings.size;
          let imageHeight = (this.logoSettings.size / img.width) * img.height;
          if (window['_logo']) {
            window['_canvas'].remove(window['_logo']);
            delete window['_logo'];
          }
          let logo = window['_logo'] = img.set({
            scaleX: this.logoSettings.size / img.width,
            scaleY: imageHeight / img.height,
            hasRotatingPoint: false
          });
          logo.setControlsVisibility(this.controlsVisibility);
          window['_canvas'].add(logo);
        });
      };
      reader.readAsDataURL($event.srcElement.files[0]);
      this.logoSettingsChange.emit(this.logoSettings);
    }
  }
}