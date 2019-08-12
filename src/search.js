//on click search button
//highlight substring and filter words without substring
onClickSearch = () => {
    const subStr = document.getElementById('searchFild').value;
    const table = document.getElementById('table');
    //collect new table with highlighted substrings
    //search substring in tableData
    const newTable = tableData.map( (user) => {
        //get user info
        const {first, last} = user.name;
        const {id, gender, memo, img} = user;
        const userInfo = [id, first, last, gender, memo, img];
        //make arr with user td classes
        const classes = [ 
            `class="td-id"`, 
            `class="td-first"`, 
            `class="td-last"`, 
            `class="td-gender"`, 
            `class="td-memo"`, 
            `class="td-image"`
        ]
        let classesCount = 0;
        //if substring isn't found in the user information
        //userState = false
        let userState = false;
        //array with new user info
        const newUserInfo = [];
        //search and highlight substrings in user info
        //collect new table
        userInfo.map( (info) => {
            //first index of substring in current info string
            const subStrIndex = info.indexOf(subStr);
            //collect memo
            if(info === memo) {
                const highlightedPhrases = [];
                memo.map( (phrase) => {
                    const subStrIndexInPhrase = phrase.indexOf(subStr);
                    //collect memo with substrings
                    if(subStrIndexInPhrase > -1) {
                        //change userState because we found substring in current user
                        userState = true;
                        //highlight phrase
                        const firstPhrasePart = phrase.slice(0, subStrIndexInPhrase);
                        const secondPhrasePart = phrase.slice(subStrIndexInPhrase,subStrIndexInPhrase + subStr.length);
                        const thirdPhrasePart = phrase.slice(subStrIndexInPhrase + subStr.length, phrase.length);
                        //add highlighted phrase in array
                        highlightedPhrases.push(
                            `<div>
                                ${firstPhrasePart}<span class="highlight">${secondPhrasePart}</span>${thirdPhrasePart}
                            </div><br>`
                        ) 
                    }
                    //collect memo without substrings
                    else {
                        //add phrase without highlight in array
                        highlightedPhrases.push(
                            `<div>
                                ${phrase}
                            </div>
                            <br>`
                        )   
                    };
                });
                //add in array processed memo about current user 
                newUserInfo.push(`<td ${classes[4]}>${highlightedPhrases.join('')}</td>`);
            }
            //collect other(first,last,gender) info
            else if(info !== img && subStrIndex > -1) {
                //change userState because we found substring in current user
                userState = true;
                //highlight info(first,last,gender)
                const firstWordPart = info.slice(0, subStrIndex);
                const secondWordPart = info.slice(subStrIndex,subStrIndex + subStr.length);
                const thirdWordPart = info.slice(subStrIndex + subStr.length, info.length);
                const highlightedWord = 
                    `<td ${classes[classesCount]}>${firstWordPart}<span class="highlight">${secondWordPart}</span>${thirdWordPart}</td>`;
                //add in array processed info(first,last,gender) about current user 
                newUserInfo.push(highlightedWord);
            }
            //collect image
            else if(info === img) {
                //add in array current user's image
                newUserInfo.push(`<td ${classes[5]}><img src=${img}></td>`);
            }
            //if we can't find substring
            else {
                //add in array pristine info
                newUserInfo.push(`<td ${classes[classesCount]}>${info}</td>`);
            }
            //add 1 to classesCount because we change class name to "classes"
            classesCount++;
        });
        //if we found substring in user info
        //return new highlighted row
        //else return blank row 
        const newRow = userState ? `<tr id="${id}" onclick="onClickRow('${id}')">${newUserInfo.join('')}</tr>` : '';
        return newRow;
    });
    //render table with highlighted substring
    table.innerHTML = `<table>${tableHead}${newTable.join('')}</table>`;
    //check checkboxes and exclude colums
    onClickColCheckbox();
}

//on click enter after input substring
onSearch = () => onClickSearch();