import actionTypes from '../actionTypes';

export const changeTheme = newTheme => {
    // localStorage.setItem('theme', newTheme);

    return {
        type: actionTypes.THEME,
        payload: { theme: newTheme },
    }
}