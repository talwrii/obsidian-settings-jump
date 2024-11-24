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

const findByText = function(html, text) {
    if (html.innerText === text) {
        return html
    } else {
        const children = html.children
        for (var i = 0; i < children.length; i++) {
            const child = children[i]
            let search = findByText(child)
            if (search) {
                return search
            }
        }
        return undefined
    }
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

        this.addCommand({
            id: "settings-jump-community-search",
            name: "Search community plugins",
            callback: async () => {
                await openTab(this.app, "Community plugins")
                let html = findTab(this.app, "Community plugins").containerEl
                await findByText(html.containerEl, "Browse").parentNode.click()
            }
        });
    }
}
