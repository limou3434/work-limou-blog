[//]: # (---)
[//]: # (layout: TestLayout)
[//]: # (---)
[//]: # (上面可以自定义一个布局组件)

<!-- @include: basic.md#statement -->
<!-- @include: basic.md#comment -->

[[TOC]]

# 本站测试

这里只是用来实时测试本站插件是否生效的页面，没有其他的作用...

## 组件测试

### 内部组件测试

一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} <br/> </span>

_你好， {{ msg }}_

<RedDiv>

_当前计数为： {{ count }}_

</RedDiv>

这里注意一个 md 文件内只能包含一个脚本标签...

<button @click="count++">点我！</button>

[//]: # (<script setup>)

[//]: # ()
[//]: # (</script>)

<style>
.red-div {
  color: red;
}
</style>

<Badge text="tip" type="tip" />
<Badge text="warning" type="warning" />
<Badge text="danger" type="danger" />
<Badge text="important" type="important" />
<Badge text="info" type="info" />
<Badge text="note" type="note" />

### 外部组件测试

<Test />

### 框架组件测试

<br/>
<el-button type="primary">Element Plus 按钮</el-button>

<br/>
<br/>
<el-icon :size="size" :color="color">
    <Edit />
</el-icon>

<br/>
<br/>
<el-skeleton :rows="2" animated />

<br/>
<el-button plain @click="open">Click to open the Message Box</el-button>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const open = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

// 前面的内部组件测试代码(因为整个文件只能放一个脚本标签来支持 Vue)
import { h, ref } from 'vue'

const RedDiv = (_, ctx) =>
  h(
    'div',
    {
      class: 'red-div',
    },
    ctx.slots.default(),
  )
const msg = 'Markdown 中的 Vue'
const count = ref(0)
</script>

## 文本测试

引入常量 __VERSION__

!!黑幕!!

==高亮==

**粗体字体**

_斜体字体_

[好链测试](https://www.baidu.com)

[坏链测试](https://limou.3.3.4.4)

脚注 1 链接 [^first]。

脚注 2 链接 [^second]。

[^first]: 1

[^second]: 2

## 码块测试

### 使用卡片

::: tabs#shell
@tab 标题1#cpp
```cpp
int main() {
    return 0;
}

```
@tab 标题2#java
```java
public class Main {
    public static void main(String[] args) {
        ;
    }
}

```
:::

::: tabs#shell
@tab 同步标题1#cpp
```cpp
int main() {
    return 0;
}

```
@tab 同步标题2#java
```java
public class Main {
    public static void main(String[] args) {
        ;
    }
}

```
:::

### 使用代码

```cpp :line-numbers
// 启用行号  
```

```cpp :no-line-numbers
// 禁用行号
```

```cpp :line-numbers=2
// 启用行号, 并从 2 开始
```

```cpp {1,4-6}
// 特定代码行高亮
// code
// code
// code
// code
// code
// code
```

```ts
// 差异标记
console.log('hewwo') // [!code focus]
console.log('hello') // [!code ++]
console.log('goodbye')
```

```css :collapsed-lines
/* 默认从第 15 行开始折叠 */
html {
  margin: 0;
  background: black;
  height: 100%;
}
html {
    margin: 0;
    background: black;
    height: 100%;
}
html {
    margin: 0;
    background: black;
    height: 100%;
}
html {
    margin: 0;
    background: black;
    height: 100%;
}
html {
    margin: 0;
    background: black;
    height: 100%;
}
html {
    margin: 0;
    background: black;
    height: 100%;
}
```

### 使用折叠

::: details 折叠列表
折叠内容
:::

### 使用规范

这里统一规范使用折叠和预览（除了一些简单的代码或指令）。

:::details 

:::tabs

@tab 分作用1

```cpp :collapsed-lines
// 文件名
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
```
@tab 分作用2

```cpp :collapsed-lines
// 文件名
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
int main() { return 0; }
```

:::

## 图型测试

### 图表测试

::: echarts 我是图表
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

### 幻灯测试

简单的幻灯片...

@slidestart

第一张

---

第二张

---

第三张

@slideend

## 导入测试

### 全部导入

<!-- @include: ./test.md --> 

### 区域导入

<!-- @include: ./test.md#snippet -->

### 行内导入

<!-- @include: ./test.md{12-13} -->

## 下载测试

<a href="/example.txt" download>下载 example.txt</a>
