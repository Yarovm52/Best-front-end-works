const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");


function changeLayout(artist) {
  const heading = document.querySelector("#selected-artist");
  const table = document.querySelector('#songs');

  heading.innerHTML = "";
  table.innerHTML = "";

  const container = document.createElement('div');
  container.innerHTML += artist.name + " ";
  container.innerHTML += '(';
  artist.urls.map(function (url, index) {
    const link = document.createElement('a');
    link.href = url.url;
    if (index === artist.urls.length - 1) {
      link.textContent = url.name;
    } else {
      link.textContent = url.name + ", ";
    }
    container.appendChild(link);
  })
  container.innerHTML += ')';
  heading.appendChild(container);

  const currentSongs = songs.filter((song) => song.artistId === artist.artistId);
  const nonExplicitSongs = currentSongs.filter((song) => song.explicit == false);

  nonExplicitSongs.forEach(song => {
    const { title, url, year, duration } = song;

    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.textContent = title;
    name.appendChild(link);

    const yearCell = document.createElement('td');
    yearCell.textContent = year;
    yearCell.addEventListener('click', () => {
      console.log(year);
    });

    const durationCell = document.createElement('td');
    durationCell.textContent = duration;

    tr.appendChild(name);
    tr.appendChild(yearCell);
    tr.appendChild(durationCell);

    table.appendChild(tr);
  });
}

window.addEventListener("load", function () {
  const base = document.querySelector("#menu");
  artists.map(function (artist) {
    const button = document.createElement('button');
    button.textContent = artist.name;
    button.onclick = function () {
      changeLayout(artist);
    };
    base.append(button);
  })
})

window.addEventListener("load", function () {
  const root = this.document.getElementById('song-cards');
  songs.forEach(function (song) {
    const card = createCard(song);
    root.appendChild(card);
  });
});

function createCard(songInfo) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card-image');
  // Set the 'src' attribute of the image from the provided object
  cardImage.src = songInfo.imageUrl;
  cardDiv.appendChild(cardImage);

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const cardLeft = document.createElement('div');
  cardLeft.classList.add('card-left');

  const heading = document.createElement('h1');
  heading.classList.add('card-heading');
  heading.textContent = songInfo.title;
  cardLeft.appendChild(heading);

  const singerPara = document.createElement('p');
  singerPara.classList.add('card-singer');
  singerPara.textContent = `${artists.find((artist) => artist.artistId == songInfo.artistId).name}`; // Assuming 'artistId' represents the singer
  cardLeft.appendChild(singerPara);

  const yearPara = document.createElement('p');
  yearPara.classList.add('card-year');
  yearPara.textContent = `(${songInfo.year})`;
  cardLeft.appendChild(yearPara);

  cardContent.appendChild(cardLeft);

  const cardRight = document.createElement('div');
  cardRight.classList.add('card-right');
  const linkDiv = document.createElement('div');
  linkDiv.classList = "card-badge";
  const link = document.createElement('a');
  link.href = songInfo.url;
  link.textContent = `YouTube (${songInfo.duration})`;
  link.classList = "card-anchor";
  linkDiv.appendChild(link);
  cardRight.appendChild(linkDiv);

  explicitWarning = document.createElement('div');
  explicitWarning.classList = "explicit-warning";
  explicitWarning.textContent = "EXPLICIT";
  if (songInfo.explicit) {
    cardContent.appendChild(explicitWarning);
  }

  cardContent.appendChild(cardRight);

  cardDiv.appendChild(cardContent);

  return cardDiv;
}

