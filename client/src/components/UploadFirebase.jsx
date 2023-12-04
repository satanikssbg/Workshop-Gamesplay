import React, { useState } from 'react';
import { storage } from '../utils/firabaseConfig';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//allow
//png, jpg, jpeg, gif, webp

const UploadFirebase = () => {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    const handleChange = (event) => {
        setFile(state => {
            const file = event.target.files[0];

            if (file) {
                const extension = file.name.split('.').pop().toLowerCase();
                const reader = new FileReader();

                console.log(file);

                reader.onloadend = () => {
                    console.log(mimeType);
                };

                reader.readAsDataURL(file);
            }

            return file;
        });
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        //const storageRef = ref(storage, `/images/${file.name}`);

        const storageRef = ref(storage, `/images/wow.jpg`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
        </div>
    );
};

export default UploadFirebase;