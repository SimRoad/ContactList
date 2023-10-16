import { useState } from 'react'
import './modal.css'

const ModalForm = ({toggle}) => {

    function addContact(E){
        E.preventDefault() //E is a event and preventDefault stops the page from reloading :')
        let bool = checkValid(E);
        console.log(bool);
            if(bool.status){
                fetch('http://localhost/ContactListPHP/src/php/add.php', {
                    method: "POST",
                    headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
                    body: "fname="+ E.target[2].value +"&lname="+ E.target[1].value +"&emailAdd=" + E.target[3].value + "&contactNum=" + E.target[4].value
                })
                .then(()=>toggle(false))
            } else {
                document.getElementById("error").innerText = ("Invalid: " + bool.errMessage);
            }
    }

    function checkValid(Test){
        const validEmail = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
        const validContactNum = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
        const validName = new RegExp("^[A-Za-z][A-Za-z ]{0,48}[A-Za-z]$")
    
        if(!validName.test(Test.target[2].value) || !validName.test(Test.target[1].value)){
            return {status: false, errMessage: " Name. Only 50 characters, no spaces at start. Not empty."};
        }
    
        if(!validEmail.test(Test.target[3].value)){
            return {status: false, errMessage: " E-mail. Check format."};
        }
    
        if(!validContactNum.test(Test.target[4].value)){
            return {status: false, errMessage: " Phone number. Only PH number format, no spaces"};
        }
    
        return {status: true};
    }

    return(
        <div id="modal">
            <form id="modalForm" onSubmit={(E)=>addContact(E)}>
                <div id="modalHead">
                    <h3>Pin</h3>
                    <button id="btnName">+</button><br />
                </div>
                <p id='error'></p>
                <input required maxLength="50" name="lname" id="lname" placeholder="Last name" className="inputFields"/><br />
                <input required maxLength="50" name="fname" id="fname" placeholder="First name" className="inputFields"/><br />
                <input required maxLength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields"/><br />
                <input required maxLength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields"/>
            </form>

            <div id='ripPin'>
                <button id='closeModal' onClick={()=>toggle(false)}>Erase</button>
            </div>
        </div>
    )
}

export default ModalForm