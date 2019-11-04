import { browser } from "webextension-polyfill-ts";

browser.bookmarks.onCreated.addListener((id, bookmarkInfo) => {
  browser.bookmarks.move(id, { index: 0 });
});

browser.bookmarks.onMoved.addListener(async (id, bookmarkInfo) => {
  const recentBookmarks = await browser.bookmarks.getRecent(1);
  if (recentBookmarks.length == 0) {
    return;
  }
  if (recentBookmarks[0].id !== id) {
    return;
  }

  browser.bookmarks.move(id, { index: 0 });
});
