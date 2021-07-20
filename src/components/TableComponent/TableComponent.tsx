import "./Table.styles.css";
import { Table } from "react-bootstrap";
import TableRow from "../TableRow/TableRow";
import { useEffect, useState } from "react";
import { IFilter, IOrder, ITask } from "../../types";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import TablePagination from "../TablePagination/TablePagination";

interface ITable {
  tasks: ITask[];
  setModalMode: Function;
  setIsModalOpen: Function;
  taskUsedId: number;
  setTaskUsedId: Function;
  formValue: ITask;
  setFormValue: Function;
  filters: IFilter;
  searchString: string;
}

const TableComponent: React.FC<ITable> = ({
  tasks,
  setModalMode,
  setIsModalOpen,
  taskUsedId,
  setTaskUsedId,
  formValue,
  setFormValue,
  filters,
  searchString,
}) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);
  const [tablePages, setTablePages] = useState<number>(1);
  const [pageItemsCount, setPageItemsCount] = useState<number>(5);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [fromItem, setFromItem] = useState<number>(
    pageItemsCount * (currentPageNumber - 1) + 1
  );
  const [toItem, setToItem] = useState<number>(
    tablePages === currentPageNumber
      ? filteredTasks.length
      : pageItemsCount * currentPageNumber
  );
  const [limitedTasks, setLimitedTasks] = useState<ITask[]>([]);
  const [sortList, setSortList] = useState<IOrder>({
    status: 0,
    priority: 0,
    deadline: 0,
  });
  const [isPriorityMouseHover, setIsPriorityMouseHover] =
    useState<boolean>(false);
  const [isStatusMouseHover, setIsStatusMouseHover] = useState<boolean>(false);
  const [isDeadlineMouseHover, setIsDeadlineMouseHover] =
    useState<boolean>(false);

  const handleSorting = (e: any) => {
    const name: string = e.currentTarget.name;
    switch (name) {
      case "priority":
        setSortList({
          status: 0,
          deadline: 0,
          priority: sortList.priority !== 2 ? sortList.priority + 1 : 0,
        });
        break;
      case "status":
        setSortList({
          status: sortList.status !== 2 ? sortList.status + 1 : 0,
          deadline: 0,
          priority: 0,
        });
        break;
      case "deadline":
        setSortList({
          status: 0,
          deadline: sortList.deadline !== 2 ? sortList.deadline + 1 : 0,
          priority: 0,
        });
        break;
    }
  };

  const handleMouseHover = (e: any) => {
    const name: string = e.target.name;
    switch (name) {
      case "priority":
        setIsPriorityMouseHover(true);
        break;
      case "status":
        setIsStatusMouseHover(true);
        break;
      case "deadline":
        setIsDeadlineMouseHover(true);
        break;
    }
  };
  const handleMouseOut = (e: any) => {
    const name: string = e.target.name;
    switch (name) {
      case "priority":
        setIsPriorityMouseHover(false);
        break;
      case "status":
        setIsStatusMouseHover(false);
        break;
      case "deadline":
        setIsDeadlineMouseHover(false);
        break;
    }
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    filteredTasks.sort((a, b) => {
      if (sortList.priority !== 0) {
        switch (sortList.priority) {
          case 1:
            if (a.priority === "high" && b.priority === "high") return 0;
            if (a.priority === "high" && b.priority === "medium") return -1;
            if (a.priority === "high" && b.priority === "low") return -1;
            if (a.priority === "medium" && b.priority === "low") return -1;
            if (a.priority === "medium" && b.priority === "medium") return 0;
            if (a.priority === "medium" && b.priority === "high") return 1;
            if (a.priority === "low" && b.priority === "high") return 1;
            if (a.priority === "low" && b.priority === "medium") return 1;
            if (a.priority === "low" && b.priority === "low") return 0;
            break;
          case 2:
            if (a.priority === "high" && b.priority === "high") return 0;
            if (a.priority === "high" && b.priority === "medium") return 1;
            if (a.priority === "high" && b.priority === "low") return 1;
            if (a.priority === "medium" && b.priority === "low") return 1;
            if (a.priority === "medium" && b.priority === "medium") return 0;
            if (a.priority === "medium" && b.priority === "high") return -1;
            if (a.priority === "low" && b.priority === "high") return -1;
            if (a.priority === "low" && b.priority === "medium") return -1;
            if (a.priority === "low" && b.priority === "low") return 0;
            break;
        }
      }

      if (sortList.status !== 0) {
        switch (sortList.status) {
          case 1:
            if (a.status === "doing" && b.status === "doing") return 0;
            if (a.status === "doing" && b.status === "todo") return -1;
            if (a.status === "doing" && b.status === "done") return -1;
            if (a.status === "todo" && b.status === "done") return -1;
            if (a.status === "todo" && b.status === "todo") return 0;
            if (a.status === "todo" && b.status === "doing") return 1;
            if (a.status === "done" && b.status === "doing") return 1;
            if (a.status === "done" && b.status === "todo") return 1;
            if (a.status === "done" && b.status === "done") return 0;
            break;
          case 2:
            if (a.status === "doing" && b.status === "doing") return 0;
            if (a.status === "doing" && b.status === "todo") return 1;
            if (a.status === "doing" && b.status === "done") return 1;
            if (a.status === "todo" && b.status === "done") return 1;
            if (a.status === "todo" && b.status === "todo") return 0;
            if (a.status === "todo" && b.status === "doing") return -1;
            if (a.status === "done" && b.status === "doing") return -1;
            if (a.status === "done" && b.status === "todo") return -1;
            if (a.status === "done" && b.status === "done") return 0;
            break;
        }
      }

      if (sortList.deadline !== 0) {
        switch (sortList.deadline) {
          case 1:
            if (a.deadline.getTime() > b.deadline.getTime()) return -1;
            if (a.deadline.getTime() < b.deadline.getTime()) return 1;
            if (a.deadline.getTime() === b.deadline.getTime()) return 0;
            break;
          case 2:
            if (a.deadline.getTime() > b.deadline.getTime()) return 1;
            if (a.deadline.getTime() < b.deadline.getTime()) return -1;
            if (a.deadline.getTime() === b.deadline.getTime()) return 0;
            break;
        }
      } else {
        return 0;
      }
      return -10;
    });
  }, [sortList, filteredTasks]);

  useEffect(() => {
    setLimitedTasks(filteredTasks);
  }, [filteredTasks]);

  useEffect(() => {
    setTablePages(Math.ceil(filteredTasks.length / pageItemsCount));
  }, [filteredTasks.length, pageItemsCount]);

  useEffect(() => {
    const filteredAndSearchedItems = tasks
      .filter((item) => {
        if (filters.status === "all") return true;
        if (item.status === filters.status) return true;
        return false;
      })
      .filter((item) => {
        if (filters.priority === "all") return true;
        if (filters.priority === item.priority) return true;
        return false;
      })
      .filter((item) => {
        let deadlineStatus = filters.deadline;
        const deadlineMilliSeconds = item.deadline.setHours(0, 0, 0, 0);
        const todayMilliSeconds = new Date(Date.now()).setHours(0, 0, 0, 0);
        switch (deadlineStatus) {
          case "all":
            return true;
          case "forFuture":
            return deadlineMilliSeconds > todayMilliSeconds && true;
          case "forToday":
            return deadlineMilliSeconds === todayMilliSeconds && true;
          case "overdue":
            return deadlineMilliSeconds < todayMilliSeconds && true;
        }
        return false;
      })
      .filter((item) => item.task.includes(searchString));

    setFilteredTasks(filteredAndSearchedItems);
  }, [filters, tasks, searchString, sortList]);

  useEffect(() => {
    setLimitedTasks(() =>
      filteredTasks.filter(
        (item, index) => index + 1 <= toItem && index + 1 >= fromItem
      )
    );
  }, [filteredTasks, fromItem, toItem]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task</th>
            <th className="text-center order">
              Priority
              {sortList.priority === 0 ? (
                <button
                  name="priority"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    handleMouseHover(e);
                  }}
                  onMouseLeave={(e) => handleMouseOut(e)}
                >
                  <AiOutlineArrowDown
                    color={isPriorityMouseHover ? "#9d9d9d" : "#ffffff"}
                  />
                </button>
              ) : sortList.priority === 1 ? (
                <button
                  name="priority"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <AiOutlineArrowDown color="#000000" />
                </button>
              ) : (
                <button
                  name="priority"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <AiOutlineArrowUp color="#000000" />
                </button>
              )}
            </th>
            <th className="text-center order">
              Status
              {sortList.status === 0 ? (
                <button
                  name="status"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    handleMouseHover(e);
                  }}
                  onMouseLeave={(e) => handleMouseOut(e)}
                >
                  <AiOutlineArrowDown
                    color={isStatusMouseHover ? "#9d9d9d" : "#ffffff"}
                  />
                </button>
              ) : sortList.status === 1 ? (
                <button
                  name="status"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <AiOutlineArrowDown color="#000000" />
                </button>
              ) : (
                <button
                  name="status"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <AiOutlineArrowUp color="#000000" />
                </button>
              )}
            </th>
            <th className="text-center order">
              Deadline
              {sortList.deadline === 0 ? (
                <button
                  name="deadline"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    handleMouseHover(e);
                  }}
                  onMouseLeave={(e) => handleMouseOut(e)}
                >
                  <AiOutlineArrowDown
                    color={isDeadlineMouseHover ? "#9d9d9d" : "#ffffff"}
                  />
                </button>
              ) : sortList.deadline === 1 ? (
                <button
                  name="deadline"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <AiOutlineArrowDown color="#000000" />
                </button>
              ) : (
                <button
                  name="deadline"
                  onClick={(e) => handleSorting(e)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <AiOutlineArrowUp color="#000000" />
                </button>
              )}
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {limitedTasks.length !== 0 ? (
            limitedTasks.map((limitedTask) => (
              <TableRow
                key={limitedTask.id}
                taskId={limitedTask.id}
                taskName={limitedTask.task}
                taskStatus={limitedTask.status}
                taskPriority={limitedTask.priority}
                taskDeadline={limitedTask.deadline}
                taskDetails={limitedTask.details}
                setModalMode={setModalMode}
                setIsModalOpen={setIsModalOpen}
                taskUsedId={taskUsedId}
                setTaskUsedId={setTaskUsedId}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            ))
          ) : (
            <tr className="no-task">
              <td colSpan={5}>No matching item found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <TablePagination
        tablePages={tablePages}
        setTablePages={setTablePages}
        filteredTasks={filteredTasks}
        setFilteredTasks={setFilteredTasks}
        pageItemsCount={pageItemsCount}
        setPageItemsCount={setPageItemsCount}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        fromItem={fromItem}
        setFromItem={setFromItem}
        toItem={toItem}
        setToItem={setToItem}
        setLimitedTasks={setLimitedTasks}
      />
    </>
  );
};

export default TableComponent;
