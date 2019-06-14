import Mock from "mockjs"; // 引入mockjs
import { transBodyParams } from "../utils";

const Random = Mock.Random; // Mock.Random 用于生成各种随机数据

var getFirstChartInfo = [{
        chartClass: "h20 w32 chartMain1",
        chartMainClass: ".chartMain1",
        chartType: "line",
        chartTit: "证券类产品净值",
        chartDetailType: "singleLine",
        text: 1,
        chartColor: ["#EB3841", "#FEB4B4"],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        seriesData: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
    },
    {
        chartClass: "h20 w49 chartMain2",
        text: 2,
        chartDetailType: "doubleLine",
        chartTit: "证券类产品净值",
        chartType: "line",
        chartColor: ["#EB3841", "#6086FF"],
        chartMainClass: ".chartMain2",
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        seriesData: [{
                data: [120, 132, 101, 134, 90, 230, 210],
                color: "#EB3841"
            },
            {
                data: [220, 182, 191, 234, 290, 330, 310],
                color: "#6086FF"
            }
        ]
    },
    {
        chartClass: "h15 w24 chartMain3",
        text: 3,
        chartDetailType: "singleLine",
        chartTit: "证券类产品净值",
        chartType: "line",
        chartColor: ["#6086FF", "#6086FF"],
        chartMainClass: ".chartMain3",
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        seriesData: [{
            data: [1, 2, 3, 4, 5, 6, 7]
        }]
    },
    {
        chartClass: "h15 w24 chartMain4",
        text: 4,
        chartDetailType: "circlePie",
        chartTit: "产品投资者人数",
        chartType: "pie",
        chartColor: ["#67A8FF", "#D0F6FF", "#FFE059", "#FB764A"],
        chartMainClass: ".chartMain4",
        xData: ["直接访问", "邮件营销", "联盟广告", "视频广告"],
        seriesData: [{
                value: 335,
                name: "直接访问"
            },
            {
                value: 310,
                name: "邮件营销"
            },
            {
                value: 234,
                name: "联盟广告"
            },
            {
                value: 135,
                name: "视频广告"
            }
        ]
    },
    {
        chartClass: "h15 w24 chartMain5",
        text: 5,
        chartDetailType: "areaPie",
        chartTit: "产品投资者人数",
        chartType: "pie",
        chartColor: ["#67A8FF", "#D0F6FF", "#FFE059", "#FB764A"],
        chartMainClass: ".chartMain5",
        xData: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
        ],
        seriesData: [{
                value: 10,
                name: "rose1"
            },
            {
                value: 5,
                name: "rose2"
            },
            {
                value: 15,
                name: "rose3"
            },
            {
                value: 25,
                name: "rose4"
            }
        ]
    },
    {
        chartClass: "h15 w24 chartMain6",
        text: 6,
        chartDetailType: "rowBar",
        chartTit: "盈亏能力展示",
        chartColor: ['#6086FF', '#98D1FF', '#FEA145', '#FB764A'],
        chartType: "bar",
        chartMainClass: ".chartMain6",
        xData: ["-20%以下", "-20～0%", "0～20%", "20%以上"],
        seriesData: [{
            data: [66, 23, 90, 101]
        }]
    },
    {
        chartClass: "h15 w24 chartMain7",
        text: 7,
        chartDetailType: "columnBar",
        chartTit: "持有期限",
        chartType: "bar",
        chartColor: ['rgba(152,209,255,0.2)', '#83bff6', '#188df0', '#188df0'],
        chartMainClass: ".chartMain7",
        xData: ["1年", "1-2年", "2年以上"],
        seriesData: [{
            data: [249, 301, 162]
        }]
    }
];

Mock.mock("/data/firstchart", "get", getFirstChartInfo);

Mock.mock("/data/lineChart", "post", options => {
    var { chartType, chartDetailType } = transBodyParams(options.body);
    if (chartType === "line" && chartDetailType === "singleLine") {
        return {
            xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            seriesData: [{
                data: [32, 43, 76, 321, 9756, 32, 99]
            }]
        };
    }
    if (chartType === "line" && chartDetailType === "doubleLine") {
        return {
            xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            seriesData: [{
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };
    }
    if (chartType === "pie") {
        return {
            xData: ["直接访问", "联盟广告", "视频广告", "搜索引擎"],
            seriesData: [{
                    value: 335,
                    name: "直接访问"
                },
                {
                    value: 234,
                    name: "联盟广告"
                },
                {
                    value: 135,
                    name: "视频广告"
                },
                {
                    value: 99,
                    name: "搜索引擎"
                }
            ]
        };
    }
    if (chartType === "bar" && chartDetailType === "rowBar") {
        return {
            xData: ["Mon", "Tue", "Wed", "Thu"],
            seriesData: [{
                data: [10, 52, 200, 334]
            }]
        };
    }
    if (chartType === "bar" && chartDetailType === "columnBar") {
        return {
            xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            seriesData: [{
                data: [10, 52, 200, 334, 390, 330, 220]
            }]
        };
    }
});