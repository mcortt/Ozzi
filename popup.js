document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('#txtSearch');
    const searchButton = document.getElementById('btnSearch');

    searchInput.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            chrome.runtime.sendMessage({input: searchInput.value.trim()});
        }
    });

    searchButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({input: searchInput.value.trim()});
    });

    setTimeout(function() {
        searchInput.focus();
    }, 100); 
});

window.onload = function() {
    storage.sync.get(['accentColor', 'mainColor'], function(items) {
        if (items.accentColor && items.mainColor) {
            applyThemeColors({ accentColor: items.accentColor, mainColor: items.mainColor });
        }
    });
};
