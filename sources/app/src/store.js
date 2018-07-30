import { createReduxStore } from '@craftercms/redux';
import { crafterConf } from '@craftercms/classes';

import thunk from "redux-thunk";

import { allReducers } from "./reducers";

crafterConf.configure({
    site: 'video-center'
})

const store = createReduxStore({
    namespace: "craftercms",
    namespaceCrafterState: true,
    reducerMixin: allReducers,
    reduxDevTools: true,
    additionalMiddleWare: [thunk]
});

export default store;