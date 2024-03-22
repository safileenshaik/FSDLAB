import React, { Usestate, useState } from 'react';

const ImageTable = ({ selectedImages }) => {
    return (
        <div className="table-container">
              <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #3824ee' ,adding: '8px' ,textAlign:'center',backgroundColor: 'lightblue'}}>Image</th>
                        <th style={{ border: '1px solid #3824ee' ,adding: '8px' ,textAlign:'center',backgroundColor: 'lightblue'}}>Name</th>
                    </tr>
                </thead>
                <tbody>
                 {selectedImages.map((image, index) => (
                  <tr key={index}>
                    <td>
                        <img src={image.src} alt={image.alt} style={{ maxWidth: '100px', maxHeight: '100px'}}/>
                    </td>
                    <td>{image.alt}</td>                   
                  </tr> 
                 ))}
                </tbody>
              </table>
        </div>
    );
};

const App = () => {
    const [selectedImages, setSelectedImages] = useState([

    ]);
    
    const handleFileUpload = (event) => {
      const files = event.target.files;

      for (let i = 0;i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageName = files[i].name;
          const newImage = {
            src: e.target.result,
            alt: imageName,
          };
          setSelectedImages([...selectedImages, newImage]);
        };

        reader.readAsDataURL(files[i]);
      }
    };
    return (
      <div>
        <div>
          <h1 style={{ borderBottom: '2px solid blue',paddingTop:'20px',marginBottom:'100px'}}>
            Dynamic Image Selection - Table
          </h1>
        </div>
      <div className="upload-container">
        <input type="file" onChange={handleFileUpload} multiple />
        <ImageTable selectedImages={selectedImages}/>
      </div>
      <div className="watermark">safileen</div>
      </div>
    );
};

export default App;

