let fileToUpload = null;

let controller = {
  uploadFile: (file) => {
    let headers = new Headers();
    // Tell the server we want JSON back
    headers.set('Accept', 'application/json');
    const formData = new FormData();
    formData.append("file", fileToUpload);

    //Make the request
    const url = '/get-file-size/';
    const fetchOptions = {
        method: 'POST',
        headers,
        body: formData
      };
      
    const responsePromise = fetch(url, fetchOptions);
  
    //Use the response
    responsePromise
  	//Convert the response into JSON-JS object.
    .then(function(response) {
      console.log(response)
      return response.json();
    })
    //Do something with the JSON data
    .then(function(jsonData) {
    	console.log(jsonData);
    })
    //Fetch only enters the catch statement when there is a network error. Even if we receive a failed rspone, it will enter the then statement.
     .catch({ function(){
       console.log("Something went wrong!");
   }  
   });
  }
};

let view = {
  setUpEventListeners: function (){
    const droppableElement = document.querySelector('.droppable');
    //Adds eventListeners to the droppable element
    makeDroppable(droppableElement, this.previewFiles);
    
    const uploadForm = document.getElementById("uploadForm");
    uploadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (fileToUpload){
        controller.uploadFile(fileToUpload);
      } else{ 
        alert ("Please select a file to upload")
      }
    });
  }, 
  previewFiles: function (files) {
    if (files){
      let preview = document.querySelector('#preview');
      preview.innerHTML = ""; 
      
      const fileArray = Array.from(files);
      fileArray.forEach(function(file){
        let reader = new FileReader();
        reader.addEventListener("load", function() {
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const previewImg = view.createPreviewImg(file, this.result);
            preview.appendChild(previewImg);
          }
          else{
            //add a file icon to preview
          }  
        }, false);
        reader.readAsDataURL(file);
        fileToUpload = file;
      });
    }
  },
  createPreviewImg: function (file, data){
    let image = new Image();
    image.height = 100;
    image.title = file.name;
    image.src = data;
    return image;
  } 
};

view.setUpEventListeners();