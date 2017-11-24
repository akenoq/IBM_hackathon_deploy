"use strict";

//////////////////////////////

let xxx_1 = 0;
let xxx_2 = 0;
let xxx_3 = 0;

//////////////////////////////

let can = null;
let holst = null;

let mass_1 = [];
let mass_2 = [];
let mass_3 = [];

function drawFon() {
    holst.fillRect(-20, -20, 1050, 450);
}

let dx = 0;

let t_x = 1;
let t_y = 1;

function drawLine(x1, y1, x2, y2) {
    holst.beginPath();
    holst.moveTo(x1 * t_x + dx, -y1 * t_y + 200);
    holst.lineTo(x2 * t_x + dx, -y2 * t_y + 200);
    holst.closePath();
    holst.stroke();
}

function addPoint(xx, yy, number) {
    if(number === 1) {
        mass_1.push({
            xx: xx,
            yy: yy
        });
    }

    if(number === 2) {
        mass_2.push({
            xx: xx,
            yy: yy
        });
    }

    if(number === 3) {
        mass_3.push({
            xx: xx,
            yy: yy
        });
    }
}


let mode = "FIRST";

function first() {
    mode = "FIRST";
}

function second() {
    mode = "SECOND";
}

let socket = new WebSocket(adressUrlServer);

window.onload = function() {
    can = document.getElementById('can');
    holst = can.getContext('2d');

    holst.lineWidth = 1;
    holst.fillStyle = '#512142';

    let myInter = setInterval(() =>{
        t_x = parseFloat(elem("t_x").value);
        t_y = parseFloat(elem("t_y").value);

        let speed = parseFloat(elem("t_speed").value);
        if(elem("t_speed").value.toString().length === 0) {
            speed = 0;
        }

        if(type === "RIGHT") dx += speed;
        if(type === "LEFT") dx -= speed;

        elem('q1').style.backgroundColor = "#CCCCCC";
        elem('q2').style.backgroundColor = "#CCCCCC";

        if(mode === "FIRST") {
            elem('q1').style.backgroundColor = "#00FF00";
        }

        if(mode === "SECOND") {
            elem('q2').style.backgroundColor = "#00FF00";
        }

        try {
            socket.send("__" + mode + "__");
        } catch (err) { }


        if(type === "STOP") {
            dx = -xxx_1 * t_x + 800;
        }

        drawFon();
        drawGarphics();
    }, 100);
};

function drawGarphics() {
    let mass = null;

    mass = mass_1;
    holst.strokeStyle = '#FF0000';
    for(let i = 0; i < mass.length; i++) {
        if(i !== 0) {
            const x1 = mass[i - 1].xx;
            const y1 = mass[i - 1].yy;
            const x2 = mass[i].xx;
            const y2 = mass[i].yy;
            drawLine(x1, y1, x2, y2);
        }
    }

    mass = mass_2;
    holst.strokeStyle = '#ffee00';
    for(let i = 0; i < mass.length; i++) {
        if(i !== 0) {
            const x1 = mass[i - 1].xx;
            const y1 = mass[i - 1].yy;
            const x2 = mass[i].xx;
            const y2 = mass[i].yy;
            drawLine(x1, y1, x2, y2);
        }
    }

    mass = mass_3;
    holst.strokeStyle = '#0000FF';
    for(let i = 0; i < mass.length; i++) {
        if(i !== 0) {
            const x1 = mass[i - 1].xx;
            const y1 = mass[i - 1].yy;
            const x2 = mass[i].xx;
            const y2 = mass[i].yy;
            drawLine(x1, y1, x2, y2);
        }
    }
}


////////////////////////////////////

socket.onopen = function() {
    console.log("Соединение установлено");
};

socket.onclose = function(event) {
    console.log("Соединение закрыто");
};

socket.onmessage = function(event) {
    console.log("Получено сообщение: " + event.data);
    let message = event.data.toString();

    if(message === "FIRST" || message === "SECOND") {
        mode = message;
        return;
    }
	
	if(message === "__FIRST__" || message === "__SECOND__") {
        return;
    }

    if(message.indexOf("@@@") === -1) {
        let mmm = message.split("XXX");
        let m_1_str = mmm[0].toString();
        let ost = mmm[1];
        let kkk = ost.split("YYY");

        let m_2_str = kkk[0];
        let m_3_str = kkk[1];

        let m1 = m_1_str.split(" ");
        let m2 = m_2_str.split(" ");
        let m3 = m_3_str.split(" ");

        let arr = null;

        arr = m1;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] !== "" && arr[i] !== " ") {
                let n = parseInt(arr[i]);

                addPoint(xxx_1, n, 1);
                xxx_1++;
            }
        }

        arr = m2;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] !== "" && arr[i] !== " ") {
                let n = parseInt(arr[i]);

                addPoint(xxx_2, n, 2);
                xxx_2++;
            }
        }

        arr = m3;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] !== "" && arr[i] !== " ") {
                let n = parseInt(arr[i]);

                addPoint(xxx_3, n, 3);
                xxx_3++;
            }
        }
    }
};

socket.onerror = function(error) {
    console.log("Ошибка");
};