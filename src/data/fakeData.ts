import { ITask } from "../types";

const data: ITask[] = [
  {
    id: 1,
    task: "help mom",
    status: "todo",
    priority: "high",
    deadline: new Date("2020-02-14"),
  },
  {
    id: 2,
    task: "go shopping",
    status: "todo",
    priority: "medium",
    deadline: new Date("2021-07-19"),
  },
  {
    id: 3,
    task: "sleep",
    status: "doing",
    priority: "high",
    deadline: new Date("2021-07-18"),
  },
  {
    id: 4,
    task: "go restaurant",
    status: "done",
    priority: "low",
    deadline: new Date("2021-08-17"),
  },
  {
    id: 5,
    task: "do dishes",
    status: "todo",
    priority: "medium",
    deadline: new Date("2021-08-24"),
  },
  {
    id: 6,
    task: "do homework",
    status: "doing",
    priority: "high",
    deadline: new Date("2021-07-24"),
  },
  {
    id: 7,
    task: "meet friends",
    status: "todo",
    priority: "low",
    deadline: new Date("2021-07-27"),
  },
];
export default data;
