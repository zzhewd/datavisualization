import * as types from "./actions_type";
import * as mutationTypes from "./mutations_type";
import * as nets from '../nets';

export default {
    async [types.GET_ALL_CHART_INFO]({ commit }, payLoad) {
        let result = await nets.getchartlist(payLoad)
        if (result.success) {
            commit(mutationTypes.MUTATE_FIRST_CHART_INFO, result.data);
        }
        return result;
    },
    [types.PUSH_DEL_WHICH_ONE]({ commit }, payLoad) {
        commit(mutationTypes.MUTATE_DEL_WHICH_ONE, payLoad);
    },
    async [types.GET_LINE_CHART_INFO]({ commit }, payLoad) {
        let result = await nets.getlinechart(payLoad)
        if (result.success) {
            commit(mutationTypes.MUTATE_LINE_CHART, result.data);
        }
        return result;
    },
    [types.SET_EIDT_CHART_INFO]({ commit }, payLoad) {
        commit(mutationTypes.MUTATE_EDIT_CHART, payLoad)
    }
};