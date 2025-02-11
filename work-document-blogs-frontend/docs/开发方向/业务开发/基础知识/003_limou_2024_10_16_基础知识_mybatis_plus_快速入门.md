# MyBatisPlus 快速入门

## 1.MyBatisPlus 全面概述

顺序来说：

-   [JDBC, Java Database Connectivity, Java 数据库连接](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) 基于通用数据库访问标准（本质上是一个 `API` 规范）本身不包含数据库驱动，它需要具体数据库驱动 `Driver` 来结合使用，最终完成完整的数据库通信。
-   [MyBatis](https://mybatis.org/mybatis-3/getting-started.html) 是基于 `JDBC` 的封装，因此我们有必要先了解 `JDBC` 后，再来理解为什么需要使用 `MyBatis` 来封装 `JDBC`。
-   [MyBatisPlus](https://baomidou.com/introduce/) 是基于 `MyBatis` 的拓展，在理解了 `MyBatis` 后，再根据官方的描述来感知 `MyBatisPlus` 对于 `MyBatis` 的优化。

## 2.MyBatisPlus 基本功能

待补充...

## 3.MyBatisPlus 使用教程

### 3.1.基础知识

#### 3.1.1.JDBC

##### 3.1.1.1.理解

-   **从组件上来理解**：`JDBC` 是 `Java DataBase Connectivity` 的缩写，它是 `Java` 程序访问数据库的标准接口。使用 `Java` 程序访问数据库时，`Java` 代码并不是直接通过 `TCP` 连接去访问数据库，而是通过 `JDBC` 接口来访问，而 `JDBC` 接口则通过 `JDBC Driver` 来实现真正对数据库的访问。

    而具体的 `JDBC Driver` 是由数据库厂商提供的。例如 `MySQL` 的 `JDBC` 驱动由 `Oracle` 提供。因此，访问某个具体的数据库，我们只需要引入该厂商提供的 `JDBC` 驱动，就可以通过 `JDBC` 接口来访问，这样保证了 `Java` 程序编写的是一套数据库访问代码，却可以访问各种不同的数据库，因为他们都提供了标准的 `JDBC Driver`。

    ```mermaid
    graph LR
    A["Java App\n(Developer 开发 app)"]
    B["JDBC Interface\n(Oracle 提供 java.sql)"]
    C["JDBC Driver\n(Vendor 提供 MySQL Driver))"]
    D["Database\n(Vendor 提供 MySQL Database)"]
    A --> B --> C -->|"TCP/..."| D
    
    ```

-   **从代码上来理解**：从代码来看，我们在 `Java` 代码中如果要访问 `MySQL`，那么必须编写代码操作 `JDBC` 接口。注意到 `JDBC` 接口是 `Java` 标准库自带的，所以可以直接编译。`Java` 标准库自带的 `JDBC` 接口其实就是定义了一组接口，而某个具体的 `JDBC` 驱动其实就是实现了这些接口的类。而一个 `MySQL` 的 `JDBC` 的驱动就是一个 `.jar` 包，它本身也是纯 `Java` 编写的。

    我们自己编写的代码只需要引用 `Java` 标准库提供的 `java.sql` 包下面的相关接口，由此再间接地通过 `MySQL Driver` 的 `.jar` 包通过网络访问 `MySQL` 服务器，所有复杂的网络通讯都被封装到 `JDBC Driver` 中。因此，`Java` 程序本身只需要引入一个 `MySQL` 驱动的 `.jar` 包就可以正常访问 `MySQL` 服务器。

使用 `JDBC` 的好处是，各数据库厂商使用相同的接口，`Java` 代码不需要针对不同数据库分别开发。而且 `Java` 程序在编译期仅依赖 `java.sql` 包，不依赖具体数据库的 `.jar` 包。也可随时替换底层数据库，访问数据库的 `Java` 代码基本不变。说白了就是分层软件设计的好处，网络协议、操作系统...就是经典的例子。

##### 3.1.1.2.接口

|              | `java.sql`                                   | `javax.sql`                     |
| ------------ | -------------------------------------------- | ------------------------------- |
| **作用**     | 提供基础的 `JDBC API`                        | 提供高级 `JDBC Expand`          |
| **主要功能** | 连接数据库、执行 `SQL` 语句、处理查询结果... | 数据源管理、连接池、事务管理... |

在使用接口之前，我给您我的开发环境的配置，最好和我的配置一样。

```shell
# 确认开发环境的配置
$ java --version
openjdk 17.0.13 2024-10-15
OpenJDK Runtime Environment (build 17.0.13+11-Ubuntu-2ubuntu124.04)
OpenJDK 64-Bit Server VM (build 17.0.13+11-Ubuntu-2ubuntu124.04, mixed mode, sharing)

$ mvn --version
Apache Maven 3.9.9 (8e8579a9e76f7d015ee5ec7bfcdc97d260186937)
Maven home: /home/ljp/tools/maven/apache-maven-3.9.9
Java version: 17.0.13, vendor: Ubuntu, runtime: /usr/lib/jvm/java-17-openjdk-amd64
Default locale: zh_CN, platform encoding: UTF-8
OS name: "linux", version: "6.8.0-51-generic", arch: "amd64", family: "unix"

$ mysql --version
mysql  Ver 8.0.40-0ubuntu0.24.04.1 for Linux on x86_64 ((Ubuntu))

```

在确定本机拥有以上环境后，使用 `Maven` 快速创建一个 `Java` 项目，并且使用以下 `pom.xml` 文件来导入 `JDBC` 对应的驱动依赖 `mysql-connector-java`。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>9.2.0</version>
    <scope>runtime</scope>
</dependency>

```

接下来我直接使用代码来教会您使用 `JDBC` 接口来调用 `JDBC Driver` 最终达到操作数据库的目的，看代码学起来会非常快，不是么。

```java
```

以上我们就把常见的接口都实践了一遍，接下来就是检验我们成果的时候了，运行一下吧。

```shell

```

#### 3.1.2.MyBatis



#### 3.1.3.MyBatisPlus



### 3.2.代码实践

使用 `MyBatisPlus` 来快速实现对一个用户表的增删查改。
