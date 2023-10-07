var pageNum = 5;//控制每一页显示多少条数据
var dutyPageCount;//定义一个变量用来存储共有多少页
var dutyPageNum = 1;//第一个变量用于存当前页数
//获取缓存中的字符串
//把字符串变为数组
var duty_departmentLocal = JSON.parse(sessionStorage.getItem("duty_info"));
/*
     table:需要渲染数据的表格
     startNum：渲染数据开始的位置
     date:需要渲染的数据
 */
function pageContent(table, startNum, date) {
    $("#duty_count").html(date.length)
    //如果表头有内容，则不添加
    if ($(table + ">thead>tr").html().length == 0) {
        //渲染表头部分
        for (let item in date[0]) {
            if (item == "studentId") {
                $(table + ">thead>tr").append("<th>学号</th>")
            } else if (item == "studentName") {
                $(table + ">thead>tr").append("<th>姓名</th>")
            } else if (item == "studentGrade") {
                $(table + ">thead>tr").append("<th>实验室</th>")
            } else if (item == "studentTeacher") {
                $(table + ">thead>tr").append("<th>导师</th>")
            } else if (item == "vacationreason") {
                $(table + ">thead>tr").append("<th>请假原因</th>")
            } else if (item == "studentAttend") {
                $(table + ">thead>tr").append("<th>状态</th>")
            }
        }
        $(table + ">thead>tr").append("<th>操作</th>")
    }

    //先清空原有的内容
    $("#duty_table>tbody").html("");
    //渲染表格身体部分
    for (let i = startNum; i < startNum + pageNum; i++) {
        if (i < date.length) {
            $(table + ">tbody").append(`
               <tr>
                    <td class="duty_class_id">${date[i].studentId}</td>
                    <td>${date[i].studentName}</td>
                    <td>${date[i].studentGrade}</td>
                    <td>${date[i].studentTeacher}</td>
                    <td>${date[i].vacationreason}</td>
                    <td class="duty_duty">${date[i].studentAttend}</td>
                    <td class="duty_operation">
                        <span class="duty_leave">批准</span>
                    </td>
               </tr>                   
            `)
        } else {
            break;
        }
    }
    //判断当前的出勤状态
    let duty_duty_temp = $("#duty_table>tbody>tr .duty_duty");
    for (let i = 0; i < duty_duty_temp.length; i++) {
        if ($(duty_duty_temp[i]).text() == "批准") {
            //设置该按钮样式
            $(duty_duty_temp[i]).next().children(".duty_leave").css("backgroundColor", "#999")
            $(duty_duty_temp[i]).next().children(".duty_leave").on("click", duty_vaca_reason)
        } else {
            $(duty_duty_temp[i]).next().children(".duty_leave").on("click", duty_vacation)
        }
    }
}
//弹出请假详情
function duty_vaca_reason() {
    $(this).attr({
        "data-toggle": "modal",
        "data-target": "#duty_viewVacation"
    })
    duty_vacaModel($(this))
}
function duty_vacation() {
    $(this).attr({
        "data-toggle": "modal",
        "data-target": "#duty_viewVacation"
    })
    $(this).parent().prev().html("批准");
    $(this).css("backgroundColor", "#999");
    let duty_vace_id = $(this).parent().parent().children(".duty_class_id").html()
    for (let i = 0; i < duty_departmentLocal.length; i++) {
        if (duty_departmentLocal[i].studentId == duty_vace_id) {
            duty_departmentLocal[i].studentAttend = "批准";
        }
        duty_vacaModel($(this))
    }
}

// 渲染模态框数据
function duty_vacaModel(obj) {
    let duty_vace_id = obj.parent().parent().children(".duty_class_id").html()
    for (let i = 0; i < duty_departmentLocal.length; i++) {
        if (duty_departmentLocal[i].studentId == duty_vace_id) {
            let duty_ema = obj.parent().siblings(".vacaEmail").html()
            $("#duty_vaca_email").html(duty_ema)
            $("#duty_vaca_time").html(new Date().toLocaleDateString())
            $("#duty_vaca_text").html(duty_departmentLocal[i].vacationreason)
            duty_departmentLocal[i].vacationreason.$("#duty_vaca_text").html()
        }
    }
}

//渲染需要多少个分页按钮
/*element:jQuery对象
date:需要渲染的数据*/
function pageBtn(element, date) {
    dutyPageCount = Math.ceil(date.length / pageNum);
    //先清空原有的内容
    $(element).html("");
    for (let i = 0; i < dutyPageCount; i++) {
        $(element).append(`
            <span class="dutyBtnList">${i + 1}</span>
        `)
    }
    $(".dutyBtnList:eq(0)").addClass("duty_click_active");
    //点击分页
    function dutyPageClick(obj) {
        let duty_page = obj.text();
        pageContent("#duty_table", (duty_page - 1) * pageNum, duty_departmentLocal)
        obj.addClass("duty_click_active").siblings().removeClass("duty_click_active")
    }
    $("#duty_pageNum").on("click", ".dutyBtnList", function () {
        dutyPageClick($(this));
        dutyPageNum = $(this).index() + 1
    })
    //点击上一页/下一页
    $(".duty_pages").on("click", ".duty_paging", function () {
        //点击上一页时需要判断是否是第一页
        if ($(this).text() == "上一页") {
            if (dutyPageNum != 1) {
                dutyPageNum -= 1;
                console.log(dutyPageNum)
                $(".dutyBtnList:eq(" + (dutyPageNum - 1) + ")").addClass("duty_click_active").siblings().removeClass("duty_click_active")
                dutyPageClick($(".dutyBtnList:eq(" + (dutyPageNum - 1) + ")"))

            }
        } else if ($(this).text() == "下一页") {
            if (dutyPageNum < dutyPageCount) {
                dutyPageNum += 1;
                console.log(dutyPageNum)
                $(".dutyBtnList:eq(" + (dutyPageNum - 1) + ")").addClass("duty_click_active").siblings().removeClass("duty_click_active")
                dutyPageClick($(".dutyBtnList:eq(" + (dutyPageNum - 1) + ")"))


            }
        }
    })
}

//模糊查询函数
// duty_Stu:输入的学生信息
// student：数据表
// duty_class_html：输入的班级
function duty_indexSelect(duty_Stu, student) {
    const duty_arr = student.filter(res => {
        return res.studentId.indexOf(duty_Stu) > -1 || res.studentName.indexOf(duty_Stu) > -1 || res.studentAttend.indexOf(duty_Stu) > -1;
    })
    return duty_arr;
}
// 模拟点击搜索学生
$(".duty_input_text").on("keyup", function (e) {
    let duty_Stu = $(".duty_input_button").prev().prev().val()
    duty_departmentLocal = duty_indexSelect(duty_Stu, student)
    pageContent("#duty_table", 0, duty_departmentLocal);
    //重新渲染按钮
    dutyPageCount = Math.ceil(duty_departmentLocal.length / pageNum);
    //先清空原有的内容
    $("#duty_pageNum").children().remove();
    for (let i = 0; i < dutyPageCount; i++) {
        $("#duty_pageNum").append(`
            <span class="dutyBtnList">${i + 1}</span>
        `)
    }
    $(".dutyBtnList:eq(0)").addClass("duty_click_active");

})

$(document).ready(function () {
    pageContent("#duty_table", 0, student)
    pageBtn("#duty_pageNum", student)
    duty_class_list();
})


//导出表格
$("#out_table3").click(function () {
    $("#duty_table").table2excel({
        exclude: ".not", //过滤位置的 css 类名
        filename: "考勤管理" + ".xls" //文件名称
    });
});