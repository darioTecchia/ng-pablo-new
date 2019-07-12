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
  private canAddQuotes: boolean = true;

  private clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
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
