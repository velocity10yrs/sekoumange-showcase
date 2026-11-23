import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarLinePie = () => {
  const chartRef_barline = useRef(null);
  const chartRef_pie = useRef(null);

  useEffect(() => {
    //柱状+折线
    const chartDom_barline = chartRef_barline.current;
    const myChart_barline = echarts.init(chartDom_barline);
    var option_barline;
    //chart logic details
    let colors = ['#5470C6', '#91CC75', '#EE6666'];
        option_barline = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
            dataView: { show: false, readOnly: true },
            restore: { show: false },
            saveAsImage: { show: false }
            }
        },
        legend: {
            data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
            {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        ],
        yAxis: [
            {
            type: 'value',
            name: '売上',
            position: 'right',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                color: colors[0]
                }
            },
            axisLabel: {
                formatter: '{value} 万円'
            }
            },
            {
            type: 'value',
            name: 'コスト',
            position: 'right',
            alignTicks: true,
            offset: 80,
            axisLine: {
                show: true,
                lineStyle: {
                color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value} 万円'
            }
            },
            {
            type: 'value',
            name: '利益',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value} 万円'
            }
            }
        ],
        series: [
            {
            name: 'cost',
            type: 'bar',
            data: [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
            },
            {
            name: 'sales',
            type: 'bar',
            yAxisIndex: 1,
            data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 80.7, 175.6, 182.2, 48.7, 28.8, 8.0, 5.3
            ]
            },
            {
            name: 'profit',
            type: 'line',
            yAxisIndex: 2,
            data: [0.6, 1.0, 2.0, 3.2, 3.1, 4.0, 40.0, 20.0, 16.1, 8.8, 1.6, 2.0]
            }
        ]
        };

    // 环状
    const chartDom_pie = chartRef_pie.current;
    const myChart_pie = echarts.init(chartDom_pie);
    var option_pie;
    //chart logic details
        option_pie = {
            tooltip: {
            trigger: 'item'
            },
            legend: {
            top: '5%',
            left: 'center'
            },
            series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
                },
                label: {
                show: false,
                position: 'center'
                },
                emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
                },
                labelLine: {
                show: false
                },
                data: [
                    { value: 75, name: '完成' },
                    { value: 25, name: '未完成' }
                    // { value: 1048, name: 'Search Engine' },
                    // { value: 735, name: 'Direct' },
                    // { value: 580, name: 'Email' },
                    // { value: 484, name: 'Union Ads' },
                    // { value: 300, name: 'Video Ads' }
                ]
            }
            ]
        };

    // Set option to the chart
    myChart_barline.setOption(option_barline);
    myChart_pie.setOption(option_pie);

    // Cleanup to dispose of the chart when the component unmounts
    return () => {
      myChart_barline.dispose();
      myChart_pie.dispose();
    };
  }, []);

  return (
    <div>        
        <h3 style={{textAlign:"center",alignItems:"center",color:"#ace"}}>統計グラフ</h3>
        <div
        ref={chartRef_barline}
        style={{
            marginLeft:"2em",
            width: "50em",
            height: "45em",
            backgroundColor:"#fff",
            border:"3px solid #ace",
            borderRadius:"2em",
            float:"left"
        }}
        ></div>
        <div
        ref={chartRef_pie}
        style={{
            marginRight:"2em",
            width: "50em",
            height: "45em",
            backgroundColor:"#fff",
            border:"3px solid #cea",
            borderRadius:"2em",
            float:"right"
        }}
        ></div>
    </div>
  );
};

export default BarLinePie;

