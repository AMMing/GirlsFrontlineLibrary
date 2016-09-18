import * as express from "express"
import * as fs from "fs"
import * as path from "path"

let app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, 'public')));


///
app.get("/", (req, res) => {
    res.render("index", {
        page: {
            title: "index page",
            kw: "kw,index,demo",
            des: "my nodejs jade demo"
        },
        config: {
            ver: "0.1"
        },
        paging: [
            123, 453, 45, 768, "asdasdas", 3234,"xxxxxxxxxx"
        ]
    })
});

app.get("/data", (req, res) => {
    let list = {
        aaa: 12312,
        vvv: "asdads"
    }
    res.json(list);
});

let server = app.listen(2223, "127.0.0.1", () => {
    let address = server.address();
    console.log(`site is running at http://${address.address}:${address.port}`);
});