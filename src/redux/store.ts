import { createStore, applyMiddleware, compose } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import { AppState, ToastMessage, User } from "../typings";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const initState: AppState = {
    product: {
        inCart: [],
        list: [],
    },
    ui: {
        toast: {} as ToastMessage,
    },
    user: {
        list: [],
        currentUser: {} as User,
        token: "",
    },
};

export default function makeStore(initialState = initState) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, thunk];
    let composeEnhancers = compose;
    // localStorage.clear();
    // const localState = AsyncStorage.getItem("initState");
    // localState && (initialState = JSON.parse(localState));
    // if (process.env.NODE_ENV === "development") {
    //     if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    //         composeEnhancers = (window as any)
    //             .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    //     }
    // }

    const store = createStore(
        createRootReducer(),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    sagaMiddleware.run(rootSaga);

    if ((module as any).hot) {
        (module as any).hot.accept("./reducers", () => {
            const nextReducer = require("./reducers").default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
