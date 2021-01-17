const actions = {
    OPEN_FULL_MENU: 'OPEN_FULL_MENU',
    OPEN_SHORT_MENU: 'OPEN_SHORT_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
    INITIAL_MENU: "INITIAL_MENU",


    actionInitialMenu() {
        return {type: actions.INITIAL_MENU}
    },
    actionOpenFullMenu(item) {
        if (item === 1) {
            return {type: actions.OPEN_FULL_MENU, payload: item + 1}
        }else {
            if (item === 2) {
                return {type: actions.OPEN_SHORT_MENU, payload: item + 1}
            }else {
                return {type: actions.CLOSE_MENU, payload: 1}
            }
        }
        
    }

}

export default actions;