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

    let params = new URLSearchParams(window.location.search);
    let input = params.get('input');
    if (input) {
        let errorMessage = document.getElementById('errorMessage');
        let searchQuerySpan = document.createElement('span');
        searchQuerySpan.textContent = "\"" + decodeURIComponent(input) + "\" ";
        searchQuerySpan.style.fontWeight = 'bold';
        searchQuerySpan.style.fontStyle = 'italic';
        errorMessage.prepend(searchQuerySpan);
    }

    setTimeout(function() {
        window.close();
    }, 2000); 
});