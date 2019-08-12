//render checkboxes for colums
renderCheckboxesTable = () => {
    const headTable = [];
    for(key in elemsInfo) {
        //taking checkboxes ids from elelemsInfo
        const info = elemsInfo[key];
        //collect checkboxes's head table
        headTable.push(
            `<th>
                ${info.name}
                <input type="checkbox" class="checkbox" id="${info.checkboxId}" onclick="onClickColCheckbox()">
            </th>`);
    };
    //collect checkboxes's table
    const table = 
        `<table class="checkboxes-table">
            <tr>
                ${headTable.join('')}
            </tr>
        </table>`;
    //render checkboxes's table
    document.getElementById('checkboxesTable').innerHTML = table;
}

//check checkboxes status
checkCheckboxes = (checkboxId, thId, tdClass) => {
    //get checkbox, head table and info elements
    const checkbox = document.getElementById(checkboxId);
    const thEl = document.getElementById(thId);
    const tdCol = document.getElementsByClassName(tdClass);
    
    //change head table elements display style
    if (checkbox.checked == true) {
        thEl.style.display = "none";
    } else {
        thEl.style.display = "";
    }
    //change info elements display style
    for (let i = 0; i < tdCol.length; i++) {
        if (checkbox.checked == true) {
            tdCol[i].style.display = "none";
        } else {
            tdCol[i].style.display = "";
        }  
    }   
}

//on click checkbox change display styles
onClickColCheckbox = () => {
    for(key in elemsInfo) {
        //get ids and classes names from elemsInfo
        const info = elemsInfo[key];
        //change elements's display styles
        checkCheckboxes(info.checkboxId, info.thId, info.tdClass);
    }
}

