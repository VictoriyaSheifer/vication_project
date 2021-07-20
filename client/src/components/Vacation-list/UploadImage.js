import React, { Component } from 'react';
import * as Api from '../../api/apiCall';

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
        console.log("1.",files[0]);

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i]);
            console.log("formData::::::::",formData)
        }
        console.log("UPLOAD ")
        let res = await Api.postRequest('/upload', formData)
        console.log("res::::::::",res)
        // console.log('form data variable :   ', formData);
        // this.http.post('http://localhost:5000/upload', formData)
        //     .map(files => files.json())
        //     .subscribe(files => console.log('files', files))
    }

    render() {
        return (
            <div>
                <input id="cin" name="cin" type="file" onChange={($event) => this.fileChangeEvent($event)} placeholder="Upload a file..." multiple />
                <button type="button" class="btn btn-success btn-s" onClick={() => this.upload()}>
                    <i class="glyphicon glyphicon-open-file"></i>&nbsp;Upload
                </button>
            </div >
        );
    }
}

export default UploadImage;