import "./FakeReviewStyle.css";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ThirdMainContainer() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 2;

  useEffect(() => {
    // Fetch comments from JSONPlaceholder API
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        // Set the comments state with the fetched data
        setComments(
          data.map((comment, index) => ({
            ...comment,
            rating: Math.floor(Math.random() * 5) + 1, // Generate random rating between 1 and 5
            index: index + 1, // Add an index property to each comment for pagination
          }))
        );
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // Calculate the index of the last comment on the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  // Calculate the index of the first comment on the current page
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  // Get the comments to display on the current page
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Function to handle changing the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ThirdMainContainer">
      <div className="Reviews full">
        {/* Map through the comments array and render each comment */}
        {currentComments.map((comment) => (
          <div key={comment.id} className="review">
            <div className="rating">
              {/* Render star icons based on random rating */}
              {[...Array(comment.rating)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} color="#ffc107" />
              ))}
            </div>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
            <p className="info">
              <span className="email">{comment.email}</span>
              <span className="date">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {commentsPerPage < comments.length && (
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        )}
        {currentComments.length > 0 && (
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastComment >= comments.length}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default ThirdMainContainer;
