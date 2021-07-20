import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import moment from "jalali-moment";
import { ITask } from "../../types";

interface ITableRow {
  taskId: number;
  taskName: string;
  taskPriority: string;
  taskStatus: string;
  taskDeadline: Date;
  taskDetails?: string;
  setModalMode: Function;
  setIsModalOpen: Function;
  taskUsedId: number;
  setTaskUsedId: Function;
  formValue: ITask;
  setFormValue: Function;
}

const TableRow: React.FC<ITableRow> = ({
  taskId,
  taskName,
  taskPriority,
  taskStatus,
  taskDeadline,
  setModalMode,
  setIsModalOpen,
  taskDetails,
  taskUsedId,
  setTaskUsedId,
  setFormValue,
}) => {
  const convertedDeadline = moment(taskDeadline)
    .locale("fa")
    .format("YYYY/MM/DD");

  const handleDelete = (id: number) => {
    setModalMode("delete");
    setIsModalOpen(true);
    setTaskUsedId(id);
  };

  const handleEdit = (id: number) => {
    setFormValue({
      id: taskId,
      task: taskName,
      status: taskStatus,
      priority: taskPriority,
      deadline: taskDeadline,
      details: taskDetails,
    });
    setModalMode("edit");
    setIsModalOpen(true);
    setTaskUsedId(id);
  };

  const handleView = (id: number) => {
    setFormValue({
      id: taskId,
      task: taskName,
      status: taskStatus,
      priority: taskPriority,
      deadline: taskDeadline,
      details: taskDetails,
    });
    setModalMode("view");
    setIsModalOpen(true);
    setTaskUsedId(id);
  };

  return (
    <tr>
      <td>{taskName}</td>
      <td className="text-center">
        <span
          className={
            "badge rounded-pill " +
            (taskPriority === "high"
              ? "bg-danger text-white"
              : taskPriority === "medium"
              ? "bg-warning text-white"
              : "bg-light text-dark")
          }
        >
          {taskPriority}
        </span>
      </td>
      <td className="text-center">
        <span
          className={
            "badge rounded-pill " +
            (taskStatus === "todo"
              ? "bg-danger"
              : taskStatus === "doing"
              ? "bg-warning"
              : "bg-success")
          }
        >
          {taskStatus}
        </span>
      </td>
      <td className="text-center">
        <span className="border border-info rounded-pill small py-1 px-2">
          {convertedDeadline}
        </span>
      </td>
      <td className="d-flex justify-content-center">
        <Button
          variant="danger"
          size="sm"
          className="d-flex align-items-center justify-content-center me-1"
          onClick={() => {
            handleDelete(taskId);
          }}
        >
          <MdDelete size="1rem" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center justify-content-center me-1"
          onClick={() => handleEdit(taskId)}
        >
          <MdEdit size="1rem" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="d-flex align-items-center justify-content-center me-1"
          onClick={() => handleView(taskId)}
        >
          <MdRemoveRedEye size="1rem" />
        </Button>
      </td>
    </tr>
  );
};
export default TableRow;
