document.addEventListener("DOMContentLoaded", function(){
    
    //function to click on export button and download
    document.getElementById("export-btn").addEventListener("click", function(){
        //make sure to target the container you need down below
        html2canvas(document.getElementById()).then(function(canvas){
            let imgData = canvas.toDataURL("image/png");

            let link = document.createElement('a');
            link.href = imgData;
            link.download = "randomizerCapture"

            document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        });
    });

    
});
