const events = require(`events`);
const util = require('util');

const Person = function(name) { // this is how we create a "class" or rather, a "prototype" the shitty old way in JavaScript, that's a "construcor" for you
    this.name = name
}

util.inherits(Person, events.EventEmitter); // this is how we inherit/extend from a class using prototypes and Node.js's util module using the old shitty way of doing basic oop things

const mohammed = new Person('mohammed');
const asma = new Person('asma');
const test = new Person('test');

const people = [mohammed, asma, test]

people.forEach(function(person) {
    person.on('speak', function(msg) { // listen to a `speak` event
        console.log(`${person.name} said: ${msg}`)
    });
});

mohammed.emit('speak', "hiiii!") // emit a `speak` event