import { MaterialModule } from './../../material/material.module';
import { NavesService } from './naves.service';
import { SharedModule } from './../../shared/shared.module';
import { NavesComponent } from './naves.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavesRoutingModule } from './naves-routing.module';
import { AddNaveComponent } from './components/add-nave/add-nave.component';
import { EditNaveComponent } from './components/edit-nave/edit-nave.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavesComponent,
    AddNaveComponent,
    EditNaveComponent
  ],
  imports: [
    CommonModule,
    NavesRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavesComponent
  ],
  providers: [
    NavesService
  ]
})
export class NavesModule { }
