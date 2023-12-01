import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const ROUTE = "http://localhost:8080/";

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      /*
      [Change this if using API]
      url: `${ROUTE}/usuario/${values.id}`,
      method: "get",
      isMock: false,
      params: queryParams
      */
      url: `/usuario/${values.id}`,
      method: "get",
      isMock: true,
      mockResult: usersMock.find((u) => u.id === values.id) ?? null,
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ user: response.data });
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      /*
      [Change this if using API]
      url: `${ROUTE}/usuario/${values.id}`,
      method: "put",
      isMock: false,
      params: queryParams,
      data: body
      */
      url: `/usuario/${id}`,
      method: "put",
      body: values,
      isMock: true,
      mockResult: {},
    });
  },
  postSuccess: function* () {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (id) => {
    return request({
      /*
      [Change this if using API]
      url: `${ROUTE}/usuario/${values.id}`,
      method: "delete",
      isMock: false,
      params: queryParams
      */
      url: `/usuario/${id}`,
      method: "delete",
      isMock: true,
      mockResult: usersMock.filter((u) => u.id !== id),
    });
  },
  postSuccess: function* () {
    console.log("deleted");
  },
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  deleteUser.watcher(),
];
