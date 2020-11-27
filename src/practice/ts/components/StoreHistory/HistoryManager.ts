import Storage from "./HistoryStore";

interface IHistoryManagerProps {
  formElem: HTMLFormElement;
  urlInputElem: HTMLInputElement;
  titleInputElem: HTMLInputElement;
  historyListElem: HTMLUListElement;
  historyStore: Storage;
}

class HistoryManager {
  private formElem: HTMLFormElement;
  private urlInputElem: HTMLInputElement;
  private titleInputElem: HTMLInputElement;
  private historyListElem: HTMLUListElement;
  private historyStore: Storage;
  private id: number;

  constructor({
    formElem,
    urlInputElem,
    titleInputElem,
    historyListElem,
    historyStore,
  }: IHistoryManagerProps) {
    this.formElem = formElem;
    this.urlInputElem = urlInputElem;
    this.titleInputElem = titleInputElem;
    this.historyListElem = historyListElem;
    this.historyStore = historyStore;
    this.id = 0;
  }

  attachEventToAddHistory() {
    this.formElem.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const url = this.urlInputElem.value;
      const title = this.titleInputElem.value;
      console.log(url);
      console.log(title);
      this.id += 1;

      this.historyStore.setHistory({
        id: this.id,
        url,
        title,
      });

      this.renderHistory();
      this.urlInputElem.value = "";
      this.urlInputElem.value = "";
    });
  }

  renderHistory() {
    this.historyListElem.innerHTML = "";
    Object.values(this.historyStore.getHistory).forEach(({ url, title }) => {
      const liElem = document.createElement("li");
      liElem.innerText = `${title}: ${url}`;
      this.historyListElem.appendChild(liElem);
    });
  }
}

export default HistoryManager;
