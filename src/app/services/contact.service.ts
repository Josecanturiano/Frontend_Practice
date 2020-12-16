import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core'
import { Contact } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService  {

    contacts: Contact[] = [];
    constructor(private http: HttpClient) {
      this.getData();
    }

    public createContact( contact: Contact ) : number {
      this.contacts.push( contact );
      this.saveStorage();
      return contact.id;
    }

    public updateContact( contact: Contact ) : void {
      this.contacts[this.contacts.findIndex(oldContact => oldContact.id === contact.id)] = contact
      this.saveStorage();
    }
  
    public deleteContact( contact: Contact ) : void {
      this.contacts = this.contacts.filter( contactData => contactData.id !== contact.id );
      this.saveStorage();
    }

    public findContactById( id: number ) : Contact {
      id = Number(id);
      return this.contacts.find(  contact => contact.id === id );  
    }
  
    private saveStorage() : void {
      localStorage.setItem('data', JSON.stringify(this.contacts) );
    }
  
    private async getData() : Promise<void> {
      if ( localStorage.getItem('data') ) {
        this.contacts = JSON.parse( localStorage.getItem('data') );
        if(this.contacts.length <= 0){
          this.contacts = await this.fetchJSON();
          this.saveStorage();
        }
      } else {
        this.contacts = await this.fetchJSON();
        this.saveStorage();
      }            
    }

    private fetchJSON() : Promise<Contact[]> {
        return this.http.get<any>('assets/contact_data.json')
            .toPromise()
            .then(res => <Contact[]>res.data)
            .then(data => { return data; });
    }
}
  