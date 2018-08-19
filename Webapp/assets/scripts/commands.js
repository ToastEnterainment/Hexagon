// https://open.spotify.com/search/results/Ofenbach

class Song {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }
}

let songs = [
    new Song("Imagine Dragons - Natural", "12:03"),
    new Song("Adele - Hello", "2:33"),
    new Song("Marshmello ft. Anne Marie - FRIENDS (Official friendzone anthem)", "5:01"),
    new Song("Imagine Dragons - Thunder", "3:01"),
    new Song("Sigala - Lullabay", "4:29"),
    new Song("Betta Lemme - Bambola", "4:12")
]


document.addEventListener("DOMContentLoaded", () => {
    let table = document.querySelector("table.songs");

    for (let a in songs) {
        let tr = document.createElement("tr");

        let pos = document.createElement("td");
        pos.appendChild(document.createTextNode(parseInt(a) + 1));

        let name = document.createElement("td");
        name.appendChild(document.createTextNode(songs[a].name));

        let duration = document.createElement("td");
        duration.appendChild(document.createTextNode(songs[a].duration));

        let actions = document.createElement("td");
        let actdiv = document.createElement("div");
        actdiv.classList.add("actions");
        let query = songs[a].name.split(" ");
        actdiv.innerHTML = `
            <i class="material-icons" onclick="remove_song(this.parentElement.parentElement);">clear</i>
            <a href="https://open.spotify.com/search/results/${query.join("%20")}" class="spotifysearch" target="_blank"></a>
            <a href="https://www.youtube.com/results?search_query=${query.join("+")}" class="ytsearch" target="_blank"></a>`;
        actions.appendChild(actdiv);

        // actions.appendChild(document.createTextNode("Acions..."));

        tr.appendChild(pos);
        tr.appendChild(name);
        tr.appendChild(duration);
        tr.appendChild(actions);
        table.appendChild(tr);
    }
});
