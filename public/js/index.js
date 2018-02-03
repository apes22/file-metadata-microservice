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
      let preview = document.querySelector('#preview');
      preview.innerHTML = `<p>File size: ${jsonData.file_size} </p>`;
    	//console.log(jsonData);
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
          ////add image preview
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const previewImg = view.previewImg(file, this.result);
            preview.innerHTML = previewImg;
          }
          else{
             //add a file icon to preview
            const previewFile = view.previewFile(file);
            preview.innerHTML = previewFile; 
          }  
        }, false);
        reader.readAsDataURL(file);
        fileToUpload = file;
      });
    }
  },
  previewImg: function (file, data){
    return `
    <img class="previewImg" title=${file.name} src=${data}><span>${file.name}</span>
    </img>
    `
  },
  previewFile: function(file){
    return `<div>
    <i class="fa fa-file fa-2x"> <span>${file.name}</span></i>
   
    </div>`;
  },
  showLoader: function(){
    return `<div>
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    <span class="sr-only">File Icon/span>
    </div>`;
  }
};

view.setUpEventListeners();