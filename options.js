var storage = chrome ? chrome.storage : browser.storage;

document.getElementById('optionsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var options = {
        virustotalIP: document.getElementById('virustotalIP').checked,
        scamalyticsIP: document.getElementById('scamalyticsIP').checked,
        abuseipdbIP: document.getElementById('abuseipdbIP').checked,
        xforceIP: document.getElementById('xforceIP').checked,
        sansIP: document.getElementById('sansIP').checked,
        scamalyticsIPv6: document.getElementById('scamalyticsIPv6').checked,
        abuseipdbIPv6: document.getElementById('abuseipdbIPv6').checked,
        xforceIPv6: document.getElementById('xforceIPv6').checked,
        sansIPv6: document.getElementById('sansIPv6').checked,
        virustotalHash: document.getElementById('virustotalHash').checked,
        hybridHash: document.getElementById('hybridHash').checked,
        xforceHash: document.getElementById('xforceHash').checked,
        virustotalURL: document.getElementById('virustotalURL').checked,
        safewebURL: document.getElementById('safewebURL').checked,
        sucuriURL: document.getElementById('sucuriURL').checked,
        xforceURL: document.getElementById('xforceURL').checked,
        speedguidePort: document.getElementById('speedguidePort').checked,
        ianaPort: document.getElementById('ianaPort').checked,
        sansPort: document.getElementById('sansPort').checked,
    };

    storage.sync.set(options).then(function() {
        const saveMessage = "YOUR SETTINGS HAVE BEEN SAVED!";
        document.getElementById('save-message').textContent = saveMessage;
    }).catch(function(error) {
        console.log(error);
    });
});


window.onload = function() {
    storage.sync.get([
        'virustotalIP', 
        'scamalyticsIP', 
        'abuseipdbIP', 
        'xforceIP', 
        'sansIP',
        'scamalyticsIPv6', 
        'abuseipdbIPv6', 
        'xforceIPv6', 
        'sansIPv6',
        'virustotalHash', 
        'hybridHash', 
        'xforceHash',
        'virustotalURL', 
        'safewebURL', 
        'sucuriURL', 
        'xforceURL',
        'speedguidePort', 
        'ianaPort', 
        'sansPort'
    ]).then(function(options) {
        document.getElementById('virustotalIP').checked = options.virustotalIP;
        document.getElementById('scamalyticsIP').checked = options.scamalyticsIP;
        document.getElementById('abuseipdbIP').checked = options.abuseipdbIP;
        document.getElementById('xforceIP').checked = options.xforceIP;
        document.getElementById('sansIP').checked = options.sansIP;
        document.getElementById('scamalyticsIPv6').checked = options.scamalyticsIPv6;
        document.getElementById('abuseipdbIPv6').checked = options.abuseipdbIPv6;
        document.getElementById('xforceIPv6').checked = options.xforceIPv6;
        document.getElementById('sansIPv6').checked = options.sansIPv6;
        document.getElementById('virustotalHash').checked = options.virustotalHash;
        document.getElementById('hybridHash').checked = options.hybridHash;
        document.getElementById('xforceHash').checked = options.xforceHash;
        document.getElementById('virustotalURL').checked = options.virustotalURL;
        document.getElementById('safewebURL').checked = options.safewebURL;
        document.getElementById('sucuriURL').checked = options.sucuriURL;
        document.getElementById('xforceURL').checked = options.xforceURL;
        document.getElementById('speedguidePort').checked = options.speedguidePort;
        document.getElementById('ianaPort').checked = options.ianaPort;
        document.getElementById('sansPort').checked = options.sansPort;    }).catch(function(error) {
        console.log(error);
    });
};
