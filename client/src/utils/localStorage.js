export const getSavedViceIDs = () => {
    const savedViceIDs = localStorage.getItem('saved_vice_ids') ?
        JSON.parse(localStorage.getItem('saved_vice_ids')) : [];

    return savedViceIDs;
};

export const localSavedViceIDs = (viceIDArr) => {
    if (viceIDArr.length) {
        localStorage.setItem('saved_vice_ids', JSON.stringify(viceIDArr));
    } else {
        localStorage.removeItem('saved_vice_ids');
    }
};

export const removeViceIDs = (vice_id) => {
    const savedViceIDs = localStorage.getItem('saved_vice_ids') ?
        JSON.parse(localStorage.getItem('saved_vice_ids')) :
        null;

    if (!savedViceIDs) {
        return false;
    }

    const updatedViceIDs = savedViceIDs?.filter((savedViceID) => savedViceID !== vice_id);
    localStorage.setItem('saved_vice_ids', JSON.stringify(updatedViceIDs));

    return true;
};