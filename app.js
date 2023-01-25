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
//const PORT = 3000

const players = {
    allPlayers: [
        { id: 1, name: "Oscar Wendt", position: "LD", team: "IFK GÖteborg" },
        { id: 2, name: "Marcus Berg", position: "CF", team: "IFK GÖteborg" },
        { id: 3, name: "Oliver Berg", position: "COM", team: "Kalmar FF" },
        { id: 4, name: "Pontus Dahlberg", position: "GK", team: "IFK GÖteborg" },
        {id: 5, name: "Lionel Messi", position:"AT", team: "PSG"}
    ]
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/players", (req, res) => {
    res.send(players)
})
app.get("/players/:id", (req, res) => {
    playerId = Number(req.params.id)
    console.log(playerId)
    res.send(getPlayerById(playerId))
    
})


app.delete("/deleteplayer/:id", (req, res) => {
    removePlayerId = req.params.id
    deletePlayer(removePlayerId)
    res.send("Player " + req.params.id + " deleted")
    res.sendFile(__dirname + "/index.html")//
})

app.post("/addplayer", (req, res) => {
    addName = req.body.name
    addPosition = req.body.position
    addTeam = req.body.team
    addPlayer(addName, addPosition, addTeam)
    res.send("player "+ addName + " added")
});

// app.get("/update/:updateId/:addName/:addPosition/:addTeam", (req, res) => {
//     updateId = Number(req.params.updateId)
//     updateName = req.params.addName
//     updatePosition = req.params.addPosition
//     updateTeam = req.params.addTeam
//     res.send(updatePlayer(updateId, updateName, updatePosition, updateTeam))
// })

app.put("/update/:id", (req, res) => {
    updateId = req.params.id
    updateName = req.body.name
    updatePosition = req.body.position
    updateTeam = req.body.team
    res.send(updatePlayer(updateId,updateName,updatePosition,updateTeam))
})

function updatePlayer(updateId, updateName, updatePosition, updateTeam) {
    let idExist = false;
    for (var i = 0; i < players.allPlayers.length; i++) {
        if (updateId == players.allPlayers[i].id) {
            idExist = true;
            updatedPlayer = {id: updateId, name: updateName, position: updatePosition, team: updateTeam}
            players.allPlayers[i] = updatedPlayer
            return updatedPlayer
        }

    }
    if (idExist == false) {
        return "Id does not exist"
    }
}

function getPlayerById(playerId){

    console.log(playerId)
    let idExist = false;
    for (var i = 0; i < players.allPlayers.length; i++) {
        if (playerId == players.allPlayers[i].id) {
            idExist = true
            playerToReturn = players.allPlayers[i]
            return playerToReturn
            
            
        }
    }
    if (idExist == false) {
        return "Id " + playerId + " does not exist"
    }
}

function deletePlayer(removePlayerId) {

    let idExist = false;
    for (var i = 0; i < players.allPlayers.length; i++) {
        if (players.allPlayers[i].id == removePlayerId) {

            players.allPlayers.splice(i, 1)
            idExist = true;
            return "player deleted"
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

    players.allPlayers.push({ id: idValue + 1, name: addName, position: addPosition, team: addTeam })

    return players
}

app.listen(PORT, () => {
    console.log("listening to " + PORT)
    console.log(players)
})