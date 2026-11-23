package com.kaisha.SekouManagement.config;

import com.kaisha.SekouManagement.interceptors.InterceptorLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private InterceptorLogin LoginInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(LoginInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/api/**","/login"); //(02.23)nginx更新后这里也别忘了
    }
}
