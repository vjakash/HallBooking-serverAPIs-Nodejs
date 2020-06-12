const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
let rooms = [];
let id = 0;

app.listen(port, () => {
    console.log("listening in port " + port)
});

app.post("/create", (req, res) => {
    req.body["id"] = id++;
    req.body["bookings"] = [];

    rooms.push(req.body);
    res.json({
        message: "room added "
    })
});
app.post("/book", (req, res) => {
    let start = parseInt(req.body["starttime"].split(":").join(""));
    let end = parseInt(req.body["endtime"].split(":").join(""));
    let bookedDetails = [];
    let flag = 0;
    for (let i of rooms[req.body["id"]].bookings) {
        if (i.date == req.body["date"]) {
            bookedDetails.push({ date: i.date, starttime: i.starttime, endtime: i.endtime })
            let checkStart = parseInt(i.starttime.split(":").join(""));
            let checkEnd = parseInt(i.endtime.split(":").join(""));
            if ((start > checkStart && start < checkEnd) || (end > checkStart && end < checkEnd)) {
                flag = 1;
            }
        }
    }
    if (flag == 1) {
        res.json({
            message: "The hall is already booked for the required time slot",
            note: "Please book someother time slot",
            bookedslot: bookedDetails
        })
    } else {
        rooms[req.body["id"]].bookings.push(req.body);
        res.json({
            message: "The hall is booked successfully",
            bookingId: "ghvncchf"
        })
    }
});
app.get("/bookedroom", (req, res) => {
    let obj = [];
    for (let i in rooms) {
        for (let j of rooms[i].bookings) {
            obj.push({ roomname: rooms[parseInt(i)].room_name, roomid: i, customer_name: j.name, booking_date: j.date, start_time: j.starttime, end_time: j.endtime })
        }
    }
    res.json(obj);
});
app.get("/customers", (req, res) => {
    let obj = [];
    for (let i in rooms) {
        for (let j of rooms[i].bookings) {
            obj.push({ roomname: rooms[parseInt(i)].room_name, roomid: i, customer_name: j.name, booking_date: j.date, start_time: j.starttime, end_time: j.endtime })
        }
    }
    res.json(obj);
});