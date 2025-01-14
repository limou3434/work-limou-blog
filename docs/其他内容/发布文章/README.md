<!-- @include: basic.md#statement -->

# 发布文章

## 1.编写规范

在下面我提供了推荐的编写模板，请务必按照规范进行编写，不符合本网站风格的文章大概率会被退回。也可以参考 `Markdown` 的两份文档来编写文章。

- [Markdown 渲染原理](https://www.markdownguide.org/getting-started/)
- [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/)

<div :class="theme === 'dark' ? 'dark' : ''">
    <el-card>
        <a href="/md/md_model.md" download>
            <el-button color="#21C68F" :dark="isDark" download @click="getModel">获取模板</el-button>
        </a>
    </el-card>
</div>

> [!CAUTION]
> 
> 警告：其中包含一些拓展语法，这些拓展语法可能仅仅在本网站中可以生效，但本网站兼容绝大部分的 `Markdown` 语法。

## 2.编写文章

<br />

<el-steps style="max-width: 600px" :active="active" finish-status="success">
    <el-step title="基本信息" />
    <el-step title="分类所属" />
    <el-step title="正文内容" />
    <el-step title="校验代码" />
</el-steps>

<div :class="theme === 'dark' ? 'dark' : ''">
    <div v-if="active === 0">
        <br/>
        <el-card>
            <el-text class="mx-1" type="success">填写基本信息，以便我们通知文章的发布情况（如果您尚未登陆则会跳转登陆页面）。</el-text>
            <br />
            <br />
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="编写作者">
                  <el-input v-model="form.name" placeholder="e.g. limou3434"/>
                </el-form-item>
                <el-form-item label="邮箱地址">
                  <el-input v-model="form.email" placeholder="e.g. 898738804@qq.com"/>
                </el-form-item>
                <el-form-item label="所属组织">
                  <el-select v-model="form.organization" placeholder="e.g. 个人开发者">
                    <el-option label="个人开发者" value="gr" />
                    <el-option label="公司开发者" value="gs" />
                  </el-select>
                </el-form-item>
                <el-form-item label="创作时间">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.date1"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%"
                    />
                  </el-col>
                  <el-col :span="1" class="text-center"></el-col>
                  <el-col :span="11">
                    <el-time-picker
                      v-model="form.date2"
                      placeholder="选择时间"
                      style="width: 100%"
                    />
                  </el-col>
                </el-form-item>
                <el-form-item label="文章简述">
                  <el-input v-model="form.desc" type="textarea" placeholder="e.g. 简要介绍您文章的大概内容..."/>
                </el-form-item>
                <el-form-item v-if="false">
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
            </el-form>
            <el-space>
                <el-button color="#21C68F" :dark="isDark" @click="prev">{{ prevTip }}</el-button>
                <el-button color="#21C68F" :dark="isDark" @click="next">{{ nextTip }}</el-button>
            </el-space>
        </el-card>
    </div>
    <div v-if="active === 1">
        <br/>
        <el-card>
            <el-text class="mx-1" type="success">填写分类所属，以便我们判定文章的所属分类。</el-text>
            <br />
            <br />
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="选择分类">
                    <el-cascader v-model="value" :options="options" @change="handleChange" />
                </el-form-item>
            </el-form>
            <el-space>
                <el-button color="#21C68F" :dark="isDark" @click="prev">{{ prevTip }}</el-button>
                <el-button color="#21C68F" :dark="isDark" @click="next">{{ nextTip }}</el-button>
            </el-space>
        </el-card>
    </div>
    <div v-if="active === 2">
        <br/>
        <el-card>
            <el-text class="mx-1" type="success">填写正文内容，以便我们分析文章的具体情况。建议在本地编写好文件后直接复制到下面编辑框中，请注意不要刷新界面，因为暂时还没有做缓存机制<a href="https://imzbf.github.io/md-editor-v3/zh-CN/api#%F0%9F%AA%A1%20%E5%BF%AB%E6%8D%B7%E9%94%AE" target="_blank">（MD 在线编辑器快捷键指引）</a></el-text>
            <br />
            <br />
            <MdEditor
                v-model="text"
                theme="dark"
                showToolbarName="true"
                previewTheme="vuepress"
                :footers="footers"
            >
                <template #defFooters>
                  <span>一定要记得不要随便关闭浏览器或刷新啊！</span>
                </template>
            </MdEditor>
            <br/>
            <el-space>
                <el-button color="#21C68F" :dark="isDark" @click="prev">{{ prevTip }}</el-button>
                <el-button color="#21C68F" :dark="isDark" @click="next">{{ nextTip }}</el-button>
            </el-space>
        </el-card>
    </div>
    <div v-if="active === 3">
        <br/>
        <el-card>
            <el-text class="mx-1" type="success">填写校验代码，以便我们排除文章的非法可能。</el-text>
            <br />
            <br />
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="用户密码">
                    <el-input v-model="passwd" style="width: 350px" placeholder="请输入账户密码（首次输入将会自动注册帐号）" />
                </el-form-item>
                <el-form-item label="校验代码">
                    <el-input v-model="input" style="width: 350px" placeholder="已发送校验代码（发送您前面填写的邮箱地址）" />
                </el-form-item>
                <el-form-item v-if="false">
                    <el-button color="#957437" :dark="isDark">提交校验代码</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
            <el-space>
                <el-button color="#21C68F" :dark="isDark" @click="prev">{{ prevTip }}</el-button>
                <el-button color="#21C68F" :dark="isDark" @click="next">{{ nextTip }}</el-button>
            </el-space>
        </el-card>
    </div>
    <div v-if="active === 4">
        <el-space wrap>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="tips：如果无需修改，直接发布即可"
            placement="right-start"
          >
            <el-button color="#21C68F" :dark="isDark" style="margin-top: 12px" @click="next">重新修改</el-button>
          </el-tooltip>
        </el-space>
    </div>
</div>

> [!CAUTION]
>
> 警告：请严肃对待自己编写的内容，与技术无关的恶意内容有概率进入提交黑名单。

## 3.审核流程

请重新浏览一遍自己需要发布的内容再点击 **确认发布**，发布的文章会经过一些流程。

- 人工智能审核
- 关键字词审核
- 本站站长审核
- 等待文章挂载

<div :class="theme === 'dark' ? 'dark' : ''">
    <el-card>
        <el-button color="#21C68F" :dark="isDark" @click="push">确认发布</el-button>
        <br/>
        <br/>
        <el-progress
          :percentage="100"
          status="success"
          :indeterminate="true"
          :duration="5"
        />
    </el-card>
</div>

[//]: # (disabled)

> [!CAUTION]
>
> 警告：如果发布文章被打回，站长会通过您填写的邮箱进行退回，退回内容包括：
> - 尚未通过的原文内容
> - 文章无法通过的原因
> - 一些简要的修改建议

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted, onUnmounted } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';


/* 获取模板组件配置 */
const getModel = () => {
  ElNotification({
    title: '成功',
    message: '已经向您的浏览器推送模板文件，如果您的浏览器没有响应可能是网络问题。',
    type: 'success',
    position: 'bottom-right',
  });
};

/* 进度步骤组件配置 */
const active = ref(0);
const nextTip = ref("下一步骤");
const next = () => {
    if (active.value >= 3) {
        ElNotification({
            title: '失败',
            message: '进无可进。',
            type: 'error',
            position: 'bottom-right',
        });
        return;
    }

    active.value++;

    ElNotification({
        title: '成功',
        message: '请继续填写下一步的内容。',
        type: 'success',
        position: 'bottom-right',
    });
};

const prevTip = ref("上一步骤");
const prev = () => {
    if (active.value <= 0) {
        ElNotification({
            title: '失败',
            message: '退无可退。',
            type: 'error',
            position: 'bottom-right',
        });
        return;
    }

    active.value--;

    ElNotification({
        title: '成功',
        message: '请继续修改上一步的内容。',
        type: 'success',
        position: 'bottom-right',
    });
};

/* 基本信息组件配置 */
const form = reactive({
  name: '',
  email: '',
  organization: '',
  date1: '',
  date2: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!');
};

/* 分类所属组件配置 */
const value = ref([]);

const handleChange = (value) => {
  console.log(value)
};

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          { value: 'consistency', label: 'Consistency' },
          { value: 'feedback', label: 'Feedback' },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          { value: 'layout', label: 'Layout' },
          { value: 'color', label: 'Color' },
        ],
      },
    ],
  },
];

/* 正文内容组件配置 */
const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
const text = ref(`在这里编写 Markdown 文本`);

/* 校验代码组件配置 */
const input = ref('');

/* 发布按钮组件配置 */
const router = useRouter();
const push = () => {
    ElNotification({
        title: '成功',
        message: '您的文章已经推送给站长审核，敬请耐心等待站长的邮箱通知。',
        type: 'success',
        position: 'bottom-right',
    });

    nextTick(() => { /* 这可以防止部分攻击 */
        // let count = 1;
        // const interval = setInterval(() => {
        //     ElNotification({
        //         title: '倒计时',
        //         message: `倒计时 ${count} 秒`,
        //         position: 'bottom-right',
        //     });
        //     if (count++ >= 3) {
        //         clearInterval(interval);
        //         router.push('/');
        //     }
        // }, 1000);
    });
};

/* 钩子 */

const theme = ref(document.documentElement.getAttribute('data-theme') || 'light');

const updateTheme = () => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'light';
};

onMounted(() => {
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
    });
    
    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>

<style setup>
/* 自定义暗黑模式的样式 */
.dark {
    --el-fill-color-blank: #1d1e1f;
}
</style>

[//]: # (TODO: 如果超过 10 次提交就提示无法提交)

<!-- @include: basic.md#comment -->

