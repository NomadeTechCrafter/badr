import { fromJS } from "immutable";
import {
  SIGNUP_SUCCESS,
  GET_SIGNUP,
  SENDVERIFCODE_SUCCESS_SIGNUP,
  GET_SENDVERIFCODE_SIGNUP,
  SIGNUP_NOTFOUND,
  SIGNUP_TIMEOUT,
  SIGNUP_NOTCONNECTED,
  SIGNUP_ERROR,
  SENDVERIFCODE_TIMEOUT_SIGNUP,
  SENDVERIFCODE_NOTFOUND_SIGNUP,
  SENDVERIFCODE_NOTCONNECTED_SIGNUP,
  SENDVERIFCODE_ERROR_SIGNUP
} from "../../data/types";

const INITIAL_STATE = fromJS({
  data: {},
  isLoading: false,
  error: "",
  status: "initial",
  dataCode: {},
  isLoadingCode: false,
  errorCode: "",
  statusCode: "initial"
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SIGNUP:
      return state.withMutations(ctx => {
        ctx.setIn(["isLoading"], true);
        ctx.setIn(["status"], "loading");
        ctx.setIn(["isLoadingCode"], false);
        ctx.setIn(["errorCode"], "");
        ctx.setIn(["statusCode"], "initial");
        ctx.setIn(["dataCode"], {});
      });
    case SIGNUP_SUCCESS:
      return state.withMutations(ctx => {
        ctx.setIn(["data"], action.result);
        ctx.setIn(["isLoading"], false);
        ctx.setIn(["error"], "No errors");
        ctx.setIn(["status"], "success");
      });
    case SIGNUP_ERROR:
      return state.withMutations(ctx => {
        ctx.set("isLoading", false);
        ctx.set("status", "SIGNUP_ERROR");
        ctx.set("error", "SIGNUP_ERROR");
      });
    case SIGNUP_NOTCONNECTED:
      return state.withMutations(ctx => {
        ctx.set("isLoading", false);
        ctx.set("status", "SIGNUP_NOTCONNECTED");
        ctx.set("error", "SIGNUP_NOTCONNECTED");
      });
    case SIGNUP_NOTFOUND:
      return state.withMutations(ctx => {
        ctx.set("isLoading", false);
        ctx.set("status", "SIGNUP_NOTFOUND");
        ctx.set("error", "SIGNUP_NOTFOUND");
      });
    case SIGNUP_TIMEOUT:
      return state.withMutations(ctx => {
        ctx.set("isLoading", false);
        ctx.set("status", "SIGNUP_TIMEOUT");
        ctx.set("error", "SIGNUP_TIMEOUT");
      });

    case GET_SENDVERIFCODE_SIGNUP:
      return state.withMutations(ctx => {
        ctx.setIn(["isLoadingCode"], true);
        ctx.setIn(["statusCode"], "loading");
        ctx.setIn(["isLoading"], false);
        ctx.setIn(["error"], "");
        ctx.setIn(["status"], "initial");
        ctx.setIn(["data"], {});
      });
    case SENDVERIFCODE_SUCCESS_SIGNUP:
      return state.withMutations(ctx => {
        ctx.setIn(["dataCode"], action.result);
        ctx.setIn(["isLoadingCode"], false);
        ctx.setIn(["errorCode"], "No errors");
        ctx.setIn(["statusCode"], "success");
      });
    case SENDVERIFCODE_ERROR_SIGNUP:
      return state.withMutations(ctx => {
        ctx.set("isLoadingCode", false);
        ctx.set("statusCode", "SENDVERIFCODE_ERROR_SIGNUP");
        ctx.set("errorCode", "SENDVERIFCODE_ERROR_SIGNUP");
      });
    case SENDVERIFCODE_NOTCONNECTED_SIGNUP:
      return state.withMutations(ctx => {
        ctx.set("isLoadingCode", false);
        ctx.set("statusCode", "SENDVERIFCODE_NOTCONNECTED_SIGNUP");
        ctx.set("errorCode", "SENDVERIFCODE_NOTCONNECTED_SIGNUP");
      });
    case SENDVERIFCODE_NOTFOUND_SIGNUP:
      return state.withMutations(ctx => {
        ctx.set("isLoadingCode", false);
        ctx.set("statusCode", "SENDVERIFCODE_NOTFOUND_SIGNUP");
        ctx.set("errorCode", "SENDVERIFCODE_NOTFOUND_SIGNUP");
      });
    case SENDVERIFCODE_TIMEOUT_SIGNUP:
      return state.withMutations(ctx => {
        ctx.set("isLoadingCode", false);
        ctx.set("statusCode", "SENDVERIFCODE_TIMEOUT_SIGNUP");
        ctx.set("errorCode", "SENDVERIFCODE_TIMEOUT_SIGNUP");
      });
    default:
      return state;
  }
};
