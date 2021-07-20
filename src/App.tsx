import { useState } from "react";
import Header from "./components/Header/Header";
import ModalComponent from "./components/ModalComponent/ModalComponent";
import Sidebar from "./components/Sidebar/Sidebar";
import TableComponent from "./components/TableComponent/TableComponent";
import { IFilter, ITask, modalMode } from "./types";
import "./App.css";
import data from "./data/fakeData";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<modalMode>("add");
  const [formValue, setFormValue] = useState<ITask>({
    id: 0,
    task: "",
    status: "status",
    priority: "priority",
    deadline: new Date(),
    details: "",
  });
  const [tasks, setTasks] = useState<ITask[]>(data);
  const [taskUsedId, setTaskUsedId] = useState<number>(0);
  const [filters, setFilters] = useState<IFilter>({
    status: "all",
    priority: "all",
    deadline: "all",
  });
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Header
        showDrawer={setIsDrawerOpen}
        showModal={setIsModalOpen}
        setModalMode={setModalMode}
        search={search}
        setSearch={setSearch}
      />
      <TableComponent
        tasks={tasks}
        setModalMode={setModalMode}
        setIsModalOpen={setIsModalOpen}
        taskUsedId={taskUsedId}
        setTaskUsedId={setTaskUsedId}
        formValue={formValue}
        setFormValue={setFormValue}
        filters={filters}
        searchString={search}
      />
      <Sidebar
        show={isDrawerOpen}
        setShow={setIsDrawerOpen}
        filters={filters}
        setFilters={setFilters}
      />
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalMode={modalMode}
        formValue={formValue}
        setFormValue={setFormValue}
        tasks={tasks}
        setTasks={setTasks}
        taskUsedId={taskUsedId}
      />
    </>
  );
}

export default App;
