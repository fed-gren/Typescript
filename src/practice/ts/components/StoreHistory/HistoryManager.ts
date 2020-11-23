import Storage from "./HistoryStore";

class AddHistory {
  private formElem: HTMLFormElement;
  private inputElem: HTMLInputElement;
  private storageContainer: HTMLUListElement;
  private storage: Storage;
  private id: number;

  constructor(
    formElem: HTMLFormElement,
    inputElem: HTMLInputElement,
    storageContainer: HTMLUListElement,
    storage: Storage
  ) {
    this.formElem = formElem;
    this.inputElem = inputElem;
    this.storageContainer = storageContainer;
    this.storage = storage;
    this.id = 0;
  }

  addUrlInHistory() {
    this.formElem.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const userInput = this.inputElem.value;
      this.id += 1;

      this.storage.setHistoryItem({
        id: this.id,
        url: userInput,
        title: this.id + userInput, // 타이틀 임시 방편
      });
    });
  }

  renderHistory() {
    Object.values(this.storage).forEach(({ url, title }) => {
      const liElem = document.createElement("li");
      liElem.innerText = `${title}: ${url}`;
      this.storageContainer.appendChild(liElem);
    });
  }
}
