import React, { useState } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import testMovie from "../../public/movie01.mov";

const Storage = () => {
  const [mov, setMov] = useState("");

  const uploadImage = () => {
    const storage = getStorage();
    const storageRef = ref(storage, "images");

    // const file = testImage;
    // const mFile = testMovie;
    console.log(mov);

    uploadBytes(storageRef, mov).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };


  return (
    <div>
      <button onClick={uploadImage}>upload</button>
      <input type="file" onChange={(e) => { setMov(e.target.files[0]) }} />
    </div>
  );
};

export default Storage;
