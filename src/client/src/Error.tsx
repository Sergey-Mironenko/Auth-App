import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actions as refreshErrorActions } from './features/refreshError';
import classNames from 'classnames';

export const Error = ({ errorMessage = "Oops, 404 :(" }) => {
  const dispatch = useDispatch();
  const removeRefreshError = () => dispatch(refreshErrorActions.removeRefreshError());
  const message = errorMessage;
  const [text, setText] = useState('A');
  const [isButtonVisible, setIisButtonVisible] = useState(false);
  let timer: any = useRef(null);
  
  useEffect(() => {
    for (let i = 2; i <= message.length + 1; i++) {
      timer.current = setTimeout(() => {
        setText(message.slice(0, i));
  
        if (i === message.length + 1) {
          setIisButtonVisible(true);
        }
      }, (i * 70))
    }
  
    return () => {
      clearTimeout(timer.current);
      removeRefreshError();
    };
  }, [message, removeRefreshError]);
  
  return (
    <>
      <h4 className="main__title">{text}</h4>

      <div className="main__container">
        <NavLink
          className={classNames(
            'main__button',
            { 'main__button--enabled': isButtonVisible},
          )}
          to="/"
        >
          Back to app
        </NavLink>        
      </div>
    </>
  )
};
 