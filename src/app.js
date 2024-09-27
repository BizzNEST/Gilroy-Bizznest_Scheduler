document.addEventListener("DOMContentLoaded", function(){

    const internPool = document.getElementById("internPool")
    const dropDownButtons = document.querySelectorAll(".dropdown-btn");
    const selectAll = document.getElementById("select-all")
    const deselectAll = document.getElementById("deselect-all")
    const location = document.getElementById("location")
    const department = document.getElementById("department")


    //function to click on export button and download
    document.getElementById("export-btn").addEventListener("click", function(){
        //make sure to target the container you need down below
        html2canvas(document.getElementById("outcome-box")).then(function(canvas){
            let imgData = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.href = imgData;
            link.download = "randomizerCapture"
            document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        });
    });

    //function for dropdown with checkbox
    dropDownButtons.forEach(button => {
        button.addEventListener("click", function(){
            //gets the next element in the HTML after button is clicked
            const dropDownContent = this.nextElementSibling;
            dropDownButtons.forEach(btn => {
                const otherDropDownContent = btn.nextElementSibling;
                if(otherDropDownContent !== dropDownContent){
                    otherDropDownContent.classList.remove("show");
                }
            });
            dropDownContent.classList.toggle("show");
        });
    });

const locations = document.getElementById("location");
// getAll() function will be used when we select all the interns
var names = [];

function getAll() {
    fetch('./interns.json')
        .then((response) => response.json())
        .then((json) => {
            // initialise an array for names to be added to
            if (json.interns && Array.isArray(json.interns)) {
                json.interns.forEach(intern => {
                    // if the names exist then push them onto the array
                    if (intern.name) {
                        names.push(intern.name);
                    }
                });
            }
            // console.log(names)
            names.forEach(person => {
                const li = document.createElement("li"); // Create a new li element
                const label = document.createElement("label"); // Create a new label
                const checkbox = document.createElement("input"); // Create a checkbox input

                checkbox.type = "checkbox"; // Set the type to checkbox
                checkbox.value = person; // Set the value of the checkbox to the intern's name

                // Set the label text and append the checkbox to the label
                label.textContent = person;
                label.prepend(checkbox); // Add checkbox before the text

                // Append the label to the li, and li to the ul
                li.appendChild(label);
                internPool.appendChild(li);
            });
        })
        .catch((error) => console.error('Error fetching data:', error));
}
getAll();


const addFilterByLocation = [];
var filterByLocation =[];
// Adding all interns in that location to the array
function getByLocation(place) {
    fetch('./interns.json')
        .then((response) => response.json())
        .then((json) => {
            // Filter the interns based on the location
            if (json.interns && Array.isArray(json.interns)) {
                filterByLocation = json.interns
                //filter the array to those interns
                .filter(intern => intern.location === place)
                //map to the names of those interns
                .map(intern => intern.name); 
            }
            // console.log( filterByLocation); 
            filterByLocation.forEach(person=>{
                addFilterByLocation.push(person)
            })
            console.log(addFilterByLocation)
        })
        .catch((error) => console.error('Error fetching data:', error));
}
function removeByLocation(place) {
    fetch('./interns.json')
        .then((response) => response.json())
        .then((json) => {
            let filterByLocation = [];
            if (json.interns && Array.isArray(json.interns)) {
                filterByLocation = json.interns
                    .filter(intern => intern.location === place)
                    .map(intern => intern.name);
            }
            
            // Remove the interns from addFilterByLocation
            filterByLocation.forEach(intern => {
                const index = addFilterByLocation.indexOf(intern);
                if (index !== -1) {
                    addFilterByLocation.splice(index, 1); // Remove from array
                }
            });

            console.log(addFilterByLocation); 
        })
        .catch((error) => console.error('Error fetching data:', error));
}
location.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            getByLocation(checkbox.value); // Add interns to the array when checked
        } else {
            removeByLocation(checkbox.value); // Remove interns from the array when unchecked
        }
    });
});
// Example usage
// getByLocation("Gilroy")
// getByLocation("Salinas")

var filterByDepartment = [];
const addFilterByDepartment = [];
function getByDepartment(role) {
    fetch('./interns.json')
        .then((response) => response.json())
        .then((json) => {
            // Filter the interns based on the location
            if (json.interns && Array.isArray(json.interns)) {
                filterByDepartment = json.interns
                //filter the array to those interns
                .filter(intern => intern.department === role)
                //map to the names of those interns
                .map(intern => intern.name); 
            }
            filterByDepartment.forEach(person=>{
                addFilterByDepartment.push(person)
            })
            console.log(addFilterByDepartment)
        })
        .catch((error) => console.error('Error fetching data:', error));
}
function removeByDepartment(role) {
    fetch('./interns.json')
        .then((response) => response.json())
        .then((json) => {
            let filterByDepartment = [];
            if (json.interns && Array.isArray(json.interns)) {
                filterByDepartment = json.interns
                    .filter(intern => intern.department === role)
                    .map(intern => intern.name);
            }
            
            // Remove the interns from addFilterByLocation
            filterByDepartment.forEach(intern => {
                const index = addFilterByDepartment.indexOf(intern);
                if (index !== -1) {
                    addFilterByDepartment.splice(index, 1); // Remove from array
                }
            });

            console.log(addFilterByDepartment); 
        })
        .catch((error) => console.error('Error fetching data:', error));
}
department.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            getByDepartment(checkbox.value); // Add interns to the array when checked
        } else {
            removeByDepartment(checkbox.value); // Remove interns from the array when unchecked
        }
    });
});
// getByDepartment("developer")
// getByDepartment("design")





    //this is for selecting all the boxes of the interns
selectAll.addEventListener("click",function(){
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox=>{
        checkbox.checked = true
    })
})
//thiis is for deselcting all the boxes of the interns
deselectAll.addEventListener("click",function(){
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox =>{
        checkbox.checked = false
    })
})
});