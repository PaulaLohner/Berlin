const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");

app.use(express.static("./public"));

app.use(compression());

app.use(express.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/bowie-map.json", (req, res) => {
    db.getLocationInfo()
        .then((response) => {
            console.log(
                "response.rows from getLocationInfo query: ",
                response.rows
            );

            var locations = [];
            for (let i = 0; i < response.rows.length; i++) {
                var locationObj = {
                    name: response.rows[i].name,
                    description: response.rows[i].description,
                    address: response.rows[i].address,
                    image: response.rows[i].image,
                    theme: response.rows[i].theme,
                    location: {
                        lat: parseFloat(response.rows[i].lat),
                        lng: parseFloat(response.rows[i].lng),
                    },
                };

                if (response.rows[i].theme == "Bowie") {
                    locations.push(locationObj);
                }
                // console.log("locations object: ", locations);
            }
            console.log("locations object: ", locations);

            res.send(locations);
        })
        .catch((err) => {
            console.log("error in getLocationInfo query: ", err);
        });
});

app.get("/kino-map.json", (req, res) => {
    db.getLocationInfo()
        .then((response) => {
            console.log(
                "response.rows from getLocationInfo query: ",
                response.rows
            );

            var locations = [];
            for (let i = 0; i < response.rows.length; i++) {
                var locationObj = {
                    name: response.rows[i].name,
                    description: response.rows[i].description,
                    address: response.rows[i].address,
                    image: response.rows[i].image,
                    theme: response.rows[i].theme,
                    location: {
                        lat: parseFloat(response.rows[i].lat),
                        lng: parseFloat(response.rows[i].lng),
                    },
                };

                if (response.rows[i].theme == "Kino") {
                    locations.push(locationObj);
                }
                // console.log("locations object: ", locations);
            }
            console.log("locations object: ", locations);

            res.send(locations);
        })
        .catch((err) => {
            console.log("error in getLocationInfo query: ", err);
        });
});

app.get("/book-map.json", (req, res) => {
    db.getLocationInfo()
        .then((response) => {
            console.log(
                "response.rows from getLocationInfo query: ",
                response.rows
            );

            var locations = [];
            for (let i = 0; i < response.rows.length; i++) {
                var locationObj = {
                    name: response.rows[i].name,
                    description: response.rows[i].description,
                    address: response.rows[i].address,
                    image: response.rows[i].image,
                    theme: response.rows[i].theme,
                    location: {
                        lat: parseFloat(response.rows[i].lat),
                        lng: parseFloat(response.rows[i].lng),
                    },
                };

                if (response.rows[i].theme == "Bookstore") {
                    locations.push(locationObj);
                }
                // console.log("locations object: ", locations);
            }
            console.log("locations object: ", locations);

            res.send(locations);
        })
        .catch((err) => {
            console.log("error in getLocationInfo query: ", err);
        });
});

app.get("/suggestions.json", (req, res) => {
    db.getSuggestions()
        .then((response) => {
            console.log("response from getSuggestions query: ", response);

            let messages = response.rows.reverse();
            res.json(messages);
        })
        .catch((err) => {
            console.log("Error in getSuggestions query: ", err);
        });
});

app.post("/new-suggestion", (req, res) => {
    console.log("req.body: ", req.body);

    let { first, last, message } = req.body;

    db.addNewSuggestions(first, last, message)
        .then((response) => {
            console.log(
                "response in addNewSuggestions query: ",
                response.rows[0]
            );
            res.json(response.rows[0]);
        })
        .catch((err) => {
            console.log("error in addNewSuggestions query: ", err);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
