---
title: 002_limou_2025_01_13_environment_虚拟主机
createTime: 2025/04/09 13:05:15
permalink: /article/v00lfhl2/
---
# 虚拟主机

### 1.安装 ESXi 操作系统

初始化一台物理机器上的操作系统成本是很高的，因此这里推荐您部署一台 `ESXi` 主机，利用 `ESXi` 操作系统之上可以在同一个物理主机上虚拟化出多个操作系统，也就是多个虚拟主机。

首先需要制作一个 `ESXi` 安装镜像启动盘，待补充...

![](./assets/img_v3_02ig_1ec914e7-e891-4065-a3e9-3608e8cfcbcg.jpg)

开机进入 `BIOS` 界面。

![](./assets/img_v3_02ig_ff70f846-f604-4ba1-af63-6bfd8cd7e0bg.jpg)

![](./assets/img_v3_02ig_aefd0610-5c7f-49cb-9f97-73a9ef5ddaeg.jpg)

选择启动设备为您的安装启动 `U` 盘。

![](./assets/img_v3_02ig_5abcdb8f-b021-45bb-9880-a537788f3feg.jpg)

以下就是初始化安装 `ESXi` 设置的界面，我们根据指引一步一步来完成即可。

![](./assets/img_v3_02ig_a1646b0f-bccc-4265-8141-47f0dcb054bg.jpg)

![](./assets/img_v3_02ig_cad3f832-14c5-40fe-8aeb-a3f7e78c8b1g.jpg)

这里出现两个安装协议等界面，使用 `[enter]` 和 `[f11]` 即可完成两个步骤。

![](./assets/img_v3_02ig_3a9b8fff-bd9d-427b-b9eb-a84a2f780dbg-1736772681899-43.jpg)

![](./assets/img_v3_02ig_939f865e-cc0f-4201-bd17-111ea33756dg.jpg)

等待安装...

![](./assets/img_v3_02ig_dbd99c7c-4fc4-4041-a284-79869581595g.jpg)

使用方向盘选择一个磁盘作为 `ESXi` 的系统盘（注意这个盘会被 `ESXi` 全部占有，数据会被全部清空），按下 `[enter]` 确认即可（另外一个作为 `ESXi` 后续的数据盘）。

![](./assets/img_v3_02ig_4bdcc438-387d-4540-b585-ebbb1df85b2g.jpg)

![](./assets/img_v3_02ig_53ba1244-4634-48dc-9724-47741144aa4g.jpg)

![](./assets/img_v3_02ig_83a1d0ea-517d-48cc-802e-fae42148d23g.jpg)

> [!IMPORTANT]
>
> 补充：如果您出现无法识别磁盘的问题，可能需要修改启动模式为 `AHCI` 后重启再次选择启动设备菜单才可以识别。
>
> ![](./assets/img_v3_02ig_72a78d34-3486-41ba-a43e-846c383412dg.jpg)

类似 `Linux`，`ESXi` 也有用户管理机制，因此您需要设置 `root` 的管理员密码，方便后续登陆使用 `ESXi` 系统。

![](./assets/img_v3_02ig_fb2f83a6-3627-4001-83b3-7fb4029f232g.jpg)

如果出现警告也可以继续 `[f11]`（尝试一下没什么坏处，大部分情况下也不会出现问题）。

![](./assets/img_v3_02ig_dfc6f8aa-ee12-418c-b7d2-65f87895849g.jpg)

![](./assets/img_v3_02ig_4a7e4478-be74-4c7c-beb5-c56afdd4d51g.jpg)

重启主机即可完成 `ESXi` 的安装过程。

![](./assets/img_v3_02ig_7ab89bee-6405-491c-9ff3-54289ad303eg.jpg)

![](./assets/img_v3_02ig_9386ce07-64cb-4a56-aba9-f726b433d5fg.jpg)

> 补充：如果您出现 `CPU` 不兼容的问题，则可以在重启的倒计时页面中，反复输入 `[shift + o]`，直到中断 `ESXi` 系统的初始化过程（在反复键入 `[shift + o]` 的过程中有可能会输入字符 `O`，请一定记得仔细删除），并且输入 `cpuUniformityHardCheckPanic=FALSE` 后键入 `[enter]` 来跳过 `CPU` 检查即可（还是那句话，尝试一下没什么坏处，大部分情况下也不会出现问题）。
>
> ![](./assets/img_v3_02ig_d056a073-8a8e-4756-9f27-5cc97e0c9c0g.jpg)

![](./assets/img_v3_02ig_4da02a15-8696-4bc7-9ff8-a9b6488d8feg.jpg)

安装 `ESXi` 操作系统成功，不过这个操作系统最简单的操作方式是使用启动界面处的 `https` 地址，在浏览器中访问即可。

![](./assets/img_v3_02ig_2c6cf406-a7ac-40ae-a0b7-db4f3ae7ce6g.jpg)

![](./assets/img_v3_02ig_b9f24089-3fd8-4c6e-85cb-f6e37f0e8b5g.jpg)

![](./assets/img_v3_02ig_545e698a-7fb0-4085-af4a-55127713f41g.jpg)

> [!IMPORTANT]
>
> 补充：这里如果没有看到系统盘以外的数据盘，可能是数据盘内存放一些旧数据无法被 `ESXi` 挂载，这边建议您备份好重要数据后，清空该磁盘分区后挂载到 `ESXi` 系统上，方便后续创建多个虚拟主机。
>
> ![](./assets/img_v3_02ig_c07aa9b5-7907-4996-a0b6-2a8de7738f5g.jpg)
>
> ![](./assets/img_v3_02ig_9daf8513-6957-49e3-b8ef-6bfc8500091g.jpg)
>
> ![](./assets/img_v3_02ig_9145b175-31e3-4434-a98b-27257f4b8d9g.jpg)
>
> ![](./assets/img_v3_02ig_49e1c2af-f482-45b3-b10b-0f2b5a79442g.jpg)
>
> ![](./assets/img_v3_02ig_137dd481-5036-4b88-8845-1a8f982d2e4g.jpg)
>
> ![](./assets/img_v3_02ig_d2cc71cb-af11-49d7-a203-523c93010fcg.jpg)
>
> ![](./assets/img_v3_02ig_8571d650-9841-4f45-99e0-07d41e4496dg.jpg)
>
> ![](./assets/img_v3_02ig_8f4df6ec-b34c-4176-864c-c9c3a14b8cbg.jpg)
>
> ![](./assets/img_v3_02ig_b744c986-f848-46d0-8252-a2485d3ffe4g.jpg)

## 2.创建多个虚拟机

待补充...













