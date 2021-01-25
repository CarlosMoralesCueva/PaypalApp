const express = require("express");
const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");

const app = express();

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

let value = 0;

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AQ5ddvxx3R8TA9Jav2800cDyQx2kLS3Ns9GBasNsptp1aNqE0tQfw1Q4uEid5Vmgqd8vkvIgtaZe6lX8",
    client_secret:
        "EPFLk51_qe9rss3CxGIC3ITRJRlLa9j4u82vJQOz8vOSQS63kAYgUs1hxu6aM5i5R9TMfNVFSWFK2W8b"
});

app.get("/paypal", (req, res) => {
    var paymentValue = req.originalUrl.replace('/paypal?source=','');
    value = paymentValue;
    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "https://fa155d2bec1b.ngrok.io/success",
            cancel_url: "https://fa155d2bec1b.ngrok.io/cancel"
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "Restaurante Campiña Lojana",
                            sku: "item",
                            price: Number(paymentValue),
                            currency: "USD",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "USD",
                    total: Number(paymentValue)
                },
                description: "Restaurante Campiña Lojana"
            }
        ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            res.redirect(payment.links[1].href);
        }
    });
});

app.get("/success", (req, res) => {
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: value
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            throw error;
        } else {
            res.render("success");
        }
    });
});

app.get("cancel", (req, res) => {
    res.render("cancel");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.use(express.static("public"));

app.listen(4000, () => {
    console.log("Server is running");
});