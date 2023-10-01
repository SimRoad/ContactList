import './modal.css'

const ModalForm = () => {
    function addContact(E){
        E.preventDefault()
        fetch('http://localhost/ContactListPHP/src/php/add.php', {
            method: "POST",
            headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
            body: "fname="+ E.target[1].value +"&lname="+ E.target[0].value +"&emailAdd=" + E.target[2].value + "&contactNum=" + E.target[3].value
        })
        
    }

    return(
        <div id="modal">
            <div id="modalHead">
                <h3>Test</h3>
                <button>X</button>
            </div>
            <form id="modalForm" onSubmit={(E)=>addContact(E)}>
                <input required maxLength="50" name="lname" id="lname" placeholder="Last name" className="inputFields"/><br />
                <input required maxLength="50" name="fname" id="fname" placeholder="First name" className="inputFields"/><br />
                <input required maxLength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields"/><br />
                <input required maxLength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields"/><br />
                <button id="btnName">Submit</button>
            </form>
        </div>
    )
}

export default ModalForm