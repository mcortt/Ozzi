// error.js
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['mainColor', 'accentColor'], function(data) {
        let themeStyle = document.getElementById('themeStyle');
        themeStyle.innerHTML += `
            body {
                background-color: ${data.mainColor};
                color: ${data.accentColor};
            }
        `;
    });
});