import React from 'react';
import TableView from './TableView';
import './index.css';

const App = () => {
  const data = [
     { ID: 1, Name: 'Alia', Age: 30 },
     { ID: 2, Name: 'Rahaa', Age: 1 },
     { ID: 3, Name: 'Ranbir', Age: 40 },
     { ID: 4, Name: 'Sid', Age: 40 },
     { ID: 5, Name: 'Kiara', Age: 35 },
  ];
  return (
     <div>
        <h1 style={{ textAlign: 'center', borderBottom: '2px solid blue', paddingTop: '20px', marginBottom: '100px' }}>
           Array of Objects - Table View
        </h1> 
        <TableView data={data} />
     </div>
  );
};
export default App;