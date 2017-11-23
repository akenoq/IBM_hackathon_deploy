"use strict";

function elem(s) {
    return document.getElementById(s.toString());
}

function hideBoxes(){
    elem("contentRedactorLevel").hidden = true;
    elem("contentStartTraining").hidden = true;
}

function redactorLevelShowBox(){
    hideBoxes();
    elem("contentRedactorLevel").hidden = false;
}

function startTrainingShowBox(){
    hideBoxes();
    elem("contentStartTraining").hidden = false;
}

let arr = [];

function addToArray(keyElem, valueElem) {
    keyElem = keyElem.toString();
    valueElem = valueElem.toString();


    let obj = {
        keyElem: keyElem,
        valueElem: valueElem
    };

    arr.push(obj);
}

function findJSONbyKeyValue(keyString){
    keyString = keyString.toString();
    for(let i = 0; i < arr.length; i++){
        const obj = arr[i];
        if(obj.keyElem === keyString){
            return obj.valueElem.toString();
        }
    }
    return null;
}

window.onload = function(){
    let box = null;

    let names = [];
    let values = [];

    for(let i = 0; i < localStorage.length; i++) {
        names[i] = localStorage.key(i);
        if(names[i] !== "USER_NAME" && names[i] !== "SERVER_ADRESS") {
            values[i] = localStorage.getItem(names[i]);
            addToArray(names[i], values[i]);
        }
    }

    box = elem("levelContentFirst");

    for(let i = 0; i < arr.length; i++){
        const content = "<div class='elemOfList' onclick = 'f1(this);'>" + arr[i].keyElem + "</div>";
        const paddingString = "<div style = 'padding: 5px;'></div>";
        box.innerHTML += (paddingString + content + paddingString);
    }

    box = elem("listOfBoxesForStartTraining");

    for(let i = 0; i < arr.length; i++){
        const content = "<div class='elemOfList' onclick = 'f2(this);'>" + arr[i].keyElem + "</div>";
        const paddingString = "<div style = 'padding: 5px;'></div>";
        box.innerHTML += (paddingString + content + paddingString);
    }
};

function f1(element){
    const keyValue = element.innerHTML;
    const jsonString = findJSONbyKeyValue(keyValue);
    window.location = "redactor.html" + "?" + jsonString;
}

function f2(element){
    const keyValue = element.innerHTML;
    const jsonString = findJSONbyKeyValue(keyValue);
    window.location = "world.html" + "?" + jsonString;
}

