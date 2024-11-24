import { Plugin } from "obsidian";

const findTab = function(app, name) {
    var result = undefined;
    app.setting.settingTabs.forEach((tab) => {
        if (tab.name === name) {
            result = tab
        }
    })
    if (result) {
        return result
    }
    throw new Error("Could not find tab with name:" + name)
}

const openTab = async function(app, name) {
    await app.setting.open()
    await app.setting.openTabById(findTab(app, name).id)
}



export default class SettingsJumpPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: "settings-jump-hotkeys",
            name: "Jump to hotkeys",
            callback: async () => {
                await openTab(this.app, "Hotkeys")
            }
        });


        this.addCommand({
            id: "settings-jump-community",
            name: "Jump to community plugins AA",
            callback: async () => {
                await openTab(this.app, "Community plugins")
            }
        });
    }
}
