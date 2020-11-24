import Storage from "./HistoryStore";

interface IHistoryManagerProps {
  formElem: HTMLFormElement;
  inputElem: HTMLInputElement;
  historyListElem: HTMLUListElement;
  historyStore: Storage;
}

class HistoryManager {
  private formElem: HTMLFormElement;
  private inputElem: HTMLInputElement;
  private historyListElem: HTMLUListElement;
  private historyStore: Storage;
  private id: number;

  constructor({
    formElem,
    inputElem,
    historyListElem,
    historyStore,
  }: IHistoryManagerProps) {
    this.formElem = formElem;
    this.inputElem = inputElem;
    this.historyListElem = historyListElem;
    this.historyStore = historyStore;
    this.id = 0;
  }

  attachEventToAddHistory() {
    this.formElem.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const userInput = this.inputElem.value;
      this.id += 1;

      this.historyStore.setHistory({
        id: this.id,
        url: userInput,
        title: this.id + userInput, // 타이틀 임시 방편
      });

      this.renderHistory();
    });
  }

  renderHistory() {
    Object.values(this.historyStore.getHistory).forEach(({ url, title }) => {
      const liElem = document.createElement("li");
      liElem.innerText = `${title}: ${url}`;
      this.historyListElem.appendChild(liElem);
    });
  }
}

export default HistoryManager;
