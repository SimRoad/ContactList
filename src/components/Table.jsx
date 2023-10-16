import { useState, useEffect } from "react";
import './table.css'
import EditableRow from './row'
import ModalForm from './modalForm.jsx'; 

function Table() {
  const [data, setData] = useState({});


useEffect(() => {
  fetch('http://localhost/ContactListPHP/src/php/read.php')
    .then(response => response.json())
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});


return (
  <table>
    <thead>
      <tr>
        <th className='idCol'>ID</th>
        <th className='surCol'>Surname</th>
        <th className='firstCol'>Firstname</th>
        <th className='eCol'>E-Mail</th>
        <th className='phoneCol'>Phone No.</th>
        <th className='modCol'>Modify</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(data).map(contact => (
        <EditableRow data={data[contact]} />
      ))}
      <tr id="lastRow">
        <td className='idCol'> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td className='modCol'> </td>
      </tr>
    </tbody>
  </table>
  );
}

export default Table;