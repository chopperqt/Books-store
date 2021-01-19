const actions = {
    HEADER_FULLSCREEN_MODE: 'HEADER_FULLSCREEN_MODE',
    HEADER_LOWSCREEN_MODE: 'HEADER_LOWSCREEN_MODE',

    actionHeaderFullScreen() {
        return {type: actions.HEADER_FULLSCREEN_MODE}
    },
}

export default actions;
