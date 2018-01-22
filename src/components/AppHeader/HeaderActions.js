import {database} from "../../database";
import {fetchAllThreads} from "../ThreadFetcher/ThreadFetcherActions";

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const SYNC_DATA = 'SYNC_DATA';

export function toggleMenu() {
    return {
        type: TOGGLE_MENU,
    }
}

export function syncData() {
    return async dispatch => {
        console.log(database);

        await dispatch(fetchAllThreads());

        console.log('finished fetching all');

        return {
            type: SYNC_DATA,
        }
    }
}
