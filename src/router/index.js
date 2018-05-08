import Vue from 'vue'
import Router from 'vue-router'
import category from '@/components/lxzl/category'
import classes from '@/components/lxzl/classes'
import tab from '@/components/lxyk/tab'
import myDetail from '@/components/xyzq/myDetail'
// import personalback from '@/components/personalback'
// import companyback from '@/components/companyback'
import lesson from '@/components/lxzl/lesson'
import classdetail from '@/components/lxzl/classdetail'
import online from '@/components/lxzl/online'
import FeedbackForm from '@/components/lxyk/FeedbackForm'
import feedbackcompany from '@/components/lxyk/feedbackcompany'
import teacherDetail from '@/components/lxzl/teacherDetail'
import teacherDetailForm from '@/components/lxzl/teacherDetailForm'
import application from '@/components/lxzl/application'
import agreement from '@/components/lxzl/agreement'
import teachingpoint from '@/components/teachinglist/teachingpoint'
import addressmain from '@/components/teachinglist/addressmain'
import prointroduce from '@/components/prointroduce/prointroduce'
import myindex from '@/components/myindex/myindex'
import myintegral from '@/components/myindex/myintegral'
import contactus from '@/components/aboutsform/contactus'
import problemmain from '@/components/aboutsform/problemmain'
import teachernext from '@/components/lxzl/teachernext'

import personalClass from '@/components/personalClass'
import personalStatement from '@/components/personalClass/statement'
import presonalForm from '@/components/personalClass/form'
import companyClass from  '@/components/companyClass/indexC'
import companyStatement from '@/components/companyClass/statement'
import companyForm from '@/components/companyClass/formC'
import myCourse from '@/components/cadetArea/myCourse'
import myCourseDetail from '@/components/cadetArea/myCourseDetail'
import myMsg from '@/components/cadetArea/myMsg'
import myMsgDetail from '@/components/cadetArea/myMsgDetail'
import collection from '@/components/myindex/collection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'category',
      component: category,
      meta: {
     	 title: '课程介绍'
    	}
    },
    {
      path: '/tab',
      component: tab,
      meta: {
     	 title: '用户反馈'
    	}
    },
    {
    	path: '/classes',
    	component: classes
//  	meta: {
//   	 title: '课程介绍'
//  	}

    },{
      path: '/lesson',
      component: lesson,
      meta: {
     	 title: '热门课程'
    	}
    },{
      path: '/myDetail',
      component: myDetail,
      meta: {
     	 title: '反馈详情'
    	}
    }
    ,{
    	  path: '/classdetail',
    	  component: classdetail
    },{
    	  path: '/online',
    	  component: online,
    	  meta: {
     	 	title: '在线课堂'
    		}
    },{
    	  path: '/FeedbackForm',
    	  component: FeedbackForm,
    	   meta: {
     	 	title: '个人约课用户反馈'
    		}
    },{
    	  path: '/feedbackcompany',
    	  component: feedbackcompany,
    	  meta: {
     	 	title: '企业约课用户反馈'
    		}
    },{
    	  path: '/teacherDetail',
    	  component: teacherDetail,
    	  meta: {
     	 	title: '师资介绍'
    		}
    },{
    	  path: '/teacherDetailForm',
    	  component: teacherDetailForm,
    	  meta: {
     	 	title: '公益乐学师资招募申请表'
    		}
    },{
    	  path: '/application',
    	  component: application,
    	  meta: {
     	 	title: '师资招募'
    		}
    },{
    	  path: '/agreement',
    	  component: agreement,
    	  meta: {
     	 	title: '公益乐学师资招募条例'
    		}
    },{
    	  path: '/teachernext',
    	  component: teachernext
    },{
    	  path: '/addressmain',
    	  component: addressmain
    },{
    	  path: '/teachingpoint',
    	  component: teachingpoint, 
    	  meta: {
     	 	title: '教学点介绍'
    		}
    },{
    	  path: '/prointroduce',
    	  component: prointroduce,
    	  meta: {
     	 	title: '公益乐学项目介绍'
    		}
    },{
    	  path: '/myindex',
    	  component: myindex,
    	  meta: {
     	 	title: '我的'
    		}
    },{
    	  path: '/myintegral',
    	  component: myintegral,
    	   meta: {
     	 	title: '我的积分'
    		}
    },{
    	  path: '/contactus',
    	  component: contactus,
    	   meta: {
     	 	title: '联系我们'
    		}
    },{
    	  path: '/problemmain',
    	  component: problemmain
    	
    },
    {
    	  path: '/collection',
    	  component: collection,
    	   meta: {
     	 	title: '我的收藏'
    		}
    },
    {
    path:'/personalClass',
    component:personalClass,
    meta: {
      title: '个人约课'
    }
  },{
    path:'/personalClass/personalStatement',
    component:personalStatement,
    meta: {
      title: '个人预约'
    }
  },{
    path:'/personalClass/form',
    component:presonalForm,
    meta:{
      title:'个人预约'
    }
  },
  //企业约课
  {
    path:'/companyClass',
    component:companyClass,
    meta: {
      title: '企业约课'
    }
  }, //企业约课
  {
    path:'/companyClass/companyStatement',
    component:companyStatement,
    meta: {
      title: '企业约课'
    }
  }, //企业约课
  {
    path:'/companyClass/form',
    component:companyForm,
    meta: {
      title: '企业约课'
    }
  },
    //我预约的课程
    {
      path:'/myCourse',
      component:myCourse,
      meta:{
        title:'我预约的课程'
      }
    },
    //我预约的课程详情
    {
      path:'/myCourseDetail',
      component:myCourseDetail,
      meta:{
        title:'我预约的课程'
      }
    },
    //我的消息
    {
      path:'/myMsg',
      component:myMsg,
      meta:{
        title:'我的消息'
      }
    },
    //我的消息详情
    {
      path:'/myMsgDetail',
      component:myMsgDetail,
      meta:{
        title:'通知消息'
      }

    }

  ]
})
