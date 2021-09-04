// import { runJsScript } from "./js_refresher";
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

const getVaccineName = () =>  {
    for(i = 0; i < vaccineNameGrp.length; i++) {
        if(vaccineNameGrp[i].checked) {
            return vaccineNameGrp[i].value;
        }
    }
}

const setLocalStorageValues = () => {
    if (typeof(Storage) !== "undefined") {
        const userObj = JSON.parse(localStorage.getItem("userObj"));
        username.value= userObj.username;
        email.value =  userObj.email;
        studentId.value =  userObj.studentId;
        phone.value =  userObj.phone;
        address.value =  userObj.address;
        zipcode.value =  userObj.zipcode;
        password.value = sessionStorage.getItem("password");
    }
}

setLocalStorageValues();


const extractCentersData = (res) => {
    console.log("res", res);
    const featuresList = res.features;
    console.log("features", featuresList);
    vaccine_center_info = featuresList.filter(feature => feature.properties.postal_code === zipcode.value);
    //   console.log("")
    console.log("vaccine_center_info", vaccine_center_info);

    if (vaccine_center_info.length > 0) {
        let centerTitleElem = document.createElement("Label");
        centerTitleElem.innerHTML = `<br><b>Other Vaccination Centers at your address zipcode which you can visit:<b><br><br>`
        sameZipcodeCenters.appendChild(centerTitleElem)

        vaccine_center_info.map(center => {
            console.log("center detail:", center);
            const { geometry, properties } = center;
            const { city, postal_code, state }  = properties
            const center_name = properties?.name;
            const center_address = `${properties?.address}, ${city}, ${state}, ${postal_code} `
            let centerElem = document.createElement("Label");
            centerElem.innerHTML = `<a href=""> ${center_name} </a><br>${center_address}<br><br>`
            sameZipcodeCenters.appendChild(centerElem)
        });
    }

    // student health center lat long 
    // 37.335399881153485, -121.88120390398969 

    // else {

    // }
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
    if (password.value.length < 5) { 
        errorMsgs.push('password must be atleast of 5 characters')
    }

    if (errorMsgs.length > 0) {
        // e.preventDefault()
        errorElement.innerText= errorMsgs.join(', ')
    }
    if (typeof(Storage) !== "undefined") {
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
        getCovidVaccinationCentersInfo();
        console.log("afterRegister", afterRegister)
        const successMsg = `You have successfuly registered for vaccination drive on ${date.value} for  ${getVaccineName()} vaccine`
        if (registerForm.style.display != "none") {
            // console.log("===coming in this none ");
            registerForm.style.display = "none"
            afterRegister.style.display = "block"
            displayMsg.innerHTML = successMsg
        }
        

        // localStorage.setItem("username", username.value);
        // localStorage.setItem("email", email.value);
        // localStorage.setItem("studentId", studentId.value);
        // localStorage.setItem("phone", phone.value);
        // localStorage.setItem("address", address.value);
        // localStorage.setItem("zipcode", zipcode.value);
        
        // console.log("data====", res);
        // console.log("username===", userDetail)
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