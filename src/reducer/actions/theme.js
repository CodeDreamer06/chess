import actionTypes from '../actionTypes';

export const changeTheme = newTheme => {
    return {
        type: actionTypes.THEME,
        payload: { theme: newTheme },
    }
}