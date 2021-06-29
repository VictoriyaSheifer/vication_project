import React, { Component } from 'react';
import * as Api from '../api/apiCall';

class UploadImage extends Component {

    filesToUpload;

    componentDidMount() {

    }

    fileChangeEvent = (fileInput) => {
        this.filesToUpload = fileInput.target.files;
    }

    upload = async () => {
        const formData = new FormData();
        const files = this.filesToUpload;
        console.log(files);

        for (let i = 0; i < files.length; i++) {
            formData.append("images[]", files[i], files[i]['name']);
        }
        console.log("UPLOAD ")
        let res = await Api.postRequest('/upload', formData)
        // console.log('form data variable :   ', formData);
        // this.http.post('http://localhost:3003/upload', formData)
        //     .map(files => files.json())
        //     .subscribe(files => console.log('files', files))
    }

    render() {
        return (
            <div>
                <input id="cin" name="cin" type="file" onChange={($event) => this.fileChangeEvent($event)} placeholder="Upload a file..." multiple />
                <button type="button" className="btn btn-success btn-s" onClick={() => this.upload()}>
                    <i className="glyphicon glyphicon-open-file"></i>&nbsp;Upload
                </button>
            </div >
        );
    }
}

export default UploadImage;