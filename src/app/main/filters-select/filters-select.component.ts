import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters-select',
  templateUrl: 'filters-select.component.html',
  styleUrls: ['filters-select.component.css'],
})
export class FiltersSelectComponent {

  @Input() filterSettings: any;
  @Output() filterSettingsChange: EventEmitter<any> = new EventEmitter();

  onSelectFilter(index) {
    this.filterSettings.selectedFilterIndex = index;
    this.filterSettingsChange.emit(this.filterSettings);
  }
}
