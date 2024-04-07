var namespace = typeof chrome !== 'undefined' ? chrome : browser;
var selectedTheme;

function toggleCheckboxes(checked) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = checked);
}

document.getElementById('checkAll').addEventListener('click', () => toggleCheckboxes(true));
document.getElementById('uncheckAll').addEventListener('click', () => toggleCheckboxes(false));

document.getElementById('optionsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var options = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .reduce((options, checkbox) => {
            options[checkbox.id] = checkbox.checked;
            return options;
        }, {});

    options.theme = selectedTheme || document.getElementById('themeSelect').value;

    namespace.storage.sync.set(options).then(function() {
        document.getElementById('save-message').textContent = "YOUR SETTINGS HAVE BEEN SAVED!";
        saveThemeColors(options.theme);
        setTimeout(function() {
            window.location.href = 'popup.html';
        }, 1250);
    }).catch(console.log);
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        selectedTheme = this.dataset.value;
        applyThemeColors(selectedTheme);
        document.querySelector('.dropdown-button').innerText = selectedTheme; 
    });
});

window.onload = function() {
    namespace.storage.sync.get().then(function(options) {
        Object.keys(options).forEach(key => {
            var element = document.getElementById(key);
            if (element && element.type === 'checkbox') {
                element.checked = options[key];
            }
        });

        if (options.theme) {
            var dropdownItems = document.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                if (item.dataset.value === options.theme) {
                    item.classList.add('selected'); 
                    document.querySelector('.dropdown-button').innerText = options.theme; 
                } else {
                    item.classList.remove('selected'); 
                }
            });
            selectedTheme = options.theme;
            applyThemeColors(selectedTheme);
        } else {
            document.querySelector('.dropdown-button').innerText = "Select theme"; 
        }
    }).catch(console.log);
};