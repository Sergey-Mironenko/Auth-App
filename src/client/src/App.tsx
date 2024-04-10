import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { refresh } from './api/requests';
import { Loader } from './Loader';
import { RoutesProvider } from './RoutesProvider';
import { actions as logedUserActions } from './features/logedUser';
import { actions as refreshActions } from './features/refreshError';
import { User } from './types/User';

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const setLogedUser = useCallback((user: User) => dispatch(logedUserActions.setLogedUser(user)), [dispatch]);
  const handleRefreshFail = useCallback(() => dispatch(refreshActions.handleRefreshFail()), [dispatch]);
  const [areBordersVisible, setAreBordersVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const timer: any = useRef(null);
  const animationCondition = pathname === '/'
    || pathname === '/error'
    || pathname === '/login+error'
    || pathname.split('/')[1] === 'activate';

  const checkAuth = useCallback(async () => {
    setIsChecked(false);

    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const { user, accessToken } = await refresh();
        
        localStorage.setItem('accessToken', accessToken);
        setLogedUser(user);
      } catch(e) {
        handleRefreshFail();
      } finally {
        setIsChecked(true);
      }
    } else {
      setIsChecked(true);
    }
  }, [setLogedUser, handleRefreshFail]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (animationCondition) {
      for (let i = 0; i <= 7; i++) {
        timer.current = setTimeout(() => {
    
        switch (i) {
          case 1:
          case 2:
          case 5:
          case 6:
            setAreBordersVisible(false);
            break;
          default:
            setAreBordersVisible(true);
            break;
          } 
        }, (i * 50))
      }  
    } else {
      setAreBordersVisible(true);
    }

    return () => clearTimeout(timer.current);
  }, [pathname, animationCondition]);

  return (
    <div className="App">
      <main
        className={classNames(
          'main',
          { 'main--withoutBorders': !areBordersVisible },
        )}
      >
        {!isChecked ? (
          <Loader />
        ) : (
          <RoutesProvider />
        )}
      </main>
    </div>
  )
};
