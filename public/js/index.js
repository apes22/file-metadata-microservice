/* http://bitwiser.in/2015/08/08/creating-dropzone-for-drag-drop-file.html*/
const allowMultipleFiles = false;
let fileToUpload;

function makeDroppable(element, callback) {
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  if (allowMultipleFiles){ input.setAttribute('multiple', true);}
  //input.name = 'file'; //necessary for backend file upload processing
  input.style.display = 'none';

  input.addEventListener('change', triggerCallback);
  element.appendChild(input);
  
  element.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.add('dragover');
  });

  element.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
  });

  element.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
    triggerCallback(e);
  });
  
  element.addEventListener('click', function() {
    input.value = null;
    input.click();
  });

  function triggerCallback(e) {
    let files;
    if(e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if(e.target) {
      files = e.target.files;
    }
    callback.call(null, files);
  }
}
function callback(files) {
  if (files){
   previewFiles(files);
  }
}

function previewFiles(files){
  var preview = document.querySelector('#preview');
  preview.innerHTML = ""; 

  function readAndPreview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        preview.appendChild(image);
      }
      else{
        //add a file icon to preview
      }  
    }, false);
    reader.readAsDataURL(file);
    fileToUpload = file;
  }

  if(files) {
  const fileArray = Array.from(files);
   fileArray.forEach(readAndPreview);
  }
}

// Access the form element...
var form = document.getElementById("myForm");
  // ...and take over its submit event.
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (fileToUpload){
      var headers = new Headers();
      // Tell the server we want JSON back
      headers.set('Accept', 'application/json');
      var formData = new FormData();
      formData.append("file", fileToUpload);

      //Make the request
      var url = '/get-file-size/';
      var fetchOptions = {
        method: 'POST',
        headers,
        body: formData
      };
      
      var responsePromise = fetch(url, fetchOptions);
  
    //Use the response
    responsePromise
  	//Convert the response into JSON-JS object.
    .then(function(response) {
      return response.json();
    })
    //Do something with the JSON data
    .then(function(jsonData) {
    	console.log(jsonData);
    });
    }
    else{ 
      alert ("Please select a file to upload")
    }
  });
         
const element = document.querySelector('.droppable');
makeDroppable(element, callback);