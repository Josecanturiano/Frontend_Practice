import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: 'add',
    component: CreateContactComponent
  },
  {
    path: 'edit/:id',
    component: EditContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
