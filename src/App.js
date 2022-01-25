import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

// Principal component; It renders all the application and includes another components.
const App = () => {
  // The variable recipes contains all the recipes given by the API. Inicialized by default empty.
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  // This function invoke getRecipes() the first time you load the page.
  useEffect(() => {
    getRecipes();
  }, [query]);

  // It makes the request to the API and save data in the recipes array.
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=266f7907&app_key=2e3829ff65c5e08b6f7878819cd37398&from=0&to=3&calories=591-722&health=alcohol-free`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  // Renders the bla bla bla
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
