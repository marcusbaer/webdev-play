class Contact {
    get shortDescription () {
        console.warn('Method shortDescription should be implemented!');
        return '<no short description available>';
    }
}

class Email extends Contact {
    constructor (email) {
        super();
        this.email = email;
    }

    get shortDescription () {
        return `✉ ${this.email}`;
    }
}

class Phone extends Contact {
    constructor (number) {
        super();
        this.number = number;
    }

    get shortDescription () {
        return `☎ ${this.number}`;
    }
}

class Person {
    constructor (options = {}) {
        this.age = options.age || null;
        this.contact = [];
        this.name = options.name || null;

        if (options.email) {
            this.contact.push( new Email(options.email) );
        }

        if (options.phone) {
            this.contact.push( new Phone(options.phone) );
        }
    }
};

export class Adult extends Person {
    constructor (options = {}) {
        super(options);
        this.children = options.children || [];
    }
}

export class Child extends Person {
    constructor (options = {}) {
        super(options);
        this.favorite = options.favorite || [];
    }
}

// Define a skeleton person factory
class PersonFactory {}

// Default personClass is Adult
PersonFactory.prototype.personClass = Adult;

// Our Factory method for creating new Person instances
PersonFactory.prototype.create = function ( options ) {

  switch(options.type){
    case "adult":
      this.personClass = Adult;
      break;
    case "child":
      this.personClass = Child;
      break;
    // defaults to PersonFactory.prototype.personClass (Adult)
  }

  return new this.personClass( options );
};

export default new PersonFactory();