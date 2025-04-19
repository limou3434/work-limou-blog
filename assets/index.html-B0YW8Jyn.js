import{_ as t,c as p,a as i,d,b as c,e as o,w as r,r as n,o as h}from"./app-Bm0qCaC3.js";const u="/work-blog-website/assets/image-20240807115125399-Bs1cqdm0.png",g="/work-blog-website/assets/image-20240807115131960-CJJKngSs.png",k="/work-blog-website/assets/image-20240807115722567-CGtz9KTh.png",x="/work-blog-website/assets/image-20240807115938378-C4iDwN8k.png",b="/work-blog-website/assets/image-20240807120005978-Ch76k4On.png",m="/work-blog-website/assets/image-20240807120218399-BVMHDiRA.png",f="/work-blog-website/assets/image-20240807120255762-CVT2d0F5.png",w="/work-blog-website/assets/image-20240807120424873-LUBGIIN-.png",_="/work-blog-website/assets/image-20240807120509760-DPZpnfjn.png",L="/work-blog-website/assets/image-20240807122343674-DVjIi08j.png",y="/work-blog-website/assets/image-20240807130300869-C6vs5jV9.png",A="/work-blog-website/assets/image-20240807130412285-Czah7PLA.png",v={},C={class:"heimu",title:"你知道的太多了"};function B(U,e){const s=n("VideoBilibili"),a=n("Mermaid"),l=n("Plot");return h(),p("div",null,[e[5]||(e[5]=i("h2",{id:"_1-划时代的-os",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-划时代的-os"},[i("span",null,"1.划时代的 OS")])],-1)),e[6]||(e[6]=i("p",null,[o("这里有一个关于操作系统发展的视频，您可以观看一下 "),i("a",{href:"https://www.bilibili.com/video/BV1Zc411D7sG?vd_source=4772b64d7a3cb1873f14bc0153c4de68",target:"_blank",rel:"noopener noreferrer"},"操作系统究竟是怎么发展而来的，你真的了解吗？"),o(" 这个视频，再来往下观看。")],-1)),d(s,{src:"https://player.bilibili.com/player.html?bvid=BV1Zc411D7sG&autoplay=0&high_quality=1",width:"100%",height:"",ratio:"",title:"undefined"}),e[7]||(e[7]=c("<p>操作系统（<code>OS</code>）是指计算机中：</p><ul><li><strong>控制管理</strong> 整个计算机系统的硬件和软件资源</li><li><strong>组织调度</strong> 整个计算机系统的工作和资源分配</li><li><strong>对外提供</strong> 用户和软件比较方便的接口和环境</li></ul><p>的最基本系统软件，因此操作系统是最接近电脑硬件的系统软件。现代的操作系统至少具有以下四个特征：</p>",3)),d(a,{id:"mermaid-30",code:"eJxLL0osyFAIceFyjFZ6Nrn3yd45zzfvfr57/vPOnU/3NSrFKujq2ik4RSs93bntaf9EIF9NwRnIa934ZNdqMM8lWunFzFnPuueDea5AuT1Nz9YuVYrlAgCyKCmN"}),e[8]||(e[8]=c('<div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：简单解释一下几个名词。</p><ul><li>并发是指多个程序/执行流同时运行</li><li>共享是指共享同一台计算机内部资源</li><li>虚拟是指使用空分复用技术（内存分页）和时分复用技术（时片轮转）来使得每个执行流感觉自己独占整个计算机得所有资源</li><li>异步是指多执行流执行顺序的不确定性</li></ul></div><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：管理和组织这两个词有些抽象，在 <code>C</code> 语言中，实际体现管理和组织时</p><ol><li>管理：使用 <code>struct</code> 结构体来描述硬件或者软件</li><li>组织：使用链表等高效数据结构组织 <code>struct</code> 结构体的实例化</li></ol></div><p>而操作系统可以分为：</p><ul><li>手动操作的系统设备</li><li>脱机技术的单用户批处理操作系统</li><li>多用户分时操作系统</li><li>软硬实时操作系统</li><li>网路操作系统</li><li>分布式操作系统</li><li>个人操作系统</li></ul><p>接下来我带你稍微了解一下现代的三款主流操作系统软件，分别是：</p><ul><li>类 <code>Unix</code> 操作系统</li><li><code>Windows/MacOS</code> 操作系统</li><li><code>Linux</code> 操作系统</li></ul><div class="hint-container note"><p class="hint-container-title">注</p><p>吐槽：简单了解一下就可以，历史什么的 😎...</p></div><h3 id="_1-1-第一代-60-年代-unix-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-1-第一代-60-年代-unix-操作系统"><span>1.1.第一代 60 年代 Unix 操作系统</span></a></h3><p><code>UNIX</code> 是一种多用户、多任务的操作系统，最初由贝尔实验室的 <code>肯·汤普逊</code> 和 <code>丹尼斯·里奇</code> 在 <code>20</code> 世纪 <code>70</code> 年代早期开发。它被设计用于大型计算机系统，后来也衍生出许多类 <code>UNIX</code> 系统。<code>UNIX</code> 的特点：</p><ol><li><p>多用户和多任务：<code>UNIX</code> 支持多个用户同时访问系统，并且能够同时执行多个任务。每个用户可以拥有自己的账户，有独立的工作空间和权限控制（现在的很多的操作系统都支持这一特性，只不过大多数用户都没有“用户管理”的概念罢了）。</p></li><li><p>强大而灵活的命令行界面：<code>UNIX</code> 采用了命令行界面，用户使用命令来操作系统。这种界面提供了强大的控制和灵活性，使得 <code>UNIX</code> 适用于各种任务和需求（早期的程序员都是在命令行环境下进行工作的）。</p></li><li><p>层次化的文件系统：<code>UNIX</code> 使用层次化的文件系统，通过目录（<code>directory</code>）和子目录的组织，使得文件的管理更加方便。每个文件和目录都有一个唯一的路径，方便用户进行文件的定位和访问。</p></li><li><p>网络功能：<code>UNIX</code> 具有强大的网络功能，支持网络通信和远程访问。它提供了网络协议堆栈和各种网络工具，如 <code>Telnet</code>、<code>FTP</code>、<code>SSH</code> 等，使得 <code>UNIX</code> 系统可以轻松地与其他计算机进行通信和共享资源。</p></li><li><p>可移植性：<code>UNIX</code> 是高度可移植的操作系统，可以在多种硬件平台上运行。这意味着开发人员可以在不同的计算机系统上使用相同的代码和应用程序，提高了软件开发的效率和跨平台兼容性。</p></li><li><p>开放源代码和标准化：<code>UNIX</code> 是基于开放源代码的操作系统，许多版本都是开放源代码的。此外，<code>UNIX</code> 也通过 <code>POSIX</code>（可移植操作系统接口）标准化了一些 <code>API</code> 和功能，增强了系统之间的互操作性。</p></li><li><p>稳定性和安全性：<code>UNIX</code> 系统以其稳定性和安全性而闻名。它采用了严格的权限控制和访问控制机制，保护用户的数据和系统免受未经授权的访问和损坏。</p></li></ol><p>由于 <code>UNIX</code> 的灵活性和可靠性，它被广泛用于大型服务器、工作站、超级计算机等环境，尤其适用于需要高度稳定性和可扩展性的场景。此外，许多现代操作系统，如 <code>Linux</code> 和 <code>MacOS</code>，都受到了 <code>UNIX</code> 的启发并继承了它的一些设计理念和特性。</p><blockquote><p>补充：目前被比较纯粹的 <code>UNIX</code> 系统是指 <code>BSD</code> 和 <code>System V</code> 这两个系统架构分支。</p></blockquote><h3 id="_1-2-第二代-80-年代-windows-操作系统、macos-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-2-第二代-80-年代-windows-操作系统、macos-操作系统"><span>1.2.第二代 80 年代 Windows 操作系统、MacOS 操作系统</span></a></h3><h4 id="_1-2-1-windows-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-2-1-windows-操作系统"><span>1.2.1.Windows 操作系统</span></a></h4><p><code>Windows</code> 系统是由微软公司开发的操作系统系列，广泛应用于个人电脑和企业环境。它在全球范围内被广泛使用，并具有大量的用户和开发者基础。<code>Windows</code> 的特点：</p><ol><li><p>用户界面：<code>Windows</code> 系统采用了直观、易于使用的用户界面。它具有开始菜单、任务栏、桌面等经典元素，提供了丰富的可自定义选项，使用户能够按照自己的喜好来组织和访问应用程序、文件和设置。</p></li><li><p>多任务管理：<code>Windows</code> 系统支持灵活的多任务管理。用户可以轻松切换和管理多个应用程序和窗口，通过任务视图、<code>[Alt+Tab]</code> 快捷键等功能实现高效的多任务操作。</p></li><li><p>兼容性：<code>Windows</code> 系统具有广泛的硬件和软件兼容性，支持各种 PC 设备和外部设备的连接和使用。大多数软件和游戏都有 <code>Windows</code> 版本，使用户可以方便地进行工作、学习和娱乐。不过这点也蛮能被吐槽的，兼容性好到有的时候会卡出远古的 <code>Windows</code> 界面……</p></li><li><p>应用程序生态系统：<code>Windows</code> 系统拥有庞大的应用程序生态系统。用户可以从 <code>Microsoft Store</code>、第三方应用商店和官方网站上下载各种应用程序、工具和游戏。这使得用户可以根据自己的需求和兴趣来扩展和定制系统功能。</p></li><li><p>安全性：<code>Windows</code> 系统注重安全性，提供了多层次的安全防护措施。它有 <code>Windows Defender</code> 防病毒软件、实时防护、防火墙和安全更新等功能，帮助用户保护计算机免受恶意软件和网络威胁。</p></li><li><p>网络和互联网功能：<code>Windows</code> 系统内置了各种网络和互联网功能，包括浏览器（如 <code>Internet Explorer</code> 和 <code>Microsoft Edge</code>）、电子邮件客户端、远程桌面连接等。这使得用户可以方便地上网浏览、发送电子邮件、进行远程访问等操作。</p></li><li><p>支持与社区：<code>Windows</code> 系统得到了广泛的支持和社区参与。微软公司提供了丰富的文档、支持服务和在线社区，使用户能够获取帮助、解决问题和分享经验。</p></li></ol><h4 id="_1-2-2-macos-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-2-2-macos-操作系统"><span>1.2.2.MacOS 操作系统</span></a></h4><p><code>MacOS</code> 是由苹果公司开发的操作系统，专为苹果电脑（<code>Mac</code>）设计。它提供了用户友好的界面、强大的功能和稳定的性能，成为了许多苹果用户的首选操作系统，<code>MacOS</code> 的特点如下：</p><ol><li><p>用户界面：<code>MacOS</code> 具有直观、美观和易于使用的用户界面。它采用了苹果独特的图标、菜单栏和任务栏，以及流畅的动画效果，确保用户的操作体验更加愉快。</p></li><li><p><code>Spotlight</code> 搜索：<code>MacOS</code> 内置了强大的 <code>Spotlight</code> 搜索功能，可以快速查找文件、应用程序、联系人、日历事件等。用户只需要在搜索框中输入关键词，就能快速找到所需内容。</p></li><li><p>多任务管理：<code>MacOS</code> 提供了灵活的多任务管理功能。用户可以通过 <code>Mission Control</code> 查看和切换不同的应用程序、窗口和虚拟桌面，使工作更加高效。</p></li><li><p>内置应用程序：<code>MacOS</code> 内置了一系列实用的应用程序，如 <code>Safari</code> 浏览器、Mail 邮件客户端、<code>iTunes</code> 音乐播放器、<code>iMessage</code> 即时通信工具等。这些应用程序被精心设计，与操作系统紧密集成，提供优秀的用户体验。</p></li><li><p><code>iCloud</code> 集成：<code>MacOS</code> 与苹果的云服务 <code>iCloud</code> 紧密集成。用户可以通过 <code>iCloud</code> 在不同设备上同步和共享文件、照片、联系人、日历等数据，方便实用。</p></li><li><p>安全性：<code>MacOS</code> 注重安全性，在硬件和软件层面都提供了多种安全功能和保护机制。例如，<code>FileVault</code> 可以加密用户的硬盘数据，<code>Gatekeeper</code> 可以防止恶意软件的运行，内置的防火墙可以保护网络连接等。</p></li><li><p>应用生态系统：<code>MacOS</code> 拥有丰富的应用程序生态系统。用户可以从 <code>Mac App Store</code> 下载各种应用程序，涵盖从生产工具到创作软件、娱乐应用等各个领域。</p></li></ol><h3 id="_1-3-第三代-90-年代-linux-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-3-第三代-90-年代-linux-操作系统"><span>1.3.第三代 90 年代 Linux 操作系统</span></a></h3><hr><p><code>Linux</code> 是一个基于 <code>POSIX</code> 和 <code>Unix</code> 的多用户、多任务、支持多线程和多 CPU 的性能稳定的操作系统，可免费使用并自由传播。</p><p><code>Linux</code> 继承了 <code>Unix</code> 以网络为核心的设计思想，它同时也是一个类 <code>Unix</code> 操作系统，能运行主要的 <code>Unix</code> 工具软件、应用程序和网络协议，支持 <code>32</code> 位及 <code>64</code> 位硬件，可安装在比如手机、平板电脑、路由器、台式计算机、超级计算机等各种计算机硬件设备中。</p><blockquote><p>吐槽：在很多你觉得不可思议的古老设备中，都能搭载 <code>Linux</code> 操作系统。</p></blockquote><p><code>Linux</code> 操作系统最初由一位名为 <code>Linus Torvalds</code> 的芬兰赫尔辛基大学的学生编制内核，随后由全世界各地的成千上万的程序员设计和实现。其目的是建立不受任何商品化软件的版权制约的、全世界都能自由使用的类 <code>Unix</code> 兼容产品。因为 <code>Linux</code> 是本系列文章的围绕点，因此 <code>Linux</code> 这一部分我们后面详细解读。</p>',25)),i("blockquote",null,[i("p",null,[e[1]||(e[1]=o("吐槽：")),e[2]||(e[2]=i("code",null,"Linus Torvalds",-1)),e[3]||(e[3]=o(" 这人非常的有趣 ")),i("span",C,[d(l,null,{default:r(()=>e[0]||(e[0]=[o("比如竖中指骂人")])),_:1})]),e[4]||(e[4]=o(" 😏，坊间一直流传和谈论和他有关的事物..."))])]),e[9]||(e[9]=c(`<h2 id="_2-linux-的认知" tabindex="-1"><a class="header-anchor" href="#_2-linux-的认知"><span>2.Linux 的认知</span></a></h2><h3 id="_2-1-linux-是什么" tabindex="-1"><a class="header-anchor" href="#_2-1-linux-是什么"><span>2.1.Linux 是什么</span></a></h3><p><code>Linux</code> 系统和 <code>Ubuntu</code> 系统、<code>Windows</code> 系统、<code>MacOS</code> 系统一样，都是一种操作系统。下面是 <code>Linux</code> 的官网：<a href="https://www.kernel.org/" target="_blank" rel="noopener noreferrer">The Linux Kernel Archives</a>，您可以简单前去查看一下。</p><ol><li><p>简单讲：手敲指令交互（和 <code>Windows</code> 的图形化界面是不一样的）基于命令行的适合程序员的操作系统。</p></li><li><p>复杂讲：<code>Linux</code> 是一种开源的、类 <code>Unix</code> 操作系统内核，广泛应用于各种设备和计算机系统中。它由芬兰计算机科学家 <code>Linus Torvalds</code> 在 <code>1991</code> 年开发，并得到了全球范围内的众多开发者的贡献和支持。<code>Linux</code> 的核心设计理念是以稳定、高性能和开放性为目标。具有许多优点，如良好的可移植性、可定制性、多用户支持等。作为一个开源操作系统，<code>Linux</code> 可以被任何人免费使用、修改和分发，这使得它成为了许多服务器、超级计算机、移动设备和嵌入式系统的首选操作系统。</p></li></ol><h3 id="_2-2-linux-的特点" tabindex="-1"><a class="header-anchor" href="#_2-2-linux-的特点"><span>2.2.Linux 的特点</span></a></h3><hr><ol><li>开源性：<code>Linux</code> 的源代码是开放的，任何人都可以查看、修改和重新分发。这使得用户可以自由地定制、优化和扩展 Linux 系统。</li><li>多用户、多任务支持：<code>Linux</code> 支持多用户同时登录，并且可以同时执行多个任务。这对于服务器和大规模计算机集群非常重要。</li><li>稳定性、安全性：<code>Linux</code> 内核经过了长时间的测试和改进，具有高度的稳定性和安全性。它可以长时间运行而不需要重启，并提供了各种安全功能来保护系统和用户数据。</li><li>良好的可移植性：<code>Linux</code> 可以在各种不同的硬件平台上运行，从个人电脑到服务器、嵌入式设备和超级计算机等。</li><li>丰富的软件支持：<code>Linux</code> 拥有庞大而活跃的开源社区，提供了丰富的软件和工具。用户可以轻松获取和安装各种应用程序、开发工具和服务。</li><li>命令行界面：<code>Linux</code> 提供了强大的命令行界面，使用户可以通过命令来执行各种任务和管理系统。同时，也提供了图形用户界面（<code>GUI</code>）作为可选的交互方式。</li><li>多发行版：<code>Linux</code> 有许多发行版（如 <code>Ubuntu</code>、<code>Red</code> <code>Hat</code>、<code>CentOS</code>、<code>Debian</code> 等），它们基于 <code>Linux</code> 内核，并以不同的配置和软件包集合来满足不同用户的需求。无论是作为服务器操作系统、个人电脑的替代品，还是嵌入式系统的基础，<code>Linux</code> 都广泛应用于各种领域，并成为计算领域中最重要的操作系统之一</li><li>...</li></ol><h3 id="_2-3-linux-的用途" tabindex="-1"><a class="header-anchor" href="#_2-3-linux-的用途"><span>2.3.Linux 的用途</span></a></h3><hr><p>作为操作系统，本身的作用就是：<strong>可以调动一台计算机的硬件资源，合理使用计算机资源，进而使得计算机发挥出更大的作用</strong>。由于 <code>Linux</code> 本身是开源的，全世界的程序员都在一起维护，因此其稳定性和安全性深受企业喜爱，常用在：</p><ol><li>服务器后台</li><li>嵌入式设备</li><li>入网家用设备</li><li>车载系统手机系统（安卓）</li><li>云服务，例如：腾讯云、阿里云、亚马逊 <code>aws</code> 业务等这些企业都提供了 <code>Linux</code> 后台云服务</li><li>...</li></ol><h2 id="_3-linux-的版本" tabindex="-1"><a class="header-anchor" href="#_3-linux-的版本"><span>3.Linux 的版本</span></a></h2><h3 id="_3-1-从内核角度分类" tabindex="-1"><a class="header-anchor" href="#_3-1-从内核角度分类"><span>3.1.从内核角度分类</span></a></h3><p>主流的操作系统几乎都有一个叫做内核（<code>kernel</code>）的组成部分，按照内核版本做分类的话，可以根据 <code>Linxu </code> 内核存放网站的压缩包名字中进行分类，压缩包的命名规则是 <code>主版本.从/次版本.修正次数.压缩包格式</code>，一个压缩包名称就代表一个版本号，您可以 <a href="https://mirrors.edge.kernel.org/pub/linux/kernel/" target="_blank" rel="noopener noreferrer">前往 Linux 内核源码存放网站</a> 中观察一下...</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 在 https://mirrors.edge.kernel.org/pub/linux/kernel/v6.x/ 下显示出来的页面</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Index</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /pub/linux/kernel/v6.x/</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">.</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">./</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">incr/</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                                              03-Aug-2024</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 07:10</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">       -</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">stable-review/</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                                     31-Jul-2024</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 10:03</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">       -</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># ....</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">linux-6.0.1.tar.gz</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                                 12-Oct-2022</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 07:54</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    204M</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">linux-6.0.1.tar.sign</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                               12-Oct-2022</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 07:54</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">     987</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">linux-6.0.1.tar.xz</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                                 12-Oct-2022</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 07:54</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    128M</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">linux-6.0.10.tar.gz</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                                26-Nov-2022</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 08:36</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    204M</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">linux-6.0.10.tar.sign</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                              26-Nov-2022</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 08:36</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">     989</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>补充：一般来说从/次版本为偶数则是稳定的、可以直接使用的版本，而奇数则是测试版本。修正次数则是指修正这个版本在运行中发现的问题的次数。</p></blockquote><h3 id="_3-2-从商业角度分类" tabindex="-1"><a class="header-anchor" href="#_3-2-从商业角度分类"><span>3.2.从商业角度分类</span></a></h3><p><code>Linux</code> 操作系统最主要的部分就是 <code>Linux</code> 的内核部分，由于 <code>Linux</code> 的源码可以被人任意复制、修改、使用，于是就产生了一些厂商，在基于 <code>Linux</code> 内核之上，对 <code>Linux</code> 做一些定制化内容，由于各家厂商理念不同，也诞生出不同版本路线的 <code>Linux</code> 操作系统。</p><ol><li><p><code>Ubuntu</code>：由 <code>Canonical</code> 公司开发，是最为流行的 <code>Linux</code> 发行版之一，易于使用。</p></li><li><p><code>Debian</code>：基于自由软件的社区开发的 <code>Linux</code> 发行版，稳定性和安全性得到广泛认可。</p></li><li><p><code>Red Hat Enterprise Linux</code>：由 <code>Red Hat</code> 公司开发，主要用于企业级应用。</p></li><li><p><code>Fedora</code>：由 <code>Red Hat</code> 公司推出，为开源社区提供实验性质的操作系统，新技术的试验平台。</p></li><li><p><code>CentOS</code>：<code>CentOS</code> 是由社区维护的、基于 <code>Red Hat Enterprise Linux</code> 源代码构建而成的 <code>Linux</code> 发行版，适合用于服务器环境。（企业用的多）</p></li><li><p><code>Arch Linux</code>：以简洁、灵活、轻量级著称，适合高级用户。</p></li><li><p><code>openSUSE</code>：由 <code>SUSE Linux GmbH</code> 开发，提供易用、灵活、可扩展的操作系统。</p></li><li><p><code>Gentoo</code>：由社区维护的源码型 <code>Linux</code> 发行版，极具个性化和定制性。</p></li><li><p>除此之外还有很多其他的发行版，如 <code>Mageia</code>、<code>Puppy Linux</code>、<code>kail</code>、<code>红旗</code> 等</p></li><li><p>...</p></li></ol><blockquote><p>吐槽：个人最尝试用的两款操作系统，一个是 <code>Ubuntu</code>，另外一个就是 <code>Centos</code>。</p></blockquote><p>新手推荐下载 <code>Centos7</code> 进行学习，熟练后就可以开始使用 <code>Ubuntu</code> 进行学习了。</p><h2 id="_4-linux-的安装" tabindex="-1"><a class="header-anchor" href="#_4-linux-的安装"><span>4.Linux 的安装</span></a></h2><p>在学习 <code>Linux</code> 之前，首先需要有一个操作环境把？否则谈及 <code>Linux</code> 的相关知识就是白谈，因此我们需要有一个能够运行 <code>Linux</code> 操作系统的环境供我们实验，下面推荐几种常见的做法。</p><h3 id="_4-1-云服务器与-shell-软件-推荐" tabindex="-1"><a class="header-anchor" href="#_4-1-云服务器与-shell-软件-推荐"><span>4.1.云服务器与 Shell 软件（推荐）</span></a></h3><p>购买一个年租的云服务器，再下载免费版的 <code>Xshell</code> 结合使用。部署简单（实在不会还能联系提供云服务器的厂商，协助安装，官方甚至还有写游戏），只是要钱，并且一般都是月租和年租...但是购买一个服务器可以多人使用噢！推荐腾讯云、华为云、阿里云（这些云服务器厂商有时有学生优惠），并且如果服务器的配置不高，其实统计下来几年的费用甚至都超不过一台家用个人笔记本。</p><p>有了一台云服务器，您至少可以学习以下的知识模块：</p><ul><li>原生态的学习一台 <code>Linux</code> 的使用，包含基本命令行操作、网络编程、操作系统概念...</li><li><code>MySQL、Redis</code> 等数据库的学习...</li><li>结合 <code>nginx</code> 和一个域名，可以在互联网上挂载自己的个人网站，不过这要求您至少会一些网络三大件的皮毛（<code>HTML</code>、<code>CSS</code>、<code>JS</code>），以及熟悉一些关于域名的备案流程，无论是静态网站还是动态网站</li><li>使用类似 <code>cpp-httplib、flask、Node.js</code> 等框架搭建 <code>Web</code> 应用服务器</li><li>一个云服务器，到处可以运行，租用云服务器后，无论是个人电脑、手机、平板、机房...都可以使用一些 <code>ssh</code> 工具来访问服务器，真正意义上的便携（我以前懒得带一台电脑出门时，就经常会使用平板远端连接服务器作为我的替代方案）</li><li>维护简单，哪怕自己系统挂了，可以通过厂商的控制台一键还原操作系统，也可以直接找厂商修复还原，可以无限瞎折腾...</li><li>可以快速体验不同的操作系统，服务器厂家一般不仅仅给您提供一种操作系统，还会给您提供重装系统的服务，可以快速体验到不同的 <code>Linux</code> 操作系统</li><li>您还可以体验到一些脚本语言的编写例如学习 <code>shell</code></li><li>后续如果需要提高电脑性能，可以随时增加费用，给服务器添加更多的硬件资源</li></ul><p>相信我，购买一个服务器并不贵（前提是性能不高），在学习过程中是很有性价比的。</p><p>这里简单介绍一些关于腾讯云的服务器申请流程，其他云厂商的服务器申请过程也是类似的...</p><blockquote><p>注意：请在购买之前了解优惠活动，有时学生优惠还是挺多的...</p></blockquote><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>等待操作系统实例初始化后，就可以点击控制台查看轻量级云服务器了。</p><figure><img src="'+x+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们可以快速云服务器的命令行窗口，在右上角点击登录即可，可能需要输入您的密码，忘记了也没关系，可以用您的腾讯云账号重置密码。</p><figure><img src="'+w+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>后续我们所输入的指令都是在这里输入的，请注意 <code>Linux</code> 从操作系统支持多个用户同时使用一个系统，其中最重要的就是记住上面的 <code>root</code> 账户密码，这是权限最高的管理员密码，除了您别人也无法知道这个密码是什么，忘记了就只能重置...</p><p>不过这种使用网页 <code>shell</code> 的体验比较一般，一般我会推荐您使用两个 <code>shell</code> 软件，一个是 <code>XShell</code>，一个是 <code>Tabby</code>。前者是部分版本免费的，运行时资源消耗较低，但是界面不怎么好看，比较古老；后者是开源免费的，界面非常好看，体验感优雅，但是运行时资源消耗可能会比较大...下面是我的 <code>Xshell</code> 和 <code>Tabby</code> 软件的界面，关于这两个软件的下载和对服务器的远端连接配置，还请您自行搜索查询...（<span style="text-emphasis:filled red;"> 或者等我以后补充叭，待补充...</span>）</p><figure><img src="'+L+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>顺带一提，新版本的 <code>Windows</code> 操作系统下，微软自带的 <code>cmd</code> 也支持使用 <code>ssh</code> 指令直接连接，不过这里我就不提这种了，您感兴趣自己搜索一下...</p><figure><img src="'+y+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+A+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>吐槽：我个人腾讯云和阿里云体验的比较多，不过对腾讯云的控制台会更加熟悉一些...腾讯打钱 😇！</p></blockquote><p>而本系列博文的所有操作都是基于云服务器上的，包括后续的网络内容，也在云服务器上进行展开。当然，也有一些非云服务器的后备方案，但是这些方案对新手不友好，而且可能涉及对网络学习的阻碍。不过我依旧给您稍微介绍一下，感兴趣的话您也可以鼓捣鼓捣...</p><blockquote><p>注意：第一次买 <code>Linux</code> 服务器我推荐使用 <code>CentOs 7</code> 版本的 <code>Linux</code> 服务器，这个版本的 <code>Linux</code> 最为经典也常用。而且对于云服务器来说，即便您现在选定了操作系统，未来也可以通过服务器厂商的可视化面板一键初始化系统，然后重新安装一些更为时髦的操作系统（我这个时候就流行使用 <code>Ubuntu</code>）。</p></blockquote><h3 id="_4-2-虚拟机-vmware-player-推荐" tabindex="-1"><a class="header-anchor" href="#_4-2-虚拟机-vmware-player-推荐"><span>4.2.虚拟机 VMware player（推荐）</span></a></h3><p>虚拟机算是一种容器技术，可以在一台本就搭载了操作系统的主机上（例如您的 <code>Windows</code> 电脑上）运行一个虚拟出来的操作系统，这个操作系统可以是 <code>Linux</code> 或其他的操作系统。这种虚拟机运行的操作系统获取成本最低，使用简单，不过偶尔会有奇怪的 <code>bug</code>（这种情况并不多），并且安装麻烦。但如果只是学习基本命令和一些系统调用基本也还过得去。就是学习到网络编程可能会麻烦一点，包括以后要学习的 <code>Nginx</code>、<code>MySQL</code>、<code>Web</code> 等都有可能受到影响。另外还需要找到对应操作系统的镜像文件，不过这个也不难找，上操作系统的官网下录镜像文件就行，因此 <code>Linux</code> 纯新手也比较推荐直接使用这个。</p><p>可以直接看 <code>CSDN</code> 看 <a href="https://blog.csdn.net/qq_45743985/article/details/121152504" target="_blank" rel="noopener noreferrer">这哥们写的 Centos7 安装教程</a>。</p><h3 id="_4-3-linux-to-go-的使用-一般" tabindex="-1"><a class="header-anchor" href="#_4-3-linux-to-go-的使用-一般"><span>4.3.Linux To Go 的使用（一般）</span></a></h3><p>去网店买一个系统 <code>U</code> 盘（不是普通 <code>U</code> 盘），这里的系统 <code>U</code> 盘是一种即插即用式的 <code>U</code> 盘，只要给自己的个人计算机插上 <code>U</code> 盘就可以使用某种操作系统，不过这种直接买的有时会偏贵（当然你也可以选择自己烧录一个……不过这对 U 盘的读取速度要求比较高，也可以换一种媒介）。</p><p>我自己就有一个 <code>128G</code> 的 <code>Ubuntu</code> （一种 <code>Linux</code> 操作系统）系统 <code>U</code> 盘，使用起来还挺不错。</p><p>这个方案能进行原生态的使用一台 <code>Linux</code> 机器，并且文件能和原来的电脑一起共享，并且方便快捷，可以随身携带（我的大学的时候经常在 <code>U</code> 盘内部预先安装好各种软件和环境，到了机房就把 <code>U</code> 盘插到学校的计算机里哈哈），并且比双操作系统来得更快捷一些。</p><p>不过几个小问题：</p><ol><li>使用 <code>U</code> 盘的时候可能有点烫 <span class="meimu" title="你知道的太多了">也许会把您吓倒也说不定，我曾经被烫到手...</span></li><li>如果是自己烧录 <code>U</code> 盘可能需要一定的技术门槛</li><li><code>U</code> 盘很容易坏，万一坏掉了，很容易整个系统都无法再访问了（包括里面的文件和数据），这点很危险，因此最好还是把 <code>U</code> 盘版的 <code>To Go</code> 技术当作是开发者便携的一个小工具</li></ol><p>感兴趣看着玩就可以。</p><h3 id="_4-4-直接安装-linux-系统-一般" tabindex="-1"><a class="header-anchor" href="#_4-4-直接安装-linux-系统-一般"><span>4.4.直接安装 Linux 系统（一般）</span></a></h3><p>如果你有闲置的电脑，可以直接烧录一个用于重装系统的系统 <code>U</code> 盘保存系统文件，给电脑直接安装一个 <code>Linux</code> 系统（或者也可以搞一个双系统），好处就是最为“原生态”，但是对于丝毫不懂系统的新手来说配置的难度比较高。</p><p>并且这台电脑以后大概率是作为开发和工作使用了，基本不会在其他娱乐的方面有所作用（因为支持 <code>Linux</code> 的大众应用软件有可能不太好用，甚至没有对于的版本支持）。</p><p>这种需要有一定的技术力，所以新手不推荐...</p><h3 id="_4-5-在-windows-中使用-不推荐" tabindex="-1"><a class="header-anchor" href="#_4-5-在-windows-中使用-不推荐"><span>4.5.在 windows 中使用（不推荐）</span></a></h3><p>在 <code>windows</code> 中可以使用类似 <code>Cygwin64Terminal</code> 这些软件模拟 <code>Linux</code> 的 <code>bash</code> 窗口，但是不太推荐。毕竟不够“原生态”，不利于您的学习，而且安装也是一个问题，并且微软貌似也不太对这方面感兴趣...</p><h3 id="_4-6-一些在线的命令行网站-不推荐" tabindex="-1"><a class="header-anchor" href="#_4-6-一些在线的命令行网站-不推荐"><span>4.6.一些在线的命令行网站（不推荐）</span></a></h3><p>新手可以提前寻找一些网站来使用 <code>Linux</code> 的系统：</p><ol><li><a href="https://www.tutorialspoint.com/unix_terminal_online.php" target="_blank" rel="noopener noreferrer">Linux 在线网站 1</a></li><li><a href="https://www.tutorialspoint.com/unix_terminal_online.php" target="_blank" rel="noopener noreferrer">Linux 在线网站 2</a></li><li><a href="https://copy.sh/v86/?profile=linux26" target="_blank" rel="noopener noreferrer">Linux 在线网站 3</a></li></ol><p>虽然这样直接打开网站就可以使用了，但是我还是不太推荐：一是您也不知道这些网站的系统完整度如何，是否有一些许久都没有维护的 <code>bug</code>，二是有部分网站响应也比较缓慢，三是部分指令不支持，四是不利于除了 <code>Linux</code> 的其他模块的学习。</p><p>对于这些网站，我的看法是：您玩玩就好了，不过有的时候拿来测试一些比较危险的命令确实不错...</p><blockquote><p>补充：另外如果您愿意，有的时候可以去一些比较奇怪的网站上探索一些更加古老的操作系统和学习机，这有助于我们了解一些操作系统的发展历程，譬如这个：<a href="https://www.compumuseum.com/index.html?from=bwg" target="_blank" rel="noopener noreferrer">网页里的电脑博物馆云端的计算机博物馆，在网页模拟器中重现电脑发展史</a>。您能体验到很多很多不同的操作系统，甚至可以在里面玩游戏和体验某些电脑病毒！<span class="heimu" title="你知道的太多了"> 欸你还别说还能体验到尊早期的一款东方弹幕游戏... </span></p></blockquote><h2 id="_5-linux-的学习" tabindex="-1"><a class="header-anchor" href="#_5-linux-的学习"><span>5.Linux 的学习</span></a></h2><p>关于 <code>Linux</code> 的学习通常分为三步，基本指令-&gt; 系统原理-&gt; 软件使用，如果对系统原理不是特别看重的话，只需要掌握基本原理和常用的软件即可。</p>',74))])}const D=t(v,[["render",B]]),N=JSON.parse('{"path":"/1.%E7%BC%96%E7%A0%81%E4%BF%AE%E5%85%BB/3.%E7%B3%BB%E7%BB%9F%E7%BD%91%E7%BB%9C/adbi3n98/","title":"先导课程","lang":"zh-CN","frontmatter":{"createTime":"2025/04/11 12:12:53","permalink":"/1.编码修养/3.系统网络/adbi3n98/","title":"先导课程","description":"1.划时代的 OS 这里有一个关于操作系统发展的视频，您可以观看一下 操作系统究竟是怎么发展而来的，你真的了解吗？ 这个视频，再来往下观看。","head":[["meta",{"property":"og:url","content":"https://limou3434.github.io/work-blog-website/work-blog-website/1.%E7%BC%96%E7%A0%81%E4%BF%AE%E5%85%BB/3.%E7%B3%BB%E7%BB%9F%E7%BD%91%E7%BB%9C/adbi3n98/"}],["meta",{"property":"og:site_name","content":"缡墨"}],["meta",{"property":"og:title","content":"先导课程"}],["meta",{"property":"og:description","content":"1.划时代的 OS 这里有一个关于操作系统发展的视频，您可以观看一下 操作系统究竟是怎么发展而来的，你真的了解吗？ 这个视频，再来往下观看。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-19T14:21:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-19T14:21:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"先导课程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-19T14:21:17.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":23.61,"words":7084},"git":{"updatedTime":1745072477000,"contributors":[{"name":"limou3434","username":"limou3434","email":"898738804@qq.com","commits":10,"avatar":"https://avatars.githubusercontent.com/limou3434?v=4","url":"https://github.com/limou3434"}]},"autoDesc":true,"filePathRelative":"notes/1.编码修养/3.系统网络/001_ljp_2024_06_08_先导课程.md","categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"557f7c","sort":1,"name":"编码修养"},{"id":"7ab59a","sort":3,"name":"系统网络"}],"bulletin":true}');export{D as comp,N as data};
