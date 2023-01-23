
const { deepStrictEqual } = require("assert")
const { urlencoded } = require("body-parser")
const bodyParser = require("body-parser")
const { publicDecrypt } = require("crypto")
const express = require("express")
const { send } = require("process")
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json({extended: true}))
app.use(express.json())
const PORT = process.env.PORT || 3000

const players = {
    allPlayers: [
        { id: 1, name: "Oscar Wendt", posistion: "LD", team: "IFK GÖteborg" },
        { id: 2, name: "Marcus Berg", posistion: "CF", team: "IFK GÖteborg" },
        { id: 3, name: "Oliver Berg", posistion: "COM", team: "Kalmar FF" },
        { id: 4, name: "Pontus Dahlberg", posistion: "GK", team: "IFK GÖteborg" },
        {id: 5, name: "Lionel Messi", posistion:"AT", team: "PSG"}
    ]
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/players", (req, res) => {
    res.send(players)
})


app.get("/deleteplayer/:removePlayerId", (req, res) => {
    removePlayerId = req.params.removePlayerId
    res.send(deletePlayer(removePlayerId))
})

app.post("/addplayer", (req, res) => {
    addName = req.body.name
    addPosition = req.body.position
    addTeam = req.body.team
    addPlayer(addName, addPosition, addTeam)
    res.send("player "+ addName + "added")
});

app.get("/update/:updateId/:addName/:addPosition/:addTeam", (req, res) => {
    updateId = Number(req.params.updateId)
    updateName = req.params.addName
    updatePosition = req.params.addPosition
    updateTeam = req.params.addTeam
    res.send(updatePlayer(updateId, updateName, updatePosition, updateTeam))
})

function updatePlayer(updateId, updateName, updatePosition, updateTeam) {
    let idExist = false;
    for (var i = 0; i < players.allPlayers.length; i++) {
        if (updateId == players.allPlayers[i].id) {
            idExist = true;
            removePlayerId = updateId;
            deletePlayer(removePlayerId)
            players.allPlayers.push({ id: updateId, name: updateName, posistion: updatePosition, team: updateTeam })
            return players
        }

    }
    if (idExist == false) {
        return "Id does not exist"
    }
}

function deletePlayer(removePlayerId) {

    let idExist = false;
    for (var i = 0; i < players.allPlayers.length; i++) {
        if (players.allPlayers[i].id == removePlayerId) {

            players.allPlayers.splice(i, 1)
            idExist = true;
            return players
        }
    }
    if (idExist == false) {
        return "Id does not exist"

    }

}

function addPlayer(addName, addPosition, addTeam) {
    let idValue = 0;
    for (var i = 0; i < players.allPlayers.length; i++) {
        if (idValue < players.allPlayers[i].id) {

            idValue = players.allPlayers[i].id;

        }
    }

    players.allPlayers.push({ id: idValue + 1, name: addName, posistion: addPosition, team: addTeam })

    return players
}

app.listen(PORT, () => {
    console.log("listening to " + PORT)
    console.log(players)
})