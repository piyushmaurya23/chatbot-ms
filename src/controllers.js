var express = require("express");
var axios = require("axios");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Config = require("../models/");

// API to save config
router.post("/save-config", function (req, res) {
  Config.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      webhookUrl: req.body.webhookUrl,
      apiSecret: req.body.apiSecret,
    },
    function (err, config) {
      if (err) {
        console.log(error);
        return res.status(500).send({
          message:
            "There was a problem adding the information to the database.",
        });
      }
      if (config) {
        console.log(`Config inserted ${config.id}`);
      }
      res.status(200).send({
        message: "config added successfully",
        config: config,
      });
    }
  );
});

// Send response to another microservice and fetch chat response
// from there, which will be send to UI client.
router.get("/chat/:id", function (req, res) {
  Config.findById(req.params.id, function (err, config) {
    if (err)
      return res
        .status(500)
        .send({ message: "There was a problem finding the config." });
    if (!config) return res.status(404).send({ message: "No config found." });

    axios
      .post(config.webhookUrl, {
        id: config.id,
        firstName: config.firstName,
        lastName: config.lastName,
      })
      .then(function (response) {
        res.status(200).send(response);
      })
      .catch(function (error) {
        res.status(500).send({
          message: "Unable to verify api server secret token.",
        });
      });

    res.status(200).send(config);
  });
});
