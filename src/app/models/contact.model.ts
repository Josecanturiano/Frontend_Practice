
export class Contact {
    
    public id: number;
    public name: string;
    public lastName: string;
    public phoneNumbers: string[];
    public email: string;
    public photo: string;
    public address: string;
    public city: string;
    
    
    constructor(        
        name: string,
        lastName: string,
        phoneNumbers: string[],
        email: string,
        photo: string,
        address: string,
        city: string
    ){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
        this.photo = photo;
        this.id = new Date().valueOf();
        this.address = address;
        this.city = city;
    }
}