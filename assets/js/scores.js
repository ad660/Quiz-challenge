

function displayResults() {
    var scoreArray = JSON.parse(localStorage.getItem("endTime")) || []
    for (var i = 0 ; i < scoreArray.length ; i++) {
        var scoreItem = document.createElement("li")
        scoreItem.textContent = scoreArray[i].name + ": " + scoreArray[i].score
        var list = document.querySelector("#highscores")
        list.append(scoreItem)
    }
}

displayResults()