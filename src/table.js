//variable with table data
const tableData = [];

//collect table head
const tableHeadArr = [];
for(key in elemsInfo) {
    //take classes and ids names from elemsInfo
    const info = elemsInfo[key];
    tableHeadArr.push(`<th id="${info.thId}">${info.name}</th>`);
};
//collect table head row
const tableHead = 
    `<tr id="tableHead">
        ${tableHeadArr.join('')}
    </tr>`;

//render table
const renderTable = (reload) => {
    const table = document.getElementById('table');
    //if we need to reset or load table for the first time
    if(!reload) {
        //taking data from json.js to tableData
        json.map( (user) => tableData.push(user)); 
    }
    //collect tableBody
    const tableBody = tableData.reduce((acc, user) => 
        `${acc}
        <tr id="${user.id}" onclick="onClickRow('${user.id}')">
            <td class="td-id">${user.id}</td>
            <td class="td-first">${user.name.first}</td>
            <td class="td-last">${user.name.last}</td>
            <td class="td-gender">${user.gender}</td>
            <td class="td-memo">
                ${user.memo.map( (phrase) => `<div>${phrase}</div><br>`).join('')}
            </td>
            <td class="td-image"><img src=${user.img}></td>
        </tr>`
    ,``);
    //render table
    table.innerHTML = 
    `<table>
        ${tableHead}
        ${tableBody}
    </table>`;
}
