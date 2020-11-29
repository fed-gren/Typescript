import SearchHistory from "./SearchHistory";
import "../css/tab.css";

const classNames = {
  TAB_ROOT: "tab-root",
  TAB: "tab",
  CONTENT: "content",
  SELECTED: "selected",
  SEARCH_HISTORY: "search-history"
};

const getSelector = (className: string) => `.${className}`;

const createTab = (tabRootElement: HTMLElement) => {
  const { TAB, CONTENT, SELECTED } = classNames;
  const tabElements = Array.from(tabRootElement.querySelectorAll(getSelector(TAB)));
  const contentElements = Array.from(tabRootElement.querySelectorAll(getSelector(CONTENT)));

  const checkTargetIsTabElement = (target: HTMLElement, index: number) => target !== null && index >= 0;
  const hideAllContents = () => {
    contentElements.forEach(contentElement => contentElement.classList.add("hide"));
  }
  const showContent = (contentElement: Element) => contentElement.classList.remove("hide");

  const showMatchedContent = (evt: Event) => {
    const target = evt.target as HTMLElement;
    const targetIndex = tabElements.indexOf(target);

    if (!checkTargetIsTabElement(target, targetIndex)) return;
    evt.preventDefault();

    tabElements.forEach(tabElement => tabElement.classList.remove(SELECTED));
    target.classList.add(SELECTED);
    hideAllContents();
    showContent(contentElements[targetIndex]);
  }

  tabRootElement.addEventListener("click", showMatchedContent);
}

const rootElement = document.querySelector(getSelector(classNames.TAB_ROOT)) as HTMLElement;
const searchHistoryElement = document.querySelector(getSelector(classNames.SEARCH_HISTORY)) as HTMLElement;

createTab(rootElement);

const searchHistory = new SearchHistory(searchHistoryElement);