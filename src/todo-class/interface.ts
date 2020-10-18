export interface ICreateTodo {
  title: string;
  status: "todo" | "doing" | "done";
  dueDate: Date;
  priority: 1 | 2 | 3;
}

export interface ITodoStatus extends ICreateTodo {
  created: Date;
  edited: Date;
}

export interface IUpdateItem {
  title?: string;
  status?: "todo" | "doing" | "done";
  dueDate?: Date;
  priority?: 1 | 2 | 3;
}

export interface ITodoList {
  [id: number]: ITodoStatus;
}

export interface ITodo {
  add(todoItem: ICreateTodo): void;
  update(id: number, updateItem: IUpdateItem): void;
  delete(id: number): void;
}
