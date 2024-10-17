document.addEventListener("DOMContentLoaded", function() {




   const internPool = document.getElementById("internPool")
   const dropDownButtons = document.querySelectorAll(".dropdown-btn");
   const selectAll = document.getElementById("select-all")
   const deselectAll = document.getElementById("deselect-all")
   const location = document.getElementById("location")
   const department = document.getElementById("department")
   const filter = document.getElementById("filter")
   const shuffle = document.getElementById("shuffle-btn")
   const outcomeBox = document.getElementById("outcome-box");
   const locationSwitch = document.getElementById("location-switch")
   const departmentSwitch = document.getElementById("department-switch")
   const displayPercentage = document.getElementById('display-percentage')
   //function to click on export button and download
   document.getElementById("export-btn").addEventListener("click", function(){


       let originalOverflow = outcomeBox.style.overflow;
       let originalHeight = outcomeBox.style.height;


       outcomeBox.style.overflow = "visible";
       outcomeBox.style.height = "auto";


       //make sure to target the container you need down below
       html2canvas(document.getElementById("outcome-box")).then(function(canvas){
           outcomeBox.style.overflow = originalOverflow;
           outcomeBox.style.height = originalHeight;
           let imgData = canvas.toDataURL("image/png");
           let link = document.createElement('a');
           link.href = imgData;
           link.download = "randomizerCapture"
           document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       });
   });
   // Function to toggle the dropdown
dropDownButtons.forEach(button => {
   button.addEventListener("click", function (event) {
       event.stopPropagation(); // Prevent the document click event from firing
       const dropDownContent = this.nextElementSibling;
       dropDownContent.classList.toggle("show");
   });
});


// Prevent dropdown from closing when clicking inside its content
document.querySelectorAll(".dropdown-content").forEach(dropdown => {
   dropdown.addEventListener("click", function(event) {
       event.stopPropagation(); // Prevents closing the dropdown when clicking inside it
   });
});


// Close dropdowns when clicking anywhere outside
document.addEventListener("click", function () {
   document.querySelectorAll(".dropdown-content.show").forEach(dropdown => {
       dropdown.classList.remove("show");
   });
});


  
//-------------------------------------------------------------------------------------------------------------------------------------
/*
 getAll() function will be used when we select all the interns
*/
    const addFilterByLocation = [];
    const addFilterByDepartment = [];
    const intersection = [];
    let names = [];

   // Function to render the intern pool with checkboxes (this is done once)
    function renderInternPool(interns) {
      internPool.innerHTML = ''; // Clear current intern pool
      interns.forEach(person => {
         const li = document.createElement("li");
         const label = document.createElement("label");
         const checkbox = document.createElement("input");
         checkbox.type = "checkbox";
         checkbox.value = person.name;
         label.textContent = person.name;
         label.prepend(checkbox);
         li.appendChild(label);
         internPool.appendChild(li);
      });
   }

   // Fetch all interns and render the intern pool initially
   function getAll() {
      fetch('./interns.json')
         .then(response => response.json())
         .then(json => {
            if (json.interns && Array.isArray(json.interns)) {
               names = json.interns.map(intern => ({
                  name: intern.name,
                  location: intern.location,
                  department: intern.department
               }));
               renderInternPool(names); // Render all interns once
               console.log(names); // Log the intern names when fetched
            }
         })
         .catch(error => console.error('Error fetching data:', error));
   }
   getAll(); // Call on page load

   
   // Fetch interns by location and update the filter array
   function getByLocation(place) {
      fetch('./interns.json')
         .then(response => response.json())
         .then(json => {
            const filterByLocation = json.interns.filter(intern => intern.location === place);
            filterByLocation.forEach(intern => addFilterByLocation.push(intern));
            console.log("Added to filterByLocation: ", filterByLocation);
            filterArray(addFilterByDepartment, addFilterByLocation); // Apply filter
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // Remove interns from the location filter array when unchecked
   function removeByLocation(place) {
      fetch('./interns.json')
         .then(response => response.json())
         .then(json => {
            const filterByLocation = json.interns.filter(intern => intern.location === place);
            filterByLocation.forEach(intern => {
               const index = addFilterByLocation.findIndex(i => i.name === intern.name);
               if (index !== -1) {
                  addFilterByLocation.splice(index, 1); // Remove from array
               }
            });
            console.log("Removed from filterByLocation: ", filterByLocation);
            filterArray(addFilterByDepartment, addFilterByLocation); // Apply filter
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // Fetch interns by department and update the filter array
   function getByDepartment(role) {
      fetch('./interns.json')
         .then(response => response.json())
         .then(json => {
            const filterByDepartment = json.interns.filter(intern => intern.department === role);
            filterByDepartment.forEach(intern => addFilterByDepartment.push(intern));
            console.log("Added to filterByDepartment: ", filterByDepartment);
            filterArray(addFilterByDepartment, addFilterByLocation); // Apply filter
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // Remove interns from the department filter array when unchecked
   function removeByDepartment(role) {
      fetch('./interns.json')
         .then(response => response.json())
         .then(json => {
            const filterByDepartment = json.interns.filter(intern => intern.department === role);
            filterByDepartment.forEach(intern => {
               const index = addFilterByDepartment.findIndex(i => i.name === intern.name);
               if (index !== -1) {
                  addFilterByDepartment.splice(index, 1); // Remove from array
               }
            });
            console.log("Removed from filterByDepartment: ", filterByDepartment);
            filterArray(addFilterByDepartment, addFilterByLocation); // Apply filter
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // Event listeners for department checkboxes
   department.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener("change", function() {
         if (checkbox.checked) {
            getByDepartment(checkbox.value); // Add interns to the array when checked
         } else {
            removeByDepartment(checkbox.value); // Remove interns from the array when unchecked
         }
      });
   });

   // Event listeners for location checkboxes
   location.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener("change", function() {
         if (checkbox.checked) {
            getByLocation(checkbox.value); // Add interns to the array when checked
         } else {
            removeByLocation(checkbox.value); // Remove interns from the array when unchecked
         }
      });
   });
//----------------------------------------------------------------------------------------------------------------------------------------




/*
The function gets the intersection of the department and location arrays
*/
function filterArray(departments, locations) {
   const checkboxes = internPool.querySelectorAll('input[type="checkbox"]');
   intersection.length = 0; // Clear the intersection array

   // If both departments and locations filters are empty, uncheck all checkboxes
   if (departments.length === 0 && locations.length === 0) {
      checkboxes.forEach(checkbox => checkbox.checked = false);
      console.log("All filters are unchecked, no checkboxes should be checked.");
      return;
   }

   // Loop through each intern in the `names` array
   names.forEach(intern => {
      const checkbox = Array.from(checkboxes).find(c => c.value === intern.name);
      const inDepartmentFilter = departments.length === 0 || departments.some(d => d.name === intern.name);
      const inLocationFilter = locations.length === 0 || locations.some(l => l.name === intern.name);

      // If intern matches both filters (or filters are empty), check the box, otherwise uncheck it
      if (inDepartmentFilter && inLocationFilter) {
         checkbox.checked = true; // Check the checkbox
         intersection.push(intern); // Add intern to intersection
      } else {
         checkbox.checked = false; // Uncheck the checkbox
      }
   });

   // Log the intersection of filtered interns
   console.log("Filtered Intersection: ", intersection);
}

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
    const locationCheckboxes = location.querySelectorAll('input[type="checkbox"]');
    const departmentCheckboxes = department.querySelectorAll('input[type="checkbox"]');
   
   checkboxes.forEach(checkbox =>{
       checkbox.checked = false
   })
   locationCheckboxes.forEach(checkbox=>{
    checkbox.checked = false
   })
   departmentCheckboxes.forEach(checkbox=>{
    checkbox.checked = false
   })
   intersection.length=0
   addFilterByDepartment.length = 0;
   addFilterByLocation.length = 0;
})




//------------------------------------------------------------------------------------------------------------------------------------------




/*
Here we are adding all the filtered items into the final array
*/
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


//--------------------------------------------------------------------------------------------------------------------------------------------




/*
When the boxes are checked we want to make the arrays where no 2 elements are from the same 
the same department
*/
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




//-----------------------------------------------------------------------------------------------------------------------------------------




/*
When the boxes are checked we want to make the arrays where no 2 elements are from the same 
the same department
*/
function assignDiffLocation(array) {
   // Step 1: Shuffle the array to introduce randomness
   shuffleArray(array);


   // Step 2: Ensure no two consecutive elements have the same department
   for (let i = 0; i < array.length - 1; i++) {
       if (array[i].location === array[i + 1].location) {
           // Find the next available element with a different department
           for (let j = i + 2; j < array.length; j++) {
               if (array[j].location !== array[i].location) {
                   // Swap the elements
                   [array[i + 1], array[j]] = [array[j], array[i + 1]];
                   break;
               }
           }
       }
   }
   return array;
}


function assignDiffLocationDepartment(array) {
   // Step 1: Shuffle the array to introduce randomness
   shuffleArray(array);


   // Step 2: Ensure no two consecutive elements have the same department
   for (let i = 0; i < array.length - 1; i++) {
       if (array[i].location === array[i + 1].location && array[i].department === array[i + 1].department) {
           // Find the next available element with a different department
           for (let j = i + 2; j < array.length; j++) {
               if (array[j].location !== array[i].location && array[j].department !== array[i].department) {
                   // Swap the elements
                   [array[i + 1], array[j]] = [array[j], array[i + 1]];
                   break;
               }
           }
       }
   }
   return array;
}


//----------------------------------------------------------------------------------------------------------------------------------------




/*
This will shuffle the array and for randmoized pairing
*/
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
   if(departmentChecked.checked && locationChecked.checked ){
       assignDiffLocationDepartment(array)
       checkAccuracyLocation_Deperatment(array)
   }else if (departmentChecked.checked) {
       assignDiffDepartment(array);
       checkAccuracyDepartment(array)
   }else if(locationChecked.checked){
       assignDiffLocation(array);
       checkAccuracyLocation(array);
   }else{
       return array;
   }


   // Add location-specific logic here if needed in the future
   console.log(array);
}




//-----------------------------------------------------------------------------------------------------------------------------------------




/*
This function will display the pairs
*/
function displayPairs(interns) {
   outcomeBox.innerHTML = ''; // Clear previous content


   const table = document.createElement("table"); // Create a table element


   if (interns.length % 2 === 0) {
       // If the number of interns is even
       for (let i = 0; i < interns.length; i += 2) {
           const row = document.createElement("tr"); // Create a new table row


           // Create a cell for the first intern's details
           const internA_cell = document.createElement("td");
           const internA_name = document.createElement("div");
           internA_name.innerHTML = "<strong>" + interns[i].name + "</strong>"; // Name is bold
           const internA_department = document.createElement("div");
           internA_department.innerHTML = interns[i].department; // Department is not bold
           const internA_location = document.createElement("div");
           internA_location.innerHTML = interns[i].location; // Location is not bold


           // Append internA details to internA_cell
           internA_cell.appendChild(internA_name);
           internA_cell.appendChild(internA_department);
           internA_cell.appendChild(internA_location);


           // Create a cell for the second intern's details
           const internB_cell = document.createElement("td");
           const internB_name = document.createElement("div");
           internB_name.innerHTML = "<strong>" + interns[i + 1].name + "</strong>"; // Name is bold
           const internB_department = document.createElement("div");
           internB_department.innerHTML = interns[i + 1].department; // Department is not bold
           const internB_location = document.createElement("div");
           internB_location.innerHTML = interns[i + 1].location; // Location is not bold


           // Append internB details to internB_cell
           internB_cell.appendChild(internB_name);
           internB_cell.appendChild(internB_department);
           internB_cell.appendChild(internB_location);


           // Append the two cells (intern A and intern B) to the row
           row.appendChild(internA_cell);
           row.appendChild(internB_cell);


           // Append the row to the table
           table.appendChild(row);
       }
   } else {
       // If the number of interns is odd
       for (let i = 0; i < interns.length - 3; i += 2) {
           const row = document.createElement("tr"); // Create a new table row


           // Create a cell for intern A
           const internA_cell = document.createElement("td");
           const internA_name = document.createElement("div");
           internA_name.innerHTML = "<strong>" + interns[i].name + "</strong>"; // Name is bold
           const internA_department = document.createElement("div");
           internA_department.innerHTML = interns[i].department; // Department is not bold
           const internA_location = document.createElement("div");
           internA_location.innerHTML = interns[i].location; // Location is not bold


           // Append intern A details to internA_cell
           internA_cell.appendChild(internA_name);
           internA_cell.appendChild(internA_department);
           internA_cell.appendChild(internA_location);


           // Create a cell for intern B
           const internB_cell = document.createElement("td");
           const internB_name = document.createElement("div");
           internB_name.innerHTML = "<strong>" + interns[i + 1].name + "</strong>"; // Name is bold
           const internB_department = document.createElement("div");
           internB_department.innerHTML = interns[i + 1].department; // Department is not bold
           const internB_location = document.createElement("div");
           internB_location.innerHTML = interns[i + 1].location; // Location is not bold


           // Append intern B details to internB_cell
           internB_cell.appendChild(internB_name);
           internB_cell.appendChild(internB_department);
           internB_cell.appendChild(internB_location);


           // Append the two cells (intern A and intern B) to the row
           row.appendChild(internA_cell);
           row.appendChild(internB_cell);


           // Append the row to the table
           table.appendChild(row);
       }


       // Handle the last three interns (for odd case)
       const row = document.createElement("tr");


       const internA_cell = document.createElement("td");
       const internA_name = document.createElement("div");
       internA_name.innerHTML = "<strong>" + interns[interns.length - 3].name + "</strong>"; // Name is bold
       const internA_department = document.createElement("div");
       internA_department.innerHTML = interns[interns.length - 3].department; // Department is not bold
       const internA_location = document.createElement("div");
       internA_location.innerHTML = interns[interns.length - 3].location; // Location is not bold
       internA_cell.appendChild(internA_name);
       internA_cell.appendChild(internA_department);
       internA_cell.appendChild(internA_location);


       const internB_cell = document.createElement("td");
       const internB_name = document.createElement("div");
       internB_name.innerHTML = "<strong>" + interns[interns.length - 2].name + "</strong>"; // Name is bold
       const internB_department = document.createElement("div");
       internB_department.innerHTML = interns[interns.length - 2].department; // Department is not bold
       const internB_location = document.createElement("div");
       internB_location.innerHTML = interns[interns.length - 2].location; // Location is not bold
       internB_cell.appendChild(internB_name);
       internB_cell.appendChild(internB_department);
       internB_cell.appendChild(internB_location);


       const internC_cell = document.createElement("td");
       const internC_name = document.createElement("div");
       internC_name.innerHTML = "<strong>" + interns[interns.length - 1].name + "</strong>"; // Name is bold
       const internC_department = document.createElement("div");
       internC_department.innerHTML = interns[interns.length - 1].department; // Department is not bold
       const internC_location = document.createElement("div");
       internC_location.innerHTML = interns[interns.length - 1].location; // Location is not bold
       internC_cell.appendChild(internC_name);
       internC_cell.appendChild(internC_department);
       internC_cell.appendChild(internC_location);


       row.appendChild(internA_cell);
       row.appendChild(internB_cell);
       row.appendChild(internC_cell);


       table.appendChild(row);
   }


   // Append the table to the outcomeBox
   outcomeBox.appendChild(table);
}






function showGroups() {
   const outcomeID = document.getElementById("groups");
   outcomeID.style.visibility = "visible";


   const container = document.querySelector('.outer-box-container');
   container.classList.add('center-boxes');
   console.log(container.classList);
}






//-----------------------------------------------------------------------------------------------------------------------------------------




/*
adds the count and checks the accuracy of the pairs from different departments and locations
*/
function checkAccuracyLocation_Deperatment(array) {
   var sameCounter = 0;
   var diffCounter = 0;
   var totalPairs = Math.floor(array.length / 2);
   console.log(array);


   for (let i = 0; i < array.length - 1; i += 2) {
       const person1 = array[i];
       const person2 = array[i + 1];


       if (person1.location != person2.location && person1.department != person2.department) {
           diffCounter++;
       } else {
           sameCounter++;
       }
   }


   var percentage = Math.floor((diffCounter / totalPairs) * 100);


   console.log("Same Location and Department Pairs:", sameCounter);
   console.log("Different Location and Department Pairs:", diffCounter);
   console.log("Percentage Different Locations and Department:", percentage);
   displayPercentage.innerHTML= "";
   const showPercentage = document.createElement("p");
   showPercentage.innerHTML = `Percentage Different Locations and Department: ${percentage}%`;
   displayPercentage.appendChild(showPercentage);
}




function checkAccuracyLocation(array) {
   var sameCounter = 0;
   var diffCounter = 0;
   var totalPairs = Math.floor(array.length / 2);


   console.log(array)
   for(let i = 0; i < array.length-1; i+=2){
       person1 = array[i]
       person2 = array[i+1]
       if(person1.location == person2.location ){
           sameCounter++;
       } else {
           diffCounter++;
       }
   }
   var percentage = Math.floor((diffCounter/totalPairs)*100)


   console.log("Same Location Pairs:", sameCounter);
   console.log("Different Location Pairs:", diffCounter);
   console.log("Percentage Different Location Pairs", percentage)




   displayPercentage.innerHTML = '';
   const showPercentage = document.createElement("p");
  
   showPercentage.innerHTML = `Percentage Different Locations: ${percentage}%`;
   displayPercentage.appendChild(showPercentage);
}
function checkAccuracyDepartment(array) {
   var sameCounter = 0;
   var diffCounter = 0;
   var totalPairs = Math.floor(array.length / 2);


   console.log(array)
   for(let i = 0; i < array.length-1; i+=2){
       person1 = array[i]
       person2 = array[i+1]
       if(person1.department == person2.department){
           sameCounter++;
       } else {
           diffCounter++;
       }
   }
   var percentage = Math.floor((diffCounter/totalPairs)*100)
   console.log("Same Department Pairs:", sameCounter);
   console.log("Different Department Pairs:", diffCounter);
   console.log("Percentage Different Department Pairs", percentage)
   displayPercentage.innerHTML= "";
   const showPercentage = document.createElement("p");
   showPercentage.innerHTML = `Percentage Different Department: ${percentage}%`;
   displayPercentage.appendChild(showPercentage);
   // groups.removeChild(showPercentage)


}
shuffle.addEventListener("click", function() {
   finalArray.length = 0;
   addFinalArray(names)
   shuffleArray(finalArray);
   toggleLocDep(finalArray)
   displayPairs(finalArray);
   showGroups();
    })


});






