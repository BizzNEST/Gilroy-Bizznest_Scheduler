document.addEventListener("DOMContentLoaded", function() {


    const internPool = document.getElementById("internPool")
    const dropDownButtons = document.querySelectorAll(".dropdown-btn");
    const selectAll = document.getElementById("select-all")
    const deselectAll = document.getElementById("deselect-all")
    const location = document.getElementById("location")
    const department = document.getElementById("department")
    const filter = document.getElementById("filter")
    const shuffle = document.getElementById("shuffle-btn")
    const outcomeBox = document.querySelector("outcome-box");
    const groupsContainer = document.getElementById("groups-container")
    const locationSwitch = document.getElementById("location-switch")
    const departmentSwitch = document.getElementById("department-switch")
 
 
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
const names = [];

function getAll() {
    fetch('./src/interns.json')
        .then((response) => response.json())
        .then((json) => {
            // initialise an array for names to be added to
            // const names = [];
 
 
            if (json.interns && Array.isArray(json.interns)) {
                json.interns.forEach(intern => {
                    // if the names exist then push them onto the array
                    if (intern.name && intern.location && intern.department) {
                        names.push({
                            name: intern.name,
                            location: intern.location,
                            department: intern.department
                        });
                    }
                });
                console.log(names)
            }
 
 
            // Now that names array is populated, let's iterate over it
            const internPool = document.getElementById("internPool"); // Ensure there's an element with id "internPool"
            names.forEach(person => {
                const li = document.createElement("li"); // Create a new li element
                const label = document.createElement("label"); // Create a new label
                const checkbox = document.createElement("input"); // Create a checkbox input
 
 
                checkbox.type = "checkbox"; // Set the type to checkbox
                checkbox.value = person.name; // Set the value of the checkbox to the intern's name
 
 
                // Set the label text and append the checkbox to the label
                label.textContent = person.name;
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
    fetch('./src/interns.json')
        .then((response) => response.json())
        .then((json) => {
            // Filter the interns based on the location
            if (json.interns && Array.isArray(json.interns)) {
                filterByLocation = json.interns
                //filter the array to those interns
                .filter(intern => intern.location === place)
                //map to the names of those interns
                .map(intern => ({
                        name: intern.name,
                        location: intern.location,
                        department: intern.department
                }));
            }
            // console.log( filterByLocation);
            filterByLocation.forEach(intern => {
                addFilterByLocation.push({
                    name: intern.name,
                    department: intern.location,
                    location: intern.department
                });
            })
            console.log(addFilterByLocation)
        })
        .catch((error) => console.error('Error fetching data:', error));
}
function removeByLocation(place) {
    fetch('./src/interns.json')
        .then((response) => response.json())
        .then((json) => {
            let filterByLocation = [];
            if (json.interns && Array.isArray(json.interns)) {
                filterByLocation = json.interns
                    .filter(intern => intern.location === place)
                    .map(intern => ({
                        name: intern.name,
                        location: intern.location,
                        department: intern.department
                }));
            }
           
            // Remove the interns from addFilterByLocation
            filterByLocation.forEach(intern => {
                const index = addFilterByLocation.findIndex(addIntern =>
                    addIntern.person === intern.name &&
                    addIntern.role === intern.department &&
                    addIntern.place === intern.location);
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


var filterByDepartment = [];
const addFilterByDepartment = [];
function getByDepartment(role) {
    fetch('./src/interns.json')
        .then((response) => response.json())
        .then((json) => {
            // Filter the interns based on the location
            if (json.interns && Array.isArray(json.interns)) {
                filterByDepartment = json.interns
                //filter the array to those interns
                .filter(intern => intern.department === role)
                //map to the names of those interns
                .map(intern => ({
                    name: intern.name,
                    location: intern.location,
                    department: intern.department
            }));
            }
            filterByDepartment.forEach(intern => {
                addFilterByDepartment.push({
                    name: intern.name,
                    location: intern.location,
                    department: intern.department
                });
            })
            console.log(addFilterByDepartment)
        })
        .catch((error) => console.error('Error fetching data:', error));
}
function removeByDepartment(role) {
    fetch('./src/interns.json')
        .then((response) => response.json())
        .then((json) => {
            // let filterByDepartment = [];
            if (json.interns && Array.isArray(json.interns)) {
                filterByDepartment = json.interns
                    .filter(intern => intern.department === role)
                    .map(intern => ({
                        name: intern.name,
                        location: intern.location,
                        department: intern.department
                }));
            }
           
            // Remove the interns from addFilterByLocation
            filterByDepartment.forEach(intern => {
                const index = addFilterByDepartment.findIndex(addIntern=>
                    addIntern.name === intern.name &&
                    addIntern.department === intern.department &&
                    addIntern.location === intern.location
                );
                if (index !== -1) {
                    addFilterByDepartment.splice(index, 1); // Remove from array
                }
            });
 
 
            console.log(addFilterByDepartment);
        })
        .catch((error) => console.error('Error fetching data:', error));
 }
 /*
 
 
 */
 department.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            getByDepartment(checkbox.value); // Add interns to the array when checked
        } else {
            removeByDepartment(checkbox.value); // Remove interns from the array when unchecked
        }
    });
 });
 /*
 The function gets the intersection of the department and location arrays
 */
 const intersection = []
 function filterArray(arr1,arr2){
    if(arr1.length == 0){
        arr2.forEach(intern=>{
            intersection.push({
                name: intern.name,
                location: intern.location,
                department: intern.department
        })
        })
        console.log(intersection)
    }else if(arr2.length == 0){
        arr1.forEach(intern=>{
            intersection.push({
                name: intern.name,
                location: intern.location,
                department: intern.department
            })
        })
        console.log(intersection)
    }else{
        //come back here if anything breaks
        const intern = arr1.filter(n => arr2.some(n2=>n.name === n2.name
        ));
        intern.forEach(intern=>{
            intersection.push({
                name: intern.name,
                location: intern.location,
                department: intern.department
            })
         })
        console.log(intersection);
    }
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
           
    checkboxes.forEach(checkbox => {
        const checkboxValue = checkbox.value; // Assuming the value is the intern's name
 
 
        // Check if this checkbox's value (intern name) exists in the intersection array
        const internIntersetion = intersection.find(intern => intern.name === checkboxValue);
 
 
        // Set the checkbox state based on whether the intern is in the intersection
        if (internIntersetion) {
            checkbox.checked = true;  // If an intern is found in the intersection, check the checkbox
        } else {
            checkbox.checked = false; // If no intern is found, uncheck the checkbox
        }    });
 }
 
 
 filter.addEventListener("click", function(){
    intersection.length = 0
    filterArray(addFilterByDepartment,addFilterByLocation)
 
 
 })
 
 
 
 
 
 
    //this is for selecting all the boxes of the interns
 selectAll.addEventListener("click",function(){
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox=>{
        checkbox.checked = true
    })
 })
 //this is for deselcting all the boxes of the interns
 deselectAll.addEventListener("click",function(){
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox =>{
        checkbox.checked = false
    })
 })
 const finalArray = [];
 function addFinalArray(){
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
    
    for(let i = 0; i < names.length; i++){      
        if(checkboxes[i].checked && checkboxes[i].value === names[i].name){
            finalArray.push({
                            name: names[i].name,
                            location : names[i].location,
                            department : names[i].department
                        })
        }
    }
    
    console.log(finalArray)
 }
 
 
 
 function assignDiffDepartment(array) {
    // Step 1: Shuffle the array to introduce randomness
    shuffleArray(array);

    // Step 2: Ensure no two consecutive elements have the same department
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i].department === array[i + 1].department) {
            // Find the next available element with a different department
            for (let j = i + 2; j < array.length; j++) {
                if (array[j].department !== array[i].department) {
                    // Swap the elements
                    [array[i + 1], array[j]] = [array[j], array[i + 1]];
                    break;
                }
            }
        }
    }
    return array;
}
 function shuffleArray(array) {
    for (let i = 0; i < array.length - 1; i++) {
        const j = Math.floor(Math.random() * (array.length - i)) + i; // Random index from i to end
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    console.log(array)
    return array;
 }


function toggleLocDep(array){
    const locationChecked = locationSwitch.querySelector('input[type="checkbox"]');
    const departmentChecked = departmentSwitch.querySelector('input[type="checkbox"]');

    if (departmentChecked.checked) {
        assignDiffDepartment(array); // Ensure different departments
    }

    // Add location-specific logic here if needed in the future
    console.log(array);
}

 
 
 function displayPairs(interns) {
    groupsContainer.innerHTML = ''; // Clear previous groups
    if (interns.length % 2 == 0) {
        for (let i = 0; i < interns.length; i += 2) {
            const li = document.createElement("li");
            const label = document.createElement("label");
   
            // Handle case where we have an odd number of interns
 
 
            const partner1 = interns[i].name;
            const partner2 = interns[i + 1].name; // if there's no second intern, show 'No Partner'
   
            label.textContent = `${partner1} & ${partner2}`;
            li.appendChild(label);
            groupsContainer.appendChild(li);
        }
    }
    else {
        for (let i = 0; i < interns.length - 3; i += 2) {
            const li = document.createElement("li");
            const label = document.createElement("label");
   
            // Handle case where we have an odd number of interns
            const partner1 = interns[i].name;
            const partner2 = interns[i + 1].name; // if there's no second intern, show 'No Partner'
 
 
   
            label.textContent = `${partner1} & ${partner2}`;
            li.appendChild(label);
            groupsContainer.appendChild(li);
    }
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = `${interns[interns.length - 3].name} & ${interns[interns.length - 2].name} & ${interns[interns.length - 1].name}`;
    li.appendChild(label);
    groupsContainer.appendChild(li);
    }  
 }
 
 
 function checkAccuracy(array){
    var sameCounter = 0;
    var diffCounter = 0;
    console.log(array)
    for(let i = 0; i < array.length-1; i+=2){
        person1 = array[i].department
        person2 = array[i+1].department
        // console.log(person1)
        if(person1 == person2){
            sameCounter++;
        }else{
            diffCounter ++;
        }
    }
    console.log(sameCounter)
    console.log(diffCounter)
 }
 
 
 shuffle.addEventListener("click", function() {
    finalArray.length = 0;
    addFinalArray(names)
    shuffleArray(finalArray);
    toggleLocDep(finalArray)
    displayPairs(finalArray);
    checkAccuracy(finalArray);

 })
 
 
 });
 
 