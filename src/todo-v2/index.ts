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

/**
 * 클래스 ts 구조
 * 1. 멤버변수 선언
 *   - model(todoList)
 *   - id
 *   - input
 *   - button
 *   - form
 *   - todoItems
 *
 * (v2)2. Element dom 초기화 / 이벤트 등록
 *
 * 2. 생성자 함수 인자랑 내용 작성
 *   - 인자는 없음.
 *   - 내용도 없음. -> 객체를 생성하면서 해줘야할 작업이 없다.
 * 3. 각 기능을 할 메서드 작성
 *   - add
 *     - IAdd
 *   - update
 *     - IUpdate
 *   - delete
 *     - IDelete
 */
interface ICreateTodo {
  title: string;
  status: "todo" | "doing" | "done";
  dueDate: Date;
  priority: 1 | 2 | 3;
}
interface ITodoStatus extends ICreateTodo {
  created: Date;
  edited: Date;
}
interface IUpdateItem {
  title?: string;
  status?: "todo" | "doing" | "done";
  dueDate?: Date;
  priority?: 1 | 2 | 3;
}
interface ITodoList {
  [id: number]: ITodoStatus;
}
interface ITodo {
  add(todoItem: ICreateTodo): void;
  update(id: number, updateItem: IUpdateItem): void;
  delete(id: number): void;
}

class Todo implements ITodo {
  private todoList: ITodoList = {};
  private id = 0;
  private input = (document.querySelector("input") as HTMLInputElement);
  private button = (document.querySelector("button") as HTMLButtonElement);
  private form = (document.querySelector("form") as HTMLFormElement);
  private todoItems = (document.querySelector(".todo-items") as HTMLDivElement);

  constructor() {
    this.addEvent();
  }

  addEvent() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // evt.stopPropagation();

      // todo: priority 설정 기능 추가
      this.add({
        title: this.input.value,
        status: "todo",
        dueDate: new Date(),
        priority: 3,
      });
      this.render();
    });
  }

  render() {
    this.todoItems.innerHTML = "";

    for (const key in this.todoList) {
      const { created, priority, status, title } = this.todoList[key];
      const item = document.createElement("li");
      item.innerText = `created: ${created} priority: ${priority} status: ${status} title: ${title}`
      this.todoItems.insertAdjacentElement("beforeend", item);
    }
  }

  add(todoItem: ICreateTodo) {
    const date = new Date();

    this.todoList[this.id++] = {
      ...todoItem,
      created: date,
      edited: date,
    };
  }

  update(id: number, updateItem: IUpdateItem) {
    const todo = this.todoList[id];

    if (!todo) throw new Error();

    this.todoList[id] = { ...todo, ...updateItem, edited: new Date() };
  }

  delete(id: number) {
    const todo = this.todoList[id];

    if (!todo) throw new Error();

    delete this.todoList[id];
  }

  print() {
    console.log(this.todoList);
  }
}

new Todo();