var list = Enumerable.Range(1, 50, 23)
    .Select(x => `item_${x}`)
    .ToArray();
var vue = new Vue({
    el: "#app",
    data: {
        text: "vue test demo.",
        list: list
    }
})