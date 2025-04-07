# Spring Cloud 快速入门

在构建 `Spring Cloud` 微服务应用时，根据不同的需求，您需要在 `pom.xml` 文件中引入相应的 `Spring Cloud` 组件依赖。以下是一些常用的 `Spring Cloud` 组件及其对应的 `Maven` 依赖。我不要求您学过微服务，但是您可以在学习 `Spring Clound` 的过程中学习。

>   [!CAUTION]
>
>   警告：我使用 `java17` 的版本，依赖最好和我一样。

## 1.配置管理

一旦项目开始多起来就会出现一些尴尬的情况，我们有很多的配置文件，并且有些配置文件配置风格不统一，有些配置文件完全可以合并到一起使用。因此我们需要一个云上的 `application.yaml`，我们的某些项目后端在读取配置文件的时候，还可以读取云上的配置文件，并且使用起来和本地没有区别。

### 1.1.远端配置项目

在 `Github` 上创建用户登录后创建仓库 `work-config-yaml` 用来存储配置文件，并且内部只有一个 `config` 目录，目录内暂时只有一个 `work-test-develop.yaml` 文件（内容如下）。

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

### 1.2.服务端项目

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
  "version": "53d6fc1da43847352b72b85767a8803e4d931464",
  "state": "",
  "propertySources": [
    {
      "name": "git@github.com:limou3434/work-config-yaml.git/config/work-test-develop.yml",
      "source": {
        "my.custom.property": "Hello from Git!"
      }
    }
  ]
}
```

### 1.3.客户端项目

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

### 1.4.动态修改配置

但是有个简单直接的问题，如果我们远端配置发生了变动会怎么样？



*   **服务注册与发现：**


1.  *   **Eureka 客户端：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        ```
    
    *   **Eureka 服务器：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        ```
    
    *   **Nacos 服务发现：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        ```
    
    *   **Consul 服务发现：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>
        ```
    
2.  **负载均衡：**

    *   **Ribbon（与 Eureka 一起使用）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        </dependency>
        ```

    *   **Spring Cloud LoadBalancer（替代 Ribbon）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
        </dependency>
        ```

3.  **服务调用：**

    *   **Feign（声明式 HTTP 客户端）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        ```

    *   **Dubbo（高性能 RPC 框架）：**

        ```xml
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-dubbo</artifactId>
        </dependency>
        ```

4.  **API 网关：**

    *   **Spring Cloud Gateway：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        ```

    *   **Zuul（Netflix 提供的服务网关）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
        </dependency>
        ```

5.  **断路器（服务容错）：**

    *   **Hystrix（服务熔断器）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        ```

    *   **Resilience4j（轻量级断路器）：**

        ```xml
        <dependency>
            <groupId>io.github.resilience4j</groupId>
            <artifactId>resilience4j-spring-boot2</artifactId>
            <version>1.7.0</version>
        </dependency>
        ```

6.  **服务监控与链路追踪：**

    *   **Spring Cloud Sleuth（分布式追踪）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-sleuth</artifactId>
        </dependency>
        ```

    *   **Zipkin（分布式追踪系统）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
        </dependency>
        ```

7.  **消息总线：**

    *   **Spring Cloud Bus（事件总线）：**

        ```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
        ```

8.  **服务限流、降级与熔断：**

    *   **Sentinel（流量控制）：**

        ```xml
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        ```

