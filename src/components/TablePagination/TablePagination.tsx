import { Form } from "react-bootstrap";
import "./TablePagination.styles.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ITask } from "../../types";
import { useEffect } from "react";

interface ITablePagination {
  tablePages: number;
  setTablePages: Function;
  filteredTasks: ITask[];
  setFilteredTasks: Function;
  pageItemsCount: number;
  setPageItemsCount: Function;
  currentPageNumber: number;
  setCurrentPageNumber: Function;
  fromItem: number;
  setFromItem: Function;
  toItem: number;
  setToItem: Function;
  setLimitedTasks: Function;
}

const TablePagination: React.FC<ITablePagination> = ({
  tablePages,
  filteredTasks,
  setFilteredTasks,
  pageItemsCount,
  setPageItemsCount,
  currentPageNumber,
  setCurrentPageNumber,
  fromItem,
  setFromItem,
  toItem,
  setToItem,
  setLimitedTasks,
}) => {
  const handleChange = (e: any) => {
    setPageItemsCount(+e.target.value);
  };

  const goNextPage = () => {
    if (tablePages > currentPageNumber)
      setCurrentPageNumber(currentPageNumber + 1);
    else return;
  };

  const goPrevPage = () => {
    if (currentPageNumber <= 1) return;
    else setCurrentPageNumber(currentPageNumber - 1);
  };

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [tablePages, setCurrentPageNumber]);

  useEffect(() => {
    setFromItem(pageItemsCount * (currentPageNumber - 1) + 1);

    if (currentPageNumber === tablePages) setToItem(filteredTasks.length);
    else if (pageItemsCount === 0) setToItem(filteredTasks.length);
    else setToItem(pageItemsCount * currentPageNumber);
  }, [
    filteredTasks.length,
    pageItemsCount,
    currentPageNumber,
    tablePages,
    setToItem,
    setFromItem,
  ]);

  useEffect(() => {
    pageItemsCount === 0 && setLimitedTasks(filteredTasks);
  }, [pageItemsCount, setFilteredTasks, filteredTasks, setLimitedTasks]);

  return (
    <div className="d-flex justify-content-end align-items-center pe-3">
      <Form.Label className="me-1 mb-0">Rows per page:</Form.Label>
      <Form.Select
        className="row-select me-4"
        name="rows"
        defaultValue={5}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={0}>All</option>
      </Form.Select>
      <p className="mb-0 me-4">
        {fromItem}-{toItem} of {filteredTasks.length}
      </p>
      <div className="d-flex align-items-center">
        <FaAngleLeft
          color="#000000"
          className="arrows me-4"
          onClick={goPrevPage}
        />
        <FaAngleRight color="#000000" className="arrows" onClick={goNextPage} />
      </div>
    </div>
  );
};

export default TablePagination;
