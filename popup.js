function identifyInput(input) {
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/;
    const hashPattern = /^([a-fA-F0-9]{32}|[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$/;
    const portPattern = /^([0-9]{1,5})$/;
    const urlPattern = /^(https?:\/\/)?((?:[0-9]{1,3}\.){3}[0-9]{1,3}|[\da-z\.-]+)(:[0-9]{1,5})?([\/\w\.-]*)*\/?$/;

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
        alert("Please enter a valid search query!");
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
    // Add the focus code here
    setTimeout(function() {
        var input = document.getElementById('txtSearch');
        if(input) {
            input.focus();
        }
    }, 100); // Delay of 100ms
});
3
function createTab(url) {
    chrome.tabs.create({
        active: false,
        url: url
    });
}

function searchIPv6(value) {
    if (value) {
        createTab('https://scamalytics.com/ip/' + value);
        createTab('https://www.abuseipdb.com/check/' + value);
        createTab('https://exchange.xforce.ibmcloud.com/ip/' + value);
        createTab('https://isc.sans.edu/ipinfo/' + value);
    }
}

function searchIP(value) {
    if (value) {
        createTab("https://www.virustotal.com/gui/ip-address/" + value + "/detection");
        createTab('https://scamalytics.com/ip/' + value);
        createTab('https://www.abuseipdb.com/check/' + value);
        createTab('https://exchange.xforce.ibmcloud.com/ip/' + value);
        createTab('https://isc.sans.edu/ipinfo/' + value);
    }
}

function searchHash(value) {
    if (value) {
        createTab("https://www.virustotal.com/gui/file/" + value + "/detection");
        createTab('https://www.hybrid-analysis.com/search?query=' + value);
        createTab('https://exchange.xforce.ibmcloud.com/malware/' + value);
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
        createTab("https://www.virustotal.com/gui/url/" + valueSha256 + "/detection");
        createTab('https://safeweb.norton.com/report?url=' + value);
        createTab('https://sitecheck.sucuri.net/results/' + value);
        createTab('https://exchange.xforce.ibmcloud.com/url/' + value);
    }
}

function searchPort(value) {
    if (value) {
        createTab('https://www.speedguide.net/port.php?port=' + value);
        createTab('https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=' + value);
        createTab('https://isc.sans.edu/port.html?port=' + value);
    }
}