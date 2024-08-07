import { Menu, app, dialog, globalShortcut } from "electron";
import serve from "electron-serve";
import contextMenu from "electron-context-menu";
// import { machineIdSync } from "node-machine-id";

import { createWindow } from "./helpers";
import "../backend/server";

const isProd: boolean = process.env.NODE_ENV === "production";

// const  ip = machineIdSync(true);

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

contextMenu({
  showInspectElement: true,
  shouldShowMenu: (_event) => {
    return true;
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
    let response = dialog.showMessageBoxSync(mainWindow, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "Confirmer",
      message: "Êtes-vous sûr de vouloir quitter ?",
    });

    if (response == 1) e.preventDefault();
  });

  if (isProd) {
    mainWindow.setMenuBarVisibility(false);
    await mainWindow.loadURL("app://./login.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/login`);
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
