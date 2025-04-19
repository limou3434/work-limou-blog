import{_ as i,c as a,b as e,o as n}from"./app-Bm0qCaC3.js";const l={};function t(h,s){return n(),a("div",null,s[0]||(s[0]=[e(`<h2 id="_1-配置单张网卡" tabindex="-1"><a class="header-anchor" href="#_1-配置单张网卡"><span>1.配置单张网卡</span></a></h2><p>原生的 <code>Linux</code> 服务器网络配置</p><p>看起来你提供的 <code>ifconfig</code> 输出中包含了一些错别字或格式问题。以下是一个正确的 <code>ifconfig</code> 输出示例，供您参考。</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">eth0:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> flags=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">4098</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">BROADCAST,MULTICAS</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">T</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  mtu</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1500</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        ether</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 00:16:3e:05:6c:45</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  txqueuelen</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1000</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  (Ethernet)</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        RX</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> packets</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  bytes</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> (0.0 </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">B</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        RX</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> errors</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  dropped</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  overruns</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  frame</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        TX</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> packets</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  bytes</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> (0.0 </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">B</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        TX</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> errors</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  dropped</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  overruns</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  carrier</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  collisions</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以查看是否有格式或拼写错误，或者如果是从设备上截取的内容，也可以检查网络设备的状态是否正确配置，例如 IP 地址或其他接口设置。</p><h5 id="您说" tabindex="-1"><a class="header-anchor" href="#您说"><span>您说：</span></a></h5><p>这是不是没有网络？</p><h6 id="chatgpt-说" tabindex="-1"><a class="header-anchor" href="#chatgpt-说"><span>ChatGPT 说：</span></a></h6><p>ChatGPT</p><p>是的，从 <code>ifconfig</code> 输出来看，当前设备 <code>eth0</code> 没有收到或发送任何数据包（RX 和 TX 的 packets 和 bytes 都为 0），这通常意味着网络连接尚未建立或配置不正确。可能的原因包括：</p><ol><li><strong>没有连接到网络</strong>：网络接口未连接到网络（如网线未插好，Wi-Fi 未连接）。</li><li><strong>网络配置问题</strong>：IP 地址等网络参数可能尚未正确配置。</li><li><strong>服务未启动</strong>：网络服务或守护进程未启动，如 DHCP 客户端未运行。</li></ol><p>你可以使用以下几种方法来排查问题：</p><ul><li>检查网络连接物理状态（如网线或 Wi-Fi 连接）。</li><li>使用 <code>ping</code> 命令测试网络连通性。</li><li>检查网络配置（如 <code>ip addr</code> 或 <code>ip route</code>）是否正确。</li><li>如果是通过 <code>DHCP</code> 分配 <code>IP</code> 地址，可以尝试运行 <code>dhclient eth0</code> 获取 IP 地址。</li></ul><h5 id="您说-1" tabindex="-1"><a class="header-anchor" href="#您说-1"><span>您说：</span></a></h5><p>DHCP 是什么？</p><h6 id="chatgpt-说-1" tabindex="-1"><a class="header-anchor" href="#chatgpt-说-1"><span>ChatGPT 说：</span></a></h6><p>ChatGPT</p><p>DHCP (Dynamic Host Configuration Protocol) 是一种网络协议，用于自动为设备分配 IP 地址和其他网络配置信息。它的主要目的是简化网络配置过程，使设备能够自动获取所需的网络设置，而不需要手动配置。</p><h3 id="dhcp-的工作原理" tabindex="-1"><a class="header-anchor" href="#dhcp-的工作原理"><span>DHCP 的工作原理</span></a></h3><p>当设备（如计算机、手机等）连接到网络时，它会向 DHCP 服务器发送一个请求，询问是否有可用的 IP 地址。DHCP 服务器则会根据网络配置分配一个 IP 地址，并将其他必要的信息一起发送给设备。这些信息通常包括：</p><ol><li><strong>IP 地址</strong>：设备在网络中的唯一地址。</li><li><strong>子网掩码</strong>：用于确定网络的范围。</li><li><strong>默认网关</strong>：用于连接其他网络（如互联网）。</li><li><strong>DNS 服务器地址</strong>：用于将域名解析为 IP 地址。</li></ol><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点"><span>优点</span></a></h3><ol><li><strong>自动配置</strong>：设备接入网络后无需手动设置 IP 地址和网络信息。</li><li><strong>避免冲突</strong>：DHCP 服务器会确保每个设备获得唯一的 IP 地址，避免地址冲突。</li><li><strong>集中管理</strong>：网络管理员可以通过 DHCP 服务器集中管理网络配置。</li></ol><h3 id="dhcp-流程" tabindex="-1"><a class="header-anchor" href="#dhcp-流程"><span>DHCP 流程</span></a></h3><ol><li><strong>Discover</strong>：设备发送 DHCP 请求，寻找 DHCP 服务器。</li><li><strong>Offer</strong>：DHCP 服务器回应，提供一个可用的 IP 地址。</li><li><strong>Request</strong>：设备选择其中一个 IP 地址并请求使用。</li><li><strong>ACK</strong>：DHCP 服务器确认并分配该 IP 地址，设备开始使用该地址。</li></ol><p>通过 DHCP，网络中的设备可以快速、动态地加入和配置。</p><h5 id="您说-2" tabindex="-1"><a class="header-anchor" href="#您说-2"><span>您说：</span></a></h5><p>dhclient 是内置的指令么？</p><h6 id="chatgpt-说-2" tabindex="-1"><a class="header-anchor" href="#chatgpt-说-2"><span>ChatGPT 说：</span></a></h6><p>ChatGPT</p><p><code>dhclient</code> 是大多数 Linux 发行版中的内置工具，用于与 DHCP 服务器通信以自动获取 IP 地址。它通常默认安装在大多数 Linux 发行版中，但有些系统可能需要手动安装相关的软件包。</p><p>具体来说，<code>dhclient</code> 是一个 <strong>DHCP 客户端</strong>，它通过与网络中的 DHCP 服务器通信来获取和更新网络配置（如 IP 地址、子网掩码、默认网关和 DNS 服务器等）。</p><h3 id="如何使用-dhclient" tabindex="-1"><a class="header-anchor" href="#如何使用-dhclient"><span>如何使用 <code>dhclient</code></span></a></h3><ul><li>你可以运行以下命令手动触发 DHCP 请求，重新获取或更新网络配置：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>复制代码</span></span>
<span class="line"><span>sudo dhclient eth0</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个命令会请求 DHCP 服务器为 <code>eth0</code> 网卡分配 IP 地址。如果成功，网络接口将自动获得所需的配置。</p><h3 id="检查是否安装了-dhclient" tabindex="-1"><a class="header-anchor" href="#检查是否安装了-dhclient"><span>检查是否安装了 <code>dhclient</code></span></a></h3><p>你可以使用以下命令检查 <code>dhclient</code> 是否安装：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>复制代码</span></span>
<span class="line"><span>dhclient --version</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有安装，可以通过你的包管理器进行安装。例如，在基于 Debian/Ubuntu 的系统上，可以使用以下命令安装：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>复制代码</span></span>
<span class="line"><span>sudo apt-get install isc-dhcp-client</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在基于 RedHat/Fedora 的系统上：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>复制代码</span></span>
<span class="line"><span>sudo yum install dhclient</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，它是系统中内置的工具，但你可以根据需要检查并手动安装。</p><p>是的，从 <code>ifconfig</code> 输出来看，当前设备 <code>eth0</code> 没有收到或发送任何数据包（RX 和 TX 的 packets 和 bytes 都为 0），这通常意味着网络连接尚未建立或配置不正确。可能的原因包括：</p><ol><li><strong>没有连接到网络</strong>：网络接口未连接到网络（如网线未插好，Wi-Fi 未连接）。</li><li><strong>网络配置问题</strong>：IP 地址等网络参数可能尚未正确配置。</li><li><strong>服务未启动</strong>：网络服务或守护进程未启动，如 DHCP 客户端未运行。</li></ol><p>你可以使用以下几种方法来排查问题：</p><ul><li>检查网络连接物理状态（如网线或 Wi-Fi 连接）。</li><li>使用 <code>ping</code> 命令测试网络连通性。</li><li>检查网络配置（如 <code>ip addr</code> 或 <code>ip route</code>）是否正确。</li><li>如果是通过 DHCP 分配 IP 地址，可以尝试运行 <code>dhclient eth0</code> 获取 IP 地址。</li></ul><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2><h2 id="_2-配置多张网卡" tabindex="-1"><a class="header-anchor" href="#_2-配置多张网卡"><span>2.配置多张网卡</span></a></h2>`,50)]))}const d=i(l,[["render",t]]),r=JSON.parse('{"path":"/1.%E7%BC%96%E7%A0%81%E4%BF%AE%E5%85%BB/3.%E7%B3%BB%E7%BB%9F%E7%BD%91%E7%BB%9C/l4vcsl0a/","title":"网络配置","lang":"zh-CN","frontmatter":{"createTime":"2025/04/09 23:31:29","permalink":"/1.编码修养/3.系统网络/l4vcsl0a/","title":"网络配置","description":"1.配置单张网卡 原生的 Linux 服务器网络配置 看起来你提供的 ifconfig 输出中包含了一些错别字或格式问题。以下是一个正确的 ifconfig 输出示例，供您参考。 你可以查看是否有格式或拼写错误，或者如果是从设备上截取的内容，也可以检查网络设备的状态是否正确配置，例如 IP 地址或其他接口设置。 您说： 这是不是没有网络？ ChatGP...","head":[["meta",{"property":"og:url","content":"https://limou3434.github.io/work-blog-website/work-blog-website/1.%E7%BC%96%E7%A0%81%E4%BF%AE%E5%85%BB/3.%E7%B3%BB%E7%BB%9F%E7%BD%91%E7%BB%9C/l4vcsl0a/"}],["meta",{"property":"og:site_name","content":"缡墨"}],["meta",{"property":"og:title","content":"网络配置"}],["meta",{"property":"og:description","content":"1.配置单张网卡 原生的 Linux 服务器网络配置 看起来你提供的 ifconfig 输出中包含了一些错别字或格式问题。以下是一个正确的 ifconfig 输出示例，供您参考。 你可以查看是否有格式或拼写错误，或者如果是从设备上截取的内容，也可以检查网络设备的状态是否正确配置，例如 IP 地址或其他接口设置。 您说： 这是不是没有网络？ ChatGP..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-19T14:21:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-19T14:21:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-19T14:21:17.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":4.73,"words":1419},"git":{"updatedTime":1745072477000,"contributors":[{"name":"limou3434","username":"limou3434","email":"898738804@qq.com","commits":6,"avatar":"https://avatars.githubusercontent.com/limou3434?v=4","url":"https://github.com/limou3434"}]},"autoDesc":true,"filePathRelative":"notes/1.编码修养/3.系统网络/028_ljp_2024_09_20_网络配置.md","categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"557f7c","sort":1,"name":"编码修养"},{"id":"7ab59a","sort":3,"name":"系统网络"}],"bulletin":true}');export{d as comp,r as data};
