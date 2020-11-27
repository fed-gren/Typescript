import "../css/tab.css";
import StoreHistory from "./components/StoreHistory";

/**
 * tab 기능 구현
 *
 * 각 tab 버튼을 클릭하면 해당 tab을 표시해준다.
 * 각 tab 버튼을 클릭하면 각 관련된 컨텐츠를 표시한다. (index로 구분)
 */

const classNames = {
  TAB_ROOT: "tab-root",
  TAB: "tab",
  CONTENT: "content",
  SELECTED: "selected",
  STORE_HISTORY: "store-history",
};

const getSelector = (className: string) => `.${className}`;

const createTab = (tabRootElement: HTMLElement) => {
  // element 캐싱 (tab, content)
  const { TAB, CONTENT, SELECTED } = classNames;
  const tabElements = Array.from(
    tabRootElement.querySelectorAll(getSelector(TAB))
  );
  const contentElements = Array.from(
    tabRootElement.querySelectorAll(getSelector(CONTENT))
  );

  const checkTargetIsTabElement = (target: HTMLElement, index: number) =>
    target !== null && index >= 0;
  const hideAllContents = () => {
    contentElements.forEach(contentElement =>
      contentElement.classList.add("hide")
    );
  };
  const showContent = (contentElement: Element) =>
    contentElement.classList.remove("hide");

  // content 노출 핸들러
  const showMatchedContent = (evt: Event) => {
    const target = evt.target as HTMLElement;
    const targetIndex = tabElements.indexOf(target);

    if (!checkTargetIsTabElement(target, targetIndex)) return;
    evt.preventDefault();

    tabElements.forEach(tabElement => tabElement.classList.remove(SELECTED));
    target.classList.add(SELECTED);
    hideAllContents();
    showContent(contentElements[targetIndex]);
  };

  // tab 버튼 클릭 이벤트
  tabRootElement.addEventListener("click", showMatchedContent);
};

const rootElement = document.querySelector(
  getSelector(classNames.TAB_ROOT)
) as HTMLElement;
const SearchHistoryElement = document.querySelector(
  getSelector(classNames.STORE_HISTORY)
) as HTMLElement;

createTab(rootElement);

new StoreHistory(SearchHistoryElement);
