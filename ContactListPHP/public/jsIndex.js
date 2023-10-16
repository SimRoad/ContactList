var actionType = 0; //0 - add, 1 - edit
var selectedRowIndex = 0;
var selectedID = -1;
var selectedContact = {
    lname: "",
    fname: "",
    emailAdd: "",
    contactNum: ""
};
var table = document.getElementById("contactTable");

function getData(){
    $.ajax({
        type : 'GET',
        url : '../src/php/read.php',
        data : "",
        success : function(response) {
        var res = JSON.parse(response);
        if(res["status"] == 200){
            for(var x = 0; x < res["count"]; x++){
                var row = table.insertRow(-1);
                var idCell = row.insertCell(0);
                var lNameCell = row.insertCell(1);
                var fNameCell = row.insertCell(2);
                var emailCell = row.insertCell(3);
                var contactCell = row.insertCell(4);
                var delCell = row.insertCell();
                
                idCell.innerHTML = res["data"][x].id;
                lNameCell.innerHTML = res["data"][x].lastName;
                fNameCell.innerHTML = res["data"][x].firstName;
                emailCell.innerHTML = res["data"][x].email;
                contactCell.innerHTML = res["data"][x].number;
                delCell.innerHTML = "<button style='background-color: green;' class='actionButtons' onclick='setEditContact(this)'>EDIT</button><button style='background-color: red;' class='actionButtons' onclick='deleteContact(this)'>DELETE</button>";
                }
            }
        }
    });
}

function popUpAction(isShow, action = 0){
    actionType = action;
    
    if(isShow === true){
        document.getElementById("lname").value = selectedContact.lname;
        document.getElementById("fname").value = selectedContact.fname;
        document.getElementById("emailAdd").value = selectedContact.emailAdd;
        document.getElementById("contactNum").value = selectedContact.contactNum;
    }
    
    var popUp = document.getElementById("addContactPopup");
    popUp.style.display = isShow === true ? "block" : "none";

    if(!isShow)
        selectedContact.lname = selectedContact.fname = selectedContact.emailAdd = selectedContact.contactNum = "";
}

function formSubmitted(e){
    if(actionType === 0){
        addContact(e);
    }
    else{
        e.preventDefault();
        editContact();
    }
}

function addContact(e){
    var data = $("#modalForm").serialize();
    $.ajax({
        type : 'POST',
        url : '../src/php/add.php',
        data : data,
        success : function(response) {
            var res = JSON.parse(response);
            alert(res["message"]);
            if(res["status"] == 200 && res["data"] != -1){
                var row = table.insertRow(-1);
                var idCell = row.insertCell(0);
                var lNameCell = row.insertCell(1);
                var fNameCell = row.insertCell(2);
                var emailCell = row.insertCell(3);
                var contactCell = row.insertCell(4);
                var delCell = row.insertCell();
                
                idCell.innerHTML = res["data"];
                lNameCell.innerHTML = document.getElementById("lname").value;
                fNameCell.innerHTML = document.getElementById("fname").value;
                emailCell.innerHTML = document.getElementById("emailAdd").value;
                contactCell.innerHTML = document.getElementById("contactNum").value;
                delCell.innerHTML = "<button style='background-color: green;' class='actionButtons' onclick='setEditContact(this)'>EDIT</button><button style='background-color: red;' class='actionButtons' onclick='deleteContact(this)'>DELETE</button>";
            }
        }
    });

    popUpAction(false, 0);
    e.preventDefault;
}

function setEditContact(btn){

    selectedRowIndex = btn.parentNode.parentNode.rowIndex;
    selectedID = btn.parentNode.parentNode.cells[0].innerText;
    selectedContact.lname = btn.parentNode.parentNode.cells[1].innerText;
    selectedContact.fname = btn.parentNode.parentNode.cells[2].innerText;
    selectedContact.emailAdd = btn.parentNode.parentNode.cells[3].innerText;
    selectedContact.contactNum = btn.parentNode.parentNode.cells[4].innerText;
    
    popUpAction(true, 1);
}

function editContact(){
    var data = $("#modalForm").serialize();
    data = data+"&id="+selectedID+"&curEmail="+selectedContact.emailAdd;
    $.ajax({
        type : 'POST',
        url : '../src/php/edit.php',
        data : data,
        success : function(response) {
            var res = JSON.parse(response);
            alert(res["message"]);
            if(res["status"] == 200){
                table.getElementsByTagName('tr')[selectedRowIndex].cells[1].innerHTML = document.getElementById("lname").value;
                table.getElementsByTagName('tr')[selectedRowIndex].cells[2].innerHTML = document.getElementById("fname").value;
                table.getElementsByTagName('tr')[selectedRowIndex].cells[3].innerHTML = document.getElementById("emailAdd").value;
                table.getElementsByTagName('tr')[selectedRowIndex].cells[4].innerHTML = document.getElementById("contactNum").value;
            }
        }
    });

    popUpAction(false, 0);
}

function deleteContact(btn){
    if (confirm('Are you sure you want to delete this contact?')) {
        var data = "id="+btn.parentNode.parentNode.cells[0].innerText;
        $.ajax({
            type : 'POST',
            url : '../src/php/delete.php',
            data : data,
            success : function(response) {
                var res = JSON.parse(response);
                alert(res["message"]);
                if(res["status"] == 200){
                    btn.parentNode.parentNode.remove();
                }
            }
        });
    } else {
        // Do nothing!
    }
}