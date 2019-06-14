import * as types from "./mutations_type";

export default {
    [types.MUTATE_FIRST_CHART_INFO](state, payLoad) {
        state.firCharInfo.push(payLoad);
    },
    [types.MUTATE_DEL_WHICH_ONE](state, payLoad) {
        state.delText = payLoad;
    },
    [types.MUTATE_LINE_CHART](state, payLoad) {
        state.lineChart.push(payLoad)
    },
    [types.MUTATE_EDIT_CHART](state, payLoad) {
        state.editChartInfo = payLoad
    }
};
