import echarts from "echarts";
import {
    countNumber
} from './index';

var linchartResize = [],
    piechartResize = [],
    barchartResize = []

const lineChart = params => {
    return new line(params);
};

function line(params) {
    this.init(params);
}
line.prototype = {
    init: function(params) {
        var options = [];
        this.lineChartArr = params;
        for (var i = 0; i < params.length; i++) {
            options.push({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '20%',
                    bottom: '15%'
                },
                xAxis: {
                    type: "category",
                    data: params[i].xData,
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                series: (function() {
                    var series = [];
                    for (var j = 0; j < params[i].seriesData.length; j++) {
                        if (params[i].chartDetailType === "singleLine") {
                            var item = {
                                data: params[i].seriesData[j].data,
                                type: "line",
                                itemStyle: {
                                    color: params[i].chartColor[0]
                                },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: params[i].chartColor[0]
                                        },
                                        {
                                            offset: 0.4,
                                            color: params[i].chartColor[1]
                                        },
                                        {
                                            offset: 1,
                                            color: "#fff"
                                        }
                                    ])
                                },
                                symbol: null,
                                symbolSize: 0
                            };
                            series.push(item);
                        }
                        if (params[i].chartDetailType === "doubleLine") {
                            var item = {
                                data: params[i].seriesData[j].data,
                                type: "line",
                                itemStyle: {
                                    color: params[i].seriesData[j].color
                                },
                                symbol: null,
                                symbolSize: 0
                            };
                            series.push(item);
                        }
                    }
                    return series;
                })()
            });
        }
        this.setLinechart(options);
    },
    setLinechart: function(options) {
        linchartResize = [];
        for (var i = 0; i < this.lineChartArr.length; i++) {
            for (var j = 0; j < options.length; j++) {
                if (i === j) {
                    this.lineChart = echarts.init(
                        document.querySelector(
                            this.lineChartArr[i].chartMainClass + " .charShow"
                        )
                    );
                    linchartResize.push(this.lineChart);
                    this.lineChart.setOption(options[j]);
                }
            }
        }
        window.addEventListener(
            "resize",
            function() {
                for (var x = 0; x < linchartResize.length; x++) {
                    linchartResize[x].resize();
                }
            }.bind(this)
        );
    }
};

const pieChart = params => {
    return new pie(params);
};

function pie(params) {
    this.init(params);
}
pie.prototype = {
    init: function(params) {
        var options = [];
        this.pieChartArr = params;
        for (var i = 0; i < params.length; i++) {
            options.push({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "right",
                    y: "center"
                },
                series: function() {
                    var series = [];
                    if (params[i].chartDetailType === "circlePie") {
                        var circlePieColor = params[i].chartColor
                        var item = {
                            type: "pie",
                            radius: ["50%", "70%"],
                            center: ["25%", "60%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: "center"
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: "18",
                                        fontWeight: "bold"
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: params[i].seriesData,
                            itemStyle: {
                                color: function(param) {
                                    return circlePieColor[param.dataIndex]
                                }
                            }
                        };
                        series.push(item);
                    }
                    if (params[i].chartDetailType === "areaPie") {
                        var areaPieColor = params[i].chartColor
                        var item = {
                            type: "pie",
                            radius: ["10%", "60%"],
                            center: ["30%", "50%"],
                            roseType: "radius",
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: params[i].seriesData,
                            itemStyle: {
                                color: function(param) {
                                    return areaPieColor[param.dataIndex]
                                }
                            }
                        };
                        series.push(item);
                    }
                    return series;
                }.bind(this)()
            });
        }
        this.setPieChart(options);
    },
    setPieChart: function(options) {
        piechartResize = [];
        for (var i = 0; i < this.pieChartArr.length; i++) {
            for (var j = 0; j < options.length; j++) {
                if (i === j) {
                    this.lineChart = echarts.init(
                        document.querySelector(
                            this.pieChartArr[i].chartMainClass + " .charShow"
                        )
                    );
                    piechartResize.push(this.lineChart);
                    this.lineChart.setOption(options[j]);
                }
            }
        }
        window.addEventListener(
            "resize",
            function() {
                for (var x = 0; x < piechartResize.length; x++) {
                    piechartResize[x].resize();
                }
            });
    }
};

const barChart = params => {
    return new bar(params);
};

function bar(params) {
    this.init(params);
}
bar.prototype = {
    init: function(params) {
        var options = []
        this.barChartArr = params
        for (var i = 0; i < params.length; i++) {
            if (params[i].chartDetailType === "rowBar") {
                options.push({
                    xAxis: {
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                type: 'solid',
                                color: '#e7e7e7',
                                width: '2'
                            }
                        },
                        splitLine: { show: false },
                        type: 'value',
                        boundaryGap: [0, 0],
                        axisLabel: { interval: 0 }
                    },
                    grid: {
                        left: '23%',
                        top: '20%',
                        bottom: '3%'
                    },
                    yAxis: {
                        type: 'category',
                        data: params[i].xData,
                        axisTick: [{
                            show: false
                        }],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                type: 'solid',
                                color: '#e7e7e7',
                                width: '2'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: '14',
                                fontFamily: 'PingFang SC Medium',
                                color: '#666'
                            }
                        }
                    },
                    series: function() {
                        var rowBarColor = params[i].chartColor
                        var series = [];
                        for (var j = 0; j < params[i].seriesData.length; j++) {
                            var item = {
                                type: 'bar',
                                tooltip: { show: false },
                                barWidth: 16,
                                data: params[i].seriesData[j].data,
                                itemStyle: {
                                    normal: {
                                        color: (params) => {
                                            return rowBarColor[params.dataIndex]
                                        }
                                    }
                                }
                            };
                            series.push(item);
                        }
                        return series;
                    }()
                })
            }
            if (params[i].chartDetailType === "columnBar") {
                options.push({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        data: params[i].xData,
                        axisLabel: {
                            textStyle: {
                                color: '#AAAAAA'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    grid: {
                        left: '15%',
                        top: '20%',
                        bottom: '15%'
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#AAAAAA'
                            }
                        }
                    },
                    dataZoom: [{
                        type: 'inside'
                    }],
                    series: function() {
                        var series = []
                        for (var j = 0; j < params[i].seriesData.length; j++) {
                            this.dataShadow = []
                            this.yMax = Math.max.apply(null, params[i].seriesData[j].data)
                            var countNum = countNumber(this.yMax)
                            for (var m = 0; m < params[i].seriesData[j].data.length; m++) {
                                this.dataShadow.push(countNum);
                            }
                            var item = {
                                type: 'bar',
                                itemStyle: {
                                    normal: { color: params[i].chartColor[0] }
                                },
                                barGap: '-100%',
                                barCategoryGap: '40%',
                                data: this.dataShadow,
                                animation: false
                            }
                            var item1 = {
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1, [
                                                { offset: 0, color: params[i].chartColor[1] },
                                                { offset: 0.5, color: params[i].chartColor[2] },
                                                { offset: 1, color: params[i].chartColor[3] }
                                            ]
                                        )
                                    },
                                    emphasis: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1, [
                                                { offset: 0, color: params[i].chartColor[3] },
                                                { offset: 0.7, color: params[i].chartColor[2] },
                                                { offset: 1, color: params[i].chartColor[1] }
                                            ]
                                        )
                                    }
                                },
                                data: params[i].seriesData[j].data
                            }
                            series.push(item, item1)
                        }
                        return series;
                    }.bind(this)()
                })
            }
            this.setBarChart(options)
        }
    },
    setBarChart: function(options) {
        barchartResize = [];
        for (var i = 0; i < this.barChartArr.length; i++) {
            for (var j = 0; j < options.length; j++) {
                if (i === j) {
                    this.lineChart = echarts.init(
                        document.querySelector(
                            this.barChartArr[i].chartMainClass + " .charShow"
                        )
                    );
                    barchartResize.push(this.lineChart);
                    this.lineChart.setOption(options[j]);
                }
            }
        }
        window.addEventListener(
            "resize",
            function() {
                for (var x = 0; x < barchartResize.length; x++) {
                    barchartResize[x].resize();
                }
            });
    }
};
export { lineChart, pieChart, barChart };