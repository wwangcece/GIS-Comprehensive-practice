const pageAvageNum = 15;//定义每页显示5条数据 
var whichPageNum = 0;//当前页的起点
var iSfirst = true;//定义一个Boolean值，判断表头是否第一次生成
var mypageNum = 1;//第一个变量用于存当前页数
var pageCount;//定义一个变量用来存储共有多少页
var arrclassName = new Array();//所有班级名称数组(有重)
var new_arrclassName = new Array();////新的班级名称数组(去重)
var studentLocal = null;//将所有学生数据复制给另一数组
var selValue;//获取班级名字
var studentId_alone;//操作单个学生信息时获取该学生学号的value值
var studentLab_alone;//操作单个学生信息时获取该学生所在的班级名称
var selectedStu = null; //搜索结果
var sInfo1;
var newJson_newArr;
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

// 查询全部学生信息
const getStuInfo = (callback) => {
    sendQuery("select * from roomseats", callback);
}
// 添加单个学生信息
const addSingleStdInfo = (stuInfo, callback) => {
    const { stuid, stuname, seatcategory, status, belongbuilding, belonglab, seatnumber, mentor } = stuInfo;
    const sql = `insert into roomseats (stuid, stuname, seatcategory, status, belongbuilding, belonglab, seatnumber, mentor) 
    values ('${stuid}', '${stuname}', '${seatcategory}', '${status}', '${belongbuilding}', '${belonglab}', '${seatnumber}','${mentor}')`;
    console.log("add one")
    sendQuery(sql, callback);
}
// 删除单个学生
const deleteStu = (id, callback) => {
    const sql = `delete from roomseats where stuid='${id}'`
    sendQuery(sql, callback);
}

//刷新数据公用
function refreshData() {
    pageBtn('#stuInfor_pageNum', studentLocal);
    whichPageNum = 0;
    paging("#stuInfor_thead", whichPageNum, studentLocal, iSfirst);
    $(".stuInfor__stuNumberStrong").html(studentLocal.length);
}

$(document).ready(function () {
    getStuInfo(res => {
        if (res.rows !== null) {
            studentLocal = res.rows
            //第一次加载时生成数据表
            paging("#stuInfor_thead", whichPageNum, studentLocal, iSfirst);
            iSfirst = false;
            //生成分页按钮
            pageBtn("#stuInfor_pageNum", studentLocal);
            $(".stuInfor__stuNumberStrong").html(studentLocal.length);
            //点击页数按钮
            $("#stuInfor_pageNum").on("click", ".stuInfor_pageNumClick", function () {
                mypageNum = parseInt($(this).text());//将当前页数赋值给mypageNum
                $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
                $(this).addClass("stuInfor_pageActive");
                whichPageNum = (mypageNum - 1) * pageAvageNum;
                paging("#stuInfor_thead tr", whichPageNum, selectedStu || studentLocal, iSfirst);
            });
            //点击上一页和下一页
            $(".stuInfor_pages").on("click", ".stuInfor_btnComm", function () {
                //点击上一页时需要判断是否是第一页
                if ($(this).text() == "上一页") {
                    if (mypageNum == 1) {
                        alert("亲，已经是第一页哦！");
                    } else {
                        mypageNum -= 1;
                        commFun(mypageNum);
                    }
                } else if ($(this).text() == "下一页") {
                    if (mypageNum >= pageCount) {
                        alert("亲，已经是最后一页哦！");
                    } else {
                        mypageNum += 1;
                        commFun(mypageNum);
                    }
                }
            });
            //点击上一页和下一页共用
            function commFun(mypageNum) {
                whichPageNum = (mypageNum - 1) * pageAvageNum;
                paging("#stuInfor_thead tr", whichPageNum, selectedStu || studentLocal, iSfirst);
                $(".stuInfor_pageNumClick").removeClass("stuInfor_pageActive");
                $(".stuInfor_pageNumClick").eq(mypageNum - 1).addClass("stuInfor_pageActive");
            }
            //生成搜索查询班级中的班级名字
            labName_option("#stuInfor_selectClass");
            //根据班级名字显示对应班级学生信息
            $("#stuInfor_selectClass").change(function (e) {
                //选择班级名字时先清空输入的学生姓名或学号
                $("#studentInput").val("");
                selValue = e.target.value;//获取班级名字
                //过滤将相同班级名字的班级放入一个新的数组
                selectedStu = studentLocal.filter(function (item) {
                    return item.belonglab === selValue;
                })
                if (selValue == "all") {
                    selectedStu = studentLocal
                }
                pageBtn('#stuInfor_pageNum', selectedStu);
                whichPageNum = 0;
                paging("#stuInfor_thead", whichPageNum, selectedStu, iSfirst);
                $(".stuInfor__stuNumberStrong").html(selectedStu.length);
                //将选择后的班级学生信息存放在新数组
                newJson_newArr = selectedStu;
            });
            //根据学生姓名或学号进行模糊查询
            $(".stuInfor_inputText").keyup(
                function () {
                    var inputTxt = $.trim($(".stuInfor_inputText").val());
                    selectedStu = indexSelect(inputTxt, newJson_newArr || studentLocal);
                    pageBtn('#stuInfor_pageNum', selectedStu);
                    whichPageNum = 0;
                    paging("#stuInfor_thead", whichPageNum, selectedStu, iSfirst);
                    $(".stuInfor__stuNumberStrong").html(selectedStu.length);
                }
            )
            //批量删除学生信息
            $(".stuInfor_delateAllStu_btn").on("click", "#stuInfor_deleteBatches", function () {
                if (checkDelatefun().length == 0) {
                    alert("请选中要删除的数据");
                } else {
                    for (let i = 0; i < checkDelatefun().length; i++) {
                        for (let j = 0; j < studentLocal.length; j++) {
                            if (studentLocal[j].stuid === checkDelatefun()[i]) {
                                deleteStu(studentLocal[j].stuid, res => { })
                                studentLocal.splice(j, 1)
                            }
                        }
                    }
                    //刷新数据
                    refreshData();
                    alert("删除成功！");
                }
            });
            //更多操作中的点击事件
            $("#stuInfor_mytable").on("click", ".moreOperationLi", function () {
                //获取该学生学号的value值
                studentId_alone = ($(this).parents("tr").find(".stuid").attr("value"));
                //获取该学生所在的班级名称
                studentLab_alone = ($(this).parents("tr").find(".belonglab").attr("value"));
                if ($(this).text() == "退学") {
                } else if ($(this).text() == "删除") {
                    $(".modal-content1").find(".modal-title").text("是否删除？");
                }
                else if ($(this).text() == "编辑") {
                    //根据该学生学号的value值获取对应信息
                    for (let i = 0; i < studentLocal.length; i++) {
                        if (studentLocal[i].stuid === studentId_alone) {
                            $(".stuInfor_stuName2").val(studentLocal[i].stuname);
                            $(".stuInfor_seatcategory2").val(studentLocal[i].seatcategory);
                            $(".stuInfor_status2").val(studentLocal[i].status);
                            $(".stuInfor_belongbuilding2").val(studentLocal[i].belongbuilding);
                            $(".stuInfor_belonglab2").val(studentLocal[i].belonglab);
                            $(".stuInfor_seatnumber2").val(studentLocal[i].seatnumber);
                            $(".stuInfor_mentor2").val(studentLocal[i].mentor);
                            $(".stuInfor_stuId2").val(studentLocal[i].stuid);
                        }
                    }
                }
            });
            // 添加学生信息
            $(".stuInfo_addBtn").click(function () {
                //先清空上一次输入的内容
                $(".stuInfor_stuName").val("");
                $(".stuInfor_seatcategory").val("");
                $(".stuInfor_status").val("");
                $(".stuInfor_belongbuilding").val("");
                $(".stuInfor_belonglab").val("");
                $(".stuInfor_seatnumber").val("");
                $(".stuInfor_mentor").val("");
                $(".stuInfor_studentStatus").val("");
                $(".stuInfor_stuId").val("");
            });

            // 添加学生信息确认点击事件
            $(".stuInfor_addStudent").click(function () {
                //获取输入的名字
                let stuInfor_addStuName = $(".stuInfor_stuName").val();
                //获取座位类别
                let stuInfor_addseatcategory = $(".stuInfor_seatcategory").val();
                let stuInfor_addstatus = $(".stuInfor_status").val();
                let stuInfor_addbelongbuilding = $(".stuInfor_belongbuilding").val();
                let stuInfor_addbelonglab = $(".stuInfor_belonglab").val();
                let stuInfor_addseatnumber = $(".stuInfor_seatnumber").val();
                let stuInfor_addStuId = $(".stuInfor_stuId").val();
                //获取班级老师姓名
                let stuInfor_addmentor = $(".stuInfor_mentor").val();
                let stuInfo = {
                    stuid: stuInfor_addStuId,
                    stuname: stuInfor_addStuName,
                    seatcategory: stuInfor_addseatcategory,
                    mentor: stuInfor_addmentor,
                    status: stuInfor_addstatus,
                    belongbuilding: stuInfor_addbelongbuilding,
                    belonglab: stuInfor_addbelonglab,
                    seatnumber: stuInfor_addseatnumber,
                };
                studentLocal.push(stuInfo);
                addSingleStdInfo(stuInfo, res => { })
                alert("添加学生信息成功！");

                //刷新数据
                refreshData();

            });


            //编辑学生信息确认点击
            $(".stuInfor_editStudent").click(function () {
                //获取学号
                let stuInfor_addStuId = $(".stuInfor_stuId2").val();
                //获取输入的名字
                let stuInfor_addStuName = $(".stuInfor_stuName2").val();
                //获取座位类型
                let stuInfor_addseatcategory = $(".stuInfor_seatcategory2").val();
                //获取年龄
                let stuInfor_addstatus = $(".stuInfor_status2").val();
                let stuInfor_addbelongbuilding = $(".stuInfor_belongbuilding2").val();
                let stuInfor_addbelonglab = $(".stuInfor_belonglab2").val();
                let stuInfor_addseatnumber = $(".stuInfor_seatnumber2").val();
                let stuInfor_addmentor = $(".stuInfor_mentor2").val();

                for (let i = 0; i < studentLocal.length; i++) {
                    if (studentLocal[i].stuid == studentId_alone) {
                        studentLocal[i].stuid = stuInfor_addStuId,
                            studentLocal[i].stuName = stuInfor_addStuName,
                            studentLocal[i].seatcategory = stuInfor_addseatcategory,
                            studentLocal[i].mentor = stuInfor_addmentor,
                            studentLocal[i].status = stuInfor_addstatus,
                            studentLocal[i].belongbuilding = stuInfor_addbelongbuilding,
                            studentLocal[i].belonglab = stuInfor_addbelonglab,
                            studentLocal[i].seatnumber = stuInfor_addseatnumber
                    }
                }
                //刷新数据
                refreshData();
                deleteStu(studentId_alone, res => { })
                addSingleStdInfo({
                    stuid: stuInfor_addStuId,
                    stuname: stuInfor_addStuName,
                    seatcategory: stuInfor_addseatcategory,
                    status: stuInfor_addstatus,
                    belongbuilding: stuInfor_addbelongbuilding,
                    belonglab: stuInfor_addbelonglab,
                    seatnumber: stuInfor_addseatnumber,
                    mentor: stuInfor_addmentor
                }, res => { })
                alert("学生信息编辑成功！");

                //编辑成功后清空所输入的内容
                $(".stuInfor_stuName2").val("");
                $(".stuInfor_stuId2").val("");
                $(".stuInfor_status2").val("");
                $(".stuInfor_seatcategory2").val("");
                $(".stuInfor_belongbuilding2").val("");
                $(".stuInfor_belonglab2").val("");
                $(".stuInfor_seatnumber2").val("");
                $(".stuInfor_mentor2").val("");
            });

            //单独删除学生信息或退学
            $(".stuInfor_delete").click(function () {
                for (let j = 0; j < studentLocal.length; j++) {
                    if (studentLocal[j].stuid == studentId_alone) {
                        studentLocal.splice(j, 1)
                        deleteStu(studentId_alone, res => { })
                    }
                }
                alert("删除成功！");
                //刷新数据
                refreshData();
            });

            // 导出数据
            $('#export').click(function () {
                $("#stuInfor_mytable").table2excel({
                    exclude: ".noExl",
                    name: "Excel Document Name",
                    // filename: "stuInformation",
                    filename: "学生管理" + ".xls", //文件名称
                    exclude_img: true,
                    exclude_links: true,
                    exclude_inputs: true
                });
            })
        }
        else {
            alert("Error: Request failed")
        }
    })


});
//表格上的数据生成函数
function paging(table, whichPageNum, arrStu, iSfirst) {
    //判断表头是否是第一次生成
    if (iSfirst) {
        $(table).html(
            `<tr>
                <th></th>
                <th class='studentIdTh'>学号</th>
                <th>姓名</th>
                <th>座位类别</th>
                <th>状态</th>
                <th>所属楼</th>
                <th>所属实验室</th>
                <th>座位号</th>
                <th>导师</th>
                <th>操作</th>
            </tr>`
        )
    }
    //在渲染数据前先清空表格
    $("#stuInfor_mytable tbody").html("");
    //根据哪一页渲染显示5条数据
    for (let i = whichPageNum; i < whichPageNum + pageAvageNum; i++) {
        if (i < arrStu.length) {
            $("#stuInfor_mytable tbody").append(
                ` <tr>
                <td><input type="checkbox" value='${arrStu[i].stuid}'/></td>
                <td class="stuid" value='${arrStu[i].stuid}'>${arrStu[i].stuid}</td>
                <td>${arrStu[i].stuname}</td>
                <td>${arrStu[i].seatcategory}</td>
                <td>${arrStu[i].status}</td>
                <td>${arrStu[i].belongbuilding}</td>
                <td class="belonglab" value='${arrStu[i].belonglab}'>${arrStu[i].belonglab}</td>
                <td>${arrStu[i].seatnumber}</td>
                <td>${arrStu[i].mentor}</td>
                <td class="tdOperation">
                    <div class="dropdown">
                        <button class="stuInfor_moreActions btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            更多操作
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li class="moreOperationLi" data-toggle="modal" data-target="#stuInfor_editStuInfo"><a href="#">编辑</a></li>
                            <li class="moreOperationLi" data-toggle="modal" data-target="#stuInfor_delateStuModal"><a href="#">删除</a></li>
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


//渲染一共有多少个分页按钮函数
function pageBtn(oBtn, arrStu) {
    $(oBtn).html('');
    pageCount = Math.ceil(arrStu.length / pageAvageNum);
    for (let i = 0; i < pageCount; i++) {
        if (i == 0) {
            $(oBtn).append(`<button class="stuInfor_pageNumClick stuInfor_pageActive">${i + 1}</button>`);
        } else {
            $(oBtn).append(`<button class="stuInfor_pageNumClick">${i + 1}</button>`);
        }
    }
}
///渲染搜索查询班级中的班级名字函数
function labName_option(select) {
    for (let i = 0; i < className(studentLocal).length; i++) {
        $(select).append(
            ` <option value="${className(studentLocal)[i]}">${className(studentLocal)[i]}</option>`
        );
    }
}
//获取实验室名称函数
function className(arrStu) {
    for (let i = 0; i < arrStu.length; i++) {
        arrclassName.push($(arrStu[i].belonglab).selector);
    }
    for (let i = 0; i < arrclassName.length; i++) {
        var items = arrclassName[i];
        //判断元素是否存在于new_arrclassName中，如果不存在则插入到new_arrclassName中
        if ($.inArray(items, new_arrclassName) == -1) {
            new_arrclassName.push(items);
        }
    }
    return new_arrclassName;
}
//获取批量删除被选中checkbox值函数
function checkDelatefun() {
    var checks = $("input[type='checkbox']:checked");;
    //将获取的值存入数组
    var checkDelateData = new Array();
    checks.each(function () {
        checkDelateData.push($(this).val());
    });
    return checkDelateData;
}

//模糊查询函数
function indexSelect(inputChar, stuArr) {
    const arr = stuArr.filter(res => {
        return res.stuid.indexOf(inputChar) > -1 || res.stuname.indexOf(inputChar) > -1 || res.mentor.indexOf(inputChar) > -1;
    })
    return arr;
}

function addStudentBatches() {
    var file = csvFileInput.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var contents = e.target.result;
        var lines = contents.split('\n');

        var headers = lines[0].split(',');
        for (var i = 0; i < headers.length; i++) {
            headers[i] = headers[i].trim()
        }
        var newData = [];

        for (var i = 1; i < lines.length - 1; i++) {
            var obj = {};
            var currentLine = lines[i].split(',');

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j].trim();
            }

            newData.push(obj);
        }
        console.log(newData);
        // 将新数据添加到属性对象中
        studentLocal = studentLocal.concat(newData);

        // 将数据序列化为JSON并存储在sessionStorage中
        newData.forEach(item => {
            addSingleStdInfo(item, res => { })
        })
        alert("添加学生信息成功！");
        refreshData();
        // 更新页面内容
        $("#stuInfor_addallStuModal").modal('hide');
        pageBtn("#stuInfor_pageNum", studentLocal, isFirst);
        paging("#stuInfor_thead", whichPageNum, studentLocal, isFirst);
        $(".stuInfor__stuNumberStrong").html(studentLocal.length);
    };
    fileReader.readAsText(file);
}