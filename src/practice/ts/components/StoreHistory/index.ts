/**
 * 필요 기능
 * 1. url을 입력 가능한 input 추가
 * 2. 추가된 url이 시간순서대로 위에서 아래로 쌓임
 */

/**
 * 구조
 * 1. 전체적으로 관리하는 root class (기능 구현 포함)
 * 2. history url들을 관리하는 class
 * 3. ui 담당하는 class
 */

import HistoryManager from "./HistoryManager";
import HistoryStore from "./HistoryStore";

class StoreHistory {
  private storeHistoryRootElem: HTMLElement;
  private formElem: HTMLFormElement;
  private urlInputElem: HTMLInputElement;
  private titleInputElem: HTMLInputElement;
  private historyListElem: HTMLUListElement;
  private historyStore: HistoryStore;
  private historyManager: HistoryManager;

  constructor(rootStoreHistoryElem: HTMLElement) {
    this.storeHistoryRootElem = rootStoreHistoryElem;
    this.formElem = this.storeHistoryRootElem.querySelector(
      "form"
    ) as HTMLFormElement;
    this.urlInputElem = this.storeHistoryRootElem.querySelector(
      ".history-input-url"
    ) as HTMLInputElement;
    this.titleInputElem = this.storeHistoryRootElem.querySelector(
      ".history-input-title"
    ) as HTMLInputElement;
    this.historyListElem = this.storeHistoryRootElem.querySelector(
      ".history-storage"
    ) as HTMLUListElement;
    this.historyStore = new HistoryStore();
    this.historyManager = new HistoryManager({
      formElem: this.formElem,
      urlInputElem: this.urlInputElem,
      titleInputElem: this.titleInputElem,
      historyListElem: this.historyListElem,
      historyStore: this.historyStore,
    });

    this.init();
  }

  init() {
    this.historyManager.attachEventToAddHistory();
  }
}

export default StoreHistory;
