var storage = chrome ? chrome.storage : browser.storage;

function getColorsForTheme(theme) {
    switch (theme) {
        case 'Dark':
            return { accentColor: '#E0E0E0', mainColor: '#181818' };
        case 'Light':
            return { accentColor: '#2F2F2F', mainColor: '#F0F0F0' };
        case 'Noctua-Dark':
            return { accentColor: '#e7ceb5', mainColor: '#653024' };
        case 'Noctua-Light':
            return { accentColor: '#653024', mainColor: '#e7ceb5' };
        default:
            return { accentColor: '#e7ceb5', mainColor: '#653024' };
    }
}
function saveThemeColors(theme) {
    var colors = getColorsForTheme(theme);
    storage.sync.set({ 'accentColor': colors.accentColor, 'mainColor': colors.mainColor });
}

function applyThemeColors(theme) {
    var colors;
    if (typeof theme === 'string') {
        colors = getColorsForTheme(theme);
    } else if (theme.accentColor && theme.mainColor) {
        colors = theme;
    } else {
        colors = getColorsForTheme('default');
    }
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
    document.documentElement.style.setProperty('--main-color', colors.mainColor);
}