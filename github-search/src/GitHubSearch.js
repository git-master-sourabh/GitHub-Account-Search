
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './GitHubSearch.css'; // Import the CSS file

// const GitHubSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setUsers([]);
//       return;
//     }

//     //const githubApiUrl = `https://api.github.com/search/users?q=${searchTerm}&sort=followers`;
//     const githubApiUrl = `https://api.github.com/search/users?q=${searchTerm}&page=1&per_page=10&sort=followers&order=desc`;


//     axios.get(githubApiUrl)
//       .then(response => {
//         setUsers(response.data.items);
//       })
//       .catch(error => {
//         console.error('Error fetching GitHub users:', error);
//       });
//   }, [searchTerm]);

//   return (
//     <div className="github-search-container">
//       <input
//         className="search-input"
//         type="text"
//         placeholder="Search for GitHub users by name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <table className="user-table">
//         <thead>
//           <tr>
//           <th>Avatar</th>
//             <th>Name</th>
//             {/* <th>Followers</th> */}
//             {/* Add more headers as needed */}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//                 <td>
//                 <img
//                   src={user.avatar_url}
//                   alt={`${user.login}'s avatar`}
//                   className="avatar"
//                 />
//               </td>
//               <td>{user.login}</td>
//               {/* <td>{user.followers}</td> */}
//               {/* Add more columns as needed */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GitHubSearch;


// GitHubSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GitHubSearch.css'; // Import the CSS file

const GitHubSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setUsers([]);
      return;
    }

    const perPage = 10; // Set the number of results per page
    const githubApiUrl = `https://api.github.com/search/users?q=${searchTerm}&sort=followers&page=${currentPage}&per_page=${perPage}`;

    axios.get(githubApiUrl)
      .then(response => {
        setUsers(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching GitHub users:', error);
      });
  }, [searchTerm, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="github-search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search for GitHub users by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            {/* <th>Followers</th> */}
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="avatar"
                />
              </td>
              <td>{user.login}</td>
              {/* <td>{user.followers}</td> */}
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default GitHubSearch;
