interface IHistroy {
  url: string;
  timestamp: Date;
  title: string;
}

interface IHistories {
  [id: string]: IHistroy;
}

class HistoryList {
  private storage: IHistories;

  constructor() {
    this.storage = {};
  }

  get getHistory(): IHistories {
    return this.storage;
  }

  getHistoryItem(id: string): IHistroy {
    return this.storage[id];
  }

  setHistory({ id, url, title }: { id: number; url: string; title: string }) {
    this.storage[id] = {
      url,
      title,
      timestamp: new Date(),
    };
  }
}

export default HistoryList;
