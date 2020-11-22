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

  constructor(baseElement: HTMLElement) {
    this.baseElement = baseElement;
    this.listElement = this.baseElement.querySelector(`.${classNames.HISTORY_LIST}`) as HTMLUListElement;
    this.inputElement = this.baseElement.querySelector(`.${classNames.SEARCH_INPUT}`) as HTMLInputElement;
    this.listItemElement = this.baseElement.querySelector(`.${classNames.HISTORY_ITEM}`) as HTMLLIElement;
    this.historyJson = {};

    this.init();
  }

  async init() {
    await this.fetchHistoryItems();
    this.setList();
  }

  setList() {
    /**
     * history list 밑에 li 템플릿으로 추가
     */
    [...Object.values(this.historyJson)].forEach(history => {
      const itemElement = document.createElement("li");

      itemElement.classList.add(classNames.HISTORY_ITEM);
      itemElement.textContent = history.title;
      this.listElement.appendChild(itemElement);
    });
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
}