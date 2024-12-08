import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "webextension-polyfill",
  manifest: {
    description: "Push the latest bookmark to the top",
    permissions: ["bookmarks", "storage"],
    icons: {
      "16": "icon/icon-16.png",
      "128": "icon/icon-128.png",
    },
    action: {
      default_icon: {
        "19": "icon/icon-19.png",
        "38": "icon/icon-38.png",
      },
    },
  },
});
