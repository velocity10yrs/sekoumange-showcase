package com.kaisha.SekouManagement.service;


import com.kaisha.SekouManagement.pojo.Employee;
import com.kaisha.SekouManagement.pojo.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface EmployeeService {

    List<Employee> getAll();

    void addEmployee(Employee emp);

    Page page(int page, int range);

    Page getPageByHelper(int page, int range);

    Page getPageByMulti(int page, int range, String name, Character gender, LocalDate beginTime, LocalDate endTime); //, LocalDate beginTime, LocalDate endTime

    void deleteById(String id);

    Employee getById(String id);

    void deleteByMultiIds(List<String> ids);

    void updateEmp(Employee emp);

    Employee login(Employee loginUser);
}
