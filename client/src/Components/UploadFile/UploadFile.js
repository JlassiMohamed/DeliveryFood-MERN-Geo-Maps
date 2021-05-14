import React, { useState } from "react";

export default function UploadFile() {
  const [image, setImage] = useState();
  const onChange = (e) => setImage(URL.createObjectURL(e.target.files[0]));

  return (
    <div className="App">
      <input type="file" onChange={onChange} />
      {image && <img src={image} alt="The current file" />}
    </div>
  );
}
