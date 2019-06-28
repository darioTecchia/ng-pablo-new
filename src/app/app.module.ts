import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CanvasSelectComponent } from './main/canvas-select/canvas-select.component';
import { MoveClampedToParentDirective } from './main/canvas-select/shared/directives/move-clamped-to-parent.directive';
import { EditTextComponent } from './main/edit-text/edit-text.component';
import { FiltersSelectComponent } from './main/filters-select/filters-select.component';
import { ImageSelectComponent } from './main/image-select/image-select.component';
import { LogoSelectComponent } from './main/logo-select/logo-select.component';
import { ControlPanelComponent } from './main/shared/control-panel/control-panel.component';
import { SizesSelectComponent } from './main/sizes-select/sizes-select.component';
import { TextSelectComponent } from './main/text-select/text-select.component';
import { SelectableDirective } from './shared/directives/selectable.directive';
import { NavComponent } from './shared/nav/nav.component';
import { IndexOfPipe } from './shared/pipes/index-of.pipe';
import { OverlayLogoComponent } from './main/canvas-select/overlays/overlay-logo/overlay-logo.component';
import { OverlayTextsComponent } from './main/canvas-select/overlays/overlay-texts/overlay-texts.component';
import { EditableTextComponent } from './main/canvas-select/overlays/overlay-texts/shared/directives/editable-text/editable-text.component';
import { ControlPanelButtonComponent } from './main/shared/control-panel/control-panel-button/control-panel-button.component';
import { ControlPanelBodyComponent } from './main/shared/control-panel/control-panel-body/control-panel-body.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CanvasSelectComponent,
    MoveClampedToParentDirective,
    EditTextComponent,
    FiltersSelectComponent,
    ImageSelectComponent,
    LogoSelectComponent,
    ControlPanelComponent,
    SizesSelectComponent,
    TextSelectComponent,
    SelectableDirective,
    NavComponent,
    IndexOfPipe,
    OverlayLogoComponent,
    OverlayTextsComponent,
    EditableTextComponent,
    ControlPanelButtonComponent,
    ControlPanelBodyComponent
  ],
  exports: [
    AppComponent,
    MainComponent,
    CanvasSelectComponent,
    MoveClampedToParentDirective,
    EditTextComponent,
    FiltersSelectComponent,
    ImageSelectComponent,
    LogoSelectComponent,
    ControlPanelComponent,
    SizesSelectComponent,
    TextSelectComponent,
    SelectableDirective,
    NavComponent,
    IndexOfPipe,
    OverlayLogoComponent,
    OverlayTextsComponent,
    EditableTextComponent,
    ControlPanelButtonComponent,
    ControlPanelBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
