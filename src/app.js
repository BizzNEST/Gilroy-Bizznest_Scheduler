

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

            console.log(names); // Log the names array
        })
        .catch((error) => console.error('Error fetching data:', error));
}
getAll();

var filterByLocation = [];

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

            console.log( filterByLocation); 
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Example usage
getByLocation("Gilroy")

var filterByDepartment = [];
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

            console.log( filterByDepartment); 
        })
        .catch((error) => console.error('Error fetching data:', error));
}
getByDepartment("developer")

