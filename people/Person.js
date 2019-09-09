function Person(first, last, age, gender){
    this.first = first
    this.last = last
    this.age = age
    this.gender = gender
}

Person.prototype.introduce = function(){
    return 'My name is ' + this.first + ' ' + this.last + ', I\'m ' + this.age  
}

function Property (price){
    this.price = price
}



module.exports.Person = Person
module.exports.Property = Property
