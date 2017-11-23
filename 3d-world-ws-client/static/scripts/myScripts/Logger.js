"use strict";

export default class Logger{
    static write(){
        const flag = true;

        if(flag === true) {
            if (arguments.length === 0) {
                return;
            }

            let elementsString = "";
            for (let i = 0; i < arguments.length; i++) {
                const element = arguments[i].toString();
                elementsString = elementsString + element + " ";
            }
            console.log("Message: " + elementsString);
        }
    }
}
