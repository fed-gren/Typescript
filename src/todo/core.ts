/**
 * 여긴 모듈
 * todo 상태를 만들어주는 함수 만들 거임 (추가 시에 활용)
 */

import { ITodoList, ICreateTodo, IUpdateItem } from "./interface";

let id = 0;

export const addTodo = (
  todoList: ITodoList,
  todoItem: ICreateTodo
): boolean => {
  const newId = ++id;
  const item = {
    ...todoItem,
    created: new Date(),
    edited: new Date(),
  };

  todoList[newId] = item;

  return true;
};

export const updateTodo = (
  id: number,
  todoList: ITodoList,
  updateItem: IUpdateItem
): boolean => {
  if (!todoList[id]) return false;

  const item = {
    ...todoList[id],
    ...updateItem,
    edited: new Date(),
  };

  todoList[id] = item;

  return true;
};

export const removeTodo = (id: number, todoList: ITodoList): boolean => {
  if (!todoList[id]) return false;
  delete todoList[id];
  return true;
};
