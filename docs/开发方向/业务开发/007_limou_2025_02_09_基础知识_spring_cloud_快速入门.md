# Spring Cloud 快速入门

在构建 `Spring Cloud` 微服务应用时，根据不同的需求，您需要在 `pom.xml` 文件中引入相应的 `Spring Cloud` 组件依赖。以下是一些常用的 `Spring Cloud` 组件及其对应的 `Maven` 依赖。我不要求您学过微服务，但是您可以在学习 `Spring Clound` 的过程中学习。

>   [!CAUTION]
>
>   警告：我使用 `java17` 的版本，依赖最好和我一样。另外这里大部分都是编写 `yaml` 达到我们的目的，其实也是可以修改为更加灵活的代码，不过我就不这么做了（麻烦）。另外，本人仅仅是刚好某个项目需要用到 `Spring` 一把梭，所以才学习的 `Spring Cloud`，而关于 `Spring Cloud` 的所有可替代方案，我在后文有给出。

## 1.配置管理

### 1.1.远端配置

一旦项目开始多起来就会出现一些尴尬的情况，我们有很多的配置文件，并且有些配置文件配置风格不统一，有些配置文件完全可以合并到一起使用。因此我们需要一个云上的 `application.yaml`，我们的某些项目后端在读取配置文件的时候，还可以读取云上的配置文件，并且使用起来和本地没有区别。

首先我们需要在 `Github` 上创建用户登录后创建仓库 `work-config-yaml` 用来存储配置文件，并且内部只有一个 `config` 目录，目录内暂时只有一个 `work-test-develop.yaml` 文件（内容如下）。

```yaml
my:
  custom:
    property: "Hello from Git!"

server:
  port: 8848
  
```

>   [!CAUTION]
>
>   警告：需要注意的是，您需要配置 `ssh` 密钥，因为现在的 `Github` 需要双重认证。并且还需要保证您的主分支为 `main`，这是由于某些哈哈神秘原因导致的...

### 1.2.服务代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-config-server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-config-server</name>
    <description>work-config-server</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Cloud Server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-config-server

  cloud:
    config:
      server:
        git:
          uri: git@github.com:limou3434/work-config-yaml.git # 配置远端地址
          username: limou3434 # 配置远端用户
          password: ***** # 配置远端密码
          default-label: main # 配置远端分支
          search-paths: config # 配置远端目录

server:
  port: 8888
  
```

```java
package cn.com.edtechhub.workconfigserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

// 启动类
@SpringBootApplication
@EnableConfigServer // 启动 Spring Cloud 配置服务
public class WorkConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkConfigServerApplication.class, args);
        System.out.println("Hello work-config-server!"); // 启动后配置好 yaml 配置文件就可以直接使用 http://localhost:8888/work-test/develop/main 使用 HTTP 协议访问配置
    }

}

```

这个项目运行后就可以在浏览器中访问 `http://localhost:8888/work-test/develop/main` 来读取到远端的配置（读取结果如下），那么其实您也应该能明白客户端是怎么实现的了，无非就是写一个客户端依赖组件罢了，并且读取到的配置文件可以覆盖本地的配置文件。

```json
{
  "name": "work-test",
  "profiles": [
    "develop"
  ],
  "label": "main",
  "version": "ee0170e27319b7f79194dce3fd41a24f8992125c",
  "state": "",
  "propertySources": [
    {
      "name": "git@github.com:limou3434/work-config-yaml.git/config/work-test-develop.yml",
      "source": {
        "my.custom.property": "Hello from Git!",
        "server.port": 8848
      }
    }
  ]
}
```

### 1.3.客户代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-test</name>
    <description>work-test</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Cloud Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-test

  cloud:
    config:
      uri: http://localhost:8888 # 配置读取服务
      label: main # 配置远端分支
      profile: develop # 配置项目环境

  config:
    import: "optional:configserver:" # 必须要添加不然会报错

server:
  port: 8000
```

```java
package cn.com.edtechhub.workconfigclient;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// 精确读取
@Data
@Component
class GitConfigOfValue {

    @Value("${my.custom.property}")
    private String property;

}

// 类内读取
@Data
@Component
@ConfigurationProperties(prefix = "my.custom")
class GitConfigOfConfigurationProperties {

    private String property;

}

// 启动类
@SpringBootApplication
public class WorkTestApplication {

    public static void main(String[] args) {

        var context = SpringApplication.run(WorkTestApplication.class, args);
        System.out.println("Hello work-test!");

        GitConfigOfValue gitConfigOfValue = (GitConfigOfValue) context.getBean("gitConfigOfValue");
        System.out.println(gitConfigOfValue.getProperty());

        GitConfigOfConfigurationProperties gitConfigOfConfigurationProperties = (GitConfigOfConfigurationProperties) context.getBean("gitConfigOfConfigurationProperties");
        System.out.println(gitConfigOfConfigurationProperties.getProperty());

    }

}

```

当然，虽然远端配置可以覆盖本地配置，并且读取起来和读取本地文件完全一样（这点封装的非常好！我们可以看到原本本地使用 `8000` 端口，读取配置后运行在了 `8848` 端口上）但是仍需要配置某些必要的配置（例如 `cloud` 内的配置），否则读取不到配置服务还谈何覆盖配置呢...

>   [!NOTE]
>
>   吐槽：我一般开发单体项目时，本地的配置文件有三份：
>
>   -   `application.yaml` 只读取环境变量 `SPRING_PROFILES_ACTIVE` 决定配置，若空使用 `delelop` 模式
>   -   `application-delelop.yaml` 开发环境使用
>   -   `application-release.yaml` 测试环境使用
>   -   `application-poduction.yaml` 生产环境使用，但是配置了远端配置读取
>
>   这样最重要的 `application-poduction.yaml` 文件我存储在远端上，这样只要我的仓库闭源，就可以较好的保护自己重要配置文件，又可以在配置好的服务器和 `application.yaml` 中使用环境变量快速切换到生产模式运行。

### 1.4.动态配置

但是有个简单直接的问题，如果我们远端配置发生了变动会怎么样？我们把远端存储的端口号修改为 `8688`，然后重新访问 `http://localhost:8888/work-test/develop/main`，欸很好，服务端可以读取到修改。那么我们的客户端...不对啊！客户端没有重启，那就不会更换端口号了，这就需要使用消息队列组件了，可以参考这位 [老哥的文档](https://www.cnblogs.com/fengzheng/p/11242128.html)，也和我们后面的总线有关。

## 2.网关路由

### 2.1.反向代理

一般来说使用 `Nginx` 有以下几个作用：

-   前端部署
-   反向代理
-   负载均衡

但是有一些需求难以使用 `Nginx` 实现，并且非常不灵活，同时 `Nginx` 无法高度适配微服务项目，因此我们决定使用 `Spring Cloud Gateway` 做网关层的配置。而 `Nginx` 可以适配到前端资源快速挂载上，并且可以做一些简单的服务，从 `Spring` 类项目角度上来说，使用 `Spring Cloud Gateway` 的方案更加舒适（毕竟更加贴切自己的生态，集成有保证）。另外对于所有的项目来说，都可以使用 `Nginx` 做为网关层，这波 `Nginx` 通用性是占了上风，高性能也是 `Nginx` 的主要优势。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-gateway-server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-gateway-server</name>
    <description>work-gateway-server</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Cloud Gateway -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-gateway-server
  cloud:
    gateway:
      routes:
        - id: route1
          uri: http://localhost:8000 # 将请求转发到 http://localhost:8000
          predicates:
            - Path=/** # 匹配路径 /service1/**

server:
  port: 8888

```

```java
package cn.com.edtechhub.workgatewayserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WorkGatewayServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkGatewayServerApplication.class, args);
    }

}

```

然后简单写一个服务代码。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-test</name>
    <description>work-test</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-test

server:
  port: 8000
  servlet:
    context-path: /work_test_api # 这样所有接口都会带上前缀
```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 控制类
@RestController
class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from backend service!";
    }
}

// 启动类
@SpringBootApplication
public class WorkTestApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkTestApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

然后访问 `http://localhost:8888/work_test_api/hello` 就可以达到和使用 `http://localhost:8000/work_test_api/hello` 一样的效果。如果搭配我们之前使用的 `Spring Cloud Config` 就可以让用户统一访问本网关服务，就可以同时代理到多个服务。

### 2.2.修改报文

和 `Nginx` 一样，有类似的对接收到的报文（请求报文和响应报文）进行预处理的功能。只要在 `yaml` 文件中配置好 `filters:` 选项就能对报文进行修改，这点很简单，用到查询一下文档即可。

而实际上 `Spring Cloud Gateway` 还可以做到一些 `Nginx` 可以做到甚至是难以做到的事情，例如：

-   流量限制
-   跨域共享
-   鉴权拦截

## 3.服务发现

### 3.1.服务实例

在提及负载均衡之前，我们需要使用服务发现的组件来把多个相同的服务实例注册进注册中心，因此我们需要使用 `Spring Cloud Eureka`，它能够让服务在启动时自动注册到 `Eureka Server`，并且支持客户端从 `Eureka Server` 获取服务实例列表。

我们为什么需要服务发现？一是有可能有多个不同的业务实例，我们可能需要进行不同的业务调用（例如使用 `RPC` 调用）；二是在分布式理论中存在相同的业务实例，我们需要动态找到这些业务实例，而不是写死端口主机号进行调用。

我们需要四个实例，一个负责做注册中心服务，一个做注册中心客户，另外两个是具体的服务实例。

下面是两份 `work-test` 的代码，仅仅只是运行的端口好不一样，我们手动启动来模拟 `Docker-compose` 或 `K8s` 的多服务实例。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-test</name>
    <description>work-test</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Eureka Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-test
  cloud:
    discovery:
      enabled: true # 启用服务发现
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/  # Eureka Server 的地址
        register-with-eureka: true  # 让服务自己注册到 Eureka
        fetch-registry: true  # 启用从 Eureka Server 获取注册信息
        healthcheck:
          enabled: true  # 启动健康检查, 主动向 Eureka 服务器报告自己是否健康的

server:
  port: 8001
  servlet:
    context-path: /work_test_api # 这样所有接口都会带上前缀
```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 控制类
@RestController
class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from backend service!";
    }

}

// 启动类
@SpringBootApplication
public class WorkTestApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkTestApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

另外一个如下。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-test</name>
    <description>work-test</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Eureka Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-test
  cloud:
    discovery:
      enabled: true # 启用服务发现
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/  # Eureka Server 的地址
        register-with-eureka: true  # 让服务自己注册到 Eureka
        fetch-registry: true  # 启用从 Eureka Server 获取注册信息
        healthcheck:
          enabled: true  # 启动健康检查, 主动向 Eureka 服务器报告自己是否健康的

server:
  port: 8002
  servlet:
    context-path: /work_test_api # 这样所有接口都会带上前缀
```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 控制类
@RestController
class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from backend service!";
    }

}

// 启动类
@SpringBootApplication
public class WorkTestApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkTestApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

值得注意的是，两个服务实例的名字一定要相同。

### 3.2.服务代码

然后搭建一个服务注册中，这样启动上面两个实例后就会自动注册到这里。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-eureka</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-eureka</name>
    <description>work-eureka</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Cloud Netflix Server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
server:
  port: 8761 # Eureka 服务运行端口

spring:
  application:
    name: eureka-server # 应用名

eureka:
  client:
    registerWithEureka: false # 该服务不向 Eureka 注册自己(避免自己注册自己)
    fetchRegistry: false # 禁止从 Eureka 获取注册信息(避免自己调用自己)

  server:
    enableSelfPreservation: false # 禁用自我保护模式(严格按照心跳机制检查已注册服务是否可以用, 如果服务没有及时响应心跳, 服务器会立即严格将其标记为不可用)

```

```java
package cn.com.edtechhub.workeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer // 启用服务发现
public class WorkEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkEurekaApplication.class, args);
    }

}

```

### 3.3.客户代码

最后一个实例需要读取注册中心中注册的服务来进行调用。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-eureka-client</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-eureka-client</name>
    <description>work-eureka-client</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Cloud Eureka Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-eureka
  cloud:
    discovery:
      enabled: true
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/

server:
  port: 8000

```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.List;

@Configuration
class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

@RestController
class TestController {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/call")
    public String callWorkTest() {
        List<ServiceInstance> instances = discoveryClient.getInstances("work-test");
        if (instances != null && !instances.isEmpty()) {
            System.out.println(instances.get(0).getUri());
            System.out.println(instances.get(1).getUri());
            URI uri = instances.get(0).getUri(); // 比如 http://localhost:8001 注意这个列表不保证顺序
            System.out.println(uri);
            return restTemplate.getForObject(uri + "/work_test_api/hello", String.class);
        }
        return "no available instance";
    }
}

// 启动类
@SpringBootApplication
public class WorkEurekaClientApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkEurekaClientApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

这样浏览器访问 `http://localhost:8000/call` 就可以通过客户端控制指定的服务进行访问了。注意这不是反向代理，这比反向代理更加灵活。

## 4.负载均衡

要演示负载均衡的项目，也需要大量的实例，两个 `work-test` 都作为均摊服务支持的后端实例，其中一个使用 `Ribbon` 的注解或 `Spring Cloud LoadBalancer` 来做到负载均衡，并且同时提供新的接口对外使用。我们可以修改之前的服务发现代码，让其同时支持负载均衡。

### 4.1.服务实例

和之前一样，但是增加了一些答应做调用时的提示。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-test</name>
    <description>work-test</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Eureka Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-test
  cloud:
    discovery:
      enabled: true # 启用服务发现
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/  # Eureka Server 的地址
        register-with-eureka: true  # 让服务自己注册到 Eureka
        fetch-registry: true  # 启用从 Eureka Server 获取注册信息
        healthcheck:
          enabled: true  # 启动健康检查, 主动向 Eureka 服务器报告自己是否健康的

server:
  port: 8001
  servlet:
    context-path: /work_test_api # 这样所有接口都会带上前缀
```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 控制类
@RestController
class TestController {

    @GetMapping("/hello")
    public String hello() {
        System.out.println("work-test-1");
        return "Hello from backend service!";
    }

}

// 启动类
@SpringBootApplication
public class WorkTestApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkTestApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

另外一个如下。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-test</name>
    <description>work-test</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Eureka Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-test
  cloud:
    discovery:
      enabled: true # 启用服务发现
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/  # Eureka Server 的地址
        register-with-eureka: true  # 让服务自己注册到 Eureka
        fetch-registry: true  # 启用从 Eureka Server 获取注册信息
        healthcheck:
          enabled: true  # 启动健康检查, 主动向 Eureka 服务器报告自己是否健康的

server:
  port: 8002
  servlet:
    context-path: /work_test_api # 这样所有接口都会带上前缀
```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 控制类
@RestController
class TestController {

    @GetMapping("/hello")
    public String hello() {
		System.out.println("work-test-2");
        return "Hello from backend service!";
    }

}

// 启动类
@SpringBootApplication
public class WorkTestApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkTestApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

### 4.2.服务代码

这个代码依旧不变。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-eureka</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-eureka</name>
    <description>work-eureka</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Cloud Netflix Server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
server:
  port: 8761 # Eureka 服务运行端口

spring:
  application:
    name: eureka-server # 应用名

eureka:
  client:
    registerWithEureka: false # 该服务不向 Eureka 注册自己(避免自己注册自己)
    fetchRegistry: false # 禁止从 Eureka 获取注册信息(避免自己调用自己)

  server:
    enableSelfPreservation: false # 禁用自我保护模式(严格按照心跳机制检查已注册服务是否可以用, 如果服务没有及时响应心跳, 服务器会立即严格将其标记为不可用)

```

```java
package cn.com.edtechhub.workeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer // 启用服务发现
public class WorkEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkEurekaApplication.class, args);
    }

}

```

### 4.3.客户代码

最后一个实例需要读取注册中心中注册的服务来进行调用。另外值得注意的是，实现负载均衡的注解 `@LoadBalanced` 位于 `Spring Cloud Eureka` 中。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.edtechhub</groupId>
    <artifactId>work-eureka-client</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>work-eureka-client</name>
    <description>work-eureka-client</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2024.0.1</spring-cloud.version>
    </properties>
    <dependencies>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Cloud Eureka Client -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
spring:
  application:
    name: work-eureka
  cloud:
    discovery:
      enabled: true
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/

server:
  port: 8000

```

```java
package cn.com.edtechhub.workconfigclient;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Configuration
class AppConfig {
    @Bean
    @LoadBalanced // 启用负载均衡
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

@RestController
class TestController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/call")
    public String callWorkTest() {
//        List<ServiceInstance> instances = discoveryClient.getInstances("work-test");
//        if (instances != null && !instances.isEmpty()) {
//            System.out.println(instances.get(0).getUri());
//            System.out.println(instances.get(1).getUri());
//            URI uri = instances.get(0).getUri(); // 比如 http://localhost:8001 注意这个列表不保证顺序
//            System.out.println(uri);
//            return restTemplate.getForObject(uri + "/work_test_api/hello", String.class);
//        }
//        return "no available instance";
        // 直接使用服务名进行负载均衡请求
        String url = "http://work-test/work_test_api/hello"; // work-test 是服务名
        System.out.println(url);
        return restTemplate.getForObject(url, String.class);
    }
}

// 启动类
@SpringBootApplication
public class WorkEurekaClientApplication {

    public static void main(String[] args) {

        SpringApplication.run(WorkEurekaClientApplication.class, args);
        System.out.println("Hello work-test!");

    }

}

```

接下来调用 `http://localhost:8000/call` 就会发现两个 `work-test` 各自承担了一部分压力，在调用接口后进行了打印。但是！我要说但是了，使用 `Ribbon` 机制实现的注解 `@LoadBalanced` 已经不再继续维护了，现在更多使用 `Spring Cloud LoadBalanced` 以旨在更加灵活的替代方案（`Ribbon` 仅支持 `Eureka` 作为配置中心），不过这个最好搭配 `Nacos` 进行使用。

## 5.服务监控

`Spring Cloud Sleuth`，用到再来补充...

## 6.熔断降级

`Spring Cloud Circuit Breaker`，用到再来补充...

## 7.事件总线

`Spring Cloud Bus`，用到再来补充...

>   [!IMPORTANT]
>
>   补充：可替代方案。
>
>   -   `Spring Cloud Config` 可以使用 `Nacos` 替代 `Spring Cloud Config Server` 和 `Git`，个人认为起码会比使用 `Gihutb` 更加灵活。
>   -   `Spring Cloud Gateway` 可以替代的地方有：
>       -   流量限制（使用 `Sentinel` 可以实现）
>       -   鉴权拦截（使用 `Sa-token` 可以实现）
>       -   跨域共享（在有反向代理的环境下无需配置跨域问题）
>   -   `Spring Cloud Eureka` 可以使用 `Nacos` 替代或 `K8s` 服务发现替代，并且本身的服务调用不够直观，如果还需要封装一层，那可以再加上 `Dubbo` 封装 `HTTP` 报文为 `RPC` 报文
>   -   `Spring Cloud LoadBalancer` 我暂时还没有找到合适的替代方案，不过 `K8s` 也有对应的解决方案
>   -   `Spring Cloud Circuit` 也同样可以使用 `Sentinel`（轻量），或者考虑使用 `Redisson RRateLimiter`（专用）
>   -   而如果需要接入到某个公司的云生态，则可以考虑把整个 `Spring Clound` 使用 `Spring Cloud Alibaba(阿里云)` 或 `Spring Cloud Azure(微软云)` 或 `Spring Cloud Amazon(亚马云)` 这些拓展来替代。
>
>   如果您希望 `Spring` 一把梭，快速简历一个单体业务公司架构，那么使用 `Spring Cloud` 的方案是最好的，如果需要上云，则最好是现有 `K8s` 基础架构后，替换为更加专用的组件（可拓展性更高）。
