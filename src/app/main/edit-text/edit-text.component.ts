import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { EditSettingsService } from '../../shared/services/edit-settings.service';

import { EditableTextComponent } from '../canvas-select/overlays/overlay-texts/shared/directives/editable-text/editable-text.component';


@Component({
  selector: 'app-edit-text',
  templateUrl: 'edit-text.component.html',
  styleUrls: ['edit-text.component.css']
})
export class EditTextComponent implements OnInit {

  @Input() textSettings: any;
  @Input() textComponent: string;

  private isShowColors: boolean;
  private isShowFonts: boolean;
  private editableTextComponentCurrent: any = null;

  private top: number = 0;
  private left: number = 0;

  constructor(public el: ElementRef, private editSettingsService: EditSettingsService) {
    this.el = el.nativeElement;
  }

  ngOnInit() {

    console.log(this.textSettings);
    

    //subscribe
    this.editSettingsService.storeEditText.subscribe((editableTextComponent) => {

      if(editableTextComponent && editableTextComponent.reposition) {
        this.top = this.editableTextComponentCurrent.top - this.editableTextComponentCurrent.height * 2 - 10;
        this.left = this.editableTextComponentCurrent.left - this.editableTextComponentCurrent.width + 130;
        return;
      }

      if(editableTextComponent && editableTextComponent.selected) {
        this.editableTextComponentCurrent = editableTextComponent.elem;
        this.top = this.editableTextComponentCurrent.top - this.editableTextComponentCurrent.height * 2 - 10;
        this.left = this.editableTextComponentCurrent.left - this.editableTextComponentCurrent.width + 130;
        console.log(this.editableTextComponentCurrent);
      } else {
        this.editableTextComponentCurrent = null;
      }
    });
  }

  private update() {
    window['_canvas'].renderAll();
  }

  private onUpdateEditText(editableTextComponent: EditableTextComponent) {

    //update check
    if (editableTextComponent && editableTextComponent !== this.editableTextComponentCurrent) {

      //update editableTextComponentCurrent
      this.editableTextComponentCurrent = editableTextComponent;

      //update edit controls position
      this.editableTextComponentCurrent.addEditTextControls(this);
    }

    //clear options
    this.onCloseOptions()
  }

  private onUpdateFont(index) {
    this.editableTextComponentCurrent.fontFamily = index;
    this.update();
    // this.editableTextComponentCurrent.model.fontIndex = index;
  }

  private onToggleBold() {
    this.editableTextComponentCurrent.fontWeight = this.editableTextComponentCurrent.fontWeight == 'bold' ? '' : 'bold';
    this.update();
  }

  private onToggleItalic() {
    this.editableTextComponentCurrent.fontStyle = this.editableTextComponentCurrent.fontStyle == 'italic' ? '' : 'italic';
    this.update();
  }

  private onUpdateSize() {
    //target
    let sizeIndex = this.textSettings.options.sizes.indexOf(this.editableTextComponentCurrent.fontSize) + 1;

    //cycle target check
    if (sizeIndex > this.textSettings.options.sizes.length - 1) {
      sizeIndex = 0;
    }

    //update
    this.editableTextComponentCurrent.fontSize = this.textSettings.options.sizes[sizeIndex];
    this.update();
  }

  private onUpdateColor(index) {
    console.log(index);
    this.editableTextComponentCurrent.setColor(index);
    this.update();
  }

  private onUpdateAlign() {

    //target
    let alignIndex = this.textSettings.options.align.indexOf(this.editableTextComponentCurrent.textAlign) + 1;

    //cycle target check
    if (alignIndex > this.textSettings.options.align.length - 1) {
      alignIndex = 0;
    }

    //update
    this.editableTextComponentCurrent.textAlign = this.textSettings.options.align[alignIndex];
    this.update();
  }

  private onCloseOptions() {

    //clear all
    this.isShowColors = false;
    this.isShowFonts = false;
  }

}
