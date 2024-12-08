import { Bookmarks } from "wxt/browser";
import { NextStates } from "./scripts/state";
import { StateStorage } from "./scripts/storage";

export default defineBackground({
  async main() {
    const storage = new StateStorage(
      browser.storage.local.get,
      browser.storage.local.set
    );

    const state = await storage.get();
    if (!state) {
      const createdBookmarkStates = new NextStates();
      await storage.set(createdBookmarkStates);
    }

    const onCreated = async (
      id: string,
      _bookmark: Bookmarks.BookmarkTreeNode
    ) => {
      browser.bookmarks.move(id, { index: 0 });
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
      _bookmarkInfo: Bookmarks.OnMovedMoveInfoType
    ) => {
      const state = await storage.get();
      if (!state) {
        return;
      }
      const next = state.next(id);
      if (next === false) {
        return;
      }
      browser.bookmarks.move(id, { index: 0 });
    };

    if (browser.bookmarks.onMoved.hasListener(onMoved)) {
      browser.bookmarks.onMoved.removeListener(onMoved);
    }
    browser.bookmarks.onMoved.addListener(onMoved);
  },
});
