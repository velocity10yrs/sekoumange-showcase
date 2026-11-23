package com.kaisha.SekouManagement.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kaisha.SekouManagement.mapper.EmployeeMapper;
import com.kaisha.SekouManagement.pojo.Employee;
import com.kaisha.SekouManagement.pojo.Page;
import com.kaisha.SekouManagement.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class EmployeeImpl implements EmployeeService {

    @Autowired
    private EmployeeMapper empMapper;

//    @Autowired  // 0223 fix
//    public EmployeeImpl(EmployeeMapper employeeMapper) {
//        this.empMapper = employeeMapper;
//    }

    @Override
    public List<Employee> getAll() {
        List<Employee> res = empMapper.getAll();
        //System.out.println(res.toString());
        return res;
    }

    @Override
    public void addEmployee(Employee emp){
        emp.setCreateTime(LocalDateTime.now());//该字段由系统生成
        emp.setUpdateTime(LocalDateTime.now());//该字段非用户填写

        empMapper.insert(emp);
    }

    @Override
    public Page page(int page,int range){
        int sumPages = empMapper.count();
        int startPoint = (page-1)*range;  //+1;
        List<Employee> emplist = empMapper.getByPage(startPoint,range);
        Page pageBean = new Page(sumPages,emplist);
        return pageBean;
    }

    @Override
    public Page getPageByHelper(int page,int range){
        //1.设置分页参数
        PageHelper.startPage(page,range);
        //2.使用插件静态方法查询
        // 另:因为插件内引用类page和咱们自己的page重名,需要全包名 + 强制类型转换
                //com.github.pagehelper.Page<Employee> pa = (com.github.pagehelper.Page<Employee>) empMapper.getAll();
        // =>> //23年3月的黑马教学视频写法，已废弃 ////!!
        List<Employee> emplist = empMapper.getByPage(page,range);
        PageInfo<Employee> pi = new PageInfo<Employee>(emplist) ;
        //3.封装
        Page pageResult = new Page(pi.getTotal(),pi.getList());
        return pageResult;
    }

    @Override
    public Page getPageByMulti(int page, int range, String name, Character gender, LocalDate beginTime, LocalDate endTime) { //, LocalDate beginTime, LocalDate endTime
        PageHelper.startPage(page,range);
        List<Employee> emplist = empMapper.getPageByMulti(name,gender,beginTime,endTime);
        PageInfo<Employee> pi = new PageInfo<Employee>(emplist) ;//,beginTime,endTime
        Page pageResult = new Page(pi.getTotal(),pi.getList());
        return pageResult;
    }

    @Override
    public void deleteById(String id){
        empMapper.deleteById(id);
    }

    @Override
    public Employee getById(String id) {
        Employee res = empMapper.getById(id);
        return res;
    }

    @Override
    public void deleteByMultiIds(List<String> ids) {
        empMapper.deleteByMultiIds(ids);
    }

    @Override
    public void updateEmp(Employee emp) {
        emp.setUpdateTime(LocalDateTime.now());//该字段非用户填写
        empMapper.updateEmp(emp);
    }

    @Override
    public Employee login(Employee loginUser) {
        try {
            return empMapper.getByUsernameAndPassword(loginUser); //业务逻辑用func名和查询func名要分开
        } catch (Exception e) {
            System.out.println("login ServiceImpl层故障");
            throw new RuntimeException(e);
        }
            //return null;
    }
}
