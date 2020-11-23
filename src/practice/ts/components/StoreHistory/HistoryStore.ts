interface IHistroyItem {
  url: string;
  timestamp: Date;
  title: string;
}

interface IHistoryItems {
  [id: string]: IHistroyItem;
}

class HistoryList {
  private storage: IHistoryItems;

  constructor() {
    this.storage = {};
  }

  get getHistory(): IHistoryItems {
    return this.storage;
  }

  getHistoryItem(id: string): IHistroyItem {
    return this.storage[id];
  }

  setHistoryItem({
    id,
    url,
    title,
  }: {
    id: number;
    url: string;
    title: string;
  }) {
    this.storage[id] = {
      url,
      title,
      timestamp: new Date(),
    };
  }
}

export default HistoryList;
