var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
d)).finalize(c)}}});var w=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);

const namespace = typeof browser !== "undefined" ? browser : chrome;
const storage = namespace.storage;

const urlMappings = {
    ip: {
        virustotalIP: "https://www.virustotal.com/gui/ip-address/",
        scamalyticsIP: 'https://scamalytics.com/ip/',
        abuseipdbIP: 'https://www.abuseipdb.com/check/',
        xforceIP: 'https://exchange.xforce.ibmcloud.com/ip/',
        sansIP: 'https://isc.sans.edu/ipinfo/', 
        talosIP: 'https://talosintelligence.com/reputation_center/lookup?search=',
        avIP: 'https://otx.alienvault.com/browse/global/pulses?q=',
        arinIP: 'https://search.arin.net/rdap/?query=',
        shodanIP: 'https://www.shodan.io/host/',
        threatminerIP: 'https://threatminer.org/host.php?q=',
        pulseIP: 'http://pulsedive.com/indicator/?ioc='
    },
    ipv6: {
        scamalyticsIPv6: 'https://scamalytics.com/ip/',
        abuseipdbIPv6: 'https://www.abuseipdb.com/check/',
        xforceIPv6: 'https://exchange.xforce.ibmcloud.com/ip/',
        sansIPv6: 'https://isc.sans.edu/ipinfo/',
        talosIPv6: 'https://talosintelligence.com/reputation_center/lookup?search=',
        avIPv6: 'https://otx.alienvault.com/browse/global/pulses?q=',
        arinIPv6: 'https://search.arin.net/rdap/?query=',
        pulseIPv6: 'http://pulsedive.com/indicator/?ioc='
    },
    hash: {
        virustotalHash: "https://www.virustotal.com/gui/file/",
        hybridHash: 'https://www.hybrid-analysis.com/search?query=',
        xforceHash: 'https://exchange.xforce.ibmcloud.com/malware/',
        talosHash: 'https://talosintelligence.com/reputation_center/lookup?search=',
        avHash: 'https://otx.alienvault.com/browse/global/pulses?q=',
        threatminerHash: 'https://www.threatminer.org/sample.php?q=',
        urlhausHash: 'https://urlhaus.abuse.ch/browse.php?search='
    },
    url: {
        virustotalURL: "https://www.virustotal.com/gui/url/",
        safeWebURL: 'https://safeweb.norton.com/report?url=',
        sucuriURL: 'https://sitecheck.sucuri.net/results/',
        xforceURL: 'https://exchange.xforce.ibmcloud.com/url/',
        talosURL: 'https://talosintelligence.com/reputation_center/lookup?search=',
        avURL: 'https://otx.alienvault.com/browse/global/pulses?q=',
        shodanURL: 'https://www.shodan.io/search?query=',
        urlhausURL: 'https://urlhaus.abuse.ch/browse.php?search=',
        pulseURL: 'http://pulsedive.com/indicator/?ioc='
    },
    port: {
        speedguidePort: 'https://www.speedguide.net/port.php?port=',
        ianaPort: 'https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=',
        sansPort: 'https://isc.sans.edu/port.html?port='
    }
};
const urlMappingsDetails = {
    virustotal: {
        friendlyName: "VirusTotal",
        icon: "icons/virustotal.png"
    },
    scamalytics: {
        friendlyName: "Scamalytics",
        icon: "icons/scamalytics.png"
    },    
    abuseipdb: {
        friendlyName: "AbuseIPDB",
        icon: "icons/abuseipdb.png"
    },
    xforce: {
        friendlyName: "X-Force Exchange",
        icon: "icons/xforce.png"
    },
    sans: {
        friendlyName: "SANS Internet Storm Center",
        icon: "icons/sans.png"
    },
    talos: {
        friendlyName: "Cisco Talos",
        icon: "icons/talos.png"
    },
    av: {
        friendlyName: "AlienVault OTX",
        icon: "icons/alienvault.png"
    },
    arin: {
        friendlyName: "ARIN",
        icon: "icons/arin.png"
    },
    shodan: {
        friendlyName: "Shodan",
        icon: "icons/shodan.png"
    },
    threatminer: {
        friendlyName: "ThreatMiner",
        icon: "icons/threatminer.png"
    },  
    pulse: {
        friendlyName: "Pulsedive",
        icon: "icons/pulsedive.png"
    },
    hybrid: {
        friendlyName: "Hybrid Analysis",
        icon: "icons/hybrid.png"
    },
    safeWeb: {
        friendlyName: "Norton Safe Web",
        icon: "icons/safeweb.png"
    },
    sucuri: {
        friendlyName: "Sucuri SiteCheck",
        icon: "icons/sucuri.png"
    },
    speedguide: {
        friendlyName: "SpeedGuide",
        icon: "icons/speedguide.png"
    },
    iana: {
        friendlyName: "IANA",
        icon: "icons/iana.png"
    },
    urlhaus: {  
        friendlyName: "URLhaus",
        icon: "icons/urlhaus.png"
    }
};


namespace.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        const defaultOptions = {
            'virustotalIP': true,
            'scamalyticsIP': true,
            'abuseipdbIP': true,
            'xforceIP': true,
            'sansIP': true,
            'talosIP': true,
            'avIP': true,
            'arinIP': true,
            'shodanIP': true,
            'threatminerIP': true,
            'pulseIP': true,
            'scamalyticsIPv6': true,
            'abuseipdbIPv6': true,
            'xforceIPv6': true,
            'sansIPv6': true,
            'talosIPv6': true,
            'avIPv6': true,
            'arinIPv6': true,
            'pulseIPv6': true,
            'virustotalHash': true,
            'hybridHash': true,
            'xforceHash': true,
            'talosHash': true,
            'avHash': true,
            'threatminerHash': true,
            'urlhausHash': true,
            'virustotalURL': true,
            'sucuriURL': true,
            'safeWebURL': true,
            'xforceURL': true,
            'talosURL': true,
            'avURL': true,
            'shodanURL': true,
            'urlhausURL': true,
            'pulseURL': true,
            'speedguidePort': true,
            'ianaPort': true,
            'sansPort': true,
            'theme': 'Dark'
        };

        storage.sync.set(defaultOptions).then(function() {
        }).catch(function(error) {
        });
    } else if (details.reason == "update") {
    }
});

namespace.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    try {
        await identifyInput(request.input, 'user');
        sendResponse({});
    } catch (error) {
        sendResponse({error: error});
    }
    return true;
});

async function getOptions() {
    return new Promise((resolve, reject) => {
        storage.sync.get(Object.keys(urlMappings).flatMap(key => Object.keys(urlMappings[key])), function(result) {
            if (namespace.runtime.lastError) {
                reject(namespace.runtime.lastError);
            } else {
                options = result;
                resolve();
            }
        });
    });
}

const handleError = (input) => (error) => {
    console.error(error); 
    const errorUrl = `error.html?input=${encodeURIComponent(input)}`;
    namespace.windows.create({
        url: errorUrl,
        type: 'popup',
        width: 400,
        height: 200
    });
}

async function createTab(url) {
    return new Promise((resolve, reject) => {
        namespace.tabs.create({
            active: false,
            url: url
        }, function(tab) {
            if (namespace.runtime.lastError) {
                reject(namespace.runtime.lastError);
            } else {
                resolve(tab);
            }
        });
    });
}

function addHttp(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    const urlObject = new URL(url);
    if (urlObject.pathname === '/' && urlObject.search === '' && urlObject.hash === '' && !url.endsWith('/')) {
        url += '/';
    }
    return url;
}
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
}

function identifyInputType(input) {
    for (let type in patterns) {
        if (patterns[type].test(input)) {
            return type;
        }
    }

    return null;
}

function createUrl(type, key, value) {
    let url = urlMappings[type][key];
    if (type === 'url') {
        if (key === 'virustotalURL') {
            url += CryptoJS.SHA256(addHttp(value)) + '/detection';
        } else if (key === 'pulseURL') {
            url += btoa(addHttp(value));
        } else {
            url += addHttp(value);
        }
    } else if (type === 'ip' || type === 'ipv6') {
        if (key === 'pulseIP' || key === 'pulseIPv6') {
            url += btoa(value);
        } else {
            url += value;
        }
    }
    return url;
}

function search(type, value, searchType, specificSite) {
    if (value) {
        for (let key in urlMappings[type]) {
            if ((searchType === 'all') || (searchType === 'user' && options[key]) || (searchType === 'specific' && key === specificSite)) {
                const url = createUrl(type, key, value);
                createTab(url);
            }
        }
    }
}

async function identifyInput(input, searchType, specificSite) {
    await getOptions();

    if (input.includes('[.]') || input.includes('hxxp')) {
        input = input.replace(/\[\.\]/g, '.').replace(/hxxp/g, 'http');
    }

    return new Promise((resolve, reject) => {
        for (const type in patterns) {
            if (patterns[type].test(input)) {
                search(type, input, searchType, specificSite);
                resolve();
                return;
            }
        }

        reject("Please enter a valid search query!");
    });
}

function createContextMenu() {
    namespace.runtime.getPlatformInfo().then(function(info) {
        if (info.os !== "android") {
            namespace.contextMenus.create({
                id: "searchSelection",
                title: "Preferred Sites for '%s'",
                contexts: ["selection"]
            });
            namespace.contextMenus.create({
                id: "searchLink",
                title: "Preferred Sites for link",
                contexts: ["link"]
            });
            namespace.contextMenus.create({
                id: "searchAllSelection",
                title: "All Sites for '%s'",
                contexts: ["selection"]
            });
            namespace.contextMenus.create({
                id: "searchAllLink",
                title: "All Sites for link",
                contexts: ["link"]
            });

            for (let type in urlMappings) {
                namespace.contextMenus.create({
                    id: type,
                    title: type.toUpperCase(),
                    contexts: ["selection"]
                });

                for (let key in urlMappings[type]) {
                    const detailsKey = key.split(/IP|IPv6|Hash|URL|Port/)[0]; 
                    if (urlMappingsDetails[detailsKey]) { 
                        namespace.contextMenus.create({
                            id: key,
                            parentId: type,
                            title: urlMappingsDetails[detailsKey].friendlyName + " for '%s'",
                            contexts: ["selection", "link"],
                            icons: {
                                "16": urlMappingsDetails[detailsKey].icon,
                                "48": urlMappingsDetails[detailsKey].icon,
                                "128": urlMappingsDetails[detailsKey].icon
                            }
                        });
                    } else {
                        console.error(`Key ${detailsKey} not found in urlMappingsDetails`);
                    }
                }
            }
        }
    });
}

namespace.contextMenus.onClicked.addListener((info, tab) => {
    let input;
    if (info.linkUrl) {
        input = info.linkUrl;
    } else {
        input = info.selectionText.trim();
    }
    const type = identifyInputType(input); 

    if (info.menuItemId === "searchSelection") {
        identifyInput(input, 'user')
            .catch(handleError(input));
    } else if (info.menuItemId === "searchAllSelection") {
        identifyInput(input, 'all')
            .catch(handleError(input));
    } else if (info.menuItemId === "searchLink") {
        identifyInput(input, 'user')
            .catch(handleError(input));
    } else if (info.menuItemId === "searchAllLink") {
        identifyInput(input, 'all')
            .catch(handleError(input));
    } else if (urlMappings[type] && urlMappings[type].hasOwnProperty(info.menuItemId)) {
        identifyInput(input, 'specific', info.menuItemId)
            .catch(handleError(input));
    } else {
        console.log("The selected text does not match the type for the clicked menu item."); 
    }
});

namespace.runtime.onStartup.addListener(createContextMenu);
namespace.runtime.onInstalled.addListener(createContextMenu);