
let uploadedPhoto = document.querySelector("#input-file");
let profilePhoto = document.querySelector("#profile-photo");

uploadedPhoto.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        

        reader.onload = function(event) {
    
            profilePhoto.src = event.target.result;
            console.log("Profile photo updated successfully!");
        };
        
    
        reader.readAsDataURL(file);
    }
});