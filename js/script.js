let loadTime = (function () {
    let now = new Date().getTime();
    let page_load_time = now - performance.timeOrigin
    let time_load = page_load_time / 1000;
    return time_load.toFixed(4);
})();