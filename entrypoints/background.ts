import type { Browser } from "wxt/browser";
import { NextStates } from "./scripts/state";
import { StateStorage } from "./scripts/storage";

export default defineBackground({
  main() {
    const storage = new StateStorage(
      browser.storage.local.get,
      browser.storage.local.set
    );

    (async () => {
      const state = await storage.get();
      if (!state) {
        const createdBookmarkStates = new NextStates();
        await storage.set(createdBookmarkStates);
      }
    })();

    const onCreated = async (
      id: string,
      _bookmark: Browser.bookmarks.BookmarkTreeNode
    ) => {
      await browser.bookmarks.move(id, { index: 0 });
      const state = await storage.get();
      if (!state) {
        return;
      }
      state.add(id);
    };

    if (browser.bookmarks.onCreated.hasListener(onCreated)) {
      browser.bookmarks.onCreated.removeListener(onCreated);
    }
    browser.bookmarks.onCreated.addListener(onCreated);

    const onMoved = async (
      id: string,
      _bookmarkInfo: Browser.bookmarks.MoveDestination
    ) => {
      const state = await storage.get();
      if (!state) {
        return;
      }
      const next = state.next(id);
      if (next === false) {
        return;
      }
      await browser.bookmarks.move(id, { index: 0 });
    };

    if (browser.bookmarks.onMoved.hasListener(onMoved)) {
      browser.bookmarks.onMoved.removeListener(onMoved);
    }
    browser.bookmarks.onMoved.addListener(onMoved);
  },
});
