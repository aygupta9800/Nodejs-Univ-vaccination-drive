/* eslint-disable no-unused-vars */
'use strict';
// import { all_vaccine_centers as vaccineCentersRes } from "./vaccine_register";
import dummyVaccineCentersRes from "./dummyVaccineCentersRes.js";
var v = "Hi! I'm a strict mode script!";

// console.log("vaccineCentersRes", vaccineCentersRes);
//**1 Use of arrow functions, split, slice, includes, typeof, JSON.stringify, JSON.parse in your program.

// 1.1 use of arrow function + 1.2 object destructuring
// problem statement : find the vaccine centers at specific zipcode
const centersAtZipcode = (zipcode, centersData) => {
    const { features } = centersData;
    return features.filter(feature => feature?.properties?.postal_code === zipcode);
}
// const res = centersAtZipcode("95113", dummyVaccineCentersRes)

// 1.1 use of typeof
// check input and return 1 if its number else 0
const isNumber = (input) => {
    return typeof(input) === 'number' ? 1 : 0
}
// isNumber("95113") => returns false

//1.1 use of slice 
// get elements of array from index 3 to 6 and save it in sliceArray given length of array is greater than 10
const sliceArray = (arr) => arr.slice(3, 7);
// arr = ["ab", "ba", ""]

//1.1 split string with seperator # into array
const splitString = (str) => {
    return str.split('#');
    // str = "abc#df#fg" => returns ["abc", "df", "fg"]
}

// 1.1 Use of includes
const isFdaVaccine = (vaccine) => {
    const fdaVaccines = ["pfizer", "moderna", "jhonson and jhonson"]
    return fdaVaccines.includes(vaccine.toLowerCase());
}

// 1.1 JSON.stringigy and parse Used in local and session storage implementation in Html application.

// 1.2 
// object destructring used above
// array destructring
const arr1 = ["pfizer", "moderna", "J&J"];
const arr2 = ["covishield", "sputnik", "covaxin"]
// assign first two vaccine names into variable vaccine1, vaccine2
const [vaccine1, vaccine2, ...rest] = arr1;

//spread operator
// concatenate two arrays into one
const combinedArray = [...arr1 , ...arr2]
// rest operator
// add all the vaccines names into one:
const addVaccines = (...vaccine) => {
    return vaccine.reduce((x, y) => x + ", " + y, "Fda approved vaccines listed are: ");
}
addVaccines(arr1);

// closure can be used when we want a function to have access to variable
// which it have during the time of declaration even though during calling, variable is out of scope for it.
// calculate number with specifc power
const power = (factor) => {
    return (num) => Math.pow(num, factor);
}
const powByFactor = power(5);
powByFactor(3); // returns 3 to the power 5
powByFactor(5); // returns 5 to the power 5


//1.3
// export and import/require is used in this file. Also used in index.js to import/require express


// check whether password is min of 6 character having 1 lowercase, 1 uppercase, 1 special character.
const regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
const isValidPwd = (pwd) => pwd.match(regex) ? true : false

// greet customer with a msg  Hello {name}, welcome to the store
let customer = 'john'
const getWelcomeMsg = (name) => `Hello ${name}, welcome to the store`
getWelcomeMsg(customer ='')

// class Static Method
// create class with student of sjsu. create a static method which returns univ president of sjsu
// independent of student object. 
// Then create a subclass of same class for sjsu se major student overriding few of the methods from above.


// 1.3 statc + 1.4 inheritance  + static + object assign
class SjsuStudent {
    constructor(id, name, major, programAdvisor, totalCredits) {
        // copying all the initalization fields into this object
        Object.assign(this, {id, name, major, programAdvisor, totalCredits})
    }

    // Static methods are called directly on class and not on object. this are class specific methods and doesnt usually change with class objects.
    static getUnivPresident() {
        return "Mary A. Papazian"
    }

    getTotalCredits() {
        return this.totalCredits;
    }

    getStudentAcademicDetails() {
        return `Major: ${this.major} Advisor: ${this.programAdvisor}, totalcredits: ${this.totalCredits}`;
    }
}

// console.log("president", SjsuStudent.getUnivPresident()); // Returns "Mary A. Papazian"

// inheritance can be used in classes with extend keyword
class SeStudent extends SjsuStudent{
    constructor(id, name, totalCredits, specialisation) {
        super(id, name, "Software Engineering", "Dan Harkey", totalCredits);
        Object.assign(this, { specialisation})
    }

    getStudentAcademicDetails() {
        return super.getStudentAcademicDetails() + `, Choosen specialisation: ${this.specialisation}`
    }
}

let s1 = new SeStudent("014955585","Ayush Gupta", 33, "Enterprise Software Engineering");
console.log("My academic details:", s1.getStudentAcademicDetails());
console.log("credits", s1.getTotalCredits());


//1.5 api call done in html application using agex

//1.6
// a. call apply bind
// PS: Check The Advisor name and core courses with different program students
const seStudent = {
    advisor: "Dan Harkey",
    getAdvisor: function() {
        return this.advisor
    }
}

const ceStudent = {
    advisor: "Younghee Park",
    getAdvisor: function() {
        return this.advisor
    }
}

const getAdvisorNameAndCoreSubjectsCode = function (c1, c2, c3) {
    console.log("Advisor Name of the program is: " + this.getAdvisor()+
        "  \n core courses codes are:", `${c1}, ${c2}, ${c3}`);
}

// bind
let seAdvisorAndCode = getAdvisorNameAndCoreSubjectsCode.bind(seStudent); 
seAdvisorAndCode("cmpe 255", "cmpe 202", "cmpe 272"); 
// call
getAdvisorNameAndCoreSubjectsCode.call(ceStudent, "cmpe 200", "cmpe 220", "cmpe 240");
//bind
getAdvisorNameAndCoreSubjectsCode.apply(seStudent, ["cmpe 255", "cmpe 202", "cmpe 272"]);

// 1.6
// b var, let, const
// var => can be redefined, has functional scope and not block scope
// PS: say "welcome" to customer when he comes first time else say "hello"
function greet(count=1) {
    var msg = "hello"
    if (count === 1) {
        var msg = 'welcome'
    }
    return msg
}
// let => cant be redefined again in same scope but value can be changed, has block scope 
// PS: greet customer with different msgs according to the count of number of times he has visited store
function getGreetin(count) {
    let msg;
    switch (count) {
        case 1:
            msg = "welcome"
            break;
        case 2:
            msg = "Hey"
            break;
        default:
            msg = "Hello there"
    }
    return msg
}
// const => value is constant in the same scope in which it is defined.
// PS: customer should be greeted with hello every time he visit the store
function getGreeting(count) {
    const msg = "Hello";
    // if (count > 2) {
    //     msg =  "Welcome" // Will throw error 
    // }
}

//1.6
//c callbacks, promise, async await
//PS: Lets suppose you have to write function telling patient
// to leave hospital after 10 minutes from their vaccination shot
//callback
const leaveHospital = () => console.log("Now you can leave");
const afterVaccineShot = (callback) => {
    setTimeout(callback, 600000)
}
afterVaccineShot(leaveHospital);

//Promise
const afterVaccineShot2 = new Promise((resolve) => {
    setTimeout(() => resolve(leaveHospital), 600000)
})
afterVaccineShot2.then(result => result())

//Async Await
async function afterVaccineShot3() {
    await new Promise(resolve => {
        setTimeout(resolve, 600000)
      })
    leaveHospital();
}
afterVaccineShot3();

export const runJsScript = () => {
    // This function is run on node server and its return result can be seen on different webpage url too. code in server.js

    // const res = centersAtZipcode("95113", dummyVaccineCentersRes)
    // check whether password is min of 6 character having 1 lowercase, 1 uppercase, 1 special character.
    // const regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
    // const isValidPwd = (pwd) => pwd.match(regex) ? true : false
    // console.log("is Test@123 valid:", isValidPwd("Test@123"));
    // const res = splitString("abc#df#fg");
    // const res = sliceArray(["a","b","c","d","e","f","g","h","i"])
    // const res = isNumber("95113")
    // const res=  isFdaVaccine("Moderna"); // Returns true
    // bind
    // let seAdvisorAndCode = getAdvisorNameAndCoreSubjectsCode.bind(seStudent); 
    // seAdvisorAndCode("cmpe 255", "cmpe 202", "cmpe 272"); 
    // // call
    // getAdvisorNameAndCoreSubjectsCode.call(ceStudent, "cmpe 200", "cmpe 220", "cmpe 240");
    // //bind
    // getAdvisorNameAndCoreSubjectsCode.apply(seStudent, ["cmpe 255", "cmpe 202", "cmpe 272"]);
    // console.log("res:", res);
    // console.log("president", SjsuStudent.getUnivPresident()); // Returns "Mary A. Papazian"
    // let s1 = new SeStudent("014955585","Ayush Gupta", 33, "Enterprise Software Engineering");
    // console.log("My academic details:", s1.getStudentAcademicDetails());
    // console.log("credits", s1.getTotalCredits());
    // return res
}
