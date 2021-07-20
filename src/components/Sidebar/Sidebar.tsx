import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { IFilter } from "../../types";

interface ISidebar {
  show: boolean;
  setShow: Function;
  filters: IFilter;
  setFilters: Function;
}

const Sidebar: React.FC<ISidebar> = ({
  show,
  setShow,
  filters,
  setFilters,
}) => {
  const handleHide = () => setShow(false);
  const handleChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  return (
    <Offcanvas show={show} onHide={handleHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form.Label>Priority:</Form.Label>
        <Form.Select
          aria-label="Priority"
          className="mb-3"
          name="priority"
          onChange={(e) => {
            handleChange(e);
          }}
          value={filters.priority}
        >
          <option value={"low"}>Low</option>
          <option value={"medium"}>Medium</option>
          <option value={"high"}>High</option>
          <option value={"all"}>All</option>
        </Form.Select>
        <Form.Label>Status:</Form.Label>
        <Form.Select
          aria-label="Status"
          className="mb-3"
          name="status"
          onChange={(e) => {
            handleChange(e);
          }}
          value={filters.status}
        >
          <option value={"todo"}>Todo</option>
          <option value={"doing"}>Doing</option>
          <option value={"done"}>Done</option>
          <option value={"all"}>All</option>
        </Form.Select>
        <Form.Label>Deadline:</Form.Label>
        <Form.Select
          aria-label="Deadline"
          name="deadline"
          onChange={(e) => {
            handleChange(e);
          }}
          value={filters.deadline}
        >
          <option value={"overdue"}>Overdue</option>
          <option value={"forToday"}>For Today</option>
          <option value={"forFuture"}>For the Future</option>
          <option value={"all"}>All</option>
        </Form.Select>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;
