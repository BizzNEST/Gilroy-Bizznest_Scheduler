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
    fetch('./src/interns.json')
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
    fetch('./src/interns.json')
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
    fetch('./src/interns.json')
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
    fetch('./src/interns.json')
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
    fetch('./src/interns.json')
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
const intersection = []
function filterArray(arr1,arr2){
    if(arr1.length == 0){
        arr2.forEach(person=>{
            intersection.push(person)
        })
        console.log(intersection)
    }else if(arr2.length == 0){
        arr1.forEach(person=>{
            intersection.push(person)
        })
        console.log(intersection)
    }else{
         const intern = arr1.filter(value => arr2.includes(value));
         intern.forEach(person=>{
            intersection.push(person)
         })
        console.log(intersection);
    }
    const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox =>{
                const internName = checkbox.value;

                if(intersection.includes(internName)){
                    checkbox.checked = true;
                }else{
                    checkbox.checked = false;
                }
            });           
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
    checkboxes.forEach(checkbox=>{
        if(checkbox.checked){
            finalArray.push(checkbox.value)
        }
    })
    console.log(finalArray)
}

function shuffleArray(array) {
    for (let i = 0; i < array.length - 1; i++) {
        const j = Math.floor(Math.random() * (array.length - i)) + i; // Random index from i to end
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    console.log(array)
    return array;
}

// function assignPartners(array) {
//     array.forEach(person => {
//         const li = document.createElement("li"); // Create a new li element
//         const label = document.createElement("label"); // Create a new label

//         // Set the label text and append the checkbox to the label
//         label.textContent = person;
//         // Append the label to the li, and li to the ul
//         li.appendChild(label);
//         outcomeBox.appendChild(li);

//         })
// };

 function displayPairs(interns) {
    groupsContainer.innerHTML = ''; // Clear previous groups
    if (interns.length % 2 == 0) {
        for (let i = 0; i < interns.length; i += 2) {
            const li = document.createElement("li");
            const label = document.createElement("label");
    
            // Handle case where we have an odd number of interns

            const partner1 = interns[i];
            const partner2 = interns[i + 1]; // if there's no second intern, show 'No Partner'
    
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
            const partner1 = interns[i];
            const partner2 = interns[i + 1]; // if there's no second intern, show 'No Partner'

    
            label.textContent = `${partner1} & ${partner2}`;
            li.appendChild(label);
            groupsContainer.appendChild(li);
    }
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = `${interns[interns.length - 3]} & ${interns[interns.length - 2]} & ${interns[interns.length - 1]}`;
    li.appendChild(label);
    groupsContainer.appendChild(li);
    }   
}

shuffle.addEventListener("click", function() {
    finalArray.length = 0;
    addFinalArray()
    shuffleArray(finalArray);
    displayPairs(finalArray);
})

});





///// Imported code



//// shuffle algorithm


//using temporary array to test display method
// function displayPairs(interns) {
//     groupsContainer.innerHTML = ''; // Clear previous groups
//     interns.forEach(intern => {
//         const li = document.createElement("li"); // Create a new li element
//         const label = document.createElement("label"); // Create a new label
//         label.textContent = intern;
//         // Append the label to the li, and li to the ul
//         li.appendChild(label);
//         outcomeBox.appendChild(li);
//     })
// }

// shuffleButton(filteredarray);

//  //function to display pairs of interns
//  function displayPairs(interns) {
//     groupsContainer.innerHTML = ''; // Clear previous groups
    
//     for (let i = 0; i < interns.length; i += 2) {
//         const li = document.createElement("li");
//         const label = document.createElement("label");

//         // Handle case where we have an odd number of interns
//         const partner1 = interns[i];
//         const partner2 = interns[i + 1] || "No Partner"; // if there's no second intern, show 'No Partner'

//         label.textContent = `${partner1} & ${partner2}`;
//         li.appendChild(label);
//         groupsContainer.appendChild(li);
//     }
// }
