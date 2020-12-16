import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService,
    private router: Router
  ) { }
  public contactForm: FormGroup
  public phoneNumbers: string[] = [];
  public img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEXo6OhgYGDv7+9ycnLr6+tZWVldXV1VVVVaWlphYWFSUlLm5ubQ0NCCgoJ7e3vg4OCdnZ1nZ2e4uLjS0tKXl5empqaurq6goKCOjo7JycnCwsLa2tpwcHC+vr6pqamxsbGJiYlWM1ywAAAEQ0lEQVR4nO2c23qqMBBGMUwIghxVBPH0/k+5CWhbu62FYIPD96+79or1zTATQyaOAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAhROIG0dQP83pIhOt8V0axG0flLl87YlaSJJIi9pT0vQ5fqmVUJLORJNpHgfQW93gyiKpZZCuJY6a+610lVbbnH0excn/w6xzdtZj6EUdBtHni1zmmnFOV6oN86qeRbsJWUVT+8wBew+itmGaq2Ac9/NpMrVgqiqPqJ9igKoaJSlXPCLbImp0i1b/XmK+JukimfuKh0KFPkfnEj5m9iiIdFMIGdWKlSKv+VeYGr1dRuMNyVONFjIJIAxrFJ5xahkkIWQWRKpMQLhYBmzdRXExC2HSMlEsQk6Gd4gMmMaTc1JBLrRGlWZI2abrjkabC0K+ppi4Pw3rIj4p7FIsspb1Zr2gN1xwUqTAupQu552AoUt/c8MzCsBxhuOVhaNosuKxqxsTQ37Aw3MzecDfCkMWihk4jukXBodLQce79kNZzX9M4ZG4oWQg6IjZtiB6TbWGxNS2mPJY0ZtvBHWrFw9ChzEzQy3gkqU5Ts34h+Xy6SMzSVPH5wma2+OaxKO2g2ui7BZ8Qmnw+1K2CTwg1y6GCXsakU1yhvidNPgiY7Hd/IDbD8lSx+GV4B8VD6qnP59vhF7L+C3DfZZaiLZT0VvQPIUdDrdgvUSVTwUYxjPuUG3VxmAo6uvP/coBWH0xk1um/Iarl8zDKjOvh0htEW//nt1F6Bf+j7I5IUvnfLEKbn9LbhcwDeEU4ZzeQd5HUQyVxTvPw05Co8zKTSnYomW2O8xmZ6dBjXcnqmJ+Lc35ch2JmejfoxtQPAgAALKHrEHD7x3UUeCYVVZuRU1f5Nr3EbrbUZG58Sbd5VTvEe+i5a/J5GmVKNasZPQR8W7PpUWDZ/DeL0rxt//w0GztndW4Xak8n9PT6VB7Ks57tZmTZxG51irxf5O41vahY81jKNcFL8rKxG/ql25NqUb7/crz5DXFyh9vdaF7OuKjfV1LfK3D4f/B+aCgD903vIiCxjx7/lh8uKS/V2zmK8PTTvQJGkiornHfaABDhzjM/6vXYUS62b7OJ0/jJF/u1SO/0FlvFRMWr4/fpuMynXweIKvsrP41yJ94wpvASvK6+PMILNlOGUVRL8/PAfZHZdNefiNMfB7DDC/KJFMXG/CDpMCb6yE/RX5aYb4pTHJcSFgUbxdK6oihtCk6QqOJsPmRoRmD3GP/Am0teQ2jTUEQ22sQ90ma1oZXtHNUEFk9nThFCuydsDU85j2VpTdD8SoFx2LuQYMyE4RjsTbaZj/2Mw96LaHb9zHjsXWAzmaG1SyVgCEMYwhCGMIQhDGEIQxjCEIYwhCEMYfg2hpPg2zOMDu4UHOyNtIupsCUIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0/EPnPZE8QSXkhUAAAAASUVORK5CYII=";

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: new FormControl('', [ Validators.required ]),
      lastName: new FormControl('', [ Validators.required ]),
      city: new FormControl('', [ Validators.required ]),
      address: new FormControl('', [ Validators.required ]),
      photo: new FormControl('', [ Validators.required ]),
      photoRAW: new FormControl('', [ Validators.required ]),
      phone: new FormControl(''),
      email: new FormControl('', [ Validators.email, Validators.required ]),
    })
  }

  public addPhoneNumber(){
    this.phoneNumbers.push(this.contactForm.value['phone']);
    this.contactForm.controls['phone'].setValue('');
  }

  public deletePhoneNumber(idx: number){
    this.phoneNumbers.splice(idx, 1)
  }
  
  public convertFileToBase64( e: File[] ){
    var file = e[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      console.log('RESULT', reader.result)
      this.contactForm.controls['photo'].setValue(reader.result);
      this.img = reader.result.toString();
    }
    reader.readAsDataURL(file);
  }

  public save() : void {
    this.contactForm.markAllAsTouched();
    if ((this.contactForm.valid && this.phoneNumbers.length > 0)){
        let contact = new Contact(
          this.contactForm.value['name'], 
          this.contactForm.value['lastName'], 
          this.phoneNumbers, 
          this.contactForm.value['email'], 
          this.contactForm.value['photo'], 
          this.contactForm.value['address'], 
          this.contactForm.value['city'], 
        )
        console.log(contact);
        this.contactService.createContact(contact);
        this.router.navigateByUrl('/');
    }
  }

  get invalidName(){
    return this.contactForm.get('name').invalid && this.contactForm.get('name').touched;
  }
  get invalidLastName(){
    return this.contactForm.get('lastName').invalid && this.contactForm.get('lastName').touched;
  }
  get invalidCity(){
    return this.contactForm.get('city').invalid && this.contactForm.get('city').touched;
  }
  get invalidAddress(){
    return this.contactForm.get('address').invalid && this.contactForm.get('address').touched;
  }
  get invalidPhone(){
    return this.phoneNumbers.length <= 0 && this.contactForm.get('phone').touched;
  }
  get invalidEmail(){
    return this.contactForm.get('email').invalid && this.contactForm.get('email').touched;
  }
  get invalidPhoto(){
    return this.contactForm.get('photo').invalid && this.contactForm.get('photo').touched;
  }
}
