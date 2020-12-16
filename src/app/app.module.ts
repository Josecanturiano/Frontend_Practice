import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyDirective } from './Shared/Directives/OnlyNumbers.directive';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactCardComponent,
    ContactListComponent,
    CreateContactComponent,
    DigitOnlyDirective,
    EditContactComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
