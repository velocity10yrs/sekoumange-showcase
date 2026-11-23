package com.kaisha.SekouManagement.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtUtils {
    /*
     * 1)先设置签名和token有效期
     */
    private final String sign;
    private final long expire = 600000L; //10mins

    public JwtUtils(@Value("${spring.datasource.jwt_key}") String sign) {
        this.sign = sign;
    }

    /*
     * 2)再设置生成jwt方法, claims即是从controller传来的用户实体类生成的k-v对
     */
    public String generateJWT(Map<String,Object> claims){
        //System.out.println("generate jwt");//这个流式编程的业务顺序很重要//参数1//注意参数写法
        String jwt = Jwts.builder()
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS256, sign)
                .setExpiration(new Date(System.currentTimeMillis()+expire))
                .compact();
        return jwt;
    }
    /*
     * 3)最后是设置解析jwt的方法
     */
    public Claims parseJWT(String jwt){
        Claims claims = Jwts.parser()
                .setSigningKey(sign)
                .parseClaimsJws(jwt)
                .getBody();
        return claims;
    }

}
