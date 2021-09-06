import React from "react";


class Category extends React.Component {
  state = {
    allGenre: ["Action", "Comedy", "Romance", "Thriller", "Horror"],
  };

  componentDidMount() {
    //api call(msg bhejna=> get)
    fetch("https://movieappapisokle.herokuapp.com/genre")
      .then(function (res) {
        return res.json();
      })
      .then((json) => {
        this.setState({ allGenre: json });
      });
  }

  render() {
    return (
      <ul className="list-group">
        <li
          className="list-group-item"
          key="allgenre"
          onClick={() => {
            this.props.receiveCurrGenre("All Genre");
          }}
        >
          All Genres
        </li>

        {this.state.allGenre.map((el) => {
          return (
            <li
              className="list-group-item"
              key={el._id}
              onClick={() => {
                this.props.receiveCurrGenre(el.name);
              }}
            >
              {el.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Category;