const actions = {
    OPEN_FULL_MENU: 'OPEN_FULL_MENU',
    OPEN_SHORT_MENU: 'OPEN_SHORT_MENU',
    CLOSE_MENU: 'CLOSE_MENU',
    INITIAL_MENU: "INITIAL_MENU",
    SET_HISTORY_TYPE: "SET_HISTORY_TYPE",

    actionInitialMenu() {
        return {type: actions.INITIAL_MENU}
    },
    actionDasboardOpen(number) {
        return {type: actions.OPEN_FULL_MENU, payload: number}
    },
    actionOpenFullMenu(item) {
        if (item === 0) {
            return {type: actions.CLOSE_MENU, payload: 0}
        }else {
            return {type: actions.OPEN_FULL_MENU, payload: 1}
        }
    },
    actionSetHistoryType(name) {
        return {type: actions.SET_HISTORY_TYPE, payload: name}
    }
}

export default actions;