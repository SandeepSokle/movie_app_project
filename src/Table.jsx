import React from "react";

class Table extends React.Component {
  state = {
    allMovies: [],
    currPage: 1,
  };

  componentDidMount() {
    fetch("https://movie-app-yzek.onrender.com/movies")
      .then(function (res) {
        return res.json();
      })
      .then((json) => {
        this.setState({ allMovies: json });

        this.props.sendData(json.length);
      });
  }

  render() {
    let moviesToDisplay = [];

    if (this.props.currGenre !== "All Genre") {
      moviesToDisplay = this.state.allMovies.filter((el) => {
        return el.genre.name === this.props.currGenre;
      });
    } else {
      moviesToDisplay = this.state.allMovies;
    }

    if (this.props.searchString) {
      let strToCompare = this.props.searchString.toLowerCase();

      moviesToDisplay = moviesToDisplay.filter((el) => {
        return el.title.toLowerCase().includes(strToCompare);
      });
    }

    let numberOfPages = Math.ceil(moviesToDisplay.length / 5);
    let arr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      arr.push(i);
    }

    let starting = (this.state.currPage - 1) * 5;
    let ending = this.state.currPage * 5 - 1;

    moviesToDisplay = moviesToDisplay.slice(
      starting,
      Math.min(ending, moviesToDisplay.length - 1) + 1
    );

    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {moviesToDisplay.map((el) => {
              return (
                <tr key={el._id}>
                  <td>{el.title}</td>
                  <td>{el.genre.name}</td>
                  <td>{el.numberInStock}</td>
                  <td>{el.dailyRentalRate}</td>
                  <td
                    onClick={() => {
                      let allMovies = this.state.allMovies;

                      let index = allMovies.findIndex((e) => e._id === el._id);

                      allMovies[index].liked
                        ? (allMovies[index].liked = false)
                        : (allMovies[index].liked = true);

                      this.setState({ allMovies: allMovies });
                    }}
                  >
                    {el.liked ? "Liked!" : "Like"}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => {
                        let allMovies = this.state.allMovies;

                        allMovies = allMovies.filter((eli) => {
                          return eli._id !== el._id;
                        });

                        this.props.sendData(allMovies.length);

                        this.setState({ allMovies: allMovies });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              onClick={() => {
                let currPage = this.state.currPage;
                currPage--;
                if (currPage < 1) currPage = 1;
                this.setState({ currPage: currPage });
              }}
            >
              <span class="page-link" href="#">
                Previous
              </span>
            </li>

            {arr.map((el) => {
              return (
                <li
                  class="page-item"
                  onClick={() => {
                    this.setState({ currPage: el });
                  }}
                >
                  <span class="page-link" href="#">
                    {el}
                  </span>
                </li>
              );
            })}

            <li
              class="page-item"
              onClick={() => {
                let currPage = this.state.currPage;
                currPage++;
                if (currPage > numberOfPages) currPage = numberOfPages;
                this.setState({ currPage: currPage });
              }}
            >
              <span class="page-link" href="#">
                Next
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Table;
