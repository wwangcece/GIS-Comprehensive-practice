const pageAvrageNum = 5;//定义每页显示5条数据
var whichPageNum = 0;//当前页的起点
var isFirst = true;//定义一个Boolean值，判断表头是否第一次生成
var mypageNum = 1;//第一个变量用于存当前页数
var pageCount;//定义一个变量用来存储共有多少页
var departmentLocal = null;
var teacherLocal = JSON.parse(sessionStorage.getItem("teacher_info"));
var this_i;
var table;
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

// 查询全部实验室信息
const getLabInfo = (callback) => {
    sendQuery("select * from labinformation", callback);
}
// 插入单个实验室
const addSingleLab = (labinfo, callback) => {
    const { departmentid, departmentname, departmentleader, capacity, belongbuilding } = labinfo;
    const sql = `insert into labinformation (departmentid, departmentname, departmentleader, capacity, belongbuilding) 
    values ('${departmentid}', '${departmentname}', '${departmentleader}', ${capacity}, '${belongbuilding}')`;
    sendQuery(sql, callback);
}
const deleteLab = (id, callback) => { 
    const sql = `delete from labinformation where departmentid='${id}'`
    console.log(id)
    sendQuery(sql, callback);
}



$(document).ready(table = function () {
    getLabInfo(res => {
        if (res.rows !== null) {
            departmentLocal = res.rows
            //第一次加载时生成数据表
            paging("#stuInfor_thead", whichPageNum, departmentLocal, isFirst);

            //生成分页按钮
            pageBtn("#stuInfor_pageNum", departmentLocal, isFirst);
            isFirst = false;
            $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
            //点击页数按钮
            $("#stuInfor_pageNum").on("click", ".stuInfor_pageNumClick", function () {
                mypageNum = parseInt($(this).text());//将当前页数赋值给mypageNum
                $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
                $(this).addClass("stuInfor_pageActive");
                whichPageNum = (mypageNum - 1) * pageAvrageNum;
                paging("#stuInfor_thead tr", whichPageNum, departmentLocal, isFirst);
            });
            //点击上一页和下一页
            $(".stuInfor_pages").on("click", ".stuInfor_btnComm", function () {
                //点击上一页时需要判断是否是第一页
                if ($(this).text() === "上一页") {
                    if (mypageNum === 1) {
                        alert("已经是第一页！");
                    } else {
                        mypageNum -= 1;
                        commFun(mypageNum);
                    }
                } else if ($(this).text() === "下一页") {
                    if (mypageNum >= pageCount) {
                        alert("已经是最后一页！");
                    } else {
                        mypageNum += 1;
                        commFun(mypageNum);
                    }
                }
            });
            function commFun(mypageNum) {
                whichPageNum = (mypageNum - 1) * pageAvrageNum;
                paging("#stuInfor_thead tr", whichPageNum, departmentLocal, isFirst);
                $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
                $(".stuInfor_pageNumClick").eq(mypageNum - 1).addClass("stuInfor_pageActive");
            }
            $("#modal_btn").click(addDepartments);
            $(".stuInfo_addBtn").click(clear_modal);
        }

        else {
            alert("Error: Request failed")
        }
    });


});
//分页上的数据生成函数

function paging(table, whichPageNum, arrStu, isFirst) {
    //判断表头是否是第一次生成
    if (isFirst) {
        $(table).html(
            `<tr>
                <th></th>
                <th class='studentIdTh'>实验室编号</th>
                <th>实验室名称</th>
                <th>负责人</th>
                <th>容量</th>
                <th>所属楼</th>
                <th>操作</th>
            </tr>`
        )
    }
    //在渲染数据前先清空表格
    $("#stuInfor_mytable>tbody").html("");
    //根据哪一页渲染显示5条数据
    // changePersons();
    for (let i = whichPageNum; i < whichPageNum + pageAvrageNum; i++) {
        if (i < arrStu.length) {
            $("#stuInfor_mytable tbody").append(
                ` <tr id="department_tr">
                    <td>${i + 1}</td>
                    <td>${arrStu[i].departmentid}</td>
                    <td>${arrStu[i].departmentname}</td>               
                    <td>${arrStu[i].departmentleader}</td>
                    <td>${arrStu[i].capacity}</td>
                    <td>${arrStu[i].belongbuilding}</td>
                    <td class="tdOperation">
                        <div class="dropdown">
                            <button class="stuInfor_moreActions btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                更多操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a id="edit_department" href="#" onclick="edit_department(this)" data-toggle="modal" data-target="#department_edit">编辑</a></li>
                                <li><a href="#" onclick="del(this)">删除</a></li>
                            </ul>
                        </div>
                    </td>
            </tr>`
            )
        } else {
            break;
        }
    }
}
//渲染一共有多少个分页按钮
function pageBtn(oBtn, arrStu, isFirst) {
    $(oBtn).html("");
    pageCount = Math.ceil(arrStu.length / pageAvrageNum);
    for (let i = 0; i < pageCount; i++) {
        if (i === 0 && isFirst) {
            $(oBtn).append(`<button class="stuInfor_pageNumClick stuInfor_pageActive">${i + 1}</button>`);
        } else {
            $(oBtn).append(`<button class="stuInfor_pageNumClick">${i + 1}</button>`);
        }
    }
}
//添加单个数据
function clear_modal() {
    $("#departInfo1").val("");
    $("#departInfo2").val("");
    $("#departInfo3").val("");
    $("#departInfo4").val("");
    $("#departInfo5").val("");
}

function addDepartments() {
    var addDepartInfo1 = $("#departInfo1").val();
    var addDepartInfo2 = $("#departInfo2").val();
    var addDepartInfo3 = $("#departInfo3").val();
    var addDepartInfo4 = $("#departInfo4").val();
    var addDepartInfo5 = $("#departInfo5").val();

    if (addDepartInfo1 === "" || addDepartInfo5 === "") {
        alert("请输入实验室号和所属楼！");
    } else {
        var labInfo = {
            departmentid: addDepartInfo1,
            departmentname: addDepartInfo2,
            departmentleader: addDepartInfo3,
            capacity: addDepartInfo4,
            belongbuilding: addDepartInfo5
        };

        departmentLocal.push(labInfo);
        addSingleLab(labInfo, res => { })
        alert("添加成功！");

        $("#stuInfor_addStuModal").modal('hide');
        pageBtn("#stuInfor_pageNum", departmentLocal, isFirst);
        paging("#stuInfor_thead", whichPageNum, departmentLocal, isFirst);
        $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
        // table();
    }
}

//批量添加数据
function addallDepartments() {
    var file = csvFileInput.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var contents = e.target.result;
        var lines = contents.split('\r');

        var headers = lines[0].split(',');
        var newData = [];

        console.log(headers);
        for (var i = 1; i < lines.length - 1; i++) {
            var obj = {};
            lines[i] = lines[i].slice(1)
            var currentLine = lines[i].split(',');

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }

            newData.push(obj);
        }
        // 将新数据添加到属性对象中
        departmentLocal = departmentLocal.concat(newData);

        // 将数据序列化为JSON并存储在sessionStorage中
        newData.forEach(item => {
            addSingleLab(item, res => { })
        })
        alert("添加成功！");

        // 更新页面内容
        $("#stuInfor_addallStuModal").modal('hide');
        pageBtn("#stuInfor_pageNum", departmentLocal, isFirst);
        paging("#stuInfor_thead", whichPageNum, departmentLocal, isFirst);
        $(".stuInfor__stuNumberStrong").html(departmentLocal.length);

    };

    fileReader.readAsText(file);
}





//删除表格行
function del(e) {
    for (let i = 0; i < departmentLocal.length; i++) {
        let id = $(e).parent().parent().parent().parent().parent().children()[1].innerHTML;
        // console.log(id);
        if (departmentLocal[i].departmentid === id) {
            $(e).parent().parent().parent().parent().parent().remove();
            departmentLocal.splice(i, 1);
            deleteLab(id, res => { })
            alert("删除成功！");
            break;
        }
    }
}

//编辑表格行，弹出模态框，模态框获取表格行数据，用户修改后保存数据
function edit_department(e) {
    let idNode = $(e).parent().parent().parent().parent().parent().children()[1].innerHTML;
    for (let i = 0; i < departmentLocal.length; i++) {
        if (departmentLocal[i].departmentid === idNode) {
            $("#departInfo01").val(departmentLocal[i].departmentid);
            $("#departInfo02").val(departmentLocal[i].departmentname);
            $("#departInfo03").val(departmentLocal[i].departmentleader);
            $("#departInfo04").val(departmentLocal[i].capacity);
            $("#departInfo05").val(departmentLocal[i].belongbuilding);
            this_i = i;
            // console.log($("#departInfo01").val())
        }
    }
}
$("#modal_btn01").click(function () {
    let addDepartInfo01 = $("#departInfo01").val();
    let addDepartInfo02 = $("#departInfo02").val();
    let addDepartInfo03 = $("#departInfo03").val();
    let addDepartInfo04 = $("#departInfo04").val();
    let addDepartInfo05 = $("#departInfo05").val();
    console.log(addDepartInfo01);
    if (addDepartInfo01 === "" || addDepartInfo05 === "") {
        alert("请输入实验室号和所属楼！");
    } else {
        var duixiang = {
            departmentid: addDepartInfo01,
            departmentname: addDepartInfo02,
            departmentleader: addDepartInfo03,
            capacity: addDepartInfo04,
            belongbuilding: addDepartInfo05
        };
        departmentLocal.splice(this_i, 1, duixiang);
        deleteLab(addDepartInfo01, res => { })
        addSingleLab(duixiang, res => { })
        alert("修改成功！")

        $("#department_edit").modal('hide');
        pageBtn("#stuInfor_pageNum", departmentLocal, isFirst);
        paging("#stuInfor_thead", whichPageNum, departmentLocal, isFirst);
        $(".stuInfor__stuNumberStrong").html(departmentLocal.length);
        // table();
    }
});
// /****模糊查询****/
// $("#search_department").on("focus", function () {//获取焦点时输入框
//     let that = $(this);
//     //显示列表
//     $(".department_tbody").show();
//     //输入实时查询事件，propertychange是IE的输入监听事件，input是其它浏览器
//     $("#search_department").on("input propertychange", function () {
//         $("#department_tr ").hide().filter(":contains('" + that.val().toLocaleLowerCase() + "')").show();
//     });
// });

$("#close_modal").click(function () {
    $("#depart_persons").children().remove();
});





//根据学生姓名或学号进行模糊查询
$("#search_department").keyup(
    function () {
        var inputTxt = $.trim($("#search_department").val());
        selectedDepartment = indexSelect(inputTxt, departmentLocal);
        pageBtn('#stuInfor_pageNum', selectedDepartment, isFirst);
        whichPageNum = 0;
        paging("#stuInfor_thead", whichPageNum, selectedDepartment, isFirst);
        $(".stuInfor__stuNumberStrong").html(selectedDepartment.length);
    }
);
//模糊查询函数
function indexSelect(inputChar, stuArr) {
    const arr = stuArr.filter(res => {
        return res.departmentid.indexOf(inputChar) > -1 || res.departmentname.indexOf(inputChar) > -1;
    });
    return arr;
}
//导出表格
$("#out_table").click(function () {
    $("#stuInfor_mytable").table2excel({
        exclude: ".not", //过滤位置的 css 类名
        filename: "实验室" + ".xls" //文件名称
    });
});
