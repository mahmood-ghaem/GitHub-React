import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Repositories = () => {
  const userLogin = useParams();
  const history = useHistory();
  const [repos, setRepos] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorVariable, setError] = useState(false);

  const getRepositories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${userLogin.username}/repos`,
      );
      const data = await response.json();

      setRepos(data);

      setLoading(false);
    } catch (error) {
      setError(`This error ${error} happened.`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getRepositories();
  }, []);
  const goBackHandle = () => {
    history.goBack();
  };
  return (
    <div>
      <div className="mb-5">
        <button
          type="button"
          className="btn btn-link back-btn"
          onClick={goBackHandle}
        >
          Go back
        </button>
      </div>

      <div className="col-12">
        <div className="main-box">
          <div className="title-box p-5 text-center">{`${userLogin.username} 's Repositories`}</div>
          <div className="text-box p-4">
            <div className="d-flex flex-wrap justify-content-around">
              {loading && (
                <div className="text-center">
                  <img src="../images/ajax-loader.gif" alt="loading" />
                  <div>Loading...</div>
                </div>
              )}
              {errorVariable && <div>{errorVariable}</div>}
              {!errorVariable &&
                repos &&
                repos.map((repo) => (
                  <div className="col-12 col-sm-10 col-xl-5 repo-box p-4 m-4">
                    <div className="d-flex flex-column text-center">
                      <div className="pb-2">Repository name: {repo.name}</div>
                      <div className="pb-2">Language: {repo.language}</div>
                      <div className="pb-2">Last update: {repo.updated_at}</div>
                      <a
                        href={`${repo.html_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Repository
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
