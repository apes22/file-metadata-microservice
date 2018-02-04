# File Metadata Microservice :file_folder:

This service accepts a file upload with a size limit of 1000KB. Once uploaded, it will return the file size in bytes in the JSON response. Note: This service is removing the file from the server right after upload because the upload files are not being managed for this project.  

You can test it at [https://file-metadata-micro-srvc.herokuapp.com](https://file-metadata-micro-srvc.herokuapp.com)

A Full Stack Javascript application built using [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) and [Multer](https://www.npmjs.com/package/multer).
An API Project for FreeCodeCamp.

## Example Usage

The service creates a POST request to the '/get-file-size/' endpoint which includes the file to upload.

```

## Example Output

```javascript
{ 
  file_name: "Maribel.jpg", 
  file_size: "568599 bytes"
}
```

## To Run Project Locally

### Prerequisites
In order to run this project locally, you should have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com//)

### Installation & Startup
1. Fork this repo
2. Clone the fork
3. Install Dependencies: `$ npm install`
4. Start the Server: `$ node app.js`
5. Visit http://localhost:3000/

Enjoy! :blue_heart:
