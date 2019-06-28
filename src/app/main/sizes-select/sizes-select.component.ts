import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-sizes-select',
	templateUrl: 'sizes-select.component.html',
	styleUrls: ['sizes-select.component.css'],
})
export class SizesSelectComponent {

	@Input() sizeSettings: any;
	@Output() sizeSettingsChange: EventEmitter<any> = new EventEmitter();

	onIsSelectedChange($index) {

		//update settings
		this.sizeSettings.selectedSizeIndex = $index;

		//emit change
		this.sizeSettingsChange.emit(this.sizeSettings);
	}

}
