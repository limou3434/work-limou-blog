<!-- @include: basic.md#statement -->

# 平台详情

## 1.文档系统更新频率

::: echarts
```js
const oneDay = 86400000;
const data = [];
let now = new Date(1997, 9, 3);
let value = Math.random() * 1000;

const randomData = () => {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      Math.round(value),
    ],
  };
};

for (let i = 0; i < 1000; i++) data.push(randomData());

const option = {
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " : " +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true,
      },
      dataView: {
        show: true,
        readOnly: false,
      },
      restore: {
        show: true,
      },
      saveAsImage: {
        show: true,
      },
    },
  },
  series: [
    {
      name: "Fake Data",
      type: "line",
      showSymbol: false,
      data: data,
    },
  ],
};
const timeId = setInterval(() => {
  if (myChart._disposed) return clearInterval(timeId);

  for (let i = 0; i < 5; i++) {
    data.shift();
    data.push(randomData());
  }
  myChart.setOption({
    series: [
      {
        data: data,
      },
    ],
  });
}, 1000);
```
:::

## 2.文档系统内容分布

::: echarts
```js
const mockData = {
  name: "文档系统内容分布",
  children: [
    {
      name: "分支1",
      children: [
        { name: "cluster", value: 3938 },
        { name: "graph", value: 3812 },
      ]
    },
    {
      name: "分支2",
      children: [
        { name: "interpolate", value: 8746 },
        { name: "easing", value: 17010 }
      ]
    },
    {
      name: "分支3",
      children: [
        { name: "interpolate", value: 8746 },
        { name: "easing", value: 17010 }
      ]
    },
    {
      name: "分支4",
      children: [
        { name: "interpolate", value: 8746 },
        { name: "easing", value: 17010 }
      ]
    },
    {
      name: "分支5",
      children: [
          { name: "interpolate", value: 8746 },
          { name: "easing", value: 17010 }
      ]
    },
    {
      name: "分支6",
      children: [
          { name: "interpolate", value: 8746 },
          { name: "easing", value: 17010 }
      ]
}
  ]
};

const option = {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove"
  },
  series: [
    {
      type: "tree",
      data: [mockData],
      top: "18%",
      bottom: "14%", 
      layout: "radial", // layout: "vertical",
      symbol: "emptyCircle",
      symbolSize: 7,
      initialTreeDepth: 3,
      animationDurationUpdate: 750,
      emphasis: {
        focus: "descendant"
      }
    }
  ]
};
```
:::

## 3.文档系统访问数据

::: echarts
```js
const dataCount = 1000; // 减少数据量，简化性能需求
const data = generateData(dataCount);

const option = {
    title: {
        text: `${dataCount} 天`,
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        bottom: 50
    },
    xAxis: {
        data: data.categoryData,
        splitLine: {
            show: false
        }
    },
    yAxis: {},
    series: [
        {
            type: 'bar',
            data: data.valueData,
            large: true
        }
    ]
};

function generateData(count) {
    const categoryData = [];
    const valueData = [];
    for (let i = 0; i < count; i++) {
        categoryData.push(`Category ${i + 1}`);
        valueData.push((Math.random() * 1000).toFixed(2));
    }
    return {
        categoryData,
        valueData
    };
}
```
:::

<!-- @include: basic.md#comment -->
