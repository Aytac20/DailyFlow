import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../slices/tasksApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const NewTaskModal = ({ showModal, setShowModal, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [priority, setPriority] = useState(taskToEdit?.priority || "medium");
  const [category, setCategory] = useState(taskToEdit?.category || "personal");
  const [dueDate, setDueDate] = useState(
    taskToEdit?.dueDate?.slice(0, 10) || ""
  );
  // Update form fields when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "medium");
      setCategory(taskToEdit.category || "personal");
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.slice(0, 10) : "");
    } else {
      // Reset form if no taskToEdit (new task)
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("personal");
      setDueDate("");
    }
  }, [taskToEdit]);
  const handleClose = () => setShowModal(false);

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      priority,
      category,
      dueDate,
    };

    try {
      if (taskToEdit) {
        await updateTask({ id: taskToEdit._id, ...taskData }).unwrap();
        toast.success("Task updated successfully");
      } else {
        await createTask(taskData).unwrap();
        toast.success("Task created successfully");
      }

      // Reset the form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("personal");
      setDueDate("");

      handleClose();
    } catch (err) {
      console.error("Failed to submit task:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "Add New Task"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task details"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low" className="bg-green-400">
                Low
              </option>
              <option value="medium" className="bg-yellow-400">
                Medium
              </option>
              <option value="high" className="bg-red-400">
                High
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="home">Home</option>
              <option value="school">School</option>
              <option value="health">Health</option>
              <option value="tech">Tech</option>
              <option value="leisure">Leisure</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {taskToEdit ? "Update Task" : "Add Task"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewTaskModal;
