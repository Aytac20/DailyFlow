import React from "react";
import { Col, Row } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import Task from "../component/Task";
import NewTaskModal from "../component/NewTaskModal";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../slices/tasksApiSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { useSelector } from "react-redux";
const TasksScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  const handleToggleComplete = async (task) => {
    try {
      await updateTask({
        id: task._id,
        completed: !task.completed,
      }).unwrap();
    } catch (error) {
      console.error("Failed to toggle complete:", error);
    }
  };
  const [deleteTask] = useDeleteTaskMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id).unwrap();
      } catch (err) {
        console.error("Failed to delete task", err);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="xl:w-[85%] mx-auto ">
          <Row>
            <h1 className="mb-4">✨Hi {userInfo.name} ! Your tasks</h1>
            <div className="bg-white flex justify-between items-center py-2 px-4  rounded-md shadow-sm ">
              <span>Add new task...</span>
              <button onClick={() => setShowModal(!showModal)}>
                <CiCirclePlus className="text-[2rem] hover:text-green-500 duration-300 transition-colors" />
              </button>
            </div>
            <NewTaskModal
              showModal={showModal}
              setShowModal={setShowModal}
              taskToEdit={taskToEdit}
            />
          </Row>
          <Row className="mt-4 flex flex-wrap">
            {[...tasks]
              .sort((a, b) => a.completed - b.completed)
              .map((task) => (
                <Col key={task._id} sm={12} md={6} lg={4} className="flex">
                  <div className="flex-1">
                    <Task
                      task={task}
                      onEdit={() => {
                        setTaskToEdit(task);
                        setShowModal(true);
                      }}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDelete}
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}{" "}
    </>
  );
};

export default TasksScreen;
