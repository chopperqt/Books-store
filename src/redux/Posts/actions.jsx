const actions = {
    LOAD_FROM_DATA: 'LOAD_FROM_DATA',
    ADD_ITEM_TO_DATA: "ADD_ITEM_TO_DATA",

    loadFromDataPosts: () => {
        return {type: actions.LOAD_FROM_DATA}
    },
    addItemToData: (item) => {
        return {type: actions.ADD_ITEM_TO_DATA, payload: item}
    }
}

export default actions;