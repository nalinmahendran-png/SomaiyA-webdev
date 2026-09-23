const form = document.querySelector("form");

const pname = document.getElementById("pname");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const date = document.getElementById("date");
const doctor = document.getElementById("doctor");

function showError(field, message) {
    field.style.border = "2px solid red";

    let error = document.getElementById(field.id + "Error");

    if (!error) {
        error = document.createElement("span");
        error.id = field.id + "Error";
        error.style.color = "red";
        error.style.marginLeft = "10px";
        field.parentNode.insertBefore(error, field.nextSibling);
    }

    error.textContent = message;
}

function clearError(field) {
    field.style.border = "1px solid gray";

    const error = document.getElementById(field.id + "Error");

    if (error) {
        error.textContent = "";
    }
}

function validateName() {
    const value = pname.value.trim();

    pname.value = value;

    if (value === "") {
        showError(pname, "Patient Name is required");
        return false;
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
        showError(pname, "Name can contain only alphabets and spaces");
        return false;
    }

    clearError(pname);
    return true;
}

function validateMobile() {
    const value = mobile.value.trim();

    mobile.value = value;

    if (value === "") {
        showError(mobile, "Mobile number is required");
        return false;
    }

    if (!/^[6-9][0-9]{9}$/.test(value)) {
        showError(mobile, "Enter exactly 10 digits");
        return false;
    }

    clearError(mobile);
    return true;
}

function validateEmail() {
    const value = email.value.trim();

    email.value = value;

    if (value === "") {
        showError(email, "Email is required");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(email, "Enter a valid email address");
        return false;
    }

    clearError(email);
    return true;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!gender) {
        const firstGender = document.getElementById("male");
        showError(firstGender, "Please select Gender");
        return false;
    }

    clearError(document.getElementById("male"));
    return true;
}

function validateDate() {
    if (date.value === "") {
        showError(date, "Test Date is required");
        return false;
    }

    const today = new Date();
    const selectedDate = new Date(date.value);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        showError(date, "Test Date cannot be in the future");
        return false;
    }

    clearError(date);
    return true;
}

function validateDoctor() {
    if (doctor.value === "" || doctor.value === "Select Doctor") {
        showError(doctor, "Please select a doctor");
        return false;
    }

    clearError(doctor);
    return true;
}

form.addEventListener("submit", function(event) {
    const validName = validateName();
    const validMobile = validateMobile();
    const validEmail = validateEmail();
    const validGender = validateGender();
    const validDate = validateDate();
    const validDoctor = validateDoctor();

    if (
        !validName ||
        !validMobile ||
        !validEmail ||
        !validGender ||
        !validDate ||
        !validDoctor
    ) {
        event.preventDefault();
    } else {
        event.preventDefault();
        alert("Patient registered successfully!");
    }
});

pname.addEventListener("input", validateName);
mobile.addEventListener("input", validateMobile);
email.addEventListener("input", validateEmail);
date.addEventListener("change", validateDate);
doctor.addEventListener("change", validateDoctor);

document.querySelectorAll('input[name="gender"]').forEach(function(radio) {
    radio.addEventListener("change", validateGender);
});

const today = new Date().toISOString().split("T")[0];
date.setAttribute("max", today);

form.addEventListener("reset", function() {
    setTimeout(function() {
        clearError(pname);
        clearError(mobile);
        clearError(email);
        clearError(date);
        clearError(doctor);
        clearError(document.getElementById("male"));
    }, 0);
});

