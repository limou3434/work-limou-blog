import{_ as s,c as e,b as t,o as a}from"./app-Bm0qCaC3.js";const n="/work-blog-website/assets/ea709e83e396b34709b78cc7ab495a9-B0kXd9y2.png",o="/work-blog-website/assets/1713168918468-DWlCKKuq.jpg",l={};function d(r,i){return a(),e("div",null,i[0]||(i[0]=[t('<h2 id="_1-网络发展简要" tabindex="-1"><a class="header-anchor" href="#_1-网络发展简要"><span>1.网络发展简要</span></a></h2><p>下面就是简单提及一些概念而已，简单看看即可：</p><ol><li><p><strong>网络的层级结构</strong>：网络可以分为局域网、城域网、广域网，根据规模不同而定（这是相对概念）。随着时间的推移，网络从小范围的局域网发展成连接城市和城市的城域网，最终形成全球性的广域网，使得互联网成为全球性的现象。</p></li><li><p><strong>网络的基础设施建设</strong>：网络的基础建设是由国家和运营商一起扶持建筑而成的，学习网络时，运营商这个角度我们也必须考虑进去</p></li><li><p><strong>网络中的不同角色</strong>：</p><ul><li><p><strong>通信企业</strong>：如华为在生产各种通信设备上起着关键作用。</p></li><li><p><strong>运营商</strong>：如中国移动、中国联通、中国电信...在网络基础设施的建设中发挥关键作用，包括架设基站、路由器、交换机等硬件设备，这些设施的建设和维护为互联网的发展提供了基础。</p><p>通信基础设施的建设成本高，赚取回报周期长，相对于互联网公司提供的服务来说，投入产出比较低，因此很多大型企业通常不愿意涉足这个领域。</p><p>运营商通过用户支付的电话费、流量费等方式获得收入，但在一些情况下可能存在费用较高、服务贵的问题。</p></li><li><p><strong>互联网公司</strong>：更愿意提供软件服务（如社交、购物、直播等服务），追求更短的投资回报周期来赚取收入，而不愿意进行基础设施建设。</p></li></ul></li></ol><h2 id="_2-网络协议简要" tabindex="-1"><a class="header-anchor" href="#_2-网络协议简要"><span>2.网络协议简要</span></a></h2><h3 id="_2-1-协议概念" tabindex="-1"><a class="header-anchor" href="#_2-1-协议概念"><span>2.1.协议概念</span></a></h3><ul><li><strong>生活中的协议</strong>：是约定俗成，如同购房、购车或进入企业签订劳动合同一样，它是双方达成一致的一种约定。</li><li><strong>软件中的协议</strong>：也是一种约定，是为了在网络通信中，让远距离的计算机能够更快速地按照规则来进行通信。</li></ul><p>当网络通信距离变得很长时，数据的传输需要有类别和约定，以便双方能够快速理解和正确处理种类不同的数据。</p><p>计算机之间的传输媒介是光信号和电信号。通过“频率”和“强弱”来表示 <code>0</code> 和 <code>1</code> 这样的信息。要想传递各种不同种类的信息, 就需要约定好双方的数据格式（在软硬件上都要约定）。软件上的协议一旦统一起来，就会变成通信行业的行业标准。而在 <code>Linux</code> 内核中进行网络的协议管理说白了就是使用结构体，也就是先描述再组织。</p><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：有些地方也会强调协议的所谓三要素</p><ul><li>语法（格式）</li><li>语义（含义）</li><li>时序（时间）</li></ul><p>简单理解一下就行。</p></div><h3 id="_2-2-协议分层" tabindex="-1"><a class="header-anchor" href="#_2-2-协议分层"><span>2.2.协议分层</span></a></h3><p>协议的实现其实就可以简单理解为一种软件，而软件d的设计是可以分层的，因此协议当初的制定者为了考虑到可维护性，在协议上也做了分层。事实证明，这一做法非常有意义，分层实际上就是一种封装，因此协议在设计的时候也会被分层封装起来，通常软件需要分层所带来的好处如下：</p><ol><li><strong>模块化</strong>：将系统分解成多个层次后可以视为多个独立的模块，每个模块负责特定的功能，有利于代码模块化，使每个模块都可以被单独开发、测试、维护，降低了系统的复杂性，提高了可维护性（也好分工、功能逻辑清晰）。</li><li><strong>可扩展</strong>：分层解耦使得系统的各个层次之间的依赖性降低，当需要对系统进行扩展或修改时，可以更容易地定位和修改特定层次的代码，而不会对其他层次造成影响，这样做有利于系统的灵活性和可扩展性，使得系统更容易适应未来的需求变化（随时可以替换某一层）。</li><li><strong>可复用</strong>：每个层次都可以被视为一个独立的模块，具有清晰的接口和功能。这样做有利于提高代码的可重用性，使得同一层次的功能可以被多个模块共享和复用，减少了重复开发的工作量（无需反复制作轮子）。</li></ol><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：不过有些时候，分层模型会带来一些负面影响，例如每一层都出现类似的问题，例如网络协议的每一层都需要解决封装分离和数据分用这两个功能，但这这种其实也还好。主要是有一些功能无法通过分层进行简单分离，这些功能往往过于耦合，每个人对其分离的界限定义不一，因此定义界限相对模糊。</p></div><p>通信的复杂程度一般和距离成正相关，那这些复杂的问题体现为什么呢？通信范畴上不同分层需要解决的问题简单可以归纳如下：</p><table><thead><tr><th>层级</th><th>对应问题</th></tr></thead><tbody><tr><td><strong>应用层</strong>：数据处理问题</td><td>数据如何进行进一步的处理？我们需要这些从远方来的数据做什么？</td></tr><tr><td><strong>传输层</strong>：数据丢包问题</td><td>数据什么时候进行发送？数据丢失怎么办？我们要不要重传？</td></tr><tr><td><strong>网络层</strong>：主机定位问题</td><td>如何定位到一个主机？源地址和目的地址是什么？</td></tr><tr><td><strong>链路层</strong>：下一跳主机传递问题</td><td>如果保证数据从上一跳主机地址交付给下一跳主机地址？</td></tr><tr><td><strong>物理层</strong>：硬件实现问题</td><td>在硬件上如何实现网络通信？</td></tr></tbody></table><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意：由于我偏向软件方向，所以重点介绍协议中软件的部分（也就是上四层中的应用层、传输层、网络层、数据链路层）...而物理层对于我来说可以是透明看不见的，有机会再研究。</p></div><p><code>Linux</code> 对传输层和网络层的支持就体现在对用户暴露的系统接口上，网络编程在本质上也是一种系统编程（因为有对应的系统调用），也就是说，学习网络就必须要先把操作系统学好。</p><p>而链路层和物理层的实现则直接体现在路由器以下的硬件单位，我们最多探讨一下原理，如果您组建过局域网，那么会实践到一部分关于这两层的网络知识。笼统来说：</p><ul><li>路由器实现了网络层到物理层</li><li>交换机实现了数据链路层到物理层</li><li>集线器实现了物理层</li></ul><p>每一层协议分层都可以填入不同的具体协议，例如应用层可以选择使用 <code>http</code> 协议，也可以选择使用 <code>https</code>。</p><p>因此，网络分层实际上是解决网络传输问题的一整套解决方案。</p><p>接下来我们来详细归纳一下两个常见的网络协议栈概念，<code>OSI</code> 七层模型和 <code>TCP/IP</code> 五层模型。</p><h4 id="_2-2-1-osi-七层模型" tabindex="-1"><a class="header-anchor" href="#_2-2-1-osi-七层模型"><span>2.2.1.OSI 七层模型</span></a></h4><p><code>OSI</code> 实际是一个参考标准，而我们上面提及的五层模型就是 <code>TCP/IP</code> 模型，是 <code>OSI</code> 的具体实现。</p><p>从官方标准来说，<code>OSI</code>（<code>Open Systems Interconnection</code>）是由国际标准化组织（<code>ISO</code>）制定的参考模型，用于描述计算机网络中不同层次之间的通信协议。该模型将网络通信划分为七个层次，每个层次负责不同的功能，从而实现了网络协议的分层设计，使得不同层次的协议能够独立开发和演化，以下是 <code>OSI</code> 模型的七个层级：</p><table><thead><tr><th><strong>层级</strong></th><th><strong>功能</strong></th></tr></thead><tbody><tr><td><strong>应用层（Application Layer）</strong></td><td>提供网络服务和应用程序的接口，包括网络管理、文件传输、电子邮件等，提供用户与网络之间的交互。</td></tr><tr><td><strong>表示层（Presentation Layer）</strong></td><td>处理数据的格式，确保不同系统的数据能够正确解释。负责数据的加密、压缩和格式转换。</td></tr><tr><td><strong>会话层（Session Layer）</strong></td><td>管理会话控制，建立、维护和终止通信会话，提供数据同步和恢复。规定建立链接、断开链接、保持链接。</td></tr><tr><td><strong>传输层（Transport Layer）</strong></td><td>提供端到端的通信服务，确保可靠的数据传输。主要协议有 <code>TCP</code>（<code>Transmission Control Protocol</code>）和 <code>UDP</code>（<code>User Datagram Protocol</code>）。</td></tr><tr><td><strong>网络层（Network Layer）</strong></td><td>负责在不同的网络中传输数据，进行路径选择和逻辑寻址。主要协议有 <code>IP</code>（<code>Internet Protocol</code>）。</td></tr><tr><td><strong>数据链路层（Data Link Layer）</strong></td><td>提供点对点的数据传输，将比特流组织成帧，进行差错检测和纠正，以及进行流量控制。</td></tr><tr><td><strong>物理层（Physical Layer）</strong></td><td>负责传输比特流，定义硬件设备和传输媒体的规范，如电缆、光纤、电压等。</td></tr></tbody></table><p>每个层次都定义了一组规范和协议，层次之间通过明确定义的接口进行通信。</p><p>上面定义的层级包含了我们之前讨论的五个层，并且更加细化，理论上所有的网络编程都需要包含上述层级。</p><p>尽管在实践种被浓缩成了只有五层的 <code>TCP/IP</code> 模型。但在实践中，无处不体现 <code>OSI</code> 的七层结构（例如 <code>TCP/IP</code> 五层模型中，表示层和会话层可以统一在应用层中实现）...</p><h4 id="_2-2-2-tcp-ip-五层模型" tabindex="-1"><a class="header-anchor" href="#_2-2-2-tcp-ip-五层模型"><span>2.2.2.TCP/IP 五层模型</span></a></h4><p>我们来重新提及一下 <code>TCP/IP</code> 五层模型，让其概念更加清晰（之前提到的 <a href="##2.2.%E5%8D%8F%E8%AE%AE%E5%88%86%E5%B1%82">2.2.协议分层</a> 就简单提及了一下），<code>TCP/IP</code> 以两个具体协议（<code>TCP</code> 协议和 <code>IP</code> 协议）来命名，其主要原因是因为 <code>TCP/IP</code> 模型是 <code>OSI</code> 的一种实例化，在传输层和网络层分别采用了 <code>TCP</code> 协议和 <code>IP</code> 协议。这个名字可以概括该模型中最为核心的部分，其五层的作用如下：</p><table><thead><tr><th style="text-align:left;">层级</th><th>功能</th><th>目标</th></tr></thead><tbody><tr><td style="text-align:left;"><strong>应用层(Application Layer)</strong></td><td>提供网络服务和应用程序的接口，包括网络管理、文件传输、电子邮件等。是通信的最高层，直接与用户应用程序和网络通信服务接口。</td><td>数据如何进行进一步的处理？需要拿数据实现什么业务需求？</td></tr><tr><td style="text-align:left;"><strong>传输层(Transport Layer)</strong></td><td>提供端到端的通信服务，确保可靠的数据传输。主要协议有 <code>TCP</code>（<code>Transmission Control Protocol</code>）和 <code>UDP</code>（<code>User Datagram Protocol</code>）。</td><td>提供端到端的通信服务，确保一定程度上可靠的数据传输，并且解决核心三个问题：要发多少数据？什么时候发数据？数据丢失了怎么办？</td></tr><tr><td style="text-align:left;"><strong>网络层(Network Layer)</strong></td><td>负责在不同的网络中传输数据，进行路径选择和逻辑寻址。提供 <code>IP</code>（<code>Internet Protocol</code>）协议，用于在网络中唯一标识设备并进行数据包的路由。</td><td>如何确定数据包从源主机到目标主机的路径？如何确保数据包有按照正确的顺序到达目标的能力（但不一定做得到，只是有这个能力）？如何定位到一个主机？如何解决下一跳的问题？</td></tr><tr><td style="text-align:left;"><strong>链路层(Data Link Layer)</strong></td><td>提供点对点的数据传输，将比特流组织成帧，并进行差错检测和纠正。定义了数据包的格式，以及在共享介质上的访问控制。</td><td>如果确保数据从上一跳主机地址交付给下一跳主机地址（有些书把网络理解为概念上的图，因此会把一跳对应的两台主机称为相邻结点）？</td></tr><tr><td style="text-align:left;"><strong>物理层（Physical Layer）</strong></td><td>定义了硬件设备和传输媒体的规范，负责传输比特流，包括电缆、光纤、无线电等。</td><td>如何在现实中实现网络通信？</td></tr></tbody></table><p>我们之后主要研究 <code>TCP/IP</code> 模型，重点聚焦在应用层、传输层、网络层、数据链路层。</p><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：为什么不直接采用 <code>OSI</code> 的设计方案而使用删减版的 <code>TCP/IP</code> 呢？实际上这是在工程实践中总结出来的经验，在实践中如果要在操作系统中实现会话层和表示层是有难度的，并且 <code>TCP/IP</code> 的应用层在实际使用中也会从侧面体现这两层（这只有您编写过完整的 <code>Web</code> 服务端程序才能体会）。</p></div><h3 id="_2-3-协议实例" tabindex="-1"><a class="header-anchor" href="#_2-3-协议实例"><span>2.3.协议实例</span></a></h3><p>每一层（相对于 <code>OSI</code> 七层模型来说）都有对应的可以替换的一系列的具体协议（您可以理解为协议分层中每一次的实例化），您可以简单看看：</p><ol><li><strong>常见的应用层协议（Application Layer）</strong><ul><li><strong>HTTP（Hypertext Transfer Protocol，超文本传输协议）</strong>：用于在 <code>Web</code> 浏览器和 <code>Web</code> 服务器间传输超文本数据，支持网页浏览和交互。</li><li><strong>HTTPS（Hypertext Transfer Protocol Secure，安全超文本传输协议）</strong>：是 <code>HTTP</code> 的安全版本，通过使用 <code>SSL/TLS</code> 加密协议来保护数据的传输安全。</li><li><strong>FTP（File Transfer Protocol，文件传输协议）</strong>：用于在客户端和服务器之间传输文件，支持上传、下载、删除和重命名文件等操作。</li><li><strong>SMTP（Simple Mail Transfer Protocol，简单邮件传输协议）</strong>：用于在邮件服务器之间传输电子邮件，支持发送电子邮件，您可以利用这种协议来达到例如传递邮箱验证码的功能，这个功能很多邮箱厂家都有提供（例如 <code>QQ</code> 就提供了这一服务）。</li><li><strong>POP3（Post Office Protocol version 3，邮局协议版本 3）</strong>：用于从邮件服务器下载电子邮件，支持从邮件服务器中获取存储的电子邮件。</li><li><strong>IMAP（Internet Message Access Protocol，互联网消息访问协议）</strong>：也用于从邮件服务器下载电子邮件，支持在邮件服务器上管理电子邮件，并支持在多个设备之间同步电子邮件。</li><li><strong>DNS（Domain Name System，域名系统）</strong>：用于将域名解析为 <code>IP</code> 地址，支持通过域名访问网站。</li><li><strong>SSH（Secure Shell，安全外壳协议）</strong>：用于在网络上安全地进行远程访问和文件传输，提供了加密的通信通道，更多是用来做远程桌面开发。</li><li><strong>SNMP（Simple Network Management Protocol，简单网络管理协议）</strong>：用于在网络设备之间进行监控和管理，支持设备状态的查询和配置。</li><li><strong>NTP（Network Time Protocol，网络时间协议）</strong>：用于在计算机和网络设备之间同步时间，确保它们之间的时钟保持同步。</li></ul></li><li><strong>常见的会话层（Session Layer）</strong><ul><li><strong>NFS（Network File System）</strong>：用于在网络上共享文件系统的协议。</li><li><strong>NetBIOS（Network Basic Input/Output System）</strong>：在计算机网络中提供通信服务的软件接口。</li><li><strong>RPC（Remote Procedure Call）</strong>：用于在远程计算机之间调用过程的协议。</li><li><strong>SMB（Server Message Block）</strong>：在计算机网络中共享文件、打印机和其他资源的协议。</li></ul></li><li><strong>常见的表示层（Presentation Layer）</strong><ul><li><strong>ASCII（American Standard Code for Information Interchange）</strong>：用于字符编码的标准。</li><li><strong>JPEG（Joint Photographic Experts Group）</strong>：用于压缩图像的标准。</li><li><strong>GIF（Graphics Interchange Format）</strong>：用于图像压缩的格式。</li><li><strong>TLS（Transport Layer Security）</strong>：用于保护网络通信安全的协议。</li><li><strong>ASCII（American Standard Code for Information Interchange）</strong>：用于字符编码的标准。</li><li><strong>XML（eXtensible Markup Language）</strong>：一种用于数据表示和传输的标记语言，广泛用于Web服务和数据交换。</li><li><strong>JSON（JavaScript Object Notation）</strong>：一种轻量级的数据交换格式，常用于 <code>Web</code> 应用程序的数据传输。</li></ul></li><li><strong>常见的传输层协议（Transport Layer）</strong><ul><li><strong>TCP（Transmission Control Protocol）</strong>：<code>TCP</code> 提供了可靠的、面向连接的数据传输服务。它使用三次握手建立连接，并提供流量控制、拥塞控制和数据重传等机制，确保数据的可靠传输。适用于那些对数据传输的可靠性要求较高的应用场景，如网页浏览、文件传输、电子邮件等。</li><li><strong>UDP（User Datagram Protocol）</strong>：<code>UDP</code> 是一种无连接的、不可靠的传输协议。它不提供连接建立和数据传输的可靠性保证，但是具有较低的延迟和开销。适用于那些对数据传输的实时性要求较高、且可以容忍丢失数据的应用场景，如音频、视频流、在线游戏等。</li></ul></li><li><strong>常见的网络层协议（Network Layer）</strong><ul><li><strong>IP（Internet Protocol，互联网协议）</strong>：<code>IP</code> 协议是网络层的核心协议，负责在网络中进行数据包的路由和转发。它定义了数据包的格式和传输规则，确保数据可以在不同的网络之间传输。</li><li><strong>ICMP（Internet Control Message Protocol，互联网控制消息协议）</strong>：<code>ICMP</code> 用于在 <code>IP</code> 网络中传输控制消息。它可以用于检测网络的可达性、测量网络延迟、诊断网络问题等。</li><li><strong>ARP（Address Resolution Protocol，地址解析协议）</strong>：<code>ARP</code> 用于将 <code>IP</code> 地址解析为 <code>MAC</code> 地址。当计算机要发送数据包到目标主机时，它需要知道目标主机的 MAC 地址，ARP 就负责将 IP 地址映射到对应的 MAC 地址。</li><li><strong>RARP（Reverse Address Resolution Protocol，逆地址解析协议）</strong>：<code>RARP</code> 与 <code>ARP</code> 相反，它用于将 <code>MAC</code> 地址解析为 <code>IP</code> 地址。当主机启动时，如果它只知道自己的 <code>MAC</code> 地址，但不知道自己的 <code>IP</code> 地址，就可以使用 <code>RARP</code> 来获取 <code>IP</code> 地址。</li><li><strong>IPsec（Internet Protocol Security，互联网协议安全）</strong>：<code>IPsec</code> 是一组协议，用于在 <code>IP</code> 网络上提供安全性服务，包括数据加密、数据完整性验证、身份验证等。</li><li><strong>IPv6（Internet Protocol version 6，互联网协议第 6 版）</strong>：<code>IPv6</code> 是 <code>IP</code> 协议的下一代版本，它提供了更多的地址空间和其他改进，以满足日益增长的互联网连接需求。</li></ul></li><li><strong>常见的数据链路层协议（Data Link Layer）</strong><ul><li>以太网（<code>Ethernet</code>）</li><li>无线局域网协议（<code>Wi-Fi</code>，如 <code>IEEE 802.11</code>）</li><li>广域网（<code>WAN</code>）协议（如 <code>HDLC、PPP</code>）</li><li>令牌环（<code>Token Ring</code>）</li><li>帧中继（<code>Frame Relay</code>）</li><li><code>ATM</code>（<code>Asynchronous Transfer Mode</code>）</li></ul></li><li><strong>常见的物理层协议（Physical Layer）：</strong><ul><li><code>IEEE 802.3</code>（以太网物理层标准）</li><li><code>IEEE 802.11</code>（<code>Wi-Fi</code> 物理层标准）</li><li>蓝牙（<code>Bluetooth</code>）</li><li><code>USB</code>（通用串行总线）</li><li>电话调制解调器协议（<code>Modem Protocols</code>）</li><li>光纤通信协议（如 <code>SONET、SDH</code>）</li><li><code>DSL</code>（数字用户线）</li></ul></li></ol><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意：上述话语对于初学者就是一通废话（指根本听不懂），我只是想让您简单了解一下网络最重要的学习要点之一就是关于协议的知识，同时也是在暗示您，后续的文章我们讨论的协议到底处于哪一个知识模块中，努力往下看就行。</p></div><h2 id="_3-网络通信简要" tabindex="-1"><a class="header-anchor" href="#_3-网络通信简要"><span>3.网络通信简要</span></a></h2><p>有了上述基本概念的理解后，这里我就简要提及一下网络传输中发生的 <strong>封装</strong> 和 <strong>交付</strong> 的过程，整个过程主要聚焦到四层（应用层、传输层、网络层、链路层）上。</p><ul><li>报头如何和有效载荷一起封装？又如何进行分离（也就是封装分离）？</li><li>如何决定有效载荷交付给上层的哪一种协议（也就是数据分用）？</li></ul><p>上面这两个问题就是所有协议都必须解决的公共问题。</p><h3 id="_3-1-封装分离" tabindex="-1"><a class="header-anchor" href="#_3-1-封装分离"><span>3.1.封装分离</span></a></h3><figure><img src="'+n+`" alt="ea709e83e396b34709b78cc7ab495a9" tabindex="0" loading="lazy"><figcaption>ea709e83e396b34709b78cc7ab495a9</figcaption></figure><p>上图专指 <code>Linux</code> 内的网络协议实现（忽略了很多细节），其中传输层、网络层在操作系统内核中实现，遵循 <code>TCP/IP</code> 五层协议。</p><ul><li>逻辑上每一层可以直接进行互相通信（这个直接只是逻辑上的“直接”，实际上不是真的直接通信，这个类似打电话的双方不是真的面对面交流，而是通过电流来交流造成的一种错觉而已）</li><li>物理上整体来看就是 <code>向下不断添加报头-&gt;传递-&gt;向上不断去掉报头</code>，最终达到通信目的（整个过程中，向下添加报头，向上去除报头）</li></ul><p>每层都需要有自己的协议定制方案，选定具体的协议后，数据报文都需要有自己的协议报头，从上到下交付数据要添加报头，从下到上递交数据要去掉报头。</p><h4 id="_3-1-1-从生活来理解报文封装分离" tabindex="-1"><a class="header-anchor" href="#_3-1-1-从生活来理解报文封装分离"><span>3.1.1.从生活来理解报文封装分离</span></a></h4><p>快递的包装和贴上信息单可以很好来理解协议报头。</p><ol><li>在计算机网络中，数据的传输需要使用一定的协议来规定数据的格式和传输方式。协议报头就像是包裹的外包装和订单信息，包含了一些元信息（需要在包裹上贴上收寄方的地址、电话等信息的快递单等），告诉接收方如何正确地处理数据。类似地，协议报头包含了一些元信息，例如源地址、目标地址、数据类型等，以便接收方能够正确地处理数据，这些信息是给下一层看的。</li><li>而接收方除了接受自己想要的数据，也会检验和拆解去掉报头（相当于我们只要一个商品，但是对方给我们不仅仅是商品，还给了贴了快递单的包裹，我们需要检验这份快递单确认快递是否是自己得，然后再去除这个带有快递单的包裹）。</li><li>如果无法正确识别协议报头，通信双方就无法达成共识。</li><li>而报头包裹的的数据信息就是有效载荷（也就是贴了快递单包裹内的货物），每一层都把报头和有效载荷进行分离，识别报头正确后，就将有效载荷交个上一层（也就是解包的过程）。</li></ol><p><mark>在网络这块，封装的过程就是添加报头，解包的过程就是去掉报头。</mark></p><p><span style="color:#FF0000;">之后，我会把报头称为“报头”，包裹的有效数据称为“有效载荷”，“报头+有效载荷”称为“报文/某某协议报文/数据包”。</span>另外，对于不同层来说，协议报文也可能有不同的叫法</p><ul><li>应用层称为请求响应报文</li><li>传输层称为数据段</li><li>网络层称为数据报</li><li>链路层称为数据帧...</li></ul><p>这样做的目的仅仅是为了在概念上进行解耦，没什么大不了的，这种做法在学术研究上很常见（在没有特指的情况下，本系列文章我基本都使用“报头+有效载荷”的方式）。</p><h4 id="_3-1-2-从代码理解报文封装和分离" tabindex="-1"><a class="header-anchor" href="#_3-1-2-从代码理解报文封装和分离"><span>3.1.2.从代码理解报文封装和分离</span></a></h4><p>而实际上添加报头的过程可以使用 <code>C</code> 语言来理解。</p><details class="hint-container details"><summary>详情</summary><div class="language-cpp line-numbers-mode has-collapsed-lines collapsed" data-highlighter="shiki" data-ext="cpp" style="--vp-collapsed-lines:15;--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 本端报头封装</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">typedef</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> struct</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Header</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _header_data_1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _header_data_2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _header_data_3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //...</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> a_header</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> {/* ... */}</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">typedef</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> struct</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Data</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _data_1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _data_2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _data_3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //...</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> a_data</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> {/* ... */}</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">typedef</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> struct</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Datagram</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Header _header</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Data _data</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> a_datagram</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> { </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">a_header</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">, </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">a_data</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> }</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="collapsed-lines"></div></div></details><p>上述过程就是报头封装的过程，而报头分离用代码也同样好理解。</p><details class="hint-container details"><summary>详情</summary><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 对端报头分离</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Header a_header </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> a_datagram</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">_header</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Data a_data </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> a_datagram</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">_data</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：也可以使用指针强转来理解，不过我觉得上面面向对象的方式挺好理解的。</p></div><h3 id="_3-2-数据分用" tabindex="-1"><a class="header-anchor" href="#_3-2-数据分用"><span>3.2.数据分用</span></a></h3><p>接受端报文向上分离/交付时，会根据不同层中分离出来的报头，根据报头中的数据，再来决定对本层报文的有效载荷做对应的处理，这点之后在我详细拆分各种协议的时候您再回来这里就可以充分体会到。</p><h3 id="_3-3-通信原理" tabindex="-1"><a class="header-anchor" href="#_3-3-通信原理"><span>3.3.通信原理</span></a></h3><p>局域网通信中，一台主机的信息被发送给所有主机（广播），所有主机只有接受到了，才能用该数据和标识自己的唯一标识进行对比，确定该数据是否交给自己，若是则接受，若否则丢弃。而这个过程，在逻辑上看起来就是一对一的通信。</p><p>而如果多台主机一起投放数据进入网线，就会容易发送数据混乱/碰撞，规定好数据的先后投放顺序（错峰）就可以避免这个问题。</p><p>另外，由于物联网具有信息碰撞的天然属性，也会把局域网称为“碰撞域”，而这种基于碰撞概率的局域网也被称为以太网。</p><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：对于极其简单的局域网，最简单的破坏方法就是在这个局域网中发送各种垃圾数据，导致错峰的时机加长，影响各主机之间的通信（实际操作中可能需要绕过以太网驱动，因为以太协议在信息碰撞的时候会调用碰撞算法避免碰撞，降低本主机发送通信的频次，如果绕过该层就不会触发该机制）。这种原理较为简单的网络攻击也被叫做“拥塞攻击”。</p></div><h2 id="_4-网络地址简要" tabindex="-1"><a class="header-anchor" href="#_4-网络地址简要"><span>4.网络地址简要</span></a></h2><h3 id="_4-1-mac-地址的形式和作用" tabindex="-1"><a class="header-anchor" href="#_4-1-mac-地址的形式和作用"><span>4.1.MAC 地址的形式和作用</span></a></h3><p>而标识一台主机的唯一标识符就是 <code>MAC</code> 地址，一般由 <code>48bit</code> 构成，使用十六进制读取，写入在电脑网卡中，一般是一个网卡一个 <code>MAC</code> 地址，但是并不排除有虚拟策略能虚拟出多个网卡和对应的虚拟 <code>MAC</code> 地址。</p><p>我们可以用指令 <code>ifconfig</code> 显示网络接口信息，可以查看和配置系统上的网络接口、<code>IP</code> 地址、子网掩码、广播地址等信息。</p><details class="hint-container details"><summary>详情</summary><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 查看网卡信息(不同操作系统可能不一样)</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">$</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ifconfig</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">eth0:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   inet</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 内网ip地址</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  netmask</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 子网掩码</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        ether</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> MAC地址</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="hint-container important"><p class="hint-container-title">重要</p><p>补充：<code>Ether</code> 一词的源自可以追溯到古代希腊的概念。在古代希腊哲学中，人们认为存在五种基本元素，它们被称为 &quot;五大元素&quot;，包括地、水、火、空气和以太（<code>ether</code>）。</p><p>而以太（<code>ether</code>）曾被认为是一种超越物质世界的第五种元素，是宇宙中的一种特殊、纯净的物质。它被认为是上层天空中的物质，与地球上的物质是分开的。这个概念在古代哲学和科学中有所存在，曾被认为是光和光之间的传播介质，就像空气是声音的传播介质一样，尽管在现代科学中并没有证明以太真的存在。</p><p>而计算机网络资料的上下文中，<code>Ether</code> 一词被引入以表示以太网。以太网是一种局域网技术，它使用了一种称为 <code>Ethernet</code> 的协议，因此 <code>Ether</code> 在计算机网络术语中被用来指代以太网，它连接了计算机和设备，使它们能够在局域网中进行通信。</p></div><h3 id="_4-2-ip-地址的形式和作用" tabindex="-1"><a class="header-anchor" href="#_4-2-ip-地址的形式和作用"><span>4.2.IP 地址的形式和作用</span></a></h3><p><code>IP</code> 地址（<code>Internet Protocol Address</code>）和 <code>MAC</code> 地址（<code>Media Access Control Address</code>）是网络中两个不同的地址标识符，用于识别和定位网络中的设备。<code>IP</code> 地址和 <code>MAC</code> 地址在网络通信中扮演不同的角色，有以下主要区别：</p><ol><li><p><strong>作用范围</strong>：</p><ul><li><strong>IP 地址</strong>：用于在网络层标识设备的位置。<code>IP</code> 地址是逻辑地址，它允许设备在网络中进行通信，以便数据能够正确地从一个设备传递到另一个设备，跨越不同的网络。</li><li><strong>MAC 地址</strong>：用于在数据链路层标识设备的物理位置。<code>MAC</code> 地址是一个全球唯一的硬件地址，与网络接口卡（<code>NIC</code>）相关联。它用于在局域网内部直接识别和定位设备。</li></ul></li><li><p><strong>适用层级</strong>：</p><ul><li><strong>IP 地址</strong>：在 <code>OSI</code>（<code>Open Systems Interconnection</code>）模型中属于网络层（第三层）。它是用于在不同的网络中进行通信的网络层地址。</li><li><strong>MAC 地址</strong>：在 <code>OSI</code> 模型中属于数据链路层（第二层）。它是用于在局域网内直接通信的数据链路层地址。</li></ul></li><li><p><strong>地址唯一性</strong>：</p><ul><li><strong>IP 地址</strong>：在互联网上是一个局域网中是全球唯一的，但它们可以在子网中和父网重复使用并且不会互相干扰（原理后面再说）。</li><li><strong>MAC 地址</strong>：在全球范围内是唯一的，每个网络设备的 <code>NIC</code> 都有一个唯一的 <code>MAC</code> 地址。</li></ul></li><li><p><strong>书写格式</strong>：</p><ul><li><strong>IP 地址</strong>：通常以点分十进制（<code>IPv4</code>）或冒号分隔的十六进制（<code>IPv6</code>）表示。</li><li><strong>MAC 地址</strong>：通常以冒号分隔的十六进制对表示，例如：<code>00:1A:2B:3C:4D:5E</code>。</li></ul></li><li><p><strong>动态/静态分配：</strong></p><ul><li><strong>IP 地址</strong>：可以通过动态主机配置协议（<code>DHCP</code>）自动分配，也可以手动配置为静态 <code>IP</code> 地址（这点您可以自己组件一个局域网，您会发现路由器基本都有这种固定 <code>IP</code> 地址的设置）。</li><li><strong>MAC 地址</strong>：通常是由硬件制造商预先分配的，不容易更改，<code>MAC</code> 地址的修改通常需要专门的工具和技术。</li></ul></li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>区分：假设我们从 <code>A</code> 地址到 <code>B</code> 地址，中途会问路人方向，路人会告诉我们中途需要走的每个地址（现在在哪个地址，下一站应该走哪个地址接近 <code>B</code> 地址），此时可以类比为：</p><ul><li>源地址 <code>A</code> 就是 <code>源IP</code></li><li>目标地址 <code>B</code> 就是 <code>目的IP</code></li><li>中途经过的源地址是 <code>MAC</code> 地址</li><li>下一站地址也是 <code>MAC</code> 地址</li></ul><p>可以看到 <code>源/目的IP</code> 地址在传输过程中基本不变，但是 <code>MAC</code> 地址时常变化。</p></div><div class="hint-container note"><p class="hint-container-title">注</p><p>吐槽：这个过程就像西游记中，唐僧等人从大唐到西天，途中有很多询问下一站该如何走的情节。</p></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意：如果您实在理解不了这两种地址的区别，就可以先简单理解为一句话就行：<code>源/目的IP</code> 规定起点和目标，但是在实际传输中，需要依靠 <code>MAC</code> 地址来一步一步到达。在后续详细讲解 <code>TCP/IP</code> 协议时再慢慢理解。</p></div><div class="hint-container caution"><p class="hint-container-title">警告</p><p>警告：如果没有特殊说明，本系列文章提到的 <code>IP</code> 地址默认指 <code>IPv4</code>，而不是 <code>IPv6</code>。</p></div><h3 id="_4-3-mac-和-ip-协作工作" tabindex="-1"><a class="header-anchor" href="#_4-3-mac-和-ip-协作工作"><span>4.3.MAC 和 IP 协作工作</span></a></h3><figure><img src="`+o+'" alt="1713168918468" tabindex="0" loading="lazy"><figcaption>1713168918468</figcaption></figure><p>数据交付后的时候，经过网络层后会增添报头 <code>源IP</code> 和 <code>目的IP</code>（标识该报文从哪来到哪去），而有效载荷填写需要传递的数据和之前封装的报头，经过链路层的以太驱动后又添加了报头 <code>MAC1</code>，然后将最终结果交付给路由器。</p><p>路由器向上对报文分离经过判断，知道了该数据的的来源和去向后（需要前往的 <code>MAC</code> 地址），又向下传递添加了报头 <code>MAC2</code>（代表传给对应 <code>MAC</code> 地址对应的主机），传给其他主机后继续向上去掉报头进行处理。</p><p>因此在 <code>TCP/IP</code> 协议的网络中，<code>IP</code> 及其向上的协议看到的报文都是一样的。路由器就是在不同网络中作适配的角色，这种一跳一跳的现象其实也就是网络通信的原理。</p><p>上述模型比之前我提到的更加细化，但仍然还有很多细节没提到，我们之后的目的就是细化这个模型和流程，最后再使用著名的网络抓包工具 <code>Wireshark</code> 进行两次模拟，一次是关于 <code>UDP</code> 协议网络通信的模拟，一次是关于 <code>TCP</code> 协议网络通信的模拟。</p>',86)]))}const p=s(l,[["render",d]]),h=JSON.parse('{"path":"/1.%E7%BC%96%E7%A0%81%E4%BF%AE%E5%85%BB/3.%E7%B3%BB%E7%BB%9F%E7%BD%91%E7%BB%9C/2w24bhws/","title":"网络基础","lang":"zh-CN","frontmatter":{"createTime":"2025/04/09 23:31:29","permalink":"/1.编码修养/3.系统网络/2w24bhws/","title":"网络基础","description":"1.网络发展简要 下面就是简单提及一些概念而已，简单看看即可： 网络的层级结构：网络可以分为局域网、城域网、广域网，根据规模不同而定（这是相对概念）。随着时间的推移，网络从小范围的局域网发展成连接城市和城市的城域网，最终形成全球性的广域网，使得互联网成为全球性的现象。 网络的基础设施建设：网络的基础建设是由国家和运营商一起扶持建筑而成的，学习网络时，运...","head":[["meta",{"property":"og:url","content":"https://limou3434.github.io/work-blog-website/work-blog-website/1.%E7%BC%96%E7%A0%81%E4%BF%AE%E5%85%BB/3.%E7%B3%BB%E7%BB%9F%E7%BD%91%E7%BB%9C/2w24bhws/"}],["meta",{"property":"og:site_name","content":"缡墨"}],["meta",{"property":"og:title","content":"网络基础"}],["meta",{"property":"og:description","content":"1.网络发展简要 下面就是简单提及一些概念而已，简单看看即可： 网络的层级结构：网络可以分为局域网、城域网、广域网，根据规模不同而定（这是相对概念）。随着时间的推移，网络从小范围的局域网发展成连接城市和城市的城域网，最终形成全球性的广域网，使得互联网成为全球性的现象。 网络的基础设施建设：网络的基础建设是由国家和运营商一起扶持建筑而成的，学习网络时，运..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-19T14:21:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-19T14:21:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-19T14:21:17.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":26.73,"words":8020},"git":{"updatedTime":1745072477000,"contributors":[{"name":"limou3434","username":"limou3434","email":"898738804@qq.com","commits":6,"avatar":"https://avatars.githubusercontent.com/limou3434?v=4","url":"https://github.com/limou3434"}]},"autoDesc":true,"filePathRelative":"notes/1.编码修养/3.系统网络/019_ljp_2024_01_25_网络基础.md","categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"557f7c","sort":1,"name":"编码修养"},{"id":"7ab59a","sort":3,"name":"系统网络"}],"bulletin":true}');export{p as comp,h as data};
