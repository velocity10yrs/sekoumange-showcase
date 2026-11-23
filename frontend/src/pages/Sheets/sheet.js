import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './sheet.module.scss';
// import axios from 'axios';

import useFetchEmps from './useFetchEmps';

const SheetModule = () => {
  //const [employees,setEmployees] = useState([]);npm 
  const [formData, setFormData] = useState({ name: '', age: '' });/*这是给表格html的*/

  const [rows, setRows] = useState([]);

  let [inputId,setInputId] = useState();      //中间量
  let [inputName,setInputName] = useState();  //中间量
  let [inputDateStt,setInputDateStt] = useState();
  let [inputDateEnd,setInputDateEnd] = useState();

  let [queryId,setQueryId] = useState(-1);     //用来传的
  let [queryName,setQueryName] = useState('');//用来传的
  let [queryDateStt,setQueryDateStt] = useState();
  let [queryDateEnd,setQueryDateEnd] = useState();


  let {emps, error} = useFetchEmps(queryId,queryName,queryDateStt,queryDateEnd);
  if(error) return <h4>Error:{error}</h4>
  if(!rows) return <h4>data loading...</h4>

  //hand in query_id from input
  const getInputValue_id = (e)=>{
    //let dom=document.getElementsByClassName('queryId');
    //console.log(e)
    //let query_id=e.value;console.log(query_id)
    //setQueryId(query_id);
    setInputId(e.target.value); //cgpt的solution
  }
  const getInputValue_name = (e)=>{
    setInputName(e.target.value);
  }
  const getInputValue_date_stt = (e)=>{
    //console.log(e)
    setInputDateStt(e.target.value);
    //setInputDateEnd(e.target.value);
  }
  const getInputValue_date_end = (e)=>{
    //console.log(e)
    //setInputDateStt(e.target.value);
    setInputDateEnd(e.target.value);
  }

  // const submitInputValue_id = ()=>{
  //   console.log(inputId);
  //   setQueryId(inputId);
  // }
  // const submitInputValue_name = ()=>{
  //   console.log(inputName);
  //   setQueryName(inputName);
  // }
  const submitInputValue = ()=>{
    // console.log(inputId);
    // console.log(inputName);
    // console.log(inputDateStt);
    // console.log(inputDateEnd);

    setQueryId(inputId);
    setQueryName(inputName);
    setQueryDateStt(inputDateStt);
    setQueryDateEnd(inputDateEnd);
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Add a new row
  // const addRow = (e) => {
  //   e.preventDefault();
  //   if (formData.name && formData.age) {
  //     setRows([...rows, { id: rows.length + 1, ...formData }]);
  //     setFormData({ name: '', age: '' }); // Clear form
  //   }
  // };
  // Delete a row
  // const deleteRow = (id) => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  //make a request through axios
    // useEffect(()=>{
    //   axios
    //   .get("http://127.0.0.1:8080/Employees")
    //   .then((response)=>{console.log(response);setRows(response.data.data)})//多.data是因为后端res实体类多封装了一层
    //   .catch((err)=>{setError(err.message)})
    // },[])

  if(error){
    return <h4>Error:{error}</h4>;
  }

  return (
    <div className={`container mt-5 ${styles.box}`}>
      <h3 className={`text-center mb-4 ${styles.header}`} style={{fontSize:"3em"}}>検索リスト</h3>
      
      <div className={`inputer ${styles.inputer}`}>
        <input type='number' placeholder='検索id入力' style={{width:"6em"}} onChange={getInputValue_id}></input>
        <input type='text' placeholder='名前入力' style={{width:"6em"}} onChange={getInputValue_name}></input>
         
        <button onClick={submitInputValue}>query</button>
        <br/>
        <input type='date' placeholder='範囲時間入力' onChange={getInputValue_date_stt}></input> 
        <span>から</span>
        <input type='date' placeholder='範囲時間入力' onChange={getInputValue_date_end}></input> 
        <span>まで</span>
      </div>
           
      <table className={`table table-bordered table-striped ${styles.table}`}>
        <thead className="table-dark">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Age</th>
            <th>gender</th>
            <th>occupation</th>
            <th>department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(emps.length !== 0)&& emps.map((row,index) => (
            row ? <tr key={row.id||index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.gender}</td>
              <td>{row.occupation}</td>
              <td>{row.department}</td>
              {/* <td>
                <button
                  className={`btn btn-danger btn-sm ${styles.btnDanger}`}
                  onClick={() => deleteRow(row.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr> : null
          ))}
          {emps.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <form onSubmit={addRow} className="row g-2">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            Add Row
          </button>
        </div>
      </form> */}

    </div>
  );
};

export default SheetModule;
