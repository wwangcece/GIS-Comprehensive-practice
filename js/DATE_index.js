var notices = [
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"武汉大学获得OGC国际社区影响力奖!",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/28",//发布时间
        noticeObj:2001//发布对象
    },{
        noticeIssuer:"管理员",//发起人
        noticeHead:"face4.jpg",//发起人头像
        noticeContent:"第二届遥感沙龙暨第二届GLASS产品用户会议（第一轮通知）",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/28",//发布时间
        noticeObj:2001//发布对象
    },
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face2.jpg",//发起人头像
        noticeContent:"9月11日讲座信息-Academic Lecture (September 11, 2023)",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/07",//发布时间
        noticeObj:2001//发布对象
    },
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face4.jpg",//发起人头像
        noticeContent:"学院2023年“研究生学术创新奖”特等奖、一等奖推荐名单公示",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/18",//发布时间
        noticeObj:2001//发布对象
    },
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"学院团委获评武汉大学理论学习先进集体称号",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/18",//发布时间
        noticeObj:2001//发布对象
    },
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"学院2023级新生心理健康教育暨安全知识讲座顺利举办",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"public",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/18",//发布时间
        noticeObj:2001//发布对象
    },
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face4.jpg",//发起人头像
        noticeContent:"遥感信息工程学院举办第二届学术科技文化节开幕式暨 “礼赞二十大，喜迎百卅校庆”科技成果展",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/28",//发布时间
        noticeObj:2001//发布对象
    },
    {
        noticeIssuer:"管理员",//发起人
        noticeHead:"face3.jpg",//发起人头像
        noticeContent:"学院团委举行2023年暑期社会实践风采展示会",//公告内容
        noticeContentImg:"",//内容图片
        noticeType:"class",//公告类型：public（园区公告），class（班级公告），person(个人邮件)
        noticeTime: "2023/9/18",//发布时间
        noticeObj:2001//发布对象
    }
]
var student = [
    {
        studentId:"180101",
        studentPhoto:"../images/stuInfor_images/stuImg01.jpg",//头像
        studentName:"张三丰",
        studentGrade:"1802",
        studentTeacher:"王红",
        studentAge:5,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"张飞",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"出去实习",
        studentAttend:"未批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180102",
        studentPhoto:"../images/stuInfor_images/stuImg02.jpg",//头像
        studentName:"李飞",
        studentGrade:"1801",
        studentTeacher:"毛不亮",
        studentAge:4,
        studentBirth:"2014/03/25",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"李自强",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"暂无",                    //入园时间
        outTime: "暂无",                  //出园时间
        vacationreason:"家里有事",
        studentAttend:"未批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180103",
        studentPhoto:"../images/stuInfor_images/stuImg02.jpg",//头像
        studentName:"唐柳",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"女",
        studentAddress:"天府二街",
        relation:"母女",
        parentName:"柳唐歆",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"放假回家",          //出席
        studentAttend:"批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180104",
        studentPhoto:"../images/stuInfor_images/stuImg04.jpg",//头像
        studentName:"赵飞燕",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"赵子龙",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"暂无",                    //入园时间
        outTime: "暂无",                  //出园时间
        vacationreason:"家里有矿",            //出席
        studentAttend:"未批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180105",
        studentPhoto:"../images/stuInfor_images/stuImg05.jpg",//头像
        studentName:"田甜",
        studentGrade:"1802",
        studentTeacher:"毛不亮",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"女",
        studentAddress:"天府二街",
        relation:"父女",
        parentName:"田不甜",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"找工作",          //出席
        studentAttend:"批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180106",
        studentPhoto:"../images/stuInfor_images/stuImg06.jpg",//头像
        studentName:"陈晨",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"陈世美",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"参加会议",        //出席
        studentAttend:"未批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180107",
        studentPhoto:"../images/stuInfor_images/stuImg07.jpg",//头像
        studentName:"吴敌",
        studentGrade:"1802",
        studentTeacher:"毛不亮",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"吴寂寞",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"暂无",                    //入园时间
        outTime: "暂无",                  //出园时间
        vacationreason:"去游玩",           //出席
        studentAttend:"未批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍
    },
    {
        studentId:"180108",
        studentPhoto:"../images/stuInfor_images/stuImg08.jpg",//头像
        studentName:"罗布",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"罗喜洋",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"出席会议",             //出席
        studentAttend:"批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180109",
        studentPhoto:"../images/stuInfor_images/stuImg09.jpg",//头像
        studentName:"涂涂",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"男",
        studentAddress:"天府二街",
        relation:"父子",
        parentName:"涂天皇",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"开组会",               //出席
        studentAttend:"未批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    },
    {
        studentId:"180103",
        studentPhoto:"../images/stuInfor_images/stuImg02.jpg",//头像
        studentName:"唐晗",
        studentGrade:"1801",
        studentTeacher:"王红",
        studentAge:4,
        studentBirth:"2013/01/01",
        studentSex:"女",
        studentAddress:"天府二街",
        relation:"母女",
        parentName:"柳唐歆",
        parentEmail:"131313@qq.com",
        ParentPhone:"18787878787",             //账号手机号
        password:"878787",                     //密码手机号后六位
        inTime:"2018/09/01 08:30",                    //入园时间
        outTime: "2018/09/01 17:30",                  //出园时间
        vacationreason:"参与项目",          //出席
        studentAttend:"批准",               //出席
        studentStatus:true,           //被删除前的状态为true即学生学籍

    }
];
var teacher = [
    {
        teacherId:"180101",
        photo:"images/main_images/face3.jpg",//头像
        teacherName:"毛亮",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232323232",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018001",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180102",
        photo:"images/main_images/face4.jpg",//头像
        teacherName:"罗喜洋",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232320000",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018001",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180103",
        photo:"images/main_images/face4.jpg",//头像
        teacherName:"毛不易",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018001",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180104",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛不亮",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"心理老师",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018002",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180105",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018002",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180106",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018003",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180107",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018003",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180108",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018003",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180109",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018004",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180110",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018004",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    },
    {
        teacherId:"180111",
        photo:"images/main_images/face2.jpg",//头像
        teacherName:"毛毛",
        teacherAge:"30",
        teacherSex:"男",
        teacherBirth:"1990/01/01",
        teacherPhone:"13232321111",
        grade:"1801",
        eamil:"111111@.com",
        password:"323232",
        job:"班主任",                   //职务
        power:"1",                      //权限
        teacherAttend:"true",         //出席情况
        department:"2018004",          //所属部门
        departmentIsOk:"已激活"          //激活状态
    }
];
var admin = [
    {
        adminName:"赖红梅",
        photo:"images//main_images/face2.jpg",//头像
        username:"leader",                 //园长
        password:"leader",
        job:"园长",                   //职务
        power:"5" ,                       //权限等级
        departmentIsOk:"已激活"          //激活状态
    },

    //管理员账号
    {
        adminName:"林雨淇",
        photo:"images/main_images/face4.jpg",//头像
        username:"admin",
        password:"admin",
        job:"管理员",                   //职务
        power:"10" ,                           //权限等级
        departmentIsOk:"已激活"          //激活状态
    },

];
var Grade = [                                 //班级管理
    {
        gradeId:"1801",
        gradeTeacher:"王红",
        gradeLevel:"小班",
        gradeStudents:"20"
    },
    {
        gradeId:"1802",
        gradeTeacher:"毛不易",
        gradeLevel:"中班",
        gradeStudents:"24"
    },
    {
        gradeId:"1803",
        gradeTeacher:"毛不易",
        gradeLevel:"大班",
        gradeStudents:"24"
    },
    {
        gradeId:"1804",
        gradeTeacher:"罗喜洋",
        gradeLevel:"大班",
        gradeStudents:"24"
    },
    {
        gradeId:"1805",
        gradeTeacher:"毛毛",
        gradeLevel:"中班",
        gradeStudents:"24"
    },
    {
        gradeId:"1806",
        gradeTeacher:"毛不亮",
        gradeLevel:"中班",
        gradeStudents:"24"
    },
];
var department = [
    {
        departmentId:"2018001",
        departmentName:"园长办公室",
        departmentContent:"教学管理部门",
        persons:"3"
    },
    {
        departmentId:"2018002",
        departmentName:"教学部",
        persons:"2",
        departmentContent:"教学老师部门"
    },
    {
        departmentId:"2018003",
        departmentName:"后勤部",
        persons:"3",
        departmentContent:"卫生安全负责部门"
    },
    {
        departmentId:"2018004",
        departmentName:"保安部",
        persons:"3",
        departmentContent:"校园安全负责部门"
    }
];
