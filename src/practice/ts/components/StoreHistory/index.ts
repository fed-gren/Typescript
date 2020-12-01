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
  }
}

export default StoreHistory;
