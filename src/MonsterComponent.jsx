import React, { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class MonsterComponent extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log("monsters", this.state.monsters);
          }
        )
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    console.log("render");

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <>
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onSearchChange={onSearchChange}
          placeholder="Search monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </>
    );
  }
}

export default MonsterComponent;
