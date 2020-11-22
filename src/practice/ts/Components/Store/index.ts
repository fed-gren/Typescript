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

class Store {
  private storeHistoryContainer: HTMLElement;
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private historyStorage: HTMLUListElement;

  constructor() {
    this.storeHistoryContainer = document.querySelector(
      ".store-history"
    ) as HTMLElement;
    this.form = this.storeHistoryContainer.querySelector(
      "form"
    ) as HTMLFormElement;
    this.input = this.storeHistoryContainer.querySelector(
      ".history-input"
    ) as HTMLInputElement;
    this.historyStorage = this.storeHistoryContainer.querySelector(
      ".history-storage"
    ) as HTMLUListElement;
  }
}
