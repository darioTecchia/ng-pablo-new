import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, QueryList, ViewChildren } from '@angular/core';

import * as _ from "underscore"

import { SelectableDirective } from '../../shared/directives/selectable.directive';

@Component({
  selector: 'app-text-select',
  templateUrl: 'text-select.component.html',
  styleUrls: ['text-select.component.css'],
})
export class TextSelectComponent implements AfterViewInit {

  @Input() textSettings: any;
  @Output() textSettingsChange: EventEmitter<any> = new EventEmitter();
  @ViewChildren(SelectableDirective) selectables: QueryList<SelectableDirective>;

  private selectableHeader: SelectableDirective;
  private selectableBody: SelectableDirective;
  private selectableCaption: SelectableDirective;
  private canAddQuotes: boolean = false;

  private clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  ngAfterViewInit() {

    //view sync
    let list = this.selectables.toArray();
    this.selectableHeader = list[0];
    this.selectableBody = list[1];
    this.selectableCaption = list[2];

    //data
    this.selectableHeader.isSelected = this.textSettings.hasHeader;
    this.selectableBody.isSelected = this.textSettings.hasBody;
    this.selectableCaption.isSelected = this.textSettings.hasCaption;
    this.canAddQuotes = this.selectableBody.isSelected;

    //recheck as this.canAddQuotes was checked prior to ngAfterViewInit being called
    this.changeDetectionRef.detectChanges();
  }

  onIsSelectedChange($event) {

    //quotes check
    if ($event === this.selectableBody) {
      this.canAddQuotes = $event.isSelected;
    }

    //update
    this.textSettings.hasHeader = this.selectableHeader.isSelected;
    this.textSettings.hasBody = this.selectableBody.isSelected;
    this.textSettings.hasCaption = this.selectableCaption.isSelected;

    //emit change
    this.textSettingsChange.emit(this.textSettings);
  }

  updateQuote() {

    let index = Math.abs(this.textSettings.selectedQuoteIndex % this.textSettings.quotes.length)
    window['_bodyText'].set({
      text: this.textSettings.quotes[index].text
    })
    window['_bodyText'].setCoords();
    window['_canvas'].renderAll();
    console.log(this.textSettings.quotes[index].text, index);
  }

  onQuotePrev() {
    //decrement and clamp
    this.textSettings.selectedQuoteIndex--;

    //update
    this.updateQuote();
  }

  onQuoteNext() {

    //increment and clamp
    this.textSettings.selectedQuoteIndex++;

    //update
    this.updateQuote();
  }

}
