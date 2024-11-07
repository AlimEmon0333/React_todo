import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import AppsIcon from '@mui/icons-material/Apps';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./App.css";

const actions = [
  { icon: <DeleteIcon />, name: 'Delete' },
  { icon: <EditNoteIcon />, name: 'Edit Todo' },
  { icon: <DoneAllIcon />, name: 'Mark as completed' },
  { icon: <LabelImportantIcon />, name: 'Mark as Important' },
];
function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [taskIndexToEdit, setTaskIndexToEdit] = useState(null);
  const [showTaskOptions, setShowTaskOptions] = useState(true);
  const [filter, setFilter] = useState("all");
  const handleAddTask = (e) => {
    e.preventDefault();
    if (currentTask !== '') {
      setTasks([...tasks, { currentTask: currentTask, completed: false, important: false }]);
      setCurrentTask('');
    }
  }
  const handleDeleteTask = (id) => {
    tasks.splice(id, 1)
    setTasks([...tasks])
  }
  const handleEditTask = (index) => {
    setShowTaskOptions(false);
    setTaskIndexToEdit(index);
    setEditTask(tasks[index].currentTask); // Set the current task being edited
  };
  const handleEditChange = (e) => {
    setEditTask(e.target.value);
  };
  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndexToEdit ? { ...task, currentTask: editTask } : task
    );
    setTasks(updatedTasks);
    resetEditMode(); // Reset edit mode states
  };
  const resetEditMode = () => {
    setTaskIndexToEdit(null);
    setEditTask('');
    setShowTaskOptions(true);
  };
  const handleMarkAsComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const handleMarkAsImportant = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };
  console.log(filter)

  return (
    <div className="background bg-[#003431] h-[100vh] flex justify-center items-center">
      <div className="currentTask-form bg-[#c6fff2] h-[80vh] w-[40%] rounded-lg shadow-lg overflow-auto">
        <div>
          <h1 className="ms-3 my-2 text-[#003431] font-bold text-2xl flex items-center gap-3  ">
            <AppRegistrationIcon sx={{ fontSize: "50px" }} /> Todo-List
          </h1>
        </div>

        <div className=" flex items-center justify-center">
          <div className="mt-3 me-2 ms-5 w-full">
            <TextField id="standard-basic" label="Add Todo" variant="standard" color="primary" className="w-full" sx={{
              '& label.Mui-focused': { color: '#003431' }, // Label color when focused
              '& .MuiInput-underline:before': { borderBottomColor: '#003431' }, // Default underline color
              '& .MuiInput-underline:after': { borderBottomColor: '#003431' }, // Underline color when focused
            }} value={currentTask} onChange={(e) => setCurrentTask(e.target.value)} />
          </div>
          <div className="mt-6 me-3">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#003431',
                '&:hover': {
                  backgroundColor: '#002821', // Darker shade for hover effect
                },
                borderRadius: "9999px"
              }}
              onClick={handleAddTask}
            >
              <AddIcon />
            </Button>
          </div>
        </div>
        <div className='flex justify-around items-center my-3'>
          <div class="flex items-center px-2 border border-[#003431] rounded-full ">
            <input onChange={() => setFilter("all")} id="bordered-radio-1" type="radio" name="bordered-radio" class="w-4 h-4 text-[#003431] bg-gray-100 border-gray-300 cursor-pointer" />
            <label for="bordered-radio-1" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 ">All Tasks</label>
          </div>
          <div class="flex items-center px-2 border border-[#003431] rounded-full ">
            <input onChange={() => setFilter("completed")} id="bordered-radio-2" type="radio" name="bordered-radio" class="w-4 h-4 text-[#003431] bg-gray-100 border-gray-300 cursor-pointer" />
            <label for="bordered-radio-2" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 " >Completed Tasks</label>
          </div>
          <div class="flex items-center px-2 border border-[#003431] rounded-full ">
            <input onChange={() => setFilter("important")} id="bordered-radio-3" type="radio" name="bordered-radio" class="w-4 h-4 text-[#003431] bg-gray-100 border-gray-300 cursor-pointer" />
            <label for="bordered-radio-3" class="w-full py-2 ms-2 text-sm font-medium text-gray-900">Important Tasks</label>
          </div>
        </div>

        <div className="mt-5">
          {filter == "all" &&
            tasks.map((x, i) => {
              return (
                <div key={i} className="flex justify-between items-center h-[70px]">
                  {taskIndexToEdit === i ?
                    <div className='flex items-center mx-4 gap-2 w-full'>
                      <TextField id="standard-basic" label="Update Todo" variant="standard" color="primary" className="w-full" sx={{
                        '& label.Mui-focused': { color: '#003431' }, // Label color when focused
                        '& .MuiInput-underline:before': { borderBottomColor: '#003431' }, // Default underline color
                        '& .MuiInput-underline:after': { borderBottomColor: '#003431' }, // Underline color when focused
                      }} onChange={handleEditChange} value={editTask} />
                      <Button variant="contained"
                        sx={{
                          backgroundColor: '#003431',
                          '&:hover': {
                            backgroundColor: '#002821', // Darker shade for hover effect
                          },
                          borderRadius: "9999px"
                        }} onClick={handleUpdateTask} >
                        <CheckIcon />
                      </Button>
                    </div>
                    :
                    <div className={`${x.important ? "flex justify-center items-center" : ""}`}>

                      <h2 className={`ms-5 text-[#003431] text-xl font-bold ${x.completed ? "line-through" : ""} `}>{x.currentTask}</h2>
                      {x.important ? <LabelImportantIcon sx={{ color: "#003431" }} /> : ""}
                    </div>
                  }
                  {
                    showTaskOptions &&
                    <Box sx={{ height: 10, transform: 'translateZ(0px)', flexGrow: 1 }}>
                      <SpeedDial
                        direction='left'
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', right: 16, width: '100%', height: '100%' }}
                        icon={<AppsIcon />}
                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                              if (action.name === 'Delete') handleDeleteTask(i); // Call handleDeleteTask with the task's index
                              if (action.name === 'Edit Todo') handleEditTask(i); // Call handleDeleteTask with the task's index
                              if (action.name === 'Mark as completed') handleMarkAsComplete(i); // Call handleDeleteTask with the task's index
                              if (action.name === 'Mark as Important') handleMarkAsImportant(i); // Call handleDeleteTask with the task's index
                            }}
                          />
                        ))}
                      </SpeedDial>
                    </Box>
                  }
                </div>
              )
            })
          }
          {filter === "completed" && tasks.filter((task) => task.completed).map((x, i) => {
            return (
              <div key={i} className="flex justify-between items-center h-[70px]">
                {taskIndexToEdit === i ?
                  <div className='flex items-center mx-4 gap-2 w-full'>
                    <TextField id="standard-basic" label="Update Todo" variant="standard" color="primary" className="w-full" sx={{
                      '& label.Mui-focused': { color: '#003431' }, // Label color when focused
                      '& .MuiInput-underline:before': { borderBottomColor: '#003431' }, // Default underline color
                      '& .MuiInput-underline:after': { borderBottomColor: '#003431' }, // Underline color when focused
                    }} onChange={handleEditChange} value={editTask} />
                    <Button variant="contained"
                      sx={{
                        backgroundColor: '#003431',
                        '&:hover': {
                          backgroundColor: '#002821', // Darker shade for hover effect
                        },
                        borderRadius: "9999px"
                      }} onClick={handleUpdateTask} >
                      <CheckIcon />
                    </Button>
                  </div>
                  :
                  <div className={`${x.important ? "flex justify-center items-center" : ""}`}>

                    <h2 className={`ms-5 text-[#003431] text-xl font-bold ${x.completed ? "line-through" : ""} `}>{x.currentTask}</h2>
                    {x.important ? <LabelImportantIcon sx={{ color: "#003431" }} /> : ""}
                  </div>
                }
                {
                  showTaskOptions &&
                  <Box sx={{ height: 10, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                      direction='left'
                      ariaLabel="SpeedDial basic example"
                      sx={{ position: 'absolute', right: 16, width: '100%', height: '100%' }}
                      icon={<AppsIcon />}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={() => {
                            if (action.name === 'Delete') handleDeleteTask(i); // Call handleDeleteTask with the task's index
                            if (action.name === 'Edit Todo') handleEditTask(i); // Call handleDeleteTask with the task's index
                            if (action.name === 'Mark as completed') handleMarkAsComplete(i); // Call handleDeleteTask with the task's index
                            if (action.name === 'Mark as Important') handleMarkAsImportant(i); // Call handleDeleteTask with the task's index
                          }}
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                }
              </div>
            )
          })}
          {filter === "important" && tasks.filter((task) => task.important).map((x, i) => {
            return (
              <div key={i} className="flex justify-between items-center h-[70px]">
                {taskIndexToEdit === i ?
                  <div className='flex items-center mx-4 gap-2 w-full'>
                    <TextField id="standard-basic" label="Update Todo" variant="standard" color="primary" className="w-full" sx={{
                      '& label.Mui-focused': { color: '#003431' }, // Label color when focused
                      '& .MuiInput-underline:before': { borderBottomColor: '#003431' }, // Default underline color
                      '& .MuiInput-underline:after': { borderBottomColor: '#003431' }, // Underline color when focused
                    }} onChange={handleEditChange} value={editTask} />
                    <Button variant="contained"
                      sx={{
                        backgroundColor: '#003431',
                        '&:hover': {
                          backgroundColor: '#002821', // Darker shade for hover effect
                        },
                        borderRadius: "9999px"
                      }} onClick={handleUpdateTask} >
                      <CheckIcon />
                    </Button>
                  </div>
                  :
                  <div className={`${x.important ? "flex justify-center items-center" : ""}`}>

                    <h2 className={`ms-5 text-[#003431] text-xl font-bold ${x.completed ? "line-through" : ""} `}>{x.currentTask}</h2>
                    {x.important ? <LabelImportantIcon sx={{ color: "#003431" }} /> : ""}
                  </div>
                }
                {
                  showTaskOptions &&
                  <Box sx={{ height: 10, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                      direction='left'
                      ariaLabel="SpeedDial basic example"
                      sx={{ position: 'absolute', right: 16, width: '100%', height: '100%' }}
                      icon={<AppsIcon />}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={() => {
                            if (action.name === 'Delete') handleDeleteTask(i); // Call handleDeleteTask with the task's index
                            if (action.name === 'Edit Todo') handleEditTask(i); // Call handleDeleteTask with the task's index
                            if (action.name === 'Mark as completed') handleMarkAsComplete(i); // Call handleDeleteTask with the task's index
                            if (action.name === 'Mark as Important') handleMarkAsImportant(i); // Call handleDeleteTask with the task's index
                          }}
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                }
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;

