import React from "react";
import { getTask,deleteTask } from "../api/TaskApi";

import { Card, Col, Row,Button } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';


function MainComponent() {

  const [task, setTask] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getTask();
      console.log("Fetched Datam:", response);
      setTask(response.tasks)
      
    } catch (error){
        throw error
    }
  };


  const handleDeleteTask = async (taskId) => {
    console.log("Deleting Task with IDs:", taskId);
    console.log("Data Type of tasks:", typeof tasks);
    try {
      await deleteTask(taskId);
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };  
  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div>
          <Row gutter={16}>
            {task && task.map(task => (
                <Col span={8} key={task._id} className="card">
                    <Card title={<>
                                {task.title}
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    style={{color:'green',marginLeft:'70px'}}
                                    
                                >
                                    Güncelle
                                </Button>
                                <Button
                                    danger
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    style={{color:'red'}} 
                                    onClick={() => handleDeleteTask(task._id)}
                                >
                                    Sil
                                </Button>
                            </>} bordered={false} className="card-title">
                        <div className="task-description">{task.description}</div>
                        <div className="task-date">{task.created_at}</div>
                    </Card>
                </Col>
            ))

            }
            
        </Row>
      
        </div>
      );
}



export default MainComponent;