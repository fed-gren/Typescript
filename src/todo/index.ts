/**
 * 구현할 기능
 *  todo 추가
 *  todo 편집
 *  todo 삭제
 *
 *  doing 추가
 *  doing 편집
 *  doing 삭제
 *
 *  done 추가
 *  done 편집
 *  done 삭제
 *
 * todo 상태 (todo, doing, done)
 *
 * 우선순위, 등록 날짜, 목표 날짜
 * 수정 날짜
 * 목표 날짜 수정
 * 우선 순위 수정
 *
 *
 * 필요한 상태 항목
 * title
 * status (todo, doing, done)
 * created
 * edited
 * due date
 * priority
 */

// 모듈 작성

import { addTodo, updateTodo, removeTodo } from "./core";
import { ITodoList } from "./interface";

const todoList: ITodoList = {};

addTodo(todoList, {
  title: "밥먹기",
  status: "todo",
  dueDate: new Date(),
  priority: 3,
});

console.log(todoList);

updateTodo(1, todoList, {
  status: "doing",
});

console.log(todoList);

removeTodo(1, todoList);

console.log(todoList);
