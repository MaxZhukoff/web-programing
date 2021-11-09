let loadTime = (function () {
    let now = new Date().getTime();
    let page_load_time = now - performance.timing.navigationStart;
    return page_load_time / 1000;
})();