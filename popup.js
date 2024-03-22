let options = {};

function getOptions() {
    return new Promise((resolve) => {
        chrome.storage.sync.get([
            'virustotalIP', 'scamalyticsIP', 'abuseipdbIP', 'xforceIP', 'sansIP',
            'scamalyticsIPv6', 'abuseipdbIPv6', 'xforceIPv6', 'sansIPv6',
            'virustotalHash', 'hybridHash', 'xforceHash',
            'virustotalURL', 'safewebURL', 'sucuriURL', 'xforceURL',
            'speedguidePort', 'ianaPort', 'sansPort'
        ], function(result) {
            options = result;
            resolve();
        });
    });
}

async function identifyInput(input) {
    document.getElementById('error-message').textContent = '';
    await getOptions();
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/;
    const hashPattern = /^([a-fA-F0-9]{32}|[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$/;
    const portPattern = /^([0-9]{1,5})$/;
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
    
    if (ipPattern.test(input)) {
        searchIP(input);
    } else if (ipv6Pattern.test(input)) {
        searchIPv6(input);
    } else if (hashPattern.test(input)) {
        searchHash(input);
    } else if (portPattern.test(input)) {
        const port = Number(input);
        if (port >= 0 && port <= 65535) {
            searchPort(input);
        }
    } else if (urlPattern.test(input)) {
        searchURL(input);
    } else {
    const errorMessage = "Please enter a valid search query!";
    document.getElementById('error-message').textContent = errorMessage;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#txtSearch').addEventListener("keydown", function (e) {
        if (e.keyCode === 13) { //checks enter key
            const valueInput = document.getElementById("txtSearch").value.trim();
            identifyInput(valueInput)
        }
    });
    document.getElementById('btnSearch').addEventListener('click', function() {
        const valueInput = document.getElementById("txtSearch").value.trim();
        identifyInput(valueInput);
    });
    setTimeout(function() {
        var input = document.getElementById('txtSearch');
        if(input) {
            input.focus();
        }
    }, 100); 
});

function createTab(url) {
    chrome.tabs.create({
        active: false,
        url: url
    });
}

function searchIPv6(value) {
    if (value) {
        if (options.scamalyticsIPv6) {
            createTab('https://scamalytics.com/ip/' + value);
        }
        if (options.abuseipdbIPv6) {
            createTab('https://www.abuseipdb.com/check/' + value);
        }
        if (options.xforceIPv6) {
            createTab('https://exchange.xforce.ibmcloud.com/ip/' + value);
        }
        if (options.sansIPv6) {
            createTab('https://isc.sans.edu/ipinfo/' + value);
        }
    }
}

function searchIP(value) {
    if (value) {
        if (options.virustotalIP) {
            createTab("https://www.virustotal.com/gui/ip-address/" + value + "/detection");
        }
        if (options.scamalyticsIP) {
            createTab('https://scamalytics.com/ip/' + value);
        }
        if (options.abuseipdbIP) {
            createTab('https://www.abuseipdb.com/check/' + value);
        }
        if (options.xforceIP) {
            createTab('https://exchange.xforce.ibmcloud.com/ip/' + value);
        }
        if (options.sansIP) {
            createTab('https://isc.sans.edu/ipinfo/' + value);
        }
    }
}

function searchIPv6(value) {
    if (value) {
        if (options.scamalyticsIPv6) {
            createTab('https://scamalytics.com/ip/' + value);
        }
        if (options.abuseipdbIPv6) {
            createTab('https://www.abuseipdb.com/check/' + value);
        }
        if (options.xforceIPv6) {
            createTab('https://exchange.xforce.ibmcloud.com/ip/' + value);
        }
        if (options.sansIPv6) {
            createTab('https://isc.sans.edu/ipinfo/' + value);
        }
    }
}

function searchHash(value) {
    if (value) {
        if (options.virustotalHash) {
            createTab("https://www.virustotal.com/gui/file/" + value + "/detection");
        }
        if (options.hybridanalysisHash) {
            createTab('https://www.hybrid-analysis.com/search?query=' + value);
        }
        if (options.xforceHash) {
            createTab('https://exchange.xforce.ibmcloud.com/malware/' + value);
        }
    }
}

function searchURL(value) {
    if (value) {
        if (!/^https?:\/\//i.test(value)) {
            value = 'http://' + value;
        }
        if (!value.endsWith('/')) {
            value += '/';
        }
        let valueSha256 = CryptoJS.SHA256(value);
        if (options.virustotalURL) {
            createTab("https://www.virustotal.com/gui/url/" + valueSha256 + "/detection");
        }
        if (options.safeWebURL) {
            createTab('https://safeweb.norton.com/report?url=' + value);
        }
        if (options.sucuriURL) {
            createTab('https://sitecheck.sucuri.net/results/' + value);
        }
        if (options.xforceURL) {
            createTab('https://exchange.xforce.ibmcloud.com/url/' + value);
        }
    }
}

function searchPort(value) {
    if (value) {
        if (options.speedguidePort) {
            createTab('https://www.speedguide.net/port.php?port=' + value);
        }
        if (options.ianaPort) {
            createTab('https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=' + value);
        }
        if (options.sansPort) {
            createTab('https://isc.sans.edu/port.html?port=' + value);
        }
    }
}