import { Modal, Button, Form } from "react-bootstrap";
import { ITask, modalMode } from "../../types";
import { DatePicker } from "jalali-react-datepicker";
import "./Modal.styles.css";

interface IModal {
  modalMode: modalMode;
  setIsModalOpen: Function;
  isModalOpen: boolean;
  formValue: ITask;
  setFormValue: Function;
  tasks: ITask[];
  setTasks: Function;
  taskUsedId: number;
}

const ModalComponent: React.FC<IModal> = ({
  setIsModalOpen,
  isModalOpen,
  modalMode,
  formValue,
  setFormValue,
  tasks,
  setTasks,
  taskUsedId,
}) => {
  const handleChange = (e: any) => {
    setFormValue({
      ...formValue,
      id: Date.now(),
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e: any) => {
    const date = new Date(e.value);
    setFormValue({
      ...formValue,
      ["deadline"!]: date,
    });
  };

  const handleSave = () => {
    setTasks([...tasks, formValue]);
    setFormValue({
      id: 0,
      task: "",
      status: "status",
      priority: "priority",
      deadline: new Date(),
      details: "",
    });
    closeModal();
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setIsModalOpen(false);
  };

  const handleEdit = (id: number, formValue: ITask) => {
    setTasks(tasks.map((task) => (task.id === id ? formValue : task)));
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValue({
      id: 0,
      task: "",
      status: "status",
      priority: "priority",
      deadline: new Date(),
      details: "",
    });
  };
  if (modalMode !== "delete") {
    return (
      <Modal size="lg" centered show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton={modalMode === "view" ? true : false}>
          <Modal.Title>
            {modalMode === "add"
              ? "New Task"
              : modalMode === "edit"
              ? "Edit Task"
              : "View Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Task Name"
            readOnly={modalMode === "view" ? true : false}
            className="mb-5"
            name="task"
            value={formValue.task}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="mb-5 w-100 d-flex justify-content-between align-items-center">
            <div className="middle-form">
              <Form.Select
                aria-label="Priority"
                name="priority"
                value={formValue.priority}
                onChange={(e) => {
                  handleChange(e);
                }}
                disabled={modalMode === "view" ? true : false}
              >
                <option>Priority</option>
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
              </Form.Select>
            </div>
            <div className="middle-form">
              <Form.Select
                aria-label="Status"
                name="status"
                value={formValue.status}
                onChange={(e) => {
                  handleChange(e);
                }}
                disabled={modalMode === "view" ? true : false}
              >
                <option>Status</option>
                <option value={"todo"}>Todo</option>
                <option value={"doing"}>Doing</option>
                <option value={"done"}>Done</option>
              </Form.Select>
            </div>
            <div className="middle-form">
              <DatePicker
                label="Deadline"
                className="date-picker"
                timePicker={false}
                value={formValue.deadline}
                onClickSubmitButton={(e) => {
                  handleDateChange(e);
                }}
              />
            </div>
          </div>
          <Form.Control
            readOnly={modalMode === "view" ? true : false}
            placeholder="Details (Optional)"
            as="textarea"
            rows={3}
            name="details"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formValue.details}
          />
        </Modal.Body>
        {modalMode !== "view" && (
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="outline-primary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={
                modalMode === "add"
                  ? handleSave
                  : () => handleEdit(taskUsedId, formValue)
              }
            >
              Save
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    );
  } else {
    return (
      <Modal size="lg" centered show={isModalOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this task?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="outline-primary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete(taskUsedId)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalComponent;
