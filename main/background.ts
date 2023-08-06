import { Menu, app, dialog, globalShortcut } from "electron";
import serve from "electron-serve";
import contextMenu from "electron-context-menu";

import { createWindow } from "./helpers";
import "../server/server";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

contextMenu({
  showInspectElement: false,
  shouldShowMenu: (event, params) => {
    return params.inputFieldType !== "none";
  },
});

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    show: false,
    width: 1000,
    height: 600,
    webPreferences: {
      spellcheck: false,
    },
  });

  mainWindow.maximize();
  mainWindow.show();
  mainWindow.on("close", function (e) {
    let response = dialog.showMessageBoxSync(this, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "Confirmer",
      message: "Êtes-vous sûr de vouloir quitter ?",
    });

    if (response == 1) e.preventDefault();
  });
  if (isProd) {
    const menuTemplate = [];
    const menu = Menu.buildFromTemplate(menuTemplate);
    // Menu.setApplicationMenu(menu);
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

app.on("browser-window-blur", () => {
  globalShortcut.unregister("CommandOrControl+R");
  globalShortcut.unregister("F5");
});
