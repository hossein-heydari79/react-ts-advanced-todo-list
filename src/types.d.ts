export type modalMode = "add" | "view" | "edit" | "delete";
export type status = "done" | "todo" | "doing";
export type priority = "low" | "medium" | "high";
export type deadlineFilter = "overdue" | "forToday" | "forFuture" | "all";
export interface ITask {
  id: number;
  task: string;
  status: status | "status";
  priority: priority | "priority";
  deadline: Date;
  details?: string;
}
export interface IFilter {
  status: status | "all";
  priority: priority | "all";
  deadline: deadlineFilter;
}
export interface IOrder {
  status: number;
  priority: number;
  deadline: number;
}
