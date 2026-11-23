package com.kaisha.SekouManagement.mapper;

import com.kaisha.SekouManagement.pojo.Employee;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Mapper
@Repository
public interface EmployeeMapper {

    @Select("select * from Employee")
    public List<Employee> getAll();

    @Insert("insert into Employee(username,password,name,age,gender,department,occupation,entry_date,create_time,update_time)"
            +"values(#{username},#{password},#{name},#{age},#{gender},#{department},#{occupation},#{entryDate},#{createTime},#{updateTime})")
            //+"values('Perry','perry','perry',40,'f','Capital','Singer',now(),now(),now())")
    public void insert(Employee emp);

    @Select("select * from Employee limit #{start},#{range}")
    public List<Employee> getByPage(int start, int range);

    @Select("select count(*) from Employee ")
    public int count();

    //使用xml映射查询时没有注释
    public List<Employee> getPageByMulti(String name, Character gender, LocalDate beginTime, LocalDate endTime); //, LocalDate beginTime, LocalDate endTime

    @Delete("delete from Employee where id=#{id}")
    public void deleteById(String id);

    @Select("select * from Employee where id=#{id}")
    Employee getById(String id);

    //使用xml
    void deleteByMultiIds(List<String> ids);

    void updateEmp(Employee emp);

    //登陆用核对账密 (02.24 表名首字母改大写)
    @Select("select * from Employee where username=#{username} and password=#{password}") //注意这里可以直接解构emp实体类里的字段,不用写逻辑
    Employee getByUsernameAndPassword(Employee loginUser);
}
