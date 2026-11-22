import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usersApi } from '../../api/users';

const OAuth2Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Fetch full user object so context/state is populated
      usersApi.getCurrentUser()
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate('/dashboard', { replace: true });
        })
        .catch(() => {
          navigate('/login?error=oauth_failed', { replace: true });
        });
    } else {
      navigate('/login?error=oauth_failed', { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
};

export default OAuth2Redirect;
