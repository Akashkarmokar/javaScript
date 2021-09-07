// Dependencies
const fs = require('fs');
const path = require('path');


// Module Scafholding
const lib = {};

// Base directory of a folder,which folder contain data with specified file name 
/*
    file structure like:
    root
    |    .data
    |    .lib - (this folder containg file)
    |    |   filesystem.js
*/
lib.basedir = path.join(__dirname, '/../.data/'); // A folder where we store data .For Our example it return the directory for our *data folder


// Write data to the file 
/* 
* dir - user define subfolder name (it will be add with base  directory also )
* file - user define file name
* data - user data 
* callback - callback function to do staff
*/
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {  // wx - Open file for writing. The file is created but fails if the path exists.
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file then clost it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2 && fileDescriptor) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Erron closing the new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could Not Create File,It may already exists!');
        }
    });
};




/* 
* Read Data from file
* dir - user define subfolder name (it will be add with base  directory also )
* file - user define file name
* data - user data 
* callback - callback function to do staff
*/
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
};


/* Update Existing file 
* 
* dir - user define subfolder name (it will be add with base  directory also )
* file - user define file name
* data - user data 
* callback - callback function to do staff
*/
lib.update = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => { // r+ flag for Open file for reading. An exception occurs if the file does not exist. 
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }
                            });
                        } else {
                            callback('Error writing to file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            console.log('Error updating: File may be not exist');
        }
    });
};



/* Delete Existing file 
* 
* dir - user define subfolder name (it will be add with base  directory also )
* file - user define file name
* data - user data 
* callback - callback function to do staff
*/
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => { // unlink function to delete an existing file
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};




module.exports = lib;
