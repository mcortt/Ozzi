const urlMappings = {
    ip: {
        virustotalIP: "https://www.virustotal.com/gui/ip-address/",
        scamalyticsIP: 'https://scamalytics.com/ip/',
        abuseipdbIP: 'https://www.abuseipdb.com/check/',
        xforceIP: 'https://exchange.xforce.ibmcloud.com/ip/',
        sansIP: 'https://isc.sans.edu/ipinfo/'
    },
    ipv6: {
        scamalyticsIPv6: 'https://scamalytics.com/ip/',
        abuseipdbIPv6: 'https://www.abuseipdb.com/check/',
        xforceIPv6: 'https://exchange.xforce.ibmcloud.com/ip/',
        sansIPv6: 'https://isc.sans.edu/ipinfo/'
    },
    hash: {
        virustotalHash: "https://www.virustotal.com/gui/file/",
        hybridHash: 'https://www.hybrid-analysis.com/search?query=',
        xforceHash: 'https://exchange.xforce.ibmcloud.com/malware/'
    },
    url: {
        virustotalURL: "https://www.virustotal.com/gui/url/",
        safeWebURL: 'https://safeweb.norton.com/report?url=',
        sucuriURL: 'https://sitecheck.sucuri.net/results/',
        xforceURL: 'https://exchange.xforce.ibmcloud.com/url/'
    },
    port: {
        speedguidePort: 'https://www.speedguide.net/port.php?port=',
        ianaPort: 'https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=',
        sansPort: 'https://isc.sans.edu/port.html?port='
    }
};

let options = {};

function getOptions() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(Object.keys(urlMappings).flatMap(key => Object.keys(urlMappings[key])).concat(['accentColor', 'mainColor']), function(result) {
            options = result;
            if (result.accentColor && result.mainColor) {
                document.documentElement.style.setProperty('--accent-color', result.accentColor);
                document.documentElement.style.setProperty('--main-color', result.mainColor);
            }
            resolve();
        });
    });
}

function createTab(url) {
    chrome.tabs.create({
        active: false,
        url: url
    });
}

function addHttp(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    return url;
}

function search(type, value) {
    if (value) {
        for (let key in urlMappings[type]) {
            if (options[key]) {
                let url = urlMappings[type][key];
                if (type === 'url') {
                    if (key === 'virustotalURL') {
                        url += CryptoJS.SHA256(addHttp(value)) + '/detection';
                    } else {
                        url += addHttp(value);
                    }
                }
                createTab(url);
            }
        }
    }
}

async function identifyInput(input) {
    document.getElementById('error-message').textContent = '';
    await getOptions();
    const patterns = {
        ip: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
        ipv6: /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/,
        hash: /^([a-fA-F0-9]{32}|[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$/,
        port: /^([0-9]{1,5})$/,
        url: new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i')
    };

    for (let type in patterns) {
        if (patterns[type].test(input)) {
            search(type, input);
            return;
        }
    }

    document.getElementById('error-message').textContent = "Please enter a valid search query!";
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('#txtSearch');
    const searchButton = document.getElementById('btnSearch');

    searchInput.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) { //checks enter key
            identifyInput(searchInput.value.trim());
        }
    });

    searchButton.addEventListener('click', function() {
        identifyInput(searchInput.value.trim());
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