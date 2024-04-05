var storage = chrome ? chrome.storage : browser.storage;

document.addEventListener('DOMContentLoaded', function() {
    storage.sync.get(['mainColor', 'accentColor'], function(data) {
        let themeStyle = document.createElement('style');
        themeStyle.textContent = `
            body {
                background-color: ${data.mainColor};
                color: ${data.accentColor};
            }
        `;
        document.head.appendChild(themeStyle);
    });
});