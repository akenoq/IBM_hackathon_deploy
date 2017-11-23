"use strict";

export default class ElementGetter{
    static get(idBox){
        idBox = idBox.toString();
        return document.getElementById(idBox);
    }
};
