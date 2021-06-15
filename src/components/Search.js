import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [user, setUser] = useState('');
  const [inputUser, setInputUser] = useState();
  const [loading, setLoading] = useState(false);
  const [errorVariable, setError] = useState(false);

  const getUser = async ({ inputUser }) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${inputUser}`);
      const data = await response.json();

      setUser(data);

      setLoading(false);
    } catch (error) {
      setError(`This error ${error} happened.`);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="text-center">
        <div>
          <input
            name="name"
            type="text"
            onChange={(e) => {
              setInputUser(e.target.value);
            }}
            className="first-name-input"
            placeholder="GitHub User Name..."
            autoComplete="off"
          />
          <button
            className="search-github-button"
            type="submit"
            onClick={() => {
              getUser({ inputUser });
            }}
          >
            Search GitHub Account
          </button>
        </div>
        <div className="primary-link m-5">
          <Link to="/trend">Visit Trend Repositories</Link>
        </div>
        {loading && (
          <div className="text-center">
            <img src="../images/loader-black.gif" alt="loading" />
          </div>
        )}
      </div>
      {errorVariable && <div>{errorVariable}</div>}
      {!errorVariable && user && (
        <div className="col-12">
          <div className="main-box">
            <div className="title-box p-5 text-center">Search Result</div>
            <div className="text-box p-4">
              <div className="repo-box p-4 m-4">
                <div className="d-flex flex-column text-center">
                  <div>
                    <img
                      className="img-thumbnail"
                      src={`${user.avatar_url}`}
                      width="90"
                      alt={`${user.name}`}
                    />
                  </div>
                  <div className="pb-2">{user.name}</div>
                  <Link to={`/user/${user.login}`}>Show Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
