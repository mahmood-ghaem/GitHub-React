import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Trend = () => {
  const history = useHistory();
  const [trendRepo, setTrendRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorVariable, setError] = useState(false);

  const getTrendRepositories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        //`https://api.trending-github.com/github/repositories?spokenLanguage=en&language=JavaScript&period=weekly`,
        `https://api.trending-github.com/github/repositories`,
      );
      const data = await response.json();

      setTrendRepo(data);

      setLoading(false);
    } catch (error) {
      setError(`This error ${error} happened.`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTrendRepositories();
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
          <div className="title-box p-5 text-center">Trend Repositories</div>
          <div className="text-box p-4">
            <div>
              {loading && (
                <div className="text-center">
                  <img src="../images/ajax-loader.gif" alt="loading" />
                  <div>Loading...</div>
                </div>
              )}
              {errorVariable && <div>{errorVariable}</div>}
              {!errorVariable &&
                trendRepo &&
                trendRepo.map((repo) => (
                  <div className="repo-box p-4 m-4" key={repo.author}>
                    <div className="d-flex">
                      <div className="me-5">
                        <div className="text-center">
                          <Link to={`/user/${repo.author}`}>
                            <img
                              className="img-thumbnail"
                              src={`${repo.avatar}`}
                              width="90"
                              alt={`${repo.author}`}
                            />
                            <div className="pb-2">{repo.author}</div>
                          </Link>
                        </div>
                        <div
                          style={{
                            width: '100px',
                            color: 'white',
                            textAlign: 'center',
                            padding: '3px',
                            fontSize: '0.8em',
                            backgroundColor: `${repo.langColor}`,
                          }}
                        >
                          {repo.language}
                        </div>
                        <div className="pt-2">Stars: {repo.stars}</div>
                        <div className="pt-2">Forks: {repo.forks}</div>
                      </div>
                      <div
                        className="d-flex flex-column justify-content-between"
                        style={{
                          width: '100%',
                        }}
                      >
                        <div className="text-center p-3">
                          <h3>{repo.name}</h3>
                        </div>
                        <div>{repo.description}</div>
                        <div className="text-end">
                          <a
                            href={`${repo.url}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Visit Repository
                          </a>
                        </div>
                      </div>
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

export default Trend;
