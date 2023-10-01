import { useState, useEffect } from "react";
import './table.css'

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

function delContact(id) {
  fetch('http://localhost/ContactListPHP/src/php/delete.php', {
    method: "POST",
    headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
    body: "id="+id
  })
}

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
        <tr key={data[contact].id}>
          <td className='idCol'>{data[contact].id}</td>
          <td className='surCol'>{data[contact].lastName}</td>
          <td className='firstCol'>{data[contact].firstName}</td>
          <td className='eCol'>{data[contact].email}</td>
          <td className='phoneCol'>{data[contact].number}</td>
          <td className='modCol' id="modCell">
            <button className='modButton' id='editButton'>Edit</button> 
            <button onClick={()=>delContact(data[contact].id)} className='modButton' id='delButton'>Del</button></td>
        </tr>
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