import "./Header.styles.css";
import { FaTasks, FaFilter } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { Form } from "react-bootstrap";

interface IHeader {
  showDrawer: Function;
  showModal: Function;
  setModalMode: Function;
  search: string;
  setSearch: Function;
}

const Header: React.FC<IHeader> = ({
  showDrawer,
  showModal,
  setModalMode,
  search,
  setSearch,
}) => {
  const openDrawer = () => showDrawer(true);
  const openModal = () => {
    showModal(true);
    setModalMode("add");
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <header className="d-flex align-items-center justify-content-between px-2">
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-cnter me-2">
          <FaTasks color="#ffffff" size="1.5rem" />
        </div>
        <div>
          <h4 className="text-white">My To-Do Tasks</h4>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Form.Control
          type="text"
          placeholder="Search"
          className="search me-3"
          value={search}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
        <FaFilter
          size="2rem"
          color="#ffffff"
          className="filter me-3"
          onClick={openDrawer}
        />
        <MdAddBox
          size="2.5rem"
          color="#ffffff"
          className="add"
          onClick={openModal}
        />
      </div>
    </header>
  );
};
export default Header;
