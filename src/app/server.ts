import bodyParser, { OptionsJson } from "body-parser";
import express from "express";
import * as filesystem from "fs";
import ErrnoException = NodeJS.ErrnoException;

// Create a new express application instance
const app: express.Application = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("This is a simple mock server for a frontend exam project. \n" +
        "It is providing a list of endpoints. \n"
         + "To get hole list of data use GET /statistic route\n"
         + "To add log entry use POST /statistic route\n"
         + "To update log entry use PUT /statistic/{id} route\n"
         + "To delete log entry use DELETE /statistic/{id} route\n"
    );
});

app.get("/statistic", (req, res) => {
    const filePath = __dirname + "/assets/stub-data.json";
    try {
        filesystem.readFile(
            filePath,
            null,
            (err: ErrnoException | null, data: string|Buffer) => {
                if (err) {
                    res.json({
                        code: err.code,
                        message: err.message,
                        status: "error"
                    } as OptionsJson);
                } else {
                    res.json(JSON.parse(data as string));
                }
            }
        );
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message,
            status: "error"
        } as OptionsJson);
    }
});

app.post("/statistic/:id", (req, res) => {
    res.json({
        entry: req.body,
        status: "added"
    } as OptionsJson);
});

app.put("/statistic/:id", (req, res) => {
    res.json({
        entry: req.body,
        status: "updated"
    } as OptionsJson);
});

app.delete("/statistic/:id", (req, res) => {
    res.json({
        entry: req.body,
        status: "deleted"
    } as OptionsJson);
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Mock server for a frontend exam project is listening on port ${port}`);
});
