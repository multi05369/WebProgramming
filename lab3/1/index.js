const checkID = document.getElementById("id");
const checkPrefix = document.getElementById("prefix");
const checkName = document.getElementById("name");
const checkSur = document.getElementById("surname");
const checkAddress = document.getElementById("address");
const checkDistrict = document.getElementById("district");
const checkProvince = document.getElementById("province");
const checkCounty = document.getElementById("county");
const checkZip = document.getElementById("zipcode");

document.querySelector("form").addEventListener("submit", submit);

function submit() {
    if (checkID.value.length != 13) {
        alert("Invalid ID");
        return false;
    }

    if (checkPrefix.value == "00") {
        alert("Please choose your prefix");
        return false;
    }

    if (checkName.value.length < 2 || checkName.value.length > 20) {
        alert("Invalid name");
        return false;
    }

    if (checkSur.value.length < 2 || checkSur.value.length > 30) {
        alert("Invalid surname");
        return false;
    }

    if (checkAddress.value.length < 15) {
        alert("Invalid address");
        return false;
    }

    if (checkDistrict.value.length < 2) {
        alert("Invalid district");
        return false;
    }

    if (checkCounty.value.length < 2) {
        alert("Invalid county");
        return false;
    }

    if (checkProvince.value == "00") {
        alert("Please choose your province");
        return false;
    }

    if (checkZip.value.length != 5) {
        alert("Invalid zip code");
        return false;
    }

}

