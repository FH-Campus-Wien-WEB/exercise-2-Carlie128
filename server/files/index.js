window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
       movies.forEach(movie => {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
            const article = document.createElement("article")
                        article.className = "movie"

                        const heading = document.createElement("h2")
                        heading.textContent = movie.Title
                        article.appendChild(heading)

                        const poster = document.createElement("img")
                        poster.src = movie.Poster
                        poster.alt = `Poster for ${movie.Title}`
                        article.appendChild(poster)

                        const details = document.createElement("section")
                        details.className = "movie-details"
                        details.innerHTML = `
                            <p><strong>Released:</strong> ${movie.Released}</p>
                            <p><strong>Runtime:</strong> ${movie.Runtime} min</p>
                            <p><strong>Genre:</strong> ${movie.Genres ? movie.Genres.join(', ') : ''}</p>
                            <p><strong>Directors:</strong> ${movie.Directors ? movie.Directors.join(', ') : ''}</p>
                            <p><strong>Writers:</strong> ${movie.Writers ? movie.Writers.join(', ') : ''}</p>
                            <p><strong>Actors:</strong> ${movie.Actors ? movie.Actors.join(', ') : ''}</p>
                            <p><strong>Metascore:</strong> ${movie.Metascore}</p>
                            <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                        `
                        article.appendChild(details)

                        const plot = document.createElement("p")
                        plot.className = "movie-plot"
                        plot.textContent = movie.Plot
                        article.appendChild(plot)

                        const editButton = document.createElement("button")
                        editButton.textContent = "Edit"
                        editButton.className = "edit-button"

                        article.appendChild(editButton)

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
