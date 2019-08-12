//current editing user id
let currentEditingUserId = '';

//on click row in table, add new info in modal editing window, render modal window
onClickRow = (id) => {
    currentEditingUserId = id;
    const modal = document.getElementById('modal');
    modal.style.display = "block";
    //find by id current editing user in tableData
    const user = tableData.filter( (el) => el.id === id)[0];
    //phrase count
    let countPhrase = 0;
    //collect memo's editing filds
    const memo = user.memo.map( (phrase) => {
        countPhrase++;
        return `Phrase ${countPhrase}: <input id="editMemo" class="edit" value="${phrase}"></input><br>`;
    });
    //collect big image and id,first,last,gender editing fields
    const editingFilds = 
        `<div align="center">
        <img id="bigImg" class="big-img" src="${user.img}"></img>
        </div><br>
        ID: <input id="editId" class="edit" value="${user.id}"><br>
        Firstname: <input id="editFirst" class="edit" value="${user.name.first}"><br>
        Lastname: <input id="editLast" class="edit" value="${user.name.last}"><br>
        Gender: <input id="editGender" class="edit" value="${user.gender}"><br>
        ${memo.join('')}<br>`;
    //render modal window
    document.getElementById('editingFilds').innerHTML = editingFilds;
}

//on close button, close modal window
onClose = () => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

//on click save button, save new info about current user
onClickSave = () => {
    //get edition fields elements
    const editingFilds = document.getElementsByClassName('edit');
    //find id current editing user in tableData
    const user = tableData.filter( (el) => el.id === currentEditingUserId)[0];
    //rewrite all user info
    user.id = editingFilds[0].value;
    user.name.first = editingFilds[1].value;
    user.name.last = editingFilds[2].value;
    user.gender = editingFilds[3].value;
    for (let i = 0; i < user.memo.length; i++) {
        user.memo[i] = editingFilds[i+4].value;
    }
    //close modal window after save
    onClose();
    //render table with getting info from tableData
    renderTable(true);
}

//close modal window on clicking not modal window space
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}