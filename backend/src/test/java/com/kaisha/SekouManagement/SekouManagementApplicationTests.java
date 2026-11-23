//package com.kaisha.SekouManagement;
//
//import com.kaisha.SekouManagement.mapper.EmployeeMapper;
//import com.kaisha.SekouManagement.pojo.Employee;
//import com.kaisha.SekouManagement.utils.JwtUtils;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@SpringBootTest
//class SekouManagementApplicationTests {
//
//	@Autowired
//	private EmployeeMapper empMapper;
//
//	@Test
//	public void testGetAll() {
//		List<Employee> res = empMapper.getAll();
//		System.out.println(res.toString());
//	}
//
//	@Test
//	public void floatorint(){
//		System.out.println(1.0/0.0); //Infinity
//	}
//
//	@Test
//	public void inttoshort(){
//		int i=32777;  //2^15+9;
//		short s=(short)i;
//		System.out.println(s); //-2^15+9;
//	}
//
//	@Test
//	public void getJWT(){
//		Map<String,Object> claims = new HashMap<>();
//		claims.put("id",'2');
//		claims.put("name","Bach");
//		claims.put("username","bach"); //about:这里选哪些属性作为claims暂时不需要太纠结
//		String jwt = JwtUtils.generateJWT(claims);
//		System.out.println(jwt);
//	}
//}
