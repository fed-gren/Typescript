import { classNames } from "./constants";

interface history {
  url: string;
  timestamp: string;
  title: string;
}

interface histories {
  [key: string]: history;
}


export default class SearchHistory {
  private baseElement: HTMLElement;
  private inputElement: HTMLInputElement;
  private listElement: HTMLUListElement;
  private listItemElement: HTMLLIElement;
  private historyJson: histories;
  private historyArray: history[];

  constructor(baseElement: HTMLElement) {
    this.baseElement = baseElement;
    this.listElement = this.baseElement.querySelector(`.${classNames.HISTORY_LIST}`) as HTMLUListElement;
    this.inputElement = this.baseElement.querySelector(`.${classNames.SEARCH_INPUT}`) as HTMLInputElement;
    this.listItemElement = this.baseElement.querySelector(`.${classNames.HISTORY_ITEM}`) as HTMLLIElement;
    this.historyJson = {};
    this.historyArray = [];

    this.init();
  }

  async init() {
    await this.fetchHistoryItems();
    this.attachEvent();
    this.setHistoryArray();
    this.render(this.historyArray);
  }

  async fetchHistoryItems() {
    /**
     * TODO: 지금은 mock api에서 가져오지만 추후엔 local storage에서 가져와야 함
     */
    await fetch("http://localhost:8080/history")
      .then(response => response.json())
      .then(historyJson => {
        this.historyJson = historyJson;
      });
  }

  attachEvent() {
    this.inputElement.addEventListener("keyup", (event) => {
      // value를 기반으로 매칭 되는 애들만 따로 찾기
      // 매칭되는 애들만 render
      // input value가 없으면 전체 노출
      const matchedHistories = this.getSearchKeywordMatchedHistories(this.inputElement.value);
    });
  }

  getSearchKeywordMatchedHistories(keyword: string) {
    const regexOption = "gi";
    const regex = new RegExp(`${keyword}`, regexOption);

    return this.historyArray
      .map(({ title }) => regex.exec(title))
      .filter(history => history);
  }

  setHistoryArray() {
    this.historyArray = [...Object.values(this.historyJson)];
  }

  render(historyArray: history[]) {
    // 현재 보여줘야 할 애들을 보여줌.
    // setList에서 historyArray를 기반으로 하듯이.
    // history 배열을 받아서 만들어 보여주기.
    historyArray.forEach(history => {
      const itemElement = document.createElement("li");

      itemElement.classList.add(classNames.HISTORY_ITEM);
      itemElement.textContent = history.title;
      this.listElement.appendChild(itemElement);
    });
  }
}