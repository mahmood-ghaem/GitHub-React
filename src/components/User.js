import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

const User = () => {
  const userLogin = useParams();
  const history = useHistory();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorVariable, setError] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${userLogin.username}`,
      );
      const data = await response.json();

      setUser(data);

      setLoading(false);
    } catch (error) {
      setError(`This error ${error} happened.`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
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
      {loading && (
        <div className="text-center">
          <img src="../images/loader-black.gif" alt="loading" />
        </div>
      )}
      {errorVariable && <div>{errorVariable}</div>}
      {!errorVariable && user && (
        <div className="col-12">
          <div className="main-box">
            <div className="title-box p-5 text-center">{user.login}</div>
            <div className="text-box p-4">
              <div>
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
                    <div className="pb-2">{user.bio}</div>
                    <Link to={`/followers/${user.login}`}>
                      Followers: {user.followers}
                    </Link>
                    <Link to={`/following/${user.login}`}>
                      Following: {user.following}
                    </Link>
                    <Link to={`/repositories/${user.login}`}>
                      Repositories: {user.public_repos}
                    </Link>
                    <a
                      href={`${user.html_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
