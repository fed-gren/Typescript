import { classNames } from "./constants";

interface history {
  url: string;
  timestamp: string;
  title: string;
  match?: RegExpExecArray;
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
    this.showLoading();
    await this.fetchHistoryItems();
    this.attachEvent();
    this.setHistoryArray();
    this.showAllHistories();
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
      if (this.inputElement.value === "") {
        this.showAllHistories();
      } else {
        const matchedHistories = this.getSearchKeywordMatchedHistories(this.inputElement.value);

        if (matchedHistories.length === 0) this.showNoMatchedHistory();
        else this.showMatchedHistories(matchedHistories);
      }
    });
  }

  getSearchKeywordMatchedHistories(keyword: string) {
    const regexOption = "i";
    const regex = new RegExp(`${keyword}`, regexOption);

    /**
     * TODO:
     * regex.exec를 두번 실행하는 로직 수정해야함.
     * 현재는 map 콜백 안에서 검사하면 return array의 타입이 null[]이 될 수 있어 오류 발생함.
     */
    return this.historyArray
      .filter(({ title }) => regex.exec(title))
      .map(history => {
        const execArray = regex.exec(history.title) as RegExpExecArray;

        history.match = execArray;
        return history;
      });
  }

  setHistoryArray() {
    this.historyArray = [...Object.values(this.historyJson)];
  }

  showAllHistories() {
    this.renderHistory(this.historyArray);
  }

  showMatchedHistories(matchedHistories: history[]) {
    this.renderHistory(matchedHistories);
  }

  renderHistory(historyArray: history[]) {
    this.listElement.innerHTML = "";

    historyArray.forEach(history => {
      const itemElement = document.createElement("li");

      itemElement.classList.add(classNames.HISTORY_ITEM);
      itemElement.textContent = history.title;
      this.listElement.appendChild(itemElement);
    });
  }

  showLoading() {
    this.listElement.innerHTML = `<div class="loading">데이터 불러오는 중...</div>`;
  }

  showNoMatchedHistory() {
    this.listElement.innerHTML = `<div class="no-match">검색 결과가 없습니다.</div>`;
  }
}