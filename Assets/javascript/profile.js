// Variables
const uploadBtn=document.getElementById("upload");
const fileUpload = document.getElementById("file-upload");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const email = document.getElementById("email");
const Address = document.getElementById("Address");
const editForm = document.getElementById("editForm");
const Update = document.getElementById("Update");




let url ="";
fName.value=getSessionData().fName;
lName.value=getSessionData().lName;
email.value=getSessionData().email;
Address.value=getSessionData().Address;



// console.log(getSessionData().imageSrc);
function getSessionData() {
    return JSON.parse(localStorage.getItem("session"));
}
// Preveiw Image
fileUpload.addEventListener("change",function(){
    const fr = new FileReader();
    fr.readAsDataURL(fileUpload.files[0]);
    fr.addEventListener("load",function(){
        url = fr.result;
        imagePreviewElement.src=url;
        imagePreviewElement.style.display = "block";
        Update.addEventListener("click",function(){
            let userData = signUpData().find((user) => user.email === email.value);
            userData.imageSrc = url;
            var filterSignUpData = signUpData().filter(user => user.email !== email.value);
            var newSignUpData = [...filterSignUpData,userData]
            localStorage.setItem("signUpData", JSON.stringify(newSignUpData));
            var session = {
                fName:fName.value,
                lName:lName.value,
                email:email.value,
                Address:Address.value,
                imageSrc:url,
            }
            localStorage.setItem("session", JSON.stringify(session));
        })
})
    function signUpData() {
        return JSON.parse(localStorage.getItem("signUpData"));
    }

})

// Function Clear Inputs
function clearInputs(){
        const inputs = document.querySelectorAll("input")
        const textArea = document.querySelector(".textarea textarea")
            inputs.forEach(function(item){
                if(item.type == "text" || item.type == "email"){
                    item.value = "";
                    textArea.value= "";
                    console.log("done");
                }
            })
}
const userName = document.querySelector(".userName")
const imagePreviewElement = document.querySelector("#preview-selected-image");
if (getSessionData().imageSrc !== ""){
    imagePreviewElement.src=getSessionData().imageSrc;
    imagePreviewElement.style.display = "block";
}

