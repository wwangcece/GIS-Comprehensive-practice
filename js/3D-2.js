// 引入three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'


var controls;
var scene, camera, renderer
var stats = new Stats();
var object //导入的遥感楼
var scene_div = document.getElementById('scene')
var PLControls



//控制前后左右移动
var moveforward = false
var movebackward = false
var moveleft = false
var moveright = false
var canjump = false //能否跳跃，当在地面上时可以跳跃



//场景移动参数
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3()
var iscollide = false
var raycaster = new THREE.Raycaster() //碰撞检测射线
var object_mesh = []//遥感楼中的mesh
var eyeheight = 5
var JumpHeight = 80
var onObject = Boolean(0)//是否在物体上


//屏幕是否被锁定
var islocked = false




// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
var width = window.innerWidth; //宽度
var height = window.innerHeight; //高度

function init(building_id) {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
    if (building_id === 1) {
        camera.position.set(0, 50, 300); //相机在Three.js三维坐标系中的位置
    }
    else {
        camera.position.set(900, 50, 300); //相机在Three.js三维坐标系中的位置
    }
    camera.lookAt(0, 0, 0); //相机观察目标指向Three.js坐标系原点

    //render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); //全屏，必备
    renderer.render(scene, camera); //执行渲染操作
    scene_div.appendChild(renderer.domElement);


    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);


    //鼠标拖拉屏幕时，重新渲染
    //鼠标控制场景
    controls = new OrbitControls(camera, renderer.domElement);


    //光照，如果没有的话会导致材质加载不出来
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(80, 100, 50);
    scene.add(directionalLight);
    //环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);


    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);

    //视角锁定
    PLControls = new PointerLockControls(camera, renderer.domElement);

}

function add_building(building_path, building_id) {
    // 加载dae
    var loader = new ColladaLoader();
    loader.load(building_path, function (collada) {
        object = collada.scene
        object.scale.set(0.2, 0.2, 0.2);

        if (building_id === 1) {
            object.rotateY(Math.PI)
            object.rotateZ(Math.PI / 2)
            object.translateY(-500)
        }
        else {
            // object.rotateY(Math.PI)
            object.rotateZ(-Math.PI / 2)
            // object.translateY(-500)
        }
        scene.add(object);


        // 将载入的模型的mesh导入到object_mesh中
        // object_mesh
        object.traverse(function (obj) {
            // 判断子对象是否是物体，如果是，更改其颜色
            if (obj.isMesh) {
                object_mesh.push(obj)

            }
        })


        //从这里跳转到其他函数
    });
}



function onkeydown(event) {
    switch (event.code) {
        case 'KeyM':
            PLControls.lock();
            islocked = true
            break
        case 'KeyN':
            PLControls.unlock();
            islocked = false
            break
        case 'KeyW':
            moveforward = true
            break
        case 'KeyS':
            movebackward = true
            break
        case 'KeyA':
            moveleft = true
            break
        case 'KeyD':
            moveright = true
            break
        case 'KeyF':
            onMouseDblclick('F')
            break
        case "Space":
            //可以跳的时候跳 y轴增加 开始跳跃时将可以跳跃状态设置为false 不可以二连跳
            if (canjump === true) velocity.y += JumpHeight;
            canjump = false;
            break;

    }
}






function onkeyup(event) {
    switch (event.code) {
        case 'KeyW':
            moveforward = false
            break
        case 'KeyS':
            movebackward = false
            break
        case 'KeyA':
            moveleft = false
            break
        case 'KeyD':
            moveright = false
            break
    }
}



const collideCheck = (angle) => {
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(angle * Math.PI / 180);
    var cameraDirection = PLControls.getDirection(new THREE.Vector3(0, 0, 0)).clone()
    cameraDirection.applyMatrix4(rotationMatrix);
    cameraDirection.y = 0
    raycaster.set(PLControls.getObject().position.clone(), cameraDirection, 0);


    var low_height = raycaster.ray.origin.y - eyeheight + 0.1
    var high_height = raycaster.ray.origin.y

    var intersections

    //检测碰撞的射线，从脚下到眼睛分成了若干份
    for (var i = low_height; i < high_height; i += 1) {
        raycaster.ray.origin.y = i
        intersections = raycaster.intersectObjects(object_mesh, false);
        if (intersections.length > 0 && intersections[0].distance < 5) return true
    }


    return false;
}


// 获取与射线相交的对象数组
function getIntersects(event) {

    // 声明 raycaster 和 mouse 变量
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    if (event == 'F') {
        //如果按下F，则从屏幕中心发出射线
        mouse.x = 0
        mouse.y = 0
    }

    else {
        event.preventDefault();
        // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }



    //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
    raycaster.setFromCamera(mouse, camera);

    // //返回选中的对象数组
    // return intersects;
    var intersects = [];

    // 递归遍历场景中的每个对象
    scene.traverse(function (object) {
        if (object.type === "Group") {
            // 检查对象是否是Mesh或Group类型
            var objIntersects = raycaster.intersectObject(object);

            if (objIntersects.length > 0) {
                // 如果与射线相交，将对象添加到结果数组中
                intersects.push(object);
            }
        }
    });
    return intersects;
}


// 高亮物体（group类型）
function highlightObject(object) {
    if (object instanceof THREE.Mesh) {
        if (object.material === highlightMaterial) {
            object.material = originalMaterial;
            ifhigh = false
        }
        else {
            originalMaterial = object.material
            object.material = highlightMaterial;
            ifhigh = true;
        }
    }

    // 递归高亮group中的mesh
    if (object.children.length > 0) {
        object.children.forEach(function (child) {
            highlightObject(child);
        });
    }
}

const baseURL = "http://127.0.0.1:3000";
// 发送请求
function sendQuery(queryParameter, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var result = JSON.parse(this.responseText);
                callback(result); // 调用回调函数并传递结果
            } else {
                callback(null); // 调用回调函数并传递错误
            }
        }
    };
    xhttp.open("GET", `${baseURL}/query?q=` + encodeURIComponent(queryParameter), true);
    xhttp.send();
}

// 根据座位号和房间号查询学生信息
function stuInfoQuery(roomCode, deskCode, callback) {
    const sql = `select * from roomseats where seatnumber='${deskCode}' and belonglab='${roomCode}'`
    sendQuery(sql, callback)
}


// 显示所点击桌椅的信息
function displayInfo(event, desk, room, ifhigh) {
    // 获取弹窗和弹窗内容元素
    var popupContent = document.getElementById('popup-content');
    if (ifhigh) {
        const roomCode = room.name.slice(5);
        const seatCode = desk.name.slice(5).replace(/0/g, '');
        stuInfoQuery(roomCode, seatCode, res => {
            if (res.rows.length != 0) {
                // 更新弹窗内容
                popupContent.innerHTML =
                    '房间号: ' + roomCode + '<br>' +
                    '座位号: ' + seatCode + '<br>' +
                    '学生姓名: ' + res.rows[0].stuname + '<br>' +
                    '学号/工号: ' + res.rows[0].stuid + '<br>' +
                    '是否在校: ' + res.rows[0].status + '<br>' +
                    '导师姓名: ' + res.rows[0].mentor + '<br>';
                // 显示 Bootstrap Modal
                $('#infoModal').modal('show');
            }
            else {
                popupContent.innerHTML =
                    '房间号: ' + roomCode + '<br>' +
                    '座位号: ' + seatCode + '<br>' +
                    '学生姓名: ' + '无' + '<br>';
                // 显示 Bootstrap Modal
                $('#infoModal').modal('show');
            }
        })
    }
    else {
        // 隐藏 Bootstrap Modal
        $('#infoModal').modal('hide');
    }
}

// 开门动作
function openDoor(door) {
    var rotateZ = door.rotation.z
    var delta_x = rotateZ > 0 ? 8 : -8
    var delta_y = 30

    if (open) {
        open = !open;
        // 创建第一个Tween动画，将门沿X轴移动
        xTween = new TWEEN.Tween(door.position)
            .to({ x: door.position.x + delta_x }, 1000) // 沿X轴移动2个单位，时长为1秒
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                // 创建第二个Tween动画，在第一个动画完成后执行，将门沿Z轴移动
                var zTween = new TWEEN.Tween(door.position)
                    .to({ y: door.position.y + delta_y }, 2000) // 沿Z轴移动2个单位，时长为1秒
                    .easing(TWEEN.Easing.Linear.None)
                    .start(); // 开始第二个动画
            })
            .start(); // 开始第一个动画
    }
    else {
        open = !open;
        xTween = new TWEEN.Tween(door.position)
            .to({ y: door.position.y - delta_y }, 2000) // 沿X轴移动2个单位，时长为1秒
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                // 创建第二个Tween动画，在第一个动画完成后执行，将门沿Z轴移动
                var zTween = new TWEEN.Tween(door.position)
                    .to({ x: door.position.x - delta_x }, 1000) // 沿Z轴移动2个单位，时长为1秒
                    .easing(TWEEN.Easing.Linear.None)
                    .start(); // 开始第二个动画
            })
            .start(); // 开始第一个动画
    }
}

function onMouseDblclick(event) {
    let pos = camera.position
    console.log(pos.x, pos.y, pos.z)

    //获取raycaster和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
    let intersects = getIntersects(event);
    let desk = null
    let door = null
    let room = null
    let lift = null
    let floor = null
    // 获得点击到的第一个桌子/门/房间/电梯/楼层
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].name) {
            if (intersects[i].name.includes("desk") && (!desk)) {
                desk = intersects[i]
            }
            if (intersects[i].name.includes("door") && (!door)) {
                door = intersects[i]
            }
            if (intersects[i].name.includes("room") && (!room)) {
                room = intersects[i]
            }
            if (intersects[i].name.includes("lift") && (!lift)) {
                lift = intersects[i]
            }
            if (intersects[i].name.includes("floor") && (!floor)) {
                floor = intersects[i]
            }
        }
    }
    // 对桌子-高亮
    if (desk) {
        highlightObject(desk)
        displayInfo(event, desk, room, ifhigh)
        desk = null
        room = null
    }
    // 对门-开门
    if (door) {
        openDoor(door)
        door = null
    };
    // 电梯-添加蒙版/按钮
    if (lift) {
        var overlay = document.getElementById('overlay');
        var tipInfo = document.getElementById('tipInfo');
        var button1 = document.getElementById('button1');
        var button2 = document.getElementById('button2');

        // 显示蒙版
        overlay.style.display = 'block';
        // 设置提示信息内容
        tipInfo.innerHTML = `当前是第${floor.name.slice(6)}层`
        // 设置两个按钮内容/回调
        let floors = [1, 12, 13]
        let currFloor = parseInt(floor.name.slice(6))
        let currIndex = floors.indexOf(currFloor)
        if (currIndex !== -1) {
            floors.splice(currIndex, 1)
        }

        let buttons = [button1, button2]
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerHTML = `去第${floors[i]}层`
            buttons[i].addEventListener('click', function () {
                if (floors[i] === 1) {
                    camera.position.set(226, 18, 42)
                }
                else if (floors[i] === 12) {
                    camera.position.set(226, 442, 42)
                }
                else {
                    camera.position.set(226, 481, 42)
                }
                overlay.style.display = 'none';
            });
        }
        floor = null
        lift = null
    }
}


//下面这段是确保场景实时渲染
const clock = new THREE.Clock()
function render() {
    const delta = clock.getDelta() //获取自上次调用的时间差
    stats.update();//更新帧数


    // 游戏操作
    if (islocked) {
        //x,z方向受到运动阻力
        velocity.x -= velocity.x * 10.0 * delta
        velocity.z -= velocity.z * 10.0 * delta
        velocity.y -= 3 * 100.0 * delta



        //检测是否在地面（楼梯上）
        raycaster.ray.origin.copy(PLControls.getObject().position);
        raycaster.ray.origin.y -= eyeheight - 0.01;
        raycaster.ray.direction = new THREE.Vector3(0, -1, 0)

        //从比脚下高一点点的位置发射线，方向垂直向下
        var intersections = raycaster.intersectObjects(object_mesh, false);



        var filteredIntersections = []


        //筛选出距离小于0.05的
        for (var i = 0; i < intersections.length; i++) {
            var intersection = intersections[i];
            // 检查与相交点的距离是否小于等于eyeheight
            if (intersection.distance <= 0.05) {
                filteredIntersections.push(intersection);
            }
        }


        if (intersections.length == 0) {
            if (PLControls.getObject().position.y + velocity.y * delta < eyeheight && velocity.y < 0) {
                onObject = true;
                PLControls.getObject().position.y = eyeheight
            }
            else onObject = false

        }
        else {
            //在建筑内部，如果最小的距离小于2，则说明接触了
            if (intersections[0].distance + velocity.y * delta < 1 && velocity.y < 0) {//还要速度向下
                onObject = true;
                PLControls.getObject().position.y = intersections[0].point.y + eyeheight
            }
            else onObject = false
        }


        if (onObject) {
            velocity.y = Math.max(0, velocity.y);
            canjump = true;
        }



        //四个方位是否产生碰撞
        let leftCollide = false;
        let rightCollide = false;
        let forwardCollide = false;
        let backCollide = false;
        /**
        * 碰撞检测 collide check
        */
        if (moveforward) forwardCollide = collideCheck(0);
        if (movebackward) backCollide = collideCheck(180);
        if (moveleft) leftCollide = collideCheck(90);
        if (moveright) rightCollide = collideCheck(270);


        //x右为正，z前为正
        direction.x = Number(moveright) - Number(moveleft)
        direction.z = Number(moveforward) - Number(movebackward)
        direction.normalize()


        //按下移动键后，对应方向会加速
        if (moveleft || moveright) {
            if ((moveright && rightCollide) || (moveleft && leftCollide)) {
                velocity.x = 0
            }
            else {
                velocity.x += direction.x * 400.0 * delta;
            }
        }

        if (moveforward || movebackward) {
            if ((moveforward && forwardCollide) || (movebackward && backCollide)) {
                velocity.z = 0
            }
            else {
                velocity.z += direction.z * 400.0 * delta;
            }
        }

        //渲染一次移动的距离
        let rightDistance = velocity.x * delta
        let forwardDistance = velocity.z * delta


        //右侧有障碍物时向右移动 置零
        if ((moveright && rightCollide) || (moveleft && leftCollide)) {
            rightDistance = 0;
        }
        //前方有障碍物时向前移动 置零
        if ((moveforward && forwardCollide) || (movebackward && backCollide)) {
            forwardDistance = 0;
        }

        //控制移动
        PLControls.moveRight(rightDistance)
        PLControls.moveForward(forwardDistance)
        PLControls.getObject().position.y += velocity.y * delta

    }




    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}


// 更新动画
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update(); // 更新Tween动画
    // 渲染场景
    // ...
}

var highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
highlightMaterial.transparent = true;  // 降低透明度
highlightMaterial.opacity = 0.5; // 透明度范围为0（完全透明）到1（完全不透明）
var originalMaterial = null;
var ifhigh = true; // 当前：高亮还是取消
var open = true; // 当前：开门还是关门

//加载遥感楼模型
const building_path_1 = '../assets/models/building1/out.dae';


//加载教学实验大楼模型
const building_path_2 = '../assets/models/building2/out.dae';


// <----------main部分----------->
//初始化
const building_id = 2
init(building_id)

// add_building(building_path_1, building_id)
add_building(building_path_2, building_id)

render();

//键盘指令
document.addEventListener('keydown', onkeydown);
document.addEventListener('keyup', onkeyup);
document.addEventListener("dblclick", onMouseDblclick)

// 更新动画
animate();

// onresize 事件会在窗口被调整大小时发生,好用
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};


