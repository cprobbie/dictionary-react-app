import { createTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react';
import "./Header.css";
import categories from '../../data/category';
import { debounce } from "lodash";


const Header = ({
  setCategory,
  category,
  word,
  setWord,
  setMeanings,
  LightMode
}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: LightMode ? "#000" : '#fff'
      },
      type: LightMode ? "light" : "dark"
    }
  });

  const handleChange = (e) => {
    setCategory(e.target.value);
    setWord("");
    setMeanings([]);
  }

  const handleText = debounce((text) => {
    setWord(text);
  }, 50);

  return (
    <div className='header'>
      <span className='title'>{word?word:"Dictionary"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            label="Search a word"
            value={word}
            onChange={(e)=>handleText(e.target.value)}
          />
          <TextField
            className="select"
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value ={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default Header;