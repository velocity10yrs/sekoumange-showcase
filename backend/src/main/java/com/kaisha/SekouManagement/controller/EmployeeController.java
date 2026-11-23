package com.kaisha.SekouManagement.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kaisha.SekouManagement.pojo.Employee;
import com.kaisha.SekouManagement.pojo.Page;
import com.kaisha.SekouManagement.pojo.Result;
import com.kaisha.SekouManagement.service.EmployeeService;
import com.kaisha.SekouManagement.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
//@CrossOrigin(origins="*") //sekou-manage http://localhost:3000前端的域名端口, 最右没有"/"
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JwtUtils jwtUtils;

    /*
     *  员工登陆
     */
    @PostMapping("/login")
    public Result login(@RequestBody Employee loginUser){ //注意:前端传来的是json格式账密,需要用实体类接收
        Employee emp;
        try {
            emp = employeeService.login(loginUser); /////////(02.24 极度可疑)///
        } catch (Exception e) {
            System.out.println("login Controller层故障");
            throw new RuntimeException(e);
        }
        //return Result.success();//(02.24)测试用
        //登陆成功,生成发放jwt
        if(emp!=null){
            //System.out.println(emp.getUsername()+','+emp.getPassword());
            Map<String,Object> claims = new HashMap<>();
            claims.put("id",emp.getId());
            claims.put("name",emp.getName());
            claims.put("username",emp.getUsername()); //about:这里选哪些属性作为claims暂时不需要太纠结
            String jwt = jwtUtils.generateJWT(claims);
            //System.out.println(jwt);
            //return Result.success(jwt);  //(03.02 为配合前端返回用户信息注释,改写新的.)
            ArrayList<String> ret = new ArrayList<>();
            ret.add(jwt);ret.add(emp.getName());ret.add(emp.getId());
            return Result.success(ret);
        }
        //登陆失败
        return Result.error("アカウントまたはパスワードをご確認ください");
    }

    /*
     *  员工全体查询
     */
    @GetMapping("/Employees/")
    public Result getAll(){
        //log.info("查询全员工");
        List<Employee> empList = employeeService.getAll();
        return Result.success(empList);
    }
    /*
        员工按id查询(variable写法)
     */
    @GetMapping("/Employees/{id}")
    public Result getById(@PathVariable String id){
        Employee res = employeeService.getById(id);
        return Result.success(res);
    }
    /*
        员工按id查询(param写法)报错未解决
    */
//    @GetMapping("/Employees")
//    public Result getById(@RequestParam(defaultValue="1") String id){
//        Employee res = employeeService.getById(id);
//        if(res==null){
//            Result.error("Employee not found with id:"+ id);
//        }
//        return Result.success(res);
//    }
    /*
        员工分页查询(1/3)-手工完成
     */
    @GetMapping("/EmployeeByPage")
    public Result getByPage(@RequestParam(defaultValue="1") int page,
                            @RequestParam(defaultValue="5") int range){
        Page empList = employeeService.page(page,range);
        return Result.success(empList);
    }
    /*
        员工分页查询(2/3)-pageHelper插件完成
     */
    @GetMapping("/emp_by_pagehelper")
    public Result getByPageHelper(@RequestParam(defaultValue="1") int page,
                                  @RequestParam(defaultValue="5") int range){
        Page empList = employeeService.getPageByHelper(page,range);
        return Result.success(empList);
    }
    /*
        员工分页查询(3/3)-多重条件分页查询
     */
    @GetMapping("/emp_by_multi") //由多个查询条件限制的分页查询，包含字符模糊匹配
    public Result getByMulti(@RequestParam(defaultValue="1") int page,
                             @RequestParam(defaultValue="5") int range,
                             String name,
                             Character gender,  //@RequestParam(defaultValue="f")
                             @DateTimeFormat(pattern="yyyy-MM-dd")LocalDate beginTime,
                             @DateTimeFormat(pattern="yyyy-MM-dd")LocalDate endTime
    ){
        Page empList = employeeService.getPageByMulti(page,range,name,gender,beginTime,endTime);  //,beginTime,endTime
        return Result.success(empList);
    }

    /*
        员工新增
     */
    @PostMapping("/newEmployee")
    public Result addEmployee(@RequestBody Employee emp){
        employeeService.addEmployee(emp);
        return Result.success();
    }

    /*
        员工修改
     */
    @PutMapping("/updateEmp")
    public Result updateEmp(@RequestBody Employee emp){
        employeeService.updateEmp(emp);
        return Result.success();
    }

    /*
        员工单个删除
        @pathvariable 是一种restful风格的写法 需要的参数注解
        只能注解1个参数 通常用来作为 资源标识符如用户id
     */
    @DeleteMapping("/delete_by_id/{id}")
    public Result deleteById(@PathVariable String id){
        log.info("注销单个用户,id:",id);
        employeeService.deleteById(id);
        return Result.success();
    }
    /*
        员工批量删除
     */
    @DeleteMapping("/delete_by_multi_ids/{ids}")
    public Result deleteByMultiIds(@PathVariable List<String> ids){
        log.info("注销复数个用户,ids:",ids);
        employeeService.deleteByMultiIds(ids);
        return Result.success();
    }
}
