interface IHistroy {
  url: string;
  timestamp: Date;
  title: string;
}

interface IHistories {
  [id: string]: IHistroy;
}

interface ISetHistoryArgs {
  id: number;
  url: string;
  title: string;
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

  setHistory({ id, url, title }: ISetHistoryArgs) {
    this.storage[id] = {
      url,
      title,
      timestamp: new Date(),
    };
  }
}

export default HistoryList;
