import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import deleteIcon from './delete-button-svgrepo-com.svg'
import editIcon from './edit-square-svgrepo-com.svg'

import UserService from "../services/user.service";
import { Route, Link } from "react-router-dom";
import Popupedit from "./manage_task_popup_edit.js";


const Managetask = (props) => {
  const [data, setData] = useState([
    {
      id: 0,
      Task_name: 'dafault',
      Term: 0,
      Desc: 'dafault',
      Pass: 0,
      Task_data_table_name: 'dafault',
      Task_data_table_schema: 'dafault',
    }
  ]);
  const [task_to_detail, setTask_to_detail] = useState('default');
  const onClickTask_to_detail = (value) => {
    setTask_to_detail(value);
  };

  const confirm = (value) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => delete_task(value)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const delete_task = (Task_name) => {
    UserService.delete_task(Task_name).then(
      (response) => {
        UserService.get_task().then(
          (response) => {
            let i = 0;
            while(i < response.length){
              response[i].id = i+1;
              i = i+1;
            }
            setData(response);
            console.log(response);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            alert(resMessage);
          }
        );
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
  };
  
  const columns=[
    {
      header: 'id',
      key: 'id',
      td: (data) => <div>{data.id}</div>,
    },
    {
      header: 'Task name',
      key: 'Task_name',
      td: (data) => <div>{data.Task_name}</div>,
    },
    {
      header: 'term',
      key: 'Term',
      td: (data) => <div>{data.Term}</div>,
    },
    {
      header: 'desc',
      key: 'Desc',
      td: (data) => <div>{data.Desc}</div>,
    },
    {
      header: 'Pass',
      key: 'Pass',
      td: (data) => <div>{data.Pass}</div>,
    },
    {
      header: 'data table name',
      key: 'Task_data_table_name',
      td: (data) => <div>{data.Task_data_table_name}</div>,
    },
    {
      header: 'data table schema',
      key: 'Task_data_table_schema',
      td: (data) => <div>{data.Task_data_table_schema}</div>,
    },
    {
      header: 'Action',
      key: 'Action',
      td: (data) => 
      <div>
        <Link to={`${props.match.url}/popup_edit`}>
        <img
              src={editIcon}
              width='30'
              height='20'
              // onClick={()=>props.history.push('/popup_edit', 
              // {Task_name: data.Task_name })}
              onClick={()=>{onClickTask_to_detail(data.Task_name)}}
            />
        </Link>{'    '}
        <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={()=>{confirm(data.Task_name)}}
            />
      </div>,
    },
  ]

  useEffect(() => {
    UserService.get_task().then(
      (response) => {
        if (response.length === 0){
          setData([{
            id: 'Empty',
            Task_name: 'Empty',
            Term: 'Empty',
            Desc: 'Empty',
            Pass: 'Empty',
            Task_data_table_name: 'Empty',
            Task_data_table_schema: 'Empty'
          }])
        }
        else{
          let i = 0;
          while(i < response.length){
            response[i].id = i+1;
            i = i+1;
          }
          setData(response);
          console.log(response);
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
  },[]);


  return (
    <div className='white'>
      <ReactFlexyTable data={data} columns={columns} filterable nonFilterCols={["Action"]} globalSearch />
        <Route
          path={`${props.match.url}/popup_edit`}
          render={() => {
            return (
              <Popupedit
                onClick={() => {
                  props.history.push(props.match.url);
                }}
                value={task_to_detail}
              />
            );
          }}
        />
    </div>
  );
};

export default Managetask;