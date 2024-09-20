const locations = document.getElementById("location")

const interns =  fetch('./interns.json')
    .then((response)=> response.json())
    .then((json)=>console.log(json));

var names = [];

for(var i in interns){
    names.push([i,interns.name[i]]);
}
console.log(names)