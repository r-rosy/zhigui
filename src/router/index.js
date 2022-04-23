import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import RegisterPage from '../components/RegisterPage.vue'
import LoginPage from '../components/LoginPage.vue'
import IndexPage from '../components/IndexPage.vue'
import IndividualPage from '../components/IndividualPage.vue'
import UpdateIndividualPage from '../components/UpdateIndividual.vue'
import TaskPage from '../components/TaskPage.vue'
import TaskPublish from '../components/TaskPublish.vue'
import FieldPage from '../components/FieldPage.vue'
import PayPage from '../components/PayPage.vue'
import Axios from 'axios'
import ElementUI from 'element-ui'
 
Vue.use(Router)  //Vue全局使用Router
 
const router = new Router({
  mode: 'history',
  routes: [              //配置路由，这里是个数组
  {
      path:'/register',
      component:RegisterPage,
      name: 'register'
    },
    {
      path:'/login',
      component:LoginPage,
      name: 'login'
    },
    {
      path:'/index',
      component:IndexPage,
      name: 'index'
    },
    {
      path:'/individual',
      component:IndividualPage,
      name: 'individual'
    },
    {
      path:'/individual/update',
      component:UpdateIndividualPage,
      name: 'update_individual'
    },
    {
      path:'/task',
      component: TaskPage,
      name: 'task'
    },
    {
      path:'/task/publish',
      component: TaskPublish,
      name: 'task_publish'
    },
    {
      path:'/field/:type',
      component: FieldPage,
      name: 'field'
    },
    {
      path:'/pay',
      component: PayPage,
      name: 'pay'
    },
  ]
})
export default router

//设置axios请求头加入token
Axios.interceptors.request.use(config => { 
  if (config.push == '/'||config.push == '') {
    console.log('pushing')
    router.push({name: 'index'}); 
   } else { 
    if (localStorage.getItem('zhigui-token')) { 
      //在请求头加入token，名字要和后端接收请求头的token名字一样 
      config.headers.Authorization='Bearer:'+localStorage.getItem('zhigui-token');  
    } 
   } 
    return config; 
  }, 
  error => { 
   return Promise.reject(error);
  });
 //=============================
 //响应回来token是否过期
 Axios.interceptors.response.use(response => { 
   console.log('响应回来：'+response.data.code) 
   //和后端token失效返回码约定401
   if (response.data.code == 401) {
     // 引用elementui message提示框  
     ElementUI.Message({  
      message: '身份已失效', 
      type: 'err'  
      });
     //清除token 
     localStorage.removeItem('zhigui-token');
     //跳转  
     router.push({name: 'login'}); 
    } else { 
      return response 
    } 
   }, 
  error => { 
   return Promise.reject(error); 
   })


  router.beforeEach((to, from, next) => {
    //to到哪儿 from从哪儿离开 next跳转 为空就是放行 
    if (to.path == '/login'||to.path == '/register') {
    //如果跳转为登录或登录，就放行
    next(); 
    } else {
    //取出localStorage判断
    let token = localStorage.getItem('zhigui-token');   
    if (token == null || token == '') { 
    ElementUI.Message({  
      message: '请先登录',  
      }); 
    next({name: 'login'});
    } else {
      next(); 
      } 
  }});
