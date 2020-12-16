import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }
  @Input() contact: Contact;
  ngOnInit(): void {
  }

  public deleteThis() : void{
    this.contactService.deleteContact(this.contact); 
    window.location.reload();
  }
  public editThis(): void {
    this.router.navigateByUrl(`/edit/${this.contact.id}`)
  }
}
