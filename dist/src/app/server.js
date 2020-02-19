"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var filesystem = __importStar(require("fs"));
// Create a new express application instance
var app = express_1.default();
var port = 3000;
// options for cors midddleware
var options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    // credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false
};
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.get("/", function (req, res) {
    res.send("This is a simple mock server for a frontend exam project. \n" +
        "It is providing a list of endpoints. \n"
        + "To get hole list of data use GET /statistic route\n"
        + "To add log entry use POST /statistic route\n"
        + "To update log entry use PUT /statistic/{id} route\n"
        + "To delete log entry use DELETE /statistic/{id} route\n");
});
app.get("/statistic", function (req, res) {
    var filePath = __dirname + "/assets/stub-data.json";
    try {
        filesystem.readFile(filePath, null, function (err, data) {
            if (err) {
                res.json({
                    code: err.code,
                    message: err.message,
                    status: "error"
                });
            }
            else {
                res.json(JSON.parse(data));
            }
        });
    }
    catch (e) {
        res.json({
            code: e.code,
            message: e.message,
            status: "error"
        });
    }
});
app.post("/statistic/:id", function (req, res) {
    res.json({
        entry: req.body,
        status: "added"
    });
});
app.put("/statistic/:id", function (req, res) {
    res.json({
        entry: req.body,
        status: "updated"
    });
});
app.delete("/statistic/:id", function (req, res) {
    res.json({
        entry: req.body,
        status: "deleted"
    });
});
app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("Mock server for a frontend exam project is listening on port " + port);
});
//# sourceMappingURL=server.js.map