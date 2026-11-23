package com.kaisha.SekouManagement.interceptors;

import com.alibaba.fastjson.JSONObject;
import com.kaisha.SekouManagement.pojo.Result;
import com.kaisha.SekouManagement.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class InterceptorLogin implements HandlerInterceptor {
    private final JwtUtils jwtUtils;

    public InterceptorLogin(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,Object handler) throws Exception{//目标资源运行前执行
        //(1)从请求中解析url
        String url = request.getRequestURL().toString();
        //(2)特别判断url类型是否为login
        //if(url.contains("login")){
        //    return true;
        //}
        //(3)从请求中解析header,再拿到token
        String jwt = request.getHeader("token");
        //System.out.println(jwt);
        //(4)核心:判断token是否为空
        if(!StringUtils.hasLength(jwt)){
            Result error= Result.error("Not Login"); //ログインから操作してください
            //此处使用alibaba的fastjson组件进行手动str转json:
            String notlogin = JSONObject.toJSONString(error);
            response.getWriter().write(notlogin);
            return false;
        }
        //(5)核心:解析token是否符合要求
        try{
            jwtUtils.parseJWT(jwt); //自写工具类中的方法
        }catch(Exception e){
            e.printStackTrace();
            Result error= Result.error("login Error"); //故障発生、お手数ですが，もう一度ログイン願います
            String notlogin = JSONObject.toJSONString(error);
            response.getWriter().write(notlogin);
            return false;
        }
        //(6)允许请求通过
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView){//后执行
        System.out.println("post-handling ...");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,Object handler,Exception exception){//视图渲染后执行,顺序在最后
        System.out.println("after completion ..");
    }
}
