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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Todo = /** @class */ (function () {
    function Todo() {
        this.todoList = {};
        this.id = 0;
        this.input = document.querySelector("input");
        this.button = document.querySelector("button");
        this.form = document.querySelector("form");
        this.todoItems = document.querySelector(".todo-items");
        this.addEvent();
    }
    Todo.prototype.addEvent = function () {
        var _this = this;
        this.form.addEventListener("submit", function (evt) {
            evt.preventDefault();
            // evt.stopPropagation();
            // todo: priority 설정 기능 추가
            _this.add({
                title: _this.input.value,
                status: "todo",
                dueDate: new Date(),
                priority: 3
            });
            _this.render();
        });
    };
    Todo.prototype.render = function () {
        this.todoItems.innerHTML = "";
        for (var key in this.todoList) {
            var _a = this.todoList[key], created = _a.created, priority = _a.priority, status_1 = _a.status, title = _a.title;
            var item = document.createElement("li");
            item.innerText = "created: " + created + " priority: " + priority + " status: " + status_1 + " title: " + title;
            this.todoItems.insertAdjacentElement("beforeend", item);
        }
    };
    Todo.prototype.add = function (todoItem) {
        var date = new Date();
        this.todoList[this.id++] = __assign(__assign({}, todoItem), { created: date, edited: date });
    };
    Todo.prototype.update = function (id, updateItem) {
        var todo = this.todoList[id];
        if (!todo)
            throw new Error();
        this.todoList[id] = __assign(__assign(__assign({}, todo), updateItem), { edited: new Date() });
    };
    Todo.prototype["delete"] = function (id) {
        var todo = this.todoList[id];
        if (!todo)
            throw new Error();
        delete this.todoList[id];
    };
    Todo.prototype.print = function () {
        console.log(this.todoList);
    };
    return Todo;
}());
new Todo();
