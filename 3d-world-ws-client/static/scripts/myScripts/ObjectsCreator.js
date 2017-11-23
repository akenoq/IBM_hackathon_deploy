"use strict";

export default class ObjectsCreator{
    static createSpotLight(xx, zz, force){
        let spotLight = new THREE.SpotLight("#ffffff", parseFloat(force + 0.1));
        const yy = 220;
        spotLight.position.set(xx, yy, zz);
        return spotLight;
    }

    static createPointLight(xx, zz, force){
        const pointLight = new THREE.PointLight( "#ffffff", force);
        pointLight.position.set( xx, 4, zz );
        return pointLight;
    }

    static createFinishPosition(i, j, scene) {
        const ww = 5;
        let cube = ObjectsCreator.createCube(2, 2, 2, "#000000");
        cube.position.x = j * ww + ww / 2;
        cube.position.y = 2.5;
        cube.position.z = i * ww + ww / 2;
        scene.add(cube);
        return cube;
    }


    static createPlane(ww, scene){
        let loader = new THREE.TextureLoader();
        loader.load("images/ground.png", function(image){

            const repeatValue = 20;
            image.wrapS = THREE.RepeatWrapping;
            image.wrapT = THREE.RepeatWrapping;
            image.repeat.set(repeatValue, repeatValue);

            let planeGeometry = new THREE.PlaneGeometry(ww, ww, 1, 1);
            let planeMaterial = new THREE.MeshLambertMaterial({map: image});
            let plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = (-0.5) * Math.PI;
            plane.position.x = ww / 2;
            plane.position.y = 0;
            plane.position.z = ww / 2;
            scene.add(plane);
        });
    }

    static createWall(i, j, scene){
        i = parseInt(i);
        j = parseInt(j);
        const ww = 5;

        let loader = new THREE.TextureLoader();
        loader.load("images/wall.png", function(image) {
            let cubeGeometry = new THREE.CubeGeometry(ww, ww, ww);
            let cubeMaterial = new THREE.MeshLambertMaterial({map: image});
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = j * ww + ww / 2;
            cube.position.y = ww / 2;
            cube.position.z = i * ww + ww / 2;
            scene.add(cube);
        });
    }

    static createCube(ww, hh, dd, color){
        let cubeGeometry = new THREE.CubeGeometry(ww, hh, dd);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: color.toString()});
        return new THREE.Mesh(cubeGeometry, cubeMaterial);
    }

    static createCylinder(radius, height, color){
        let geometry = new THREE.CylinderGeometry(radius, radius, height, 16);
        let material = new THREE.MeshBasicMaterial({color: color.toString()});
        return new THREE.Mesh( geometry, material );
    }

    static createCarMovingX(i, j, scene, colorBody, colorWheels){
        return ObjectsCreator.createCar(i, j, scene, colorBody, colorWheels, "XXX");
    }

    static createCarMovingZ(i, j, scene, colorBody, colorWheels){
        return ObjectsCreator.createCar(i, j, scene, colorBody, colorWheels, "ZZZ");
    }

    static createCar(i, j, scene, colorBody, colorWheels, typeOfCar){
        i = parseInt(i);
        j = parseInt(j);

        colorBody = colorBody.toString();
        colorWheels = colorWheels.toString();

        let cube1 = ObjectsCreator.createCube(5, 2, 3, colorBody);
        cube1.position.set(0, 2, 0);
        let cube2 = ObjectsCreator.createCube(3, 1, 2, colorBody);
        cube2.position.set(0, 3.5, 0);

        let c1 = ObjectsCreator.createCylinder(1, 1, colorWheels);
        let c2 = ObjectsCreator.createCylinder(1, 1, colorWheels);
        let c3 = ObjectsCreator.createCylinder(1, 1, colorWheels);
        let c4 = ObjectsCreator.createCylinder(1, 1, colorWheels);

        c1.rotation.set(Math.PI / 2, 0, 0);
        c2.rotation.set(Math.PI / 2, 0, 0);
        c3.rotation.set(Math.PI / 2, 0, 0);
        c4.rotation.set(Math.PI / 2, 0, 0);

        c1.position.set(1.5, 1, -1.5);
        c2.position.set(1.5, 1, 1.5);
        c3.position.set(-1.5, 1, -1.5);
        c4.position.set(-1.5, 1, 1.5);

        let group = new THREE.Group();

        group.add(cube1);
        group.add(cube2);
        group.add(c1);
        group.add(c2);
        group.add(c3);
        group.add(c4);

        const ww = 5;

        group.position.x = j * ww + ww / 2;
        group.position.y = 0;
        group.position.z = i * ww + ww / 2;

        if(typeOfCar === "ZZZ"){
            group.rotation.y = Math.PI / 2;
        }

        scene.add(group);
        return group;
    }
}
