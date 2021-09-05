"use strict";
const username = document.getElementById("name");
const email = document.getElementById("email");
const studentId = document.getElementById("student_id");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const date = document.getElementById("vaccine_date");
const timeslot = document.getElementById("vaccine_time");
const vaccineNameGrp = document.getElementsByName("vaccine_name");
const vaccineDoseGrp = document.getElementById("vaccine_dose");
const address = document.getElementById("address");
const zipcode = document.getElementById("zipcode");
const termscheck = document.getElementById("termscheck");
const registerForm = document.getElementById("register_form");
const errorElement = document.getElementById('error');
const afterRegister = document.getElementById('afterRegister');
const title = document.getElementById('title');
const displayMsg = document.getElementById('displayMsg');
const sameZipcodeCenters = document.getElementById('sameZipcodeCenters'); 
let all_vaccine_centers;
let vaccine_center_info;
let userLocation;

// Use of geolocation Api to fetch the user location and then calculate distance from vaccination centers in his/her zipcode.
window.onload = async () => {
    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return {
            long: pos.coords.longitude,
            lat: pos.coords.latitude,
        };
    };
    userLocation = await getCoords();
}
    
// copied from internet to calculate distance btw two latlong points
function getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional
    if (typeof miles === "undefined"){miles=false;}
    function deg2rad(deg){return deg * (Math.PI/180);}
    function square(x){return Math.pow(x, 2);}
    var r=6371; // radius of the earth in km
    lat1=deg2rad(lat1);
    lat2=deg2rad(lat2);
    var lat_dif=lat2-lat1;
    var lng_dif=deg2rad(lng2-lng1);
    var a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
    var d=2*r*Math.asin(Math.sqrt(a));
    if (miles){return d * 0.621371;} //return miles
    else{return d;} //return km
}



const getVaccineName = () =>  {
    for(let i = 0; i < vaccineNameGrp.length; i++) {
        if(vaccineNameGrp[i].checked) {
            return vaccineNameGrp[i].value;
        }
    }
}

// For reset btn functionality
const resetInput = () => {
    if (typeof(Storage) !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        username.value= '';
        email.value =  '';
        studentId.value =  '';
        phone.value =  '';
        address.value =  '';
        zipcode.value =  '';
        password.value = '';
    }
}

const setLocalStorageValues = () => {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("userObj")) {
            const userObj = JSON.parse(localStorage.getItem("userObj")) || {};
            username.value= userObj.username;
            email.value =  userObj.email;
            studentId.value =  userObj.studentId;
            phone.value =  userObj.phone;
            address.value =  userObj.address;
            zipcode.value =  userObj.zipcode;
            password.value = sessionStorage.getItem("password");
        }
    }
}

setLocalStorageValues();



const getDistance = async (geometry) => {
    return userLocation ?
        getDistanceFromLatLng(
            userLocation.lat, userLocation.long, geometry?.coordinates[1], geometry?.coordinates[0], true
        ).toFixed(2) + ' miles':
        '';
} 

const extractCentersData = (res) => {
    const featuresList = res.features;
    vaccine_center_info = featuresList.filter(feature => feature.properties.postal_code === zipcode.value);
    console.log("vaccine_center_info", vaccine_center_info);
    if (vaccine_center_info.length > 0) {
        let centerTitleElem = document.createElement("Label");
        centerTitleElem.innerHTML = `<br><b>Other Vaccination Centers at your address zipcode which you can visit:<b><br><br>`
        sameZipcodeCenters.appendChild(centerTitleElem)

        vaccine_center_info.map(async center => {
            const { geometry, properties } = center;
            const { city, postal_code, state, url }  = properties
            const center_name = properties?.name;
            const center_address = `${properties?.address}, ${city}, ${state}, ${postal_code} `
            let centerElem = document.createElement("Label");
            centerElem.innerHTML = `<a href="${url}" target="_blank"> ${center_name} </a><br>${center_address}<br>${await getDistance(geometry)}<br>`
            sameZipcodeCenters.appendChild(centerElem)
        });
    }
}

const getCovidVaccinationCentersInfo = () => {
    // Api call to get california covid centers information
    jQuery.ajax({
        url     : `https://www.vaccinespotter.org/api/v0/states/CA.json`,
        async   : true,
        dataType: 'json',
        type    : 'GET',
    }).done(function(data) {
        // Handle Success
        all_vaccine_centers = data;
        console.log(data);
        console.log("success");
        extractCentersData(data);
    }).fail(function(xhr, status, error) {
        // Handle Failure
        console.log("fail");
    })
}

registerForm.addEventListener('submit', (e)=> {
    let errorMsgs = []
    e.preventDefault();
    if (studentId.value && studentId.value.length < 5) {
        errorMsgs.push('Student Id must be atleast 5 characters')
    }
    console.log("password", password.value.length)
    // check whether password is min of 6 character having 1 lowercase, 1 uppercase, 1 special character.
    const regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
    const isValidPwd = (pwd) => pwd.match(regex) ? true : false
    if (!isValidPwd(password.value)) { 
        errorMsgs.push('password must be min of 6 character having 1 lowercase, 1 uppercase, 1 special character.')
    }

    if (errorMsgs.length > 0) {
        // e.preventDefault()
        errorElement.innerText= errorMsgs.join(', ')
    } else if (typeof(Storage) !== "undefined") {
            const userDetail = {
                username: username.value,
                email: email.value,
                studentId: studentId.value,
                phone: phone.value,
                address: address.value,
                zipcode: zipcode.value,
            }
            localStorage.setItem("userObj", JSON.stringify(userDetail));
            sessionStorage.password = password.value;
            // APi call to fetch vaccination centers in CA
            getCovidVaccinationCentersInfo();
            const successMsg = `You have successfuly registered for vaccination drive on ${date.value} for  ${getVaccineName()} vaccine`
            if (registerForm.style.display != "none") {
                registerForm.style.display = "none"
                afterRegister.style.display = "block"
                displayMsg.innerHTML = successMsg
            }
        }
    // console.log("email===", email.value)
    // console.log("student id==", studentId.value)
    // console.log("password==", password.value)
    // console.log("phone==", phone.value)
    // console.log("date==", date.value)
    // console.log("timeslot==", timeslot.value);
    // console.log("vaccineNameGrp==", getVaccineName())
    // console.log("vaccineDoseGrp==", vaccineDoseGrp.value)
    // console.log("address==", address.value)
    // console.log("zipcode==", zipcode.value)
})