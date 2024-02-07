import React, { useState } from "react";
import { CSVLink } from "react-csv";
import "./buttonStyles.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

const Movies = ({ Movies }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const tableCellStyle = {
    border: "1px solid black",
    padding: "8px",
  };

  const columnConfig = [
    { key: "title", title: "Title", tooltip: "Movie Title" },
    {
      key: "genre",
      title: "Genre",
      tooltip:
        "Genre of the movie",
    },
    {
      key: "releaseDate",
      title: "Release Date ",
      tooltip: "Release date of the movie",
    },
    {
      key: "about",
      title: "About",
      tooltip: " Movie description",
    },
    {
      key: "imdbrating",
      title: "IMDB Rating",
      tooltip: "IMDB Rating",
    },
    { key: "motionPictureRating", title: "Motion Picture Rating", tooltip: "Motion Picture Rating" },
    {
      key: "metascore",
      title: "Metascore",
      tooltip: "Metascore",
    },
    {
      key: "director",
      title: "Director",
      tooltip: "Director",
    },
    {
      key: "writer",
      title: "Writer",
      tooltip: "Writer",
    },
    {
      key: "runtime",
      title: "Runtime",
      tooltip: "Movie Runtime",
    },
    {
      key: "topCast",
      title: "Top Cast",
      tooltip: "Top Cast in movie",
    },
  ];

  const sortedMovies = [...Movies].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    } else {
      return aValue - bValue;
    }
  });

  if (sortConfig.direction === "desc") {
    sortedMovies.reverse();
  }

  const csvData = sortedMovies.map((moviesItem) => {
    const csvItem = {};
    columnConfig.forEach((column) => {
      csvItem[column.title] = moviesItem[column.key];
    });
    return csvItem;
  });

  const jsonData = JSON.stringify(Movies, null, 2);
  const jsonBlob = new Blob([jsonData], { type: "application/json" });
  const jsonUrl = URL.createObjectURL(jsonBlob);

  return (
    <div className="table-container" style={{ width: "500px" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columnConfig.map((column) => (
              <th key={column.key} style={tableCellStyle}>
                <Tooltip title={column.tooltip}>
                  <button
                    className="button"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.title}
                    {sortConfig.key === column.key && (
                      <span>
                        {sortConfig.direction === "asc" ? "\u2303" : "\u2304"}
                      </span>
                    )}
                  </button>
                </Tooltip>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedMovies.map((moviesItem, index) => (
            <tr key={index}>
              {columnConfig.map((column) => (
                <td key={column.key} style={tableCellStyle}>
                  {moviesItem[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <CSVLink data={csvData} filename="movies_data.csv">
          Download CSV
        </CSVLink>
      </div>
      <div style={{ marginTop: "10px" }}>
        <a href={jsonUrl} download="movies_data.json">
          Download JSON
        </a>
      </div>
    </div>
  );
};


export default Movies;
