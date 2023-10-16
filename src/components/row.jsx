import { useState, useEffect } from "react";

function EditableRow({data}){
    const [edit, setEdit] = useState("Edit")
    const [del, setDel] = useState("Del")
  
    function delContact(id) {
      if(del === "Del"){
        fetch('http://localhost/ContactListPHP/src/php/delete.php', {
          method: "POST",
          headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
          body: "id="+id
        })
      } else {
        window.location.reload();
      }
    }
  
    function enaEditRow(s){
      if(edit === "Edit"){
        for(let i = 1; i < 5; i++){
          s[i].childNodes[0].disabled = false
        }
  
        setEdit("✓");
        setDel("X");
      }
      else{
        let inputs = [data.id, data.email]
        for(let i = 1; i < 5; i++){
          inputs.push(s[i].childNodes[0].value)
        }
  
        if(checkValid(inputs)){
          console.log("yo");
          newEditContact(inputs);
  
          for(let i = 1; i < 5; i++){
            s[i].childNodes[0].disabled = true
          }
  
          setEdit("Edit");
        } else {
          console.log("no");
        }
  
        
      }
    }
  
    function checkValid(check) {
      const validEmail = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
      const validContactNum = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
      const validName = new RegExp("^[A-Za-z][A-Za-z ]{0,48}[A-Za-z]$")
  
      if(!validName.test(check[2]) || !validName.test(check[3])){
        return false;
      }
  
      if(!validEmail.test(check[4])){
        return false;
      }
  
      if(!validContactNum.test(check[5])){
        return false;
      }
  
      return true;
    }
  
    function newEditContact(val){
      fetch('http://localhost/ContactListPHP/src/php/edit.php', {
          method: "POST",
          headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
          body: "id=" + val[0] + "&fname="+ val[3] +"&lname="+ val[2] +"&emailAdd=" + val[4] + "&contactNum=" + val[5] + "&curEmail=" + val[1]
      })
  }
  
    return(
      <>
      <tr key={data.id} className="contactRow">
        <td className='idCol'>{data.id}</td>
        <td className='surCol'><input type="text" placeholder={data.lastName} defaultValue={data.lastName} disabled  required/></td>
        <td className='firstCol'><input type="text" placeholder={data.firstName} defaultValue={data.firstName} disabled required/></td>
        <td className='eCol'><input type="text" placeholder={data.email} defaultValue={data.email} disabled required/></td>
        <td className='phoneCol'><input type="text" placeholder={data.number} defaultValue={data.number} className='phoneCol' disabled required/></td>
        <td className='modCol' id="modCell">
          <button onClick={(s)=>enaEditRow(s.target.parentNode.parentNode.childNodes)} className='modButton' id='editButton'>{edit}</button> 
          <button onClick={()=>delContact(data.id)} className='modButton' id='delButton'>{del}</button>
          
        </td>
      </tr>
      </>
    )
  }

  export default EditableRow