import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Followers = () => {
  const userLogin = useParams();
  const history = useHistory();
  const [followers, setFollowers] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorVariable, setError] = useState(false);

  const getFollowers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${userLogin.username}/followers`,
      );
      const data = await response.json();

      setFollowers(data);

      setLoading(false);
    } catch (error) {
      setError(`This error ${error} happened.`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFollowers();
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
          <div className="title-box p-5 text-center">{`${userLogin.username} 's Followers`}</div>
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
                followers &&
                followers.map((follower) => (
                  <div className="col-5 col-sm-3 col-lg-2 p-4 m-4">
                    <div className="d-flex flex-column text-center">
                      <div>
                        <img
                          className="img-thumbnail"
                          src={`${follower.avatar_url}`}
                          width="90"
                          alt={`${follower.login}`}
                        />
                      </div>
                      <div className="pb-2">
                        <Link to={`/user/${follower.login}`}>
                          {follower.login}
                        </Link>
                      </div>
                      <div className="pb-2">
                        <a
                          href={`${follower.html_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Profile on GitHub
                        </a>
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

export default Followers;
