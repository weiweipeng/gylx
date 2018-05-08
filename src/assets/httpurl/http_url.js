let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host= localhostDev ? 'http://localhost:8080/api' : 'http://we.gobestsoft.com/gylx/public';
let httpUrl = {
  'getCourseInformationList': _host + '/api/getCourseInformationList',//获取企业课程列表
  'getPersonalCourseList': _host + '/api/getPersonalCourseList',//获取个人课程列表
  'CousrseEnroll':_host + '/api/CousrseEnroll', //企业报名
  'getCourseInformationTitle':_host + '/api/getCourseInformationTitle', //获取企业约课标题
  'doPersonalAppointment':_host + '/api/doPersonalAppointment', //提交个人课程预约
  'getPersonalCourseDetail':_host + '/api/getPersonalCourseDetail', //获取个人课程详情
  'doCourseLike':_host+'/api/doCourseLike', //提交课程点赞/取消点赞getPersonalCourseDetail
  'doCourseCollect':_host+'/api/doCourseCollect', //提交课程收藏/取消收藏
  'getMemberQuestion':_host+'/api/getMemberQuestion', //获取我的问题列表
  'doMemberQuestion':_host+'/api/doMemberQuestion', //发表提问
  'getCollectionList':_host+'/api/getCollectionList',//获取个人收藏列表
  'getQuestionDeatail':_host+'/api/getQuestionDeatail',// 发表提问
  'getMyIntegral':_host+'/api/getMyIntegral', //我的积分
  'getCatCoursedetail':_host+'/api/getCatCoursedetail' ,  //课程详情
  'getCatCourselist':_host+'/api/getCatCourselist',//获取课程分类列表
  'getCategoryPage':_host+'/api/getCategoryPage', //首页
  'getMessageList':_host+'/api/getMessageList', //获取消息列表
  'getMessageDetail':_host+'/api/getMessageDetail', //获取消息详情
  'getMyAppointList':_host+'/api/getMyAppointList',//获取我的预约列表
  'getMyAppointDetail':_host+'/api/getMyAppointDetail', //我的预约详情
   'getAddressList':_host+'/api/getAddressList' ,//教学点地址列表
   'getAddressDetail':_host+'/api/getAddressDetail' ,//教学点详情
	 'getAddresslnglat':_host+'/api/getAddresslnglat' ,  //获取教学点经纬度
	 'getMemberInfo':_host+'/api/getMemberInfo',   //获取教学点经纬度
	 'getCatCoursedetail':_host+'/api/getCatCoursedetail',//获取企业课程列表
   'doPersonalFeedBack':_host+'/api/doPersonalFeedBack',//提交个人约课反馈
   'doFeedBack':_host+'/api/doFeedBack',//提交约课反馈
   'getOnlineCourse':_host+'/api/getOnlineCourse',//在线课堂
   'getMyBackDetail':_host+'/api/getMyBackDetail',//获取反馈详情
   'getMyBackList':_host+'/api/getMyBackList',//个人反馈列表
   'getFeedBackDetail':_host+'/api/getFeedBackDetail',//获取企业约课反馈信息
   'getInstructorList':_host+'/api/getInstructorList',//获取企业约课反馈信息
   'doFeedBack':_host+'/api/doFeedBack',//提交个人约课反馈
   'doInstructor':_host+'/api/doInstructor',//师资报名
   'getHotCourse':_host+'/api/getHotCourse' ,  //热门课程
   'getFeedBackList':_host+'/api/getFeedBackList' ,  //获取个人约课反馈列表
   'getPersonalFeedBackList':_host+'/api/getPersonalFeedBackList' ,  //获取个人约课反馈列表
   'getRecruitList':_host+'/api/getRecruitList'   //获取师资列表

}
export default httpUrl
