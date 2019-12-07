import { browser, Bookmarks } from "webextension-polyfill-ts";
import { NextStates } from "./state";

const createdBookmarkStates = new NextStates();

const onCreated = (id: string, _bookmark: Bookmarks.BookmarkTreeNode) => {
  browser.bookmarks.move(id, { index: 0 });
  createdBookmarkStates.add(id);
};

if (browser.bookmarks.onCreated.hasListener(onCreated)) {
  browser.bookmarks.onCreated.removeListener(onCreated);
}
browser.bookmarks.onCreated.addListener(onCreated);

const onMoved = async (
  id: string,
  _bookmarkInfo: Bookmarks.OnMovedMoveInfoType
) => {
  const next = createdBookmarkStates.next(id);
  if (next === false) {
    return;
  }
  browser.bookmarks.move(id, { index: 0 });
};

if (browser.bookmarks.onMoved.hasListener(onMoved)) {
  browser.bookmarks.onMoved.removeListener(onMoved);
}
browser.bookmarks.onMoved.addListener(onMoved);
