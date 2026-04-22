window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
       movies.forEach(movie => {
            const article = document.createElement("article")
                        article.className = "movie"

                        const leftDiv = document.createElement("div")
                        leftDiv.className = "movie-left"

                        const heading = document.createElement("h2")
                        heading.textContent = movie.Title
                        leftDiv.appendChild(heading)

                        const poster = document.createElement("img")
                        poster.src = movie.Poster
                        poster.alt = `Poster for ${movie.Title}`;
                        leftDiv.appendChild(poster)

                        article.appendChild(leftDiv)

                        const rightDiv = document.createElement("div")
                        rightDiv.className = "movie-right"

                        const details = document.createElement("section");
                        details.className = "movie-details";

                        function addRow(label, value) 
                        {
                            const p = document.createElement("p");

                            const strong = document.createElement("strong");
                            strong.textContent = label + ": ";

                            const text = document.createTextNode(value ?? "");

                            p.appendChild(strong);
                            p.appendChild(text);

                            details.appendChild(p);
                        }

                          addRow("Released", movie.Released);
                          addRow("Runtime", movie.Runtime + " min");
                          addRow("Genre", movie.Genres ? movie.Genres.join(", ") : "");
                          addRow("Directors", movie.Directors ? movie.Directors.join(", ") : "");
                          addRow("Writers", movie.Writers ? movie.Writers.join(", ") : "");
                          addRow("Actors", movie.Actors ? movie.Actors.join(", ") : "");
                          addRow("Metascore", movie.Metascore);
                          addRow("IMDb Rating", movie.imdbRating);

                          rightDiv.appendChild(details);

                        const plot = document.createElement("p")
                        plot.className = "movie-plot"
                        plot.textContent = movie.plot || movie.Plot || "No plot available."
                        rightDiv.appendChild(plot)

                        const editButton = document.createElement('button')
                        editButton.textContent = 'Edit'
                        editButton.onclick = function() {
                          location.href = 'edit.html?imdbID=' + movie.imdbID
                        }
                        rightDiv.appendChild(editButton)


                        article.appendChild(rightDiv)

                        bodyElement.appendChild(article)

                        
                    
                    })
      

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
