var namespace = typeof chrome !== 'undefined' ? chrome : browser;

document.addEventListener('DOMContentLoaded', function() {
    namespace.storage.sync.get(['mainColor', 'accentColor'], function(data) {
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