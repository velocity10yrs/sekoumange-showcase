package com.kaisha.SekouManagement.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private String username;
    private String password;
    private String id;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    //可修改字段
    private String name;
    private int age;
    private Character gender;
    private String occupation;
    private String profileIcon;
    private LocalDate entryDate;
    private String departmentId;

}
