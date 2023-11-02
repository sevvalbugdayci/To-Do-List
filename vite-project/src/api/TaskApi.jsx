import axios from "axios";

const API_URL = "http://localhost:3009";

export const getTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

export const createTask = async (newTask) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, newTask);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  console.log("Deleting Task with ID:", taskId);
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    console.log("Delete Response:", response);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Error deleting task: " + response.statusText);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
