var storage = chrome ? chrome.storage : browser.storage;

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('#txtSearch');
    const searchButton = document.getElementById('btnSearch');

async function sendMessage(input) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({input: input}, function(response) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response);
            }
        });
    });
}

searchInput.addEventListener("keydown", async function (e) {
    if (e.keyCode === 13) {
        try {
            const response = await sendMessage(searchInput.value.trim());
            if (response.error) {
                displayError(response.error);
            } else {
                window.close();
            }
        } catch (error) {
            displayError(error.message);
        }
    }
});

searchButton.addEventListener('click', async function() {
    try {
        const response = await sendMessage(searchInput.value.trim());
        if (response.error) {
            displayError(response.error);
        } else {
            window.close();
        }
    } catch (error) {
        displayError(error.message);
    }
});

    setTimeout(function() {
        searchInput.focus();
    }, 100); 
});

window.onload = function() {
    storage.sync.get(['accentColor', 'mainColor', 'theme'], function(items) {
        if (items.accentColor && items.mainColor) {
            applyThemeColors({ accentColor: items.accentColor, mainColor: items.mainColor });
        }
        if (items.theme) {
            applyThemeColors(items.theme);
        }
    });
};

function displayError(message) {
    document.getElementById('error-message').textContent = message;
}