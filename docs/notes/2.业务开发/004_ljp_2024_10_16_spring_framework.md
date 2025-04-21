---
createTime: 2025/04/11 13:56:03
permalink: /2.业务开发/b137ch9q/
---

# Spring Framework

## 1.Spring Framework 全面概述

`Spring` 最早是由 `Rod Johnson` 在他的《[Expert One-on-One J2EE Development without EJB](https://book.douban.com/subject/1426848/)》一书中提出的用来取代 `EJB` 的轻量级框架，并起名为 `Spring Framework`。

随着 `Spring` 越来越受欢迎，在 `Spring Framework` 基础上，又诞生了 `Spring Boot、Spring Cloud、Spring Data、Spring Security` 等一系列基于 `Spring Framework` 的项目，因此 `Spring Framework` 是最为核心的 `Spring` 框架。

## 2.Spring Framework 基本功能

`Spring Framework` 主要包括几个模块：

*   支持 `IoC` 和 `AOP` 的容器
*   支持 `JDBC` 和 `ORM` 的数据访问模块
*   支持声明式事务的模块
*   支持基于 `Servlet` 的 `MVC` 开发
*   支持基于 `Reactive` 的 `Web` 开发
*   集成 `JMS、JavaMail、JMX、Cache` 等其他模块

## 3.Spring Framework 使用教程

### 3.1.基础知识

学习 `Spring Framework` 的最佳文档是 [官方文档](https://spring.io/projects/spring-framework)，如果您有阅读困难，可以 [阅读廖雪峰的文档](https://liaoxuefeng.com/books/java/spring/ioc/basic/index.html)，我的建议是先看后者再看前者。

#### 3.1.1.控制反转 Ioc

传统的应用程序中，控制权在程序本身，因此程序的控制流程完全由开发者控制。例如某些变量的创建需要开发者手动创建、配置后才能使用。

```java
// BookService.java
public class BookService {
    private HikariConfig config = new HikariConfig();
    private DataSource dataSource = new HikariDataSource(config);

    public Book getBook(long bookId) {
        try (Connection conn = dataSource.getConnection()) {
            ...
            return book;
        }
    }
}

```

```java
// UserService.java
public class UserService {
    private HikariConfig config = new HikariConfig();
    private DataSource dataSource = new HikariDataSource(config);

    public User getUser(long userId) {
        try (Connection conn = dataSource.getConnection()) {
            ...
            return user;
        }
    }
}

```

```java
// CartServlet.java
public class CartServlet extends HttpServlet {
    private BookService bookService = new BookService();
    private UserService userService = new UserService();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long currentUserId = getFromCookie(req);
        User currentUser = userService.getUser(currentUserId);
        Book book = bookService.getBook(req.getParameter("bookId"));
        cartService.addToCart(currentUser, book);
        ...
    }
}

```

```java
// HistoryServlet.java
public class HistoryServlet extends HttpServlet {
    private BookService bookService = new BookService();
    private UserService userService = new UserService();
}

```

-   **组件创建困难**：例如 `BookService` 和 `UserService` 要创建 `HikariDataSource`，实际上需要读取配置，才能先实例化 `HikariConfig`，再实例化 `HikariDataSource`
-   **组件共享困难**：没有必要让 `BookService` 和 `UserService` 分别创建 `DataSource` 实例，完全可以共享同一个 `DataSource`
-   **组件组装困难**：但谁负责创建 `DataSource`，谁负责获取其他组件已经创建的 `DataSource`，不好处理。类似的，`CartServlet` 和 `HistoryServlet` 也应当共享 `BookService` 实例和 `UserService` 实例，但也不好处理。
-   **组件销毁困难**：很多组件需要销毁以便释放资源，例如 `DataSource`，但如果该组件被多个组件共享，如何确保它的使用方都已经全部被销毁？如何按依赖顺序正确销毁？
-   **组件依赖困难**：随着更多的组件被引入，例如，书籍评论，需要共享的组件写起来会更困难，这些组件的依赖关系会越来越复杂。
-   **组件测试困难**：测试某个组件，例如 `BookService`，是复杂的，因为必须要在真实的数据库环境下执行（写死代码）。

而如果有一个东西，可以：负责组件创建、负责组件共享、负责组件组装、负责组件销毁，就可以顺带解决组件依赖、组件测试。而这个东西就是 `IoC`，将传统的控制权反转，从应用程序转交给 `IoC` 容器。开发过程中不再需要手动 `new` 来实例，而是使用 `IoC` 容器进行依赖注入，从此关于组件的问题可以和核心代码动作进行分离。

#### 3.1.2.依赖注入 DI

这里因为引入了 `IoC`，就会产生了几个新的事物：

-   `IoC` 容器：解决六个组件问题
-   `Spring Bean` 组件：也就是组件依赖的别称，配置一个组件就是配置一个 `Bean`
-   `.xml` 配置：配置需要提示容器实例化组件，依赖关系等

正常来说，我们有两种依赖注入方法：

-   使用 `set()` 封装依赖注入，这也是最为常规的做法，只解决少量组件问题，但这是有侵入的（需要实现特定接口，使用 `set()` 的组件将会感知到侵入）
-   使用 `IoC` 这种无侵入容器，这连组件自己都不知道自己运行在容器中，测试不依赖容器，且无需侵入（不需实现特定接口，使用 `IoC` 的组件不会感知到侵入）

不过我们可以利用依赖注入来完成上面的事情，以进一步实现控制反转。`DI` 的核心思想是由容器负责对象的依赖注入，而不是由对象自行创建或查找依赖对象，因此可以说控制反转就是通过 `DI` 来实现的。

通过 `DI`，`Spring` 容器在创建一个对象时，会自动将这个对象的依赖注入进去，这样可以让对象与其依赖的对象解耦，提升系统的灵活性和可维护性。

我们可以尝试装载一个 `Bean` 试试，直接使用 `Maven` 创建一个 `Java` 项目然后引入 `org.springframework:spring-context:6.0.0` 进行手动配置即可，不要使用 `spring initializr` 然后禁用自动化配置这种方式。

```shell
# 创建项目以及目录结构
$ mvn archetype:generate \
-DgroupId=com.work \
-DartifactId=my-spring-framework-test \
-DarchetypeArtifactId=maven-archetype-quickstart \
-DinteractiveMode=false

$ tree -L 6 .
.
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── work
        │           ├── App.java
        │           └── service
        │               ├── MailService.java
        │               ├── UserService.java
        │               └── User.java
        └── resources
            └── application.xml
# ...

```

```xml
<!-- pom.xml -->
<!--
 'xmlns=' XML 命名空间
 'xmlns:xsi' XML Schema 实例命名空间
 'xsi:schemaLocation=' 指定 XML Schema 位置
 这些声明的主要作用是帮助 XML 解析器正确地验证和处理 Maven POM 文件，确保它符合 Maven 规范。
 -->
<project
        xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"
>
  <!-- 指定 Maven 项目对象模型 POM 的版本 -->
  <modelVersion>4.0.0</modelVersion>
  <!-- 定义项目的所属组织 -->
  <groupId>com.work</groupId>
  <!-- 定义项目的具体名称 -->
  <artifactId>work-spring-framework-test</artifactId>
  <!-- 填写依赖的 Java 版本和使用的字符集 -->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
  </properties>
  <!-- 指定项目构建的打包类型为 .jar -->
  <packaging>jar</packaging>
  <!-- 定义项目的版本号 -->
  <version>0.1.0</version>
  <!-- 和 artifactId 的名称保持一样即可(这是一个可选字段) -->
  <name>work-spring-framework-test</name>
  <!-- 填写为本项目制定的官方网址 -->
  <url>https://work.com</url>
  <!-- 填写所有依赖项的容器, 在内部填写一个一个 dependency 标签 -->
  <dependencies>
    <!-- 依赖名称: 依赖官网/依赖源码 -->

    <!-- Junit: https://junit.org/junit5/ -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.9.3</version>
      <scope>test</scope> <!-- 如果不指定 scope 会默认将依赖设置为 compile 生命阶段, 因此设置 scope 本质是确保某些依赖只在某个阶段被使用 -->
    </dependency>

    <!-- Springframework: https://spring.io/projects/spring-framework#learn -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.0.0</version>
    </dependency>

  </dependencies>
  <!-- 构建插件 -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.1.0</version>
        <configuration>
          <archive>
            <manifestEntries>
              <!-- 填写启动类 -->
              <Main-Class>com.work.App</Main-Class>
            </manifestEntries>
          </archive>
          <descriptorRefs>
            <!-- 集成的最终 .jar 包名称 -->
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
        </configuration>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>

```

```java
// MailService.java: 邮件服务
package com.work.service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class MailService {
    private ZoneId zoneId = ZoneId.systemDefault();

    public void setZoneId(ZoneId zoneId) {
        this.zoneId = zoneId;
    }

    public String getTime() {
        return ZonedDateTime.now(this.zoneId).format(DateTimeFormatter.ISO_ZONED_DATE_TIME);
    }

    public void sendLoginMail(User user) {
        System.err.printf("Hi, %s! You are logged in at %s%n", user.getName(), getTime());
    }

    public void sendRegistrationMail(User user) {
        System.err.printf("Welcome, %s!%n", user.getName());

    }
}

```

```java
// UserService.java: 用户服务
package com.work.service;

import java.util.ArrayList;
import java.util.List;

public class UserService {
    /*
    private final MailService mailService; // final，确保只能通过构造方法注入

    // 构造方法注入
    public UserService(MailService mailService) {
        this.mailService = mailService;
    }
    */
    
    private MailService mailService;

    // 模拟数据库已有数据
    private final List<User> users = new ArrayList<>(List.of( // users:
            new User(1, "bob@example.com", "password", "Bob"), // bob
            new User(2, "alice@example.com", "password", "Alice"), // alice
            new User(3, "tom@example.com", "password", "Tom"))); // tom

    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    public User login(String email, String password) {
        for (User user : users) {
            if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
                mailService.sendLoginMail(user);
                return user;
            }
        }
        throw new RuntimeException("login failed.");
    }

    public User register(String email, String password, String name) {
        users.forEach((user) -> {
            if (user.getEmail().equalsIgnoreCase(email)) {
                throw new RuntimeException("email exist.");
            }
        });
        User user = new User(users.stream().mapToLong(u -> u.getId()).max().getAsLong() + 1, email, password, name);
        users.add(user);
        mailService.sendRegistrationMail(user);
        return user;
    }

    public User getUser(long id) {
        return this.users.stream().filter(user -> user.getId() == id).findFirst().orElseThrow();
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?> <!-- application.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Bean 的名称是 mailService, 从 com.work.service.MailService 类路径下进行创建 -->
    <bean id="mailService" class="com.work.service.MailService" />

    <!-- Bean 的名称是 userService, 从 com.work.service.UserService 类路径下进行创建 -->
    <bean id="userService" class="com.work.service.UserService">
        <!-- 使用构造方法可以用这句 <constructor-arg ref="mailService" /> 替换下面的 pro -->
        <property name="mailService" ref="mailService" /> <!-- 引用之前创建的 mailService Bean, 填充到本 Bean 中的 mailService 属性中, 默认采用 Java Bean 约定的方法来注入 -->
    </bean>

</beans>

```

```java
// User.java
package com.work.service;

public class User {
    private long id;
    private String email;
    private String password;
    private String name;

    public User(long id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("User{id=%d, email='%s', name='%s'}", id, email, name);
    }
}

```

```java
// App.java
package com.work;

import com.work.service.User;
import com.work.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        // 创建 Spring 容器，加载 application.xml 配置
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");

        // 获取 UserService Bean
        UserService userService = context.getBean(UserService.class); // 没有通过 new 机制获取对象

        // 注册用户
        User newUser = userService.register("john@example.com", "123456", "John Doe");
        System.out.println("Registered: " + newUser);

        // 获取用户
        System.out.println("Get User Info" + userService.getUser(2));

        // 登录用户
        User loggedInUser = userService.login("john@example.com", "123456");
        System.out.println("Logged in: " + loggedInUser);
    }
}

```

以上我们就完成了一个 `Bean` 的装载，可以看到我们使用 `.xml` 文件达成了不使用 `new` 的目的，不过现代的 `Spring` 项目采用注解来配置，不再需要自己手动编写 `.xml` 文件，而是使用某一些注解就可以完成。

把上述 `XML` 配置文件用 `Java` 代码写出来，就像这样：

```java
// 等价核心代码
UserService userService = new UserService();
MailService mailService = new MailService();
userService.setMailService(mailService);

```

>   [!IMPORTANT]
>
>   补充：如果注入的不是 `Bean`，而是 `boolean`、`int`、`String` 这样的数据类型，则通过修改 `ref` 为 `value` 来注入。

>   [!IMPORTANT]
>
>   补充：`ApplicationContext` 实际上是一个接口类型。

>   [!IMPORTANT]
>
>   补充：从上面的注释可以看出 `Bean` 的设置可以使用构造方法或 `setter()` 来设置。

当然，我们可以使用更为现代的注解来避免编写 `.xml`：

-   使用 `@Component` 来创建一个 `Baen`，使用 `@Autowired` 来标明注入字段，或者用 `@Autowired 字段类型 函数参数` 来标明注入参数（可以用在构造方法和 `setter` 中，另外 `Spring 4.3` 之后，如果只有一个构造方法，并且构造参数中的类型已经注册过 `Bean`，`Spring` 会自动注入，不需要 `@Autowired`，代码更加简洁，我个人更加倾向于加上）。
-   在主类中使用 `@ComponentScan` 用于指定 `Spring` 需要扫描的包路径，这样 `@Component` 等标注的类会被自动发现，并注册为 `Spring Bean`。

```shell
# 目录结构
$ tree -L 6 .
.
├── pom.xml
└── src
    └── main
        └── java
            └── com
                └── work
                    ├── App.java
                    └── service
                        ├── MailService.java
                        ├── UserService.java
                        └── User.java
# ...

```

```xml
<!-- pom.xml -->
<!--
 'xmlns=' XML 命名空间
 'xmlns:xsi' XML Schema 实例命名空间
 'xsi:schemaLocation=' 指定 XML Schema 位置
 这些声明的主要作用是帮助 XML 解析器正确地验证和处理 Maven POM 文件，确保它符合 Maven 规范。
 -->
<project
        xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"
>
  <!-- 指定 Maven 项目对象模型 POM 的版本 -->
  <modelVersion>4.0.0</modelVersion>
  <!-- 定义项目的所属组织 -->
  <groupId>com.work</groupId>
  <!-- 定义项目的具体名称 -->
  <artifactId>work-spring-framework-test</artifactId>
  <!-- 填写依赖的 Java 版本和使用的字符集 -->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
  </properties>
  <!-- 指定项目构建的打包类型为 .jar -->
  <packaging>jar</packaging>
  <!-- 定义项目的版本号 -->
  <version>0.1.0</version>
  <!-- 和 artifactId 的名称保持一样即可(这是一个可选字段) -->
  <name>work-spring-framework-test</name>
  <!-- 填写为本项目制定的官方网址 -->
  <url>https://work.com</url>
  <!-- 填写所有依赖项的容器, 在内部填写一个一个 dependency 标签 -->
  <dependencies>
    <!-- 依赖名称: 依赖官网/依赖源码 -->

    <!-- Junit: https://junit.org/junit5/ -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.9.3</version>
      <scope>test</scope> <!-- 如果不指定 scope 会默认将依赖设置为 compile 生命阶段, 因此设置 scope 本质是确保某些依赖只在某个阶段被使用 -->
    </dependency>

    <!-- Springframework: https://spring.io/projects/spring-framework#learn -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.0.0</version>
    </dependency>

  </dependencies>
  <!-- 构建插件 -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.1.0</version>
        <configuration>
          <archive>
            <manifestEntries>
              <!-- 填写启动类 -->
              <Main-Class>com.work.App</Main-Class>
            </manifestEntries>
          </archive>
          <descriptorRefs>
            <!-- 集成的最终 .jar 包名称 -->
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
        </configuration>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>

```

```java
// MailService.java: 邮件服务
package com.work.service;

import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MailService {
    private ZoneId zoneId = ZoneId.systemDefault();

    public void setZoneId(ZoneId zoneId) {
        this.zoneId = zoneId;
    }

    public String getTime() {
        return ZonedDateTime.now(this.zoneId).format(DateTimeFormatter.ISO_ZONED_DATE_TIME);
    }

    public void sendLoginMail(User user) {
        System.err.printf("Hi, %s! You are logged in at %s%n", user.getName(), getTime());
    }

    public void sendRegistrationMail(User user) {
        System.err.printf("Welcome, %s!%n", user.getName());

    }
}

```

```java
// UserService.java: 用户服务
package com.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserService {

    @Autowired
    private MailService mailService;

    // 模拟数据库已有数据
    private final List<User> users = new ArrayList<>(List.of( // users:
            new User(1, "bob@example.com", "password", "Bob"), // bob
            new User(2, "alice@example.com", "password", "Alice"), // alice
            new User(3, "tom@example.com", "password", "Tom"))); // tom

    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    public User login(String email, String password) {
        for (User user : users) {
            if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
                mailService.sendLoginMail(user);
                return user;
            }
        }
        throw new RuntimeException("login failed.");
    }

    public User register(String email, String password, String name) {
        users.forEach((user) -> {
            if (user.getEmail().equalsIgnoreCase(email)) {
                throw new RuntimeException("email exist.");
            }
        });
        User user = new User(users.stream().mapToLong(u -> u.getId()).max().getAsLong() + 1, email, password, name);
        users.add(user);
        mailService.sendRegistrationMail(user);
        return user;
    }

    public User getUser(long id) {
        return this.users.stream().filter(user -> user.getId() == id).findFirst().orElseThrow();
    }
}
```

```java
// User.java
package com.work.service;

public class User {
    private long id;
    private String email;
    private String password;
    private String name;

    public User(long id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("User{id=%d, email='%s', name='%s'}", id, email, name);
    }
}

```

```java
// App.java
package com.work;

import com.work.service.User;
import com.work.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan
public class App {
    public static void main(String[] args) {
        // 创建 Spring 容器，加载类路径注解配置
        ApplicationContext context = new AnnotationConfigApplicationContext(App.class);

        // 获取 UserService Bean
        UserService userService = context.getBean(UserService.class); // 没有通过 new 机制获取对象

        // 注册用户
        User newUser = userService.register("john@example.com", "123456", "John Doe");
        System.out.println("Registered: " + newUser);

        // 获取用户
        System.out.println("Get User Info" + userService.getUser(2));

        // 登录用户
        User loggedInUser = userService.login("john@example.com", "123456");
        System.out.println("Logged in: " + loggedInUser);
    }
}

```

>   [!IMPORTANT]
>
>   补充：如何在 `Spring IoC` 容器中注册 `HikariDataSource` 这种第三方组件作为 `Bean`？由于 `HikariDataSource` 是第三方类，它不在我们自己的代码里，无法直接加 `@Component` 注解。但 `Spring` 允许我们用 `@Bean` 标记某个方法或类，然后该方法或类的返回值或构造函数就会创建 `Bean`，并让 `IoC` 容器管理它。然后和 `@Component` 自动创建的实例一样，只不过这次我们是自己创建一个实例，在使用过程中注入过程一样，不用调用方法直接获取 `Bean` 使用即可。
>
>   并且这种方法需要写到携带 `@Configuration` 的类中，如果没有 `@Bean` 则使用 `@Configuration` 没有意义。
>
>   ```java
>   // DataSourceConfig.java
>   import com.zaxxer.hikari.HikariConfig;
>   import com.zaxxer.hikari.HikariDataSource;
>   import org.springframework.context.annotation.Bean;
>   import org.springframework.context.annotation.Configuration;
>   
>   import javax.sql.DataSource;
>   
>   @Configuration
>   public class DataSourceConfig {
>   
>      @Bean // 这个方法返回的对象会被 Spring 管理，成为一个 Bean
>      public DataSource hikariDataSource() {
>          HikariConfig config = new HikariConfig();
>          config.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
>          config.setUsername("root");
>          config.setPassword("password");
>          config.setMaximumPoolSize(10);
>          return new HikariDataSource(config);
>      }
>   }
>   
>   ```

> [!IMPORTANT]
>
> 补充：对于 `Spring` 容器来说，当我们把一个 `Bean` 标记为 `@Component` 后，它就会自动为我们创建一个单例，即容器初始化时创建 `Bean`，容器关闭前销毁 `Bean`。在容器运行期间，我们调用 `getBean(Class)` 获取到的 `Bean` 总是同一个实例。
>
> 还有一种 `Bean`，我们每次调用 `getBean(Class)`，容器都返回一个新的实例，这种 `Bean` 称为 `Prototype, 原型`，它的生命周期显然和单例不同。声明一个 `Prototype` 的 `Bean` 时，需要添加一个额外的 `@Scope` 注解。
>
> ```java
> // MailSession.java
> @Component
> @Scope("prototype") // @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
> public class MailSession {
>     ...
> }
> ```
>

> [!IMPORTANT]
>
> 补充：如果某些类实现了所有的接口，并且这些类都使用 `@Component` 来注册 `Bean`，则可以在某个使用 `@Component` 并且使用 `@Autowired` 来注入一个接口类型的 `List` 字段，则可以使用该字段来获取每一个 `Bean`，并且还可以使用 `@Order(number)` 来设置在 `List` 中的顺序。
>
> ```java
> // App.java
> package com.work;
> 
> import org.springframework.beans.factory.annotation.Autowired;
> import org.springframework.context.ApplicationContext;
> import org.springframework.context.annotation.AnnotationConfigApplicationContext;
> import org.springframework.context.annotation.ComponentScan;
> import org.springframework.context.annotation.Configuration;
> import org.springframework.core.annotation.Order;
> import org.springframework.stereotype.Component;
> 
> import java.util.List;
> 
> interface Validator {
>     void validate(String email, String password, String name);
> }
> 
> @Component
> @Order(1)
> class EmailValidator implements Validator {
>     public void validate(String email, String password, String name) {
>         if (!email.matches("^[a-z0-9]+\\@[a-z0-9]+\\.[a-z]{2,10}$")) {
>             throw new IllegalArgumentException("invalid email: " + email);
>         }
>     }
> }
> 
> @Component
> @Order(2)
> class PasswordValidator implements Validator {
>     public void validate(String email, String password, String name) {
>         if (!password.matches("^.{6,20}$")) {
>             throw new IllegalArgumentException("invalid password");
>         }
>     }
> }
> 
> @ComponentEmailValidator
> @Order(3)
> class NameValidator implements Validator {
>     public void validate(String email, String password, String name) {
>         if (name == null || name.isBlank() || name.length() > 20) {
>             throw new IllegalArgumentException("invalid name: " + name);
>         }
>     }
> }
> 
> @Component
> class Validators {
>     @Autowired // 其实这一个也可以简化为构造函数的参数
>     List<Validator> validators; // 这里可以接受所有实现了 Validator 接口的 Bean, 非常方便
> 
>     public void validate(String email, String password, String name) {
>         for (var validator : this.validators) {
>             validator.validate(email, password, name);
>         }
>     }
> }
> 
> @Configuration
> @ComponentScan
> public class App {
>     public static void main(String[] args) {
>         ApplicationContext context = new AnnotationConfigApplicationContext(App.class);
>         Validators validators = context.getBean(Validators.class);
> 
>         // 测试数据
>         String email1 = "test@example.com";
>         String password1 = "secure123";
>         String name1 = "John Doe";
> 
>         String email2 = "invalid-email";
>         String password2 = "123";
>         String name2 = "A very very very long name that exceeds limit";
> 
>         // 通过验证
>         System.out.println("Testing valid inputs:");
>         validators.validate(email1, password1, name1);
>         System.out.println("Validation passed!");
> 
>         // 无效邮箱
>         try {
>             System.out.println("\nTesting invalid email:");
>             validators.validate(email2, password1, name1);
>         } catch (Exception e) {
>             System.out.println(e.getMessage());
>         }
> 
>         // 无效密码
>         try {
>             System.out.println("\nTesting invalid password:");
>             validators.validate(email1, password2, name1);
>         } catch (Exception e) {
>             System.out.println(e.getMessage());
>         }
> 
>         // 无效名称
>         try {
>             System.out.println("\nTesting invalid name:");
>             validators.validate(email1, password1, name2);
>         } catch (Exception e) {
>             System.out.println(e.getMessage());
>         }
>     }
> }
> 
> ```
>

> [!IMPORTANT]
>
> 补充：默认情况下，当我们标记了一个 `@Autowired` 后，`Spring` 如果没有找到对应类型的 `Bean`，它会抛出 `NoSuchBeanDefinitionException` 异常，可以给 `@Autowired` 增加一个 `required = false` 的参数。
>
> ```java
> // MailService.java
> @Component
> public class MailService {
>     @Autowired(required = false)
>     ZoneId zoneId = ZoneId.systemDefault();
>     ...
> }
> 
> ```
>

> [!IMPORTANT]
>
> 补充：有些时候，一个 `Bean` 在注入必要的依赖后，需要进行初始化（监听消息等）。在容器关闭时，有时候还需要清理资源（关闭连接池等）。我们通常会定义一个 `init()` 进行初始化，定义一个 `shutdown()` 方法进行清理，然后引入 `JSR-250` 定义的 `Annotation` 依赖 `jakarta.annotation:jakarta.annotation-api:2.1.1`，最后在 `Bean` 的初始化和清理方法上标记`@PostConstruct`和`@PreDestroy` 即可。
>
> ```java
> // MailService.java
> @Component
> public
> class MailService {
>     @Autowired(required = false)
>     ZoneId zoneId = ZoneId.systemDefault();
>     @PostConstruct
> 
>     public void init() {
>         System.out.println("Init mail service with zoneId = " + this.zoneId);
>     }
>     @PreDestroy
> 
>     public void shutdown() {
>         System.out.println("Shutdown mail service");
>     }
> }
> ```

> [!IMPORTANT]
>
> 补充：有时候需要创建多个实例，对于注解 `@Component` 和 `@Bean` 这档事会比较麻烦，因为默认是单例模式。此时可以通过使用别名限定符 `@Qualifier` 来避免在同类不同方法的返回值类型相同时发生冲突（需要创建 `Bean` 和注入 `Bean` 都进行限定）。
>
> ```java
> // MailService.java
> @Configuration
> @ComponentScan
> class AppConfig {
>  @Bean
>  @Qualifier("z") // 等价于 @Bean(name = "z")
>  @Primary // 指定为主要 Bean, 在注入时如果没有指出 Bean 的名字, Spring 会注入标记有 @Primary 的 Bean
>  ZoneId createZoneOfZ() {
>      return ZoneId.of("Z");
>  }
> 
>  @Bean
>  @Qualifier("utc8")
>  ZoneId createZoneOfUTC8() {
>      return ZoneId.of("UTC+08:00");
>  }
> }
> 
> @Component
> public class MailService {
> 	@Autowired(required = false)
> 	@Qualifier("z") // 指定注入名称为"z"的 ZoneId, 如果不使用这个注释就会默认查找且注入带有 @Primary 的 Bean 组件, 再没有就抛出异常
> 	ZoneId zoneId = ZoneId.systemDefault();
>  ...
> }
> 
> ```
>
> 因此可以使用 `@Component(name = "名字")` 或 `@Bean(name = "名字")` 设置名称，然后使用下面的两种方式来按名字注入。
>
> - `@Autowired` 默认按类型进行注入，如果搭配 `@Qualifier` 就会按名称进行注入
> - `@Resource` 默认按照名字进行注入，如果没有指定(也就是没有填入 `name` 参数）就默认使用类型匹配（更方便）

> [!IMPORTANT]
>
> 补充：`Spring` 提供了一个 `org.springframework.core.io.Resource`，它可以像 `String`、`int` 一样使用 `@Value` 注入（原本这个注解最直接的用法就是给字段赋值，`Spring Framework` 必须实现 `@Value` 因为有些赋值需要注入支持，例如后面使用 `@PropertySource` 读取配置文件）。
>
> ```shell
> # logo.txt
> Hello, this is logo.txt!
> 
> ```
>
> ```java
> // App.java
> package com.work;
> 
> import org.springframework.beans.factory.annotation.Value;
> import org.springframework.context.ApplicationContext;
> import org.springframework.context.annotation.*;
> import org.springframework.core.io.Resource;
> import org.springframework.stereotype.Component;
> 
> import jakarta.annotation.PostConstruct;
> import java.io.BufferedReader;
> import java.io.InputStreamReader;
> import java.nio.charset.StandardCharsets;
> import java.util.stream.Collectors;
> 
> @Component
> class FileService {
>     @Value("classpath:/logo.txt")
>     private Resource resource;
> 
>     private String content;
> 
>     @PostConstruct
>     public void init() {
>         try (var reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
>             content = reader.lines().collect(Collectors.joining("\n"));
>         } catch (Exception e) {
>             throw new RuntimeException("Failed to read logo.txt", e);
>         }
>     }
> 
>     public void printLogo() {
>         System.out.println("Logo Content:\n" + content);
>     }
> }
> 
> // 配置类，启用组件扫描
> @ComponentScan("com.work")
> class AppConfig {} // 也可以这么写
> 
> public class App {
>     public static void main(String[] args) {
>         // 创建 Spring 容器
>         ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
> 
>         // 获取 Bean 并调用方法
>         FileService fileService = context.getBean(FileService.class);
>         fileService.printLogo();
>     }
> }
> 
> ```

> [!IMPORTANT]
>
> 补充：在开发应用程序时，经常需要读取配置文件。最常用的配置方法是以 `key=value` 的形式写在 `.properties` 文件中。例如，`MailService` 根据配置的 `app.zone=Asia/Shanghai` 来决定使用哪个时区。要读取配置文件，我们可以使用上一节讲到的 `Resource` 来读取位于 `classpath` 下的一个 `app.properties` 文件。但是，这样仍然比较繁琐。`Spring` 容器还提供了一个更简单的 `@PropertySource` 来自动读取配置文件，不过我们必须在 `@Configuration` 配置类上添加这个注解。
>
> 类似的，必须在 `@Configuration` 中才可以使用 `@PropertySource`，否则就没有使用 `@Configuration` 的必要，这类似 `@Bean` 的用法。
>
> ```properties
> # app.properties
> app.zone=Asia/Shanghai
> 
> ```
>
> ```java
> // App.java
> package com.work;
> 
> import org.springframework.context.annotation.*;
> import org.springframework.beans.factory.annotation.Value;
> 
> import java.time.ZoneId;
> 
> @Configuration
> @PropertySource("classpath:app.properties") // 读取 classpath 下的 app.properties
> class AppConfig {
>     @Value("${app.zone:UTC}") // 默认值是 UTC
>     private String zoneId;
> 
>     @Bean
>     ZoneId createZoneId() {
>         return ZoneId.of(zoneId);
>     }
> }
> 
> @ComponentScan
> public class App {
>     public static void main(String[] args) {
>         try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class)) {
>             ZoneId zoneId = context.getBean(ZoneId.class);
>             System.out.println("Configured ZoneId: " + zoneId);
>         }
>     }
> }
> 
> ```

> [!IMPORTANT]
>
> 补充：另一种注入配置的方式是先通过一个简单的 `JavaBean` 持有所有的配置，例如一个`SmtpConfig`：
>
> ```java
> @Component
> public class SmtpConfig {
>     @Value("${smtp.host}")
>     private String host;
> 
>     @Value("${smtp.port:25}")
>     private int port;
> 
>     public String getHost() {
>         return host;
>     }
> 
>     public int getPort() {
>         return port;
>     }
> }
> 
> ```
>
> 然后，在需要读取的地方，使用`#{smtpConfig.host}`注入：
>
> ```java
> @Component
> public class MailService {
>     @Value("#{smtpConfig.host}")
>     private String smtpHost;
> 
>     @Value("#{smtpConfig.port}")
>     private int smtpPort;
> }
> 
> ```
>
> 注意观察`#{}`这种注入语法，它和`${key}`不同的是，`#{}`表示从 `Java Bean` 读取属性。`"#{smtpConfig.host}"` 的意思是，从名称为 `smtpConfig` 的 `Bean` 中读取 `host` 属性，即调用 `getHost()`。一个 `Class` 名为 `SmtpConfig` 的 `Bean`，它在 `Spring` 容器中的默认名称就是 `smtpConfig`，除非用`@Qualifier`指定了名称。

> [!IMPORTANT]
>
> 补充：创建某个 `Bean` 时，`Spring` 容器可以根据注解`@Profile`来决定是否创建。例如，以下配置：
>
> ```java
> @Configuration
> @ComponentScan
> public class AppConfig {
>     @Bean
>     @Profile("!test")
>     ZoneId createZoneId() {
>         return ZoneId.systemDefault();
>     }
> 
>     @Bean
>     @Profile("test")
>     ZoneId createZoneIdForTest() {
>         return ZoneId.of("America/New_York");
>     }
> }
> ```
>
> 如果当前的 `Profile` 设置为`test`，则 `Spring` 容器会调用 `createZoneIdForTest()` 创建 `ZoneId`，否则，调用 `createZoneId()` 创建 `ZoneId`。注意到`@Profile("!test")` 表示非 `test` 环境。
>
> 而在运行程序时，加上 `JVM` 参数 `-Dspring.profiles.active=test` 就可以指定以`test`环境启动。实际上，`Spring` 允许指定多个 `Profile`，例如：
>
> ```plain
> -Dspring.profiles.active=test,master
> ```
>
> 可以表示`test`环境，并使用`master`分支代码。要满足多个 `Profile` 条件，可以这样写。
>
> ```java
> @Bean
> @Profile({ "test", "master" }) // 满足test或master
> ZoneId createZoneId() {
>     ...
> }
> ```

> [!IMPORTANT]
>
> 补充：除了根据 `@Profile` 条件来决定是否创建某个 `Bean` 外，`Spring` 还可以根据 `@Conditional` 决定是否创建某个 `Bean`，有机会再来补充。

> [!IMPORTANT]
>
> 补充：这里列出常用的注解，并且给一份供您借鉴的单文件示例代码。
>
> -   @Component
> -   @Autowired
>     -   @Autowired(required = true)
>     -   @Autowired(required = false)
> -   @ComponentScan
> -   @Scope
>     -   @Scope("singleton")
>     -   @Scope("prototype")
>     -   @Scope("request")
>     -   @Scope("session")
> -   @Configuration
> -   @Bean
> -   @PropertySource
> -   @Order
> -   @Qualifier
> -   @PostConstruct 和 @PreDestroy
> -   @Value
>
> ```java
> // 参考文件
> package com.work;
> 
> import org.springframework.stereotype.Component;
> import org.springframework.beans.factory.annotation.Autowired;
> import org.springframework.context.annotation.*;
> import org.springframework.core.annotation.Order;
> import jakarta.annotation.PostConstruct;
> import jakarta.annotation.PreDestroy;
> import org.springframework.beans.factory.annotation.Qualifier;
> import org.springframework.beans.factory.annotation.Value;
> 
> // 创建 Bean
> @Component
> @Scope("singleton")
> class SingletonComponent {}
> 
> // 创建 Bean
> @Component
> @Scope("prototype")
> class PrototypeComponent {}
> 
> // 创建 Bean, 同时有依赖注入
> @Component
> class AutowiredExample {
>     @Autowired(required = true)
>     private SingletonComponent singletonComponent;
> 
>     @Autowired(required = false)
>     private PrototypeComponent requiredComponent;
> }
> 
> // 拦截 Bean 的创建和销毁
> @Component
> class LifecycleExample {
>     @PostConstruct
>     public void init() {
>         System.out.println("LifecycleExample initialized");
>     }
> 
>     @PreDestroy
>     public void destroy() {
>         System.out.println("LifecycleExample destroyed");
>     }
> }
> 
> // 配置类中读取资源文件
> @Configuration-
> @PropertySource("classpath:app.properties")
> class Config {
>     @Value("${app.name:DefaultApp}") // 现在放在了 Spring 托管的类 AppConfig 中
>     private String appName;
> 
>     @Bean("appNameBean")
>     public String getAppName() {
>         return appName; // 让 appName 也作为一个 Bean
>     }
> }
> 
> // 配置类中按顺序返回多个 Bean
> @Configuration
> class Beans {
>     @Bean
>     @Order(1)
>     @Qualifier("primarySingleton")
>     public Singleton-Component primarySingletonBean() {
>         return new SingletonComponent();
>     }
> 
>     @Bean
>     @Order(2)
>     @Qualifier("secondarySingleton")
>     public SingletonComponent secondarySingletonBean() {
>         return new SingletonComponent();
>     }
> }
> 
> // 在同类型 Bean 中选择特定的 Bean 进行注入
> @Component
> class QualifierExample {
>     private final SingletonComponent component;
> 
>     @Autowired
>     public QualifierExample(@Qualifier("primarySingleton") SingletonComponent component) {
>         this.component = component;
>     }
> }
> 
> @ComponentScan("com.work")
> class AppConfig {} // 也可以这么写
> 
> public class App {
>     public static void main(String[] args) {
>         try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class)) {
>             String appName = context.getBean(String.class);
>             System.out.println("Application Name: " + appName);
>         }
>     }
> }
> 
> ```

> [!IMPORTANT]
>
> 补充：`DI` 还能使得测试变得简单，可以注入 `mock` 对象或替代实现。

#### 3.1.3.切面编程 AOP

`OOP` 作为面向对象编程的模式，获得了巨大的成功，`OOP` 的主要功能是数据封装、继承和多态。而 `AOP` 是一种新的编程方式，它和 `OOP` 不同，`OOP` 把系统看作多个对象的交互，`AOP` 把系统分解为不同的关注点，或者称之为切面。

对于安全检查、日志、事务等代码，它们会重复出现在每个业务方法中。使用 `OOP`，我们很难将这些四处分散的代码模块化，哪怕模块化了也总有部分代码逻辑和实际的业务无关。

```java
// BookServic.java
public class BookService {
    public void createBook(Book book) {
        securityCheck();
        Transaction tx = startTransaction();
        try {
            // 核心业务逻辑
            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        }
        log("created book: " + book);
    }
    public void updateBook(Book book) {
        securityCheck();
        Transaction tx = startTransaction();
        try {
            // 核心业务逻辑
            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        }
        log("updated book: " + book);
    }
}

```

而在 `AOP` 还没有出现之前，我们也有对应的解决方案，那就是使用代理类。这种方式的缺点是比较麻烦，必须先抽取接口，然后针对每个方法实现 `Proxy`。

```java
// SecurityCheckBookService.java
public class BookService {
    public void createBook(Book book) {
        securityCheck();
        Transaction tx = startTransaction();
        try {
            // 核心业务逻辑
            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        }
        log("created book: " + book);
    }
    public void updateBook(Book book) {
        securityCheck();
        Transaction tx = startTransaction();
        try {
            // 核心业务逻辑
            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        }
        log("updated book: " + book);
    }
}

public class SecurityCheckBookService implements BookService {
    private final BookService target;

    public SecurityCheckBookService(BookService target) {
        this.target = target;
    }

    public void createBook(Book book) {
        securityCheck();
        target.createBook(book); // 把 createBook() 又封装了一层
    }

    public void updateBook(Book book) {
        securityCheck();
        target.updateBook(book); // 把 updateBook() 又封装了一层
    }

    private void securityCheck() {
        ...
    }
}

```

另一种方法是，既然 `SecurityCheckBookService` 的代码都是标准的 `Proxy` 样板代码，不如把查权、日志、事务视为切面。然后以某种自动化的方式，把切面织入到核心逻辑中，实现 `Proxy` 模式。

如果我们以 `AOP` 的视角来编写上述业务，可以依次实现：

1. 核心逻辑，即 `BookService`；
2. 切面逻辑，即：
   1. 查权的 `Aspect`
   2. 日志的 `Aspect`
   3. 事务的 `Aspect`

然后以某种方式，让框架来把上述 `3` 个 `Aspect` 以 `Proxy` 的方式“织入”到`BookService` 中，这样一来，就不必编写复杂而冗长的 `Proxy` 模式（`AOP` 技术实际就是动态代理的实现）。因此这里的核心其实就是：如何把切面织入到核心逻辑中？

我们尝试来引入依赖以此创建 `AOP` 的编写，并且明明理清一些关于 `AOP` 的概念，不过记住，我们需要引入依赖 `org.springframework:spring-aspects:6.0.0`，并且保留之前关于 `IoC` 容器的依赖。因为切面也需要 `Bean` 的支持，需要使用 `@EnableAspectJAutoProxy` 扫描带有 `@Aspect` 的 `Bean`，然后根据每个方法的 `@Before`、`@Around` 等注解把 `AOP` 注入到特定的 `Bean` 中（因此在 `Spring Framework` 框架中只有 `Bean` 才能享用 `AOP` 待遇，也只有这样才能借助 `Bean` 的力量通过容器自动调用 `AOP` 代理）。

```xml
<!-- pom.xml -->
<!--
 'xmlns=' XML 命名空间
 'xmlns:xsi' XML Schema 实例命名空间
 'xsi:schemaLocation=' 指定 XML Schema 位置
 这些声明的主要作用是帮助 XML 解析器正确地验证和处理 Maven POM 文件，确保它符合 Maven 规范。
 -->
<project
        xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"
>
  <!-- 指定 Maven 项目对象模型 POM 的版本 -->
  <modelVersion>4.0.0</modelVersion>
  <!-- 定义项目的所属组织 -->
  <groupId>com.work</groupId>
  <!-- 定义项目的具体名称 -->
  <artifactId>work-spring-framework-test</artifactId>
  <!-- 填写依赖的 Java 版本和使用的字符集 -->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
  </properties>
  <!-- 指定项目构建的打包类型为 .jar -->
  <packaging>jar</packaging>
  <!-- 定义项目的版本号 -->
  <version>0.1.0</version>
  <!-- 和 artifactId 的名称保持一样即可(这是一个可选字段) -->
  <name>work-spring-framework-test</name>
  <!-- 填写为本项目制定的官方网址 -->
  <url>https://work.com</url>
  <!-- 填写所有依赖项的容器, 在内部填写一个一个 dependency 标签 -->
  <dependencies>
    <!-- 依赖名称: 依赖官网/依赖源码 -->

    <!-- Junit: https://junit.org/junit5/ -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.9.3</version>
      <scope>test</scope> <!-- 如果不指定 scope 会默认将依赖设置为 compile 生命阶段, 因此设置 scope 本质是确保某些依赖只在某个阶段被使用 -->
    </dependency>

    <!-- Springframework: https://spring.io/projects/spring-framework#learn -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.0.0</version>
    </dependency>

    <!-- spring-aspects: https://mvnrepository.com/artifact/org.springframework/spring-aspects -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>6.0.0</version>
    </dependency>

  </dependencies>
  <!-- 构建插件 -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.1.0</version>
        <configuration>
          <archive>
            <manifestEntries>
              <!-- 填写启动类 -->
              <Main-Class>com.work.App</Main-Class>
            </manifestEntries>
          </archive>
          <descriptorRefs>
            <!-- 集成的最终 .jar 包名称 -->
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
        </configuration>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>

```

```java
// MailService.java: 邮件服务
package com.work.service;

import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MailService {
    
    private ZoneId zoneId = ZoneId.systemDefault();

    public void setZoneId(ZoneId zoneId) {
        this.zoneId = zoneId;
    }

    public String getTime() {
        return ZonedDateTime.now(this.zoneId).format(DateTimeFormatter.ISO_ZONED_DATE_TIME);
    }

    public void sendLoginMail(User user) {
        System.err.printf("Hi, %s! You are logged in at %s%n", user.getName(), getTime());
    }

    public void sendRegistrationMail(User user) {
        System.err.printf("Welcome, %s!%n", user.getName());

    }
    
}

```

```java
// User.java
package com.work.service;

public class User {
    private long id;
    private String email;
    private String password;
    private String name;

    public User(long id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("User{id=%d, email='%s', name='%s'}", id, email, name);
    }
}

```

```java
// App.java
package com.work;

import com.work.service.User;
import com.work.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

@Component
@Aspect // 这个注解代表下面的类将会成为切面类
class LoggingAspect {
    // 在执行 UserService 的每个方法前执行
    @Before("execution(public * com.work.service.UserService.*(..))")
    public void doAccessCheck() {
        System.err.println("[Before] do access check...");
    }

    // 在执行 MailService 的每个方法前后执行
    @Around("execution(public * com.work.service.MailService.*(..))")
    public Object doLogging(ProceedingJoinPoint pjp) throws Throwable {
        System.err.println("[Around] start " + pjp.getSignature()); // 获取方法签名, 这是从 C 语言继承过来的概念
        Object retVal = pjp.proceed();
        System.err.println("[Around] done " + pjp.getSignature());
        return retVal;
    }

    // @Before 			方法执行前调用
    // @After 			方法执行后调用(无论是否抛异常)
    // @AfterReturning  方法成功执行后调用
    // @AfterThrowing 	方法抛出异常后调用
}

@ComponentScan("com.work")
@EnableAspectJAutoProxy // 允许扫描切面
class AppConfig {}

public class App {
    public static void main(String[] args) {
        // 创建 Spring 容器，加载类路径注解配置
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 获取 UserService Bean
        UserService userService = context.getBean(UserService.class);

        // 注册用户
        User newUser = userService.register("john@example.com", "123456", "John Doe");

        // 获取用户
        System.out.println(userService.getUser(2));

        // 登录用户
        User loggedInUser = userService.login("john@example.com", "123456");
    }
}

```

`Spring` 容器启动时为我们自动创建的注入了作为 `Aspect` 的 `UserService` 类的子类 `UserServiceAopProxy`，它取代了原始的 `UserService`。

> [!IMPORTANT]
>
> 补充：我们在使用 `AOP` 时，要注意到虽然 `Spring` 容器可以把指定的方法通过 `AOP` 规则装配到指定的 `Bean` 的指定方法前后。但是，如果自动装配时，因为不恰当的范围，容易导致意想不到的结果，即很多不需要 `AOP` 代理的 `Bean` 也被自动代理了，并且，后续新增的 `Bean`，如果不清楚现有的 `AOP` 装配规则，容易被强迫装配。
>
> 使用 `AOP` 时，被装配的 `Bean` 最好自己能清清楚楚地知道自己被安排了。例如，`Spring` 自己提供另外一个 `@Transactional` 注解就是一个非常好的例子。如果我们自己写的 `Bean` 希望在一个数据库事务中被调用，就标注上 `@Transactional`（标记方法标识该方法有事务，或者直接在 `class` 级别注解，表示“所有 `public` 方法都有事务），这样当事务内的任何 `SQL` 失败，已执行的 `SQL` 语句都会回滚回来，避免数据不一致，这样就不用每次都使用 `try-catch` 处理事务回滚。
>
> ```java
> @Component
> public class UserService {
>  // 有事务:
>  @Transactional
>  public User createUser(String name) {
>      ...
>  }
> 
>  // 无事务:
>  public boolean isValidName(String name) {
>      ...
>  }
> 
>  // 有事务:
>  @Transactional
>  public void updateUser(User user) {
>      ...
>  }
> }
> ```
>
> 那么我们的 `AOP` 应该怎么做到这种标注地点才生效的功能呢？很简单，已经有现成的例子了，那么就先定义注解，实现注解，使用注解即可。不过我们的实现部分不再是无差别“攻击”，而是根据注解进行判断。
>
> ```java
> // App.java
> package com.work;
> 
> import org.aspectj.lang.ProceedingJoinPoint;
> import org.aspectj.lang.annotation.Around;
> import org.aspectj.lang.annotation.Aspect;
> import org.springframework.context.ApplicationContext;
> import org.springframework.context.annotation.*;
> import org.springframework.stereotype.Component;
> 
> import java.lang.annotation.*;
> 
> // 1. 定义注解
> @Target(ElementType.METHOD) // 限定注解只能标注在方法上
> @Retention(RetentionPolicy.RUNTIME) // 保留注解信息到运行时
> @interface MetricTime {
>  String aValue(); // 指定要记录的指标名称(可选)
> }
> 
> // 2. 实现注解
> @Component
> @Aspect
> class MetricAspect {
>     @Around("@annotation(metricTime)") // AOP 切面拦截 @MetricTime 注解的方法, metricTime 是注解实例
>     public Object metric(ProceedingJoinPoint joinPoint, MetricTime metricTime) throws Throwable {
>         String name = metricTime.aValue(); // 获取注解实例中的参数
>         long start = System.currentTimeMillis();
>         try {
>             return joinPoint.proceed();
>         }
>         finally {
>             long t = System.currentTimeMillis() - start;
>             System.err.println("[Metrics] " + name + ": " + t + "ms");
>         }
>         /*
>      joinPoint.proceed(); 先被执行
>      目标方法的返回值会被计算并暂存, 但不会立刻返回
>      进入 finally 代码块, 执行 System.err.println("[Metrics] " + name + ": " + t + "ms");
>      finally 代码执行完毕后, 再真正返回 joinPoint.proceed(); 的结果
>      这是 finally 的特性
>      */
>     }
> }
> 
> // 3. 使用注解
> @Component
> class UserService {
>     @MetricTime(aValue = "UserService.register()")
>     public void register(String email, String password, String name) {
>         try {
>             Thread.sleep((long) (Math.random() * 500)); // 模拟耗时操作
>         } catch (InterruptedException e) {
>             throw new RuntimeException(e);
>         }
> 
>         System.out.println("User registered: " + email);
>     }
> }
> 
> // 4. 扫描组件
> @ComponentScan("com.work")
> @EnableAspectJAutoProxy
> class AppConfig {}
> 
> // 5. 启动容器
> public class App {
>  public static void main(String[] args) {
>      ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
>      UserService userService = context.getBean(UserService.class);
>      userService.register("test@example.com", "password", "John Doe");
>  }
> }
> 
> ```
>
> 而在使用了常见 `@Before、@After、@AfterReturning、@AfterThrowing` 选定时机后，可以在内部则取需要抓捕进行切入的对象。
>
> -  `@annotation(...)` - 注解匹配
> -  `@execution(...)` - 方法执行匹配
> -  `@within(...)` - 限定类或包
> - `@args(...)` - 参数匹配

> [!IMPORTANT]
>
> 补充：如果不了解 `AOP`，有可能会出现一些奇怪的错误。
>
> ```java
> // App.java
> package com.work;
> 
> import org.aspectj.lang.annotation.Aspect;
> import org.aspectj.lang.annotation.Before;
> import org.springframework.beans.factory.annotation.Autowired;
> import org.springframework.context.ApplicationContext;
> import org.springframework.context.annotation.*;
> import org.springframework.stereotype.Component;
> 
> import java.time.ZoneId;
> import java.time.ZonedDateTime;
> 
> @Component
> class UserService {
>     public final ZoneId zoneId = ZoneId.systemDefault();
> 
>     public UserService() {
>         System.out.println("UserService(): init...");
>         System.out.println("UserService(): zoneId = " + this.zoneId);
>     }
> 
>     public ZoneId getZoneId() {
>         return zoneId;
>     }
> 
>     public final ZoneId getFinalZoneId() { // 注意这个方法加了一个 final
>         return zoneId;
>     }
> }
> 
> @Component
> class MailService {
>     @Autowired
>     UserService userService;
> 
>     public String sendMail() {
>         ZoneId zoneId = userService.zoneId;
>         String dt = ZonedDateTime.now(zoneId).toString();
>         return "Hello, it is " + dt;
>     }
> }
> 
> @Component
> @Aspect
> class LoggingAspect {
>     @Before("execution(public * com.work.UserService.*(..))")
>     public void doAccessCheck() {
>         System.err.println("[Before] do access check...");
>     }
> }
> 
> @ComponentScan
> @EnableAspectJAutoProxy
> class AppConfig {}
> 
> class App {
>  public static void main(String[] args) {
>      ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
>      MailService mailService = context.getBean(MailService.class);
>      System.out.println(mailService.sendMail());
>  }
> }
> 
> ```
>
> ```shell
> # 运行出现空异常的现象
> UserService(): init...
> UserService(): zoneId = Asia/Shanghai
> Exception in thread "main" java.lang.NullPointerException: zone
> 	at java.base/java.util.Objects.requireNonNull(Objects.java:235)
> 	at java.base/java.time.Clock.system(Clock.java:204)
> 	at java.base/java.time.ZonedDateTime.now(ZonedDateTime.java:218)
> 	at com.work.MailService.sendMail(App.java:38)
> 	at com.work.App.main(App.java:60)
> 
> ```
>
> 上面代码中，去掉 `@EnableAspectJAutoProxy` 也就是取消 `AOP` 扫描将不会出错，但是加上会出错，这是为什么呢？仔细跟踪代码，会发现 `null` 值出现在 `MailService.sendMail()` 内部的这一行代码，用 `final` 标注的成员变量为 `null`？
>
> 1. 正常创建一个 `UserService` 的原始实例，这是通过反射调用构造方法实现的，它的行为和我们预期的完全一致。
>
> 2. 通过 `CGLIB` 创建一个 `UserService` 的子类，并引用了原始实例和 `LoggingAspect`，如果我们观察 `Spring` 创建的 `AOP` 代理，它的类名总是类似 `UserService$$EnhancerBySpringCGLIB$$1c76af9d`（`Java` 的类名实际上允许 `$` 字符）。为了让调用方获得 `UserService` 的引用，它必须继承自 `UserService`。然后，该代理类会覆写所有 `public` 和 `protected` 方法，并在内部将调用委托给原始的 `UserService` 实例。
>
>    ```java
>    public UserService$$EnhancerBySpringCGLIB extends UserService {
>        UserService target;
>        LoggingAspect aspect;
>    
>        public UserService$$EnhancerBySpringCGLIB() {
>        }
>    
>        public ZoneId getZoneId() {
>            aspect.doAccessCheck();
>            return target.getZoneId();
>        }
>    }
>    
>    ```
>
>    >   [!IMPORTANT]
>    >
>    >   补充：`CGLIB, Code Generation Library` 是一个 **开源的字节码生成库**，主要用于在运行时 **动态生成类**，实现方法拦截、代理增强等功能。在 **Spring AOP** 中，当 **被代理类没有实现接口** 时，`Spring` **默认使用 CGLIB 代理**，而不是 `JDK` 动态代理（`Spring AOP` 默认使用 `JDK` 动态代理）。
>
> 3. 如果开启了 `AOP`，用户获取 `Bean` 之前，就会出现两个 `UserService` 实例：
>
>    - 第一个 `UserService` 实例是代码中定义的原始实例，它的成员变量已经按照我们预期的方式被初始化完成
>
>    - 第二个 `UserService` 实例 `proxy` 实际上类型是 `UserService$$EnhancerBySpringCGLIB`，它引用了原始的 `UserService` 实例，用来做 `AOP` 注入时需要的调用
>
>      ```java
>      public UserService$$EnhancerBySpringCGLIB extends UserService {
>          UserService target;
>          LoggingAspect aspect;
>                
>          public UserService$$EnhancerBySpringCGLIB() {
>          }
>                
>          public ZoneId getZoneId() {
>              aspect.doAccessCheck();
>              return target.getZoneId();
>          }
>      }
>      ```
>
> 4. 等到用户从 `ApplicationContext` 中获取的 `UserService` 时，此时的实例是 `proxy`，注入到 `MailService` 中的 `UserService` 实例也是 `proxy`，都是经过代理后的类（因此存在父子类关系，`UserService$$EnhancerBySpringCGLIB` 必须时继承而来的，不然无法返回给用户模块的时候让用户模块无法察觉到注入）。
>
> 5. 那么最终的问题来了 `proxy` 实例的成员变量，也就是从 `UserService` 继承的 `zoneId`，它的值是 `null`。在 `UserService` 中执行的 `public final ZoneId zoneId = ZoneId.systemDefault()` 初始化，在 `UserService$$EnhancerBySpringCGLIB` 中并未执行，因为没必要初始化 `proxy` 的成员变量，`proxy` 的 **目的是代理方法而无关属性**。
>
> 6. 实际上，成员变量的初始化是在构造方法中完成的，和 `Cpp` 中使用初始化列表初始化有些类似。然而，对于 `Spring` 通过 `CGLIB` 动态创建的 `UserService$$EnhancerBySpringCGLIB `代理类的构造方法中，并未调用 `super()`。因此从父类继承的成员变量，包括 `final` 类型的成员变量，统统都没有初始化。
>
> 7. 尽管 `Java` 规定任何类的构造方法，第一行必须调用 `super()`，如果没有，编译器会自动加上，怎么 `Spring` 的 `CGLIB` 就可以搞特殊？这是因为自动加 `super()` 的功能是 `Java` 编译器实现的，它发现没加，就自动给加上，发现加错了，就报编译错误。但实际上，如果直接构造字节码，一个类的构造方法中，不一定非要调用 `super()`。`Spring` 使用 `CGLIB` 构造的 `Proxy` 类，是直接生成字节码，并没有源码-编译-字节码这个步骤，因此需要强调 `Spring` 通过 `CGLIB` 创建的代理类，不会初始化代理类自身继承的任何成员变量，包括 `final` 类型的成员变量！
>
> 8. 解决方法也简单，不要直接访问 `UserService$$EnhancerBySpringCGLIB` 继承过来的字段，而是使用方法来访问，方法内会先调用 `aspect.doAccessCheck();` 满足 `AOP` 后再执行 `return target.getZoneId()`，这个时候就可以获取到第一个 `UserService` 实例的字段而不是第二个实例继承来的字段。
>
> 9. 如果在 `MailService` 中，调用的不是 `getZoneId()`，而是 `getFinalZoneId()`，又会出现 `NullPointerException`，这是因为，代理类无法覆写 `final` 方法（这一点绕不过 `JVM` 的 `ClassLoader` 检查），该方法返回的其实就是是代理类继承下来的 `zoneId` 字段，即 `null`（无法覆盖的原因是 `Java` 的 `final` 关键字本身就是不希望父类的属性或方法被子类改动，只能被子类继承来使用）。
>
> 因此如果不希望自己的 `AOP` 出现问题，必须保证：
>
> - 访问被注入的 `Bean` 时，总是调用方法而非直接访问字段
> - 编写 `Bean` 时，如果可能会被代理，就不要编写 `public final` 方法，因为无法覆盖

#### 3.1.4.访问数据

##### 3.1.4.1.问题所在

几乎所有的现代程序都需要访问数据，因此 `Spring` 也做了极大的努力。

-   提供简化的访问 `JDBC` 的模板类 `JdbcTemplate`，不必手动释放资源，减少 `try-catch` 的使用，并且在获取链接后操作数据库的书写要规范和整洁许多。并且把 `SQLException` 封装为 `DataAccessException`，这个异常是一个 `RuntimeException`，并且让我们能区分 `SQL` 异常的原因，例如，`DuplicateKeyException` 表示违反了一个唯一约束。并且可以根据异常和事务注解快速回滚事务；
-   提供了一个统一的 `DAO` 类以实现 `Data Access Object` 模式，也就是“数据访问对象”，可以更快屏蔽数据访问层，做到更快数据操作抽象。其核心类就是 `JdbcTemplate` 和 `JdbcDaoSupport`。因此 `Spring` 提供了 `JdbcDaoSupport` 来便于我们实现 `DAO` 模式，注意只是“便于”，不是直接提供了实现；
-   能方便地集成 `JPA、Hibernate、MyBatis` 这些数据库访问框架；

![image-20250326103239953](./assets/image-20250326103239953.png)

到这里我们开启了 `IoC` 和 `AOP` 的大门，我们此时依靠这两个工具将大大简化我们的代码，我们先把我们之前使用 `JDBC` 的代码搬出来，然后用 `Spring Framework` 的方式来重写。

```java
// App.java
package com.work;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.HikariPoolMXBean;

import java.sql.*;

public class App {
    public static void main(String[] args) {
        System.out.println("Hello JDBC!");

        // 1. 获取链接
        /*
        Connection 代表一个 JDBC 连接, 其实就是获得 Java 程序和 MySQL 直接的 TCP 连接
        因此打开一个 Connection 时, 需要准备 url、user、passwd(根据厂家规定来设置), 这样才能成功连接
        而连接到数据库的本 Java 程序其实也被叫做 MySQL 的客户端
        */
        String JDBC_URL = "jdbc:mysql://localhost:3306/work_jdbc_test";
        String JDBC_USER = "limou";
        String JDBC_PASSWORD = "123456";

        /* 这里新添加了连接池的设置, 改用连接池的方式来管理 MySQL */
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(JDBC_URL);
        config.setUsername(JDBC_USER);
        config.setPassword(JDBC_PASSWORD);
        config.setMaximumPoolSize(10); // 本链接池最多允许的链接数为 10 个, 这一句代码和 config.addDataSourceProperty("maximumPoolSize", "10") 等价, 但是直接写字符串过于灵活有可能难以维护
        config.setMinimumIdle(2); // 本链接池最少存在的链接接数为 2 个
        config.setIdleTimeout(60000); // 如果链接空闲超时 60 秒就会被销毁无法再次被复用
        config.setConnectionTimeout(1000); // 无法获得链接超时 1 秒时就会抛出异常, 以提示本链接池中链接资源紧缺, 超出最大的设置值

        // 创建 DataSource 也是一个非常昂贵的操作, 所以通常 DataSource 实例总是作为一个全局变量存储, 并贯穿整个应用程序的生命周期
        try (HikariDataSource hkds = new HikariDataSource(config)) {
            // try 可以确保执行完毕后自动将比较昂贵的 conn 链接释放, 下面的 try 也是类似
            try (
                    Connection conn = hkds.getConnection()
                    // Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)
            ) {
              // 2. 操作链接
            }
            catch (SQLException e) {
                System.out.println("Error connecting to database: " + e.getMessage());
            }
        }
        catch (Exception e) {
            System.out.println("Error creating hikariDataSource: " + e.getMessage());
        }
    }
}

```

可以看到我们需要使用 `HikariConfig` 进行配置，并且将配置传递给 `HikariDataSource` 实例，然后从中获取 `Connection` 实例。

##### 3.1.4.2.解决方案

###### 3.1.4.2.1.简化操作数据持久

接下来我们简化上述的核心代码。

```sql
-- work-jdbc-test.sql
-- 创建数据库 work-jdbc-test
DROP DATABASE IF EXISTS work_jdbc_test; -- 这里故意在数据库存在时直接删除整个数据库, 方便我们进行重复的调试
CREATE DATABASE work_jdbc_test;

-- 创建一个登录用户
CREATE USER IF NOT EXISTS limou@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON work_jdbc_test.* TO limou@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- 创建表 students
USE work_jdbc_test;
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    gender TINYINT(1) NOT NULL,
    grade INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY(id)
) Engine=INNODB DEFAULT CHARSET=UTF8;

-- 插入初始数据
INSERT INTO students (name, gender, grade, score) VALUES ('小明', 1, 1, 88);
INSERT INTO students (name, gender, grade, score) VALUES ('小红', 1, 1, 95);
INSERT INTO students (name, gender, grade, score) VALUES ('小军', 0, 1, 93);
INSERT INTO students (name, gender, grade, score) VALUES ('小白', 0, 1, 100);
INSERT INTO students (name, gender, grade, score) VALUES ('小牛', 1, 2, 96);
INSERT INTO students (name, gender, grade, score) VALUES ('小兵', 1, 2, 99);
INSERT INTO students (name, gender, grade, score) VALUES ('小强', 0, 2, 86);
INSERT INTO students (name, gender, grade, score) VALUES ('小乔', 0, 2, 79);
INSERT INTO students (name, gender, grade, score) VALUES ('小青', 1, 3, 85);
INSERT INTO students (name, gender, grade, score) VALUES ('小王', 1, 3, 90);
INSERT INTO students (name, gender, grade, score) VALUES ('小林', 0, 3, 91);
INSERT INTO students (name, gender, grade, score) VALUES ('小贝', 0, 3, 77);

```

```xml
<!-- pom.xml -->
<!--
 'xmlns=' XML 命名空间
 'xmlns:xsi' XML Schema 实例命名空间
 'xsi:schemaLocation=' 指定 XML Schema 位置
 这些声明的主要作用是帮助 XML 解析器正确地验证和处理 Maven POM 文件，确保它符合 Maven 规范。
 -->
<project
        xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"
>
  <!-- 指定 Maven 项目对象模型 POM 的版本 -->
  <modelVersion>4.0.0</modelVersion>
  <!-- 定义项目的所属组织 -->
  <groupId>com.work</groupId>
  <!-- 定义项目的具体名称 -->
  <artifactId>work-spring-framework-test</artifactId>
  <!-- 填写依赖的 Java 版本和使用的字符集 -->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
  </properties>
  <!-- 指定项目构建的打包类型为 .jar -->
  <packaging>jar</packaging>
  <!-- 定义项目的版本号 -->
  <version>0.1.0</version>
  <!-- 和 artifactId 的名称保持一样即可(这是一个可选字段) -->
  <name>work-spring-framework-test</name>
  <!-- 填写为本项目制定的官方网址 -->
  <url>https://work.com</url>
  <!-- 填写所有依赖项的容器, 在内部填写一个一个 dependency 标签 -->
  <dependencies>
    <!-- 依赖名称: 依赖官网/依赖源码 -->

    <!-- junit(测试框架): https://junit.org/junit5/ -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.9.3</version>
      <scope>test</scope> <!-- 如果不指定 scope 会默认将依赖设置为 compile 生命阶段, 因此设置 scope 本质是确保某些依赖只在某个阶段被使用 -->
    </dependency>

    <!-- spring-context(IoC 支持): https://spring.io/projects/spring-framework#learn -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.0.0</version>
    </dependency>

    <!-- spring-aspects(AOP 支持): https://mvnrepository.com/artifact/org.springframework/spring-aspects -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>6.0.0</version>
    </dependency>

    <!-- jakarta-annotation-api(提供某些额外的通用注解) -->
    <dependency>
      <groupId>jakarta.annotation</groupId>
      <artifactId>jakarta.annotation-api</artifactId>
      <version>2.1.1</version>
    </dependency>

    <!-- mysql-jdbc(引入 mysql 对 jdbc 的支持): https://central.sonatype.com/artifact/com.mysql/mysql-connector-j -->
    <dependency>
      <groupId>com.mysql</groupId>
      <artifactId>mysql-connector-j</artifactId>
      <version>9.2.0</version>
      <scope>runtime</scope>
    </dependency>

    <!-- spring-jdbc(优化对 jdbc 的操作) -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>6.0.0</version>
    </dependency>

    <!-- hikari-cp(mysql 链接池组件): https://mvnrepository.com/artifact/com.zaxxer/HikariCP -->
    <dependency>
      <groupId>com.zaxxer</groupId>
      <artifactId>HikariCP</artifactId>
      <version>6.2.1</version>
    </dependency>

    <!-- SLF4J(日志接口规范): https://github.com/qos-ch/slf4j -->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.36</version>
    </dependency>

    <!-- logback(日志接口实现): https://github.com/qos-ch/logback -->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.10</version>
    </dependency>

  </dependencies>
  <!-- 构建插件 -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.1.0</version>
        <configuration>
          <archive>
            <manifestEntries>
              <!-- 填写启动类 -->
              <Main-Class>com.work.App</Main-Class>
            </manifestEntries>
          </archive>
          <descriptorRefs>
            <!-- 集成的最终 .jar 包名称 -->
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
        </configuration>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>

```

```properties
# jdbc.properties
jdbc.url=jdbc:mysql://localhost:3306/work_jdbc_test
jdbc.username=limou
jdbc.password=123456

```

```java
// App.java
package com.work;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

// 数据库连接池配置
@Configuration
@PropertySource("classpath:jdbc.properties")
class DataConfig {
    @Value("${jdbc.url}")
    private String jdbcUrl;

    @Value("${jdbc.username}")
    private String jdbcUsername;

    @Value("${jdbc.password}")
    private String jdbcPassword;

    // 创建 HikariDataSource Bean
    @Bean
    DataSource createDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(jdbcUsername);
        config.setPassword(jdbcPassword);
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setIdleTimeout(60000);
        config.setConnectionTimeout(1000);

        return new HikariDataSource(config);
    }

    // 创建 JdbcTemplate 实例, 不再需要创建链接
    @Bean
    JdbcTemplate createJdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    // 手动创建事务管理器
    @Bean
    PlatformTransactionManager createTxManager(@Autowired DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
        // 另外一个 @EnableTransactionManagement 注解也可以开启事务管理(自动), 并且更加通用, 上面的手动方式仅适合 JDBC 的事务管理器, 不适用于 JPA、JTA 的事务管理器
        // 不过无论是手动还是自动, 一旦启动就可以使用注解 @Transactional 标识类内所有方法或指定方法开启事务
        // 为什么使用 PlatformTransactionManager 作为事务管理器而不直接使用 TransactionStatus 呢? 因为 Spring 考虑了多种事务, 包括 分布式事务 JTA, 为了同时支持 JDBC 事务和 JTA 事务, 就抽象了 PlatformTransactionManager
    }
}

// 用户实体类
class Student {
    private long id;
    private String name;

    public Student() {}

    public Student(long id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{id=" + id + "', name='" + name + "'}";
    }
}

// 用户服务类
@Component
// @Transactional 加到这里开启事务就会让所有的类内方法都开启事务
class UserService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    // 查询单个用户
    @Transactional // 开启事务
    public Student getStudentById(long id) {
        // jdbcTemplate.execute 提供了 JDBC 的 Connection 供我们使用
        /* 链接实例自动创建
        return jdbcTemplate.execute((Connection conn) -> {
            try (PreparedStatement ps = conn.prepareStatement("SELECT * FROM students WHERE id = ?")) {
                ps.setObject(1, id);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        return new Student(
                            rs.getLong("id"),
                            rs.getString("name")
                        );
                    }
                    throw new RuntimeException("Student not found by id: " + id);
                }
            }
        });
        */

        /* 链接实例直接去掉, 语句实例自动创建
        return jdbcTemplate.execute("SELECT * FROM students WHERE id = ?", (PreparedStatement ps) -> {
            ps.setObject(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Student(
                            rs.getLong("id"),
                            rs.getString("name")
                    );
                }
                throw new RuntimeException("Student not found by id: " + id);
            }
        });
        */

        /* 链接实例直接去掉, 语句实例直接去掉, 返回集合自动创建  */
        return jdbcTemplate.queryForObject(
            "SELECT * FROM students WHERE id = ?",
            (ResultSet rs, int rowNum) -> {
                System.out.println("Processing row: " + rowNum);
                return new Student(
                        rs.getLong("id"),
                        rs.getString("name")
                );
            },
            id
        );
    }

    // 查询多个用户
    @Transactional // 开启事务
    public List<Student> getStudentsByGender(long gender) {
        /* 如果需要返回多个记录可以使用 BeanPropertyRowMapper<>, 但是记录元素类型(这里是指 Student)需要实现无参构造方法, 但是有记忆负担, 因此我推荐下面的写法
        return jdbcTemplate.query("SELECT * FROM students WHERE gender = ?", new BeanPropertyRowMapper<>(Student.class), gender);
        */

        /* 推荐写法 */
        return jdbcTemplate.query("SELECT * FROM students WHERE gender = ?", (ResultSet rs, int rowNum) -> {
            System.out.println("Processing row: " + rowNum);
            return new Student(
                rs.getLong("id"),
                rs.getString("name")
            );
        }, gender);
    }

    // 修改用户(更新)
    @Transactional // 开启事务
    public void updateStudentIsMod(Long selectId, String rename) {
        // 传入SQL，SQL参数，返回更新的行数:
        if (1 != jdbcTemplate.update("UPDATE students SET name = ? WHERE id = ?", rename, selectId)) { // 可以把这个 1 改为 0 测试是否会发生事务回滚
            throw new RuntimeException("Student not found by id"); // 如果没有更新任何行则抛出异常
        }
        // else {
        // ...
        // }
    }

    // 修改用户(添加)
    public void updateStudentIsAdd(String name, String gender, String grade, String score) {
        // 创建一个KeyHolder:
        KeyHolder holder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> { // 只能这么写
            PreparedStatement ps = connection.prepareStatement("INSERT INTO students (name, gender, grade, score) VALUES(?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);
            ps.setString(2, gender);
            ps.setString(3, grade);
            ps.setString(4, score);
            return ps;
        }, holder);

        Number generatedId = holder.getKey();
        if (generatedId != null) {
            System.out.println("Generated ID: " + generatedId);
        }
    }

    // 至此整个过程中, 使用 Connection、PreparedStatement、ResultSet 都不需要我们自己手动管理, 并在执行完成后关闭它们, 无需使用过多的 try-catch 就是 Spring JDBC 的优势
    // 在不复杂的 SQL 环境中, 直接使用 Spring JDBC 比使用 Mybatis 要好一些; 但是在复杂的 SQL 环境中, 使用 Mybatis 更好一些
}

// Spring 扫描
@ComponentScan
class AppConfig {
}

// 主应用程序
public class App {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class, DataConfig.class);

        UserService userService = context.getBean(UserService.class);

        // 查询 students 表中的用户
        try {
            Student student = userService.getStudentById(1L);
            System.out.println("Found student: " + student);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        // 查询 students 表中的用户
        try {
            List<Student> students = userService.getStudentsByGender(0);
            System.out.println("Found number of students: " + students.size());
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        // 修改 students 表中的用户
        try {
            userService.updateStudentIsMod(1L, "limou");
            System.out.println("Updated student");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        // 添加 students 表中的用户
        try {
            userService.updateStudentIsAdd("dimou", "0", "1", "100");
            System.out.println("Added student");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}

```

>   [!IMPORTANT]
>
>   补充：实际上，`Transactional` 可以不用注解的方式，而是使用手动生命实例的方式，不过这种不常用...
>
>   默认情况下，如果发生了 `RuntimeException`，`Spring` 的声明式事务将自动回滚。如果要针对 `Checked Exception` 回滚事务，需要在 `@Transactional` 注解中写出来。
>
>   ```java
>   @Transactional(rollbackFor = {RuntimeException.class, IOException.class})
>   public buyProducts(long productId, int num) throws IOException {
>    ...
>   }
>   ```
>
>   为了简化代码，我们强烈建议业务异常体系从 `RuntimeException` 派生，这样就不必声明任何特殊异常即可让 `Spring` 的声明式事务正常工作。
>
>   对于方法来说，使用 `@Transactional` 事务的开启和结束是非常明确的（即所谓的“事务边界”），就是函数体的花括号范围内。但是如果出现事务嵌套怎么办（两个方法都有事务，并且其中一个方法调用了另外一个方法）？要解决这种问题，就需要定义事务的传播模型。
>
>   `Spring` 的声明式事务为事务传播定义了几个级别，默认传播级别就是 `REQUIRED`，它的意思是，如果当前没有事务，就创建一个新事务，如果当前有事务，就加入到当前事务中执行。除此以外还有一些其他的级别：
>
> -   `SUPPORTS`：表示如果有事务，就加入到当前事务，如果没有，那也不开启事务执行。这种传播级别可用于查询方法，因为 `SELECT` 语句既可以在事务内执行，也可以不需要事务；
>-   `MANDATORY`：表示必须要存在当前事务并加入执行，否则将抛出异常。这种传播级别可用于核心更新逻辑，比如用户余额变更，它总是被其他事务方法调用，不能直接由非事务方法调用；
> -   `REQUIRES_NEW`：表示不管当前有没有事务，都必须开启一个新的事务执行。如果当前已经有事务，那么当前事务会挂起，等新事务完成后，再恢复执行；
>   -   `NOT_SUPPORTED`：表示不支持事务，如果当前有事务，那么当前事务会挂起，等这个方法执行完成后，再恢复执行；
>    -   `NEVER`：和 `NOT_SUPPORTED` 相比，它不但不支持事务，而且在监测到当前有事务时，会抛出异常拒绝执行；
>   -   `NESTED`：表示如果当前有事务，则开启一个嵌套级别事务，如果当前没有事务，则开启一个新事务。
> 
>   使用时类似 `@Transactional(propagation = Propagation.REQUIRES_NEW)` 这样调整不同的级别。
>
>  `Spring` 是怎么发现事务的呢？首先事务是使用了 `JDBC` 实现，因此在引入 `JDBC` 的时候，就说明 `Spring` 的事务也是采用了 `JDBC` 来实现的。
>
>   首先我们需要知道核心的 `JDBC` 事务写法：
>
>   ```java
>   Connection conn = openConnection();
>   try {
>       // 关闭自动提交:
>       conn.setAutoCommit(false);
>       // 执行多条SQL语句:
>       insert(); update(); delete();
>       // 提交事务:
>       conn.commit();
>   } catch (SQLException e) {
>       // 回滚事务:
>       conn.rollback();
>   } finally {
>       conn.setAutoCommit(true);
>       conn.close();
>   }
>   
>   ```
>
>   一个事务方法，是如何知道当前是否有事务？答案是使用了 `ThreadLocal`，也就是说 `Spring` 总是把和 `JDBC` 相关的会话链接 `Connection` 和事务实例 `Transactional` 绑定到 `ThreadLocal` 中。因此事务传播的前提是方法调用在一个线程内才可以，因此下面的代码将会创建两个完全独立的事务而不会合并到一起。
>
>   ```java
>   @Transactional
>   public User register(String email, String password, String name) { // BEGIN TX-A
>       User user = jdbcTemplate.insert("...");
>       new Thread(() -> {
>           // BEGIN TX-B:
>           bonusService.addBonus(user.id, 100);
>           // END TX-B
>       }).start();
>   } // END TX-A
>   
>   ```

###### 3.1.4.2.2.便于数据访问对象

还有一个重要的解决方案就是关于 `DAO` 层的简化，实际上我们有了 `JdbcTemplate` 后，实现一个自己的 `DAO` 层很简单，核心代码如下：

```java
public class UserDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    User getById(long id) {
        ...
    }

    List<User> getUsers(int page) {
        ...
    }

    User createUser(User user) {
        ...
    }

    User updateUser(User user) {
        ...
    }

    void deleteUser(User user) {
        ...
    }
}

```

不过由于 `Spring` 提供了 `JdbcDaoSupport` 类，就不用我们关心 `JdbcTemplate` 的具体注入。但其实只是使用者不用关心，我们自己还是续要注入的，使用 `JdbcTemplate` 只不过让 `DAO` 层的开发更加规范一些，`JdbcDapSupport` 内部的核心内容如下：

```java
public abstract class JdbcDaoSupport extends DaoSupport {

    private JdbcTemplate jdbcTemplate;

    public final void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        initTemplateConfig();
    }

    public final JdbcTemplate getJdbcTemplate() {
        return this.jdbcTemplate;
    }

    ...
}

```

为什么 `Spring` 不自己注入 `JdbcTemplate` 呢？因为 `JdbcTemplate` 依赖 `DataSource` 进行初始化，`Spring` 无法确定用户的 `JDBC` 操作的是哪一种数据库方案，因此就只能提供方法让用户自己设置一个 `JdbcTemplate` 于 `JdbcDaoSupport` 中，一般会像下面这样使用。

```java
public abstract class AbstractDao extends JdbcDaoSupport {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct // 该注解使其在依赖注入完成后自动执行，通常用于初始化操作
    public void init() {
        super.setJdbcTemplate(jdbcTemplate); // 这里就是注入 jdbcTemplate 依赖后就自动把父类中的 JdbcTemplate 给设置好
    }
}

@Component
@Transactional
public class UserDao extends AbstractDao {
    public User getById(long id) {
        return getJdbcTemplate().queryForObject(
                "SELECT * FROM users WHERE id = ?",
                new BeanPropertyRowMapper<>(User.class),
                id
        );
    }
    ...
}

```

稍微实践一下如下。

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import javax.annotation.PostConstruct;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

// 用户实体类
class User {
    int id;
    String name;
    int age;

    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', age=" + age + "}";
    }
}

// 用户对象映射
class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new User(rs.getInt("id"), rs.getString("name"), rs.getInt("age"));
    }
}

// 省略配置过程...

// 统一封装 JdbcDaoSupport，简化 JdbcTemplate 访问
public abstract class AbstractDao extends JdbcDaoSupport {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init() {
        super.setJdbcTemplate(jdbcTemplate);
    }

    // 提供便捷方法，避免每次 getJdbcTemplate()
    protected JdbcTemplate jdbc() {
        return getJdbcTemplate();
    }
}

// UserDao 继承 AbstractDao，无需再手动注入 JdbcTemplate
@Repository
class UserDao extends AbstractDao {

    // 查询所有用户
    public List<User> getAllUsers() {
        return jdbc().query("SELECT id, name, age FROM users", new UserRowMapper());
    }

    // 查询单个用户
    public User getUserById(int id) {
        return jdbc().queryForObject("SELECT id, name, age FROM users WHERE id = ?",
                new Object[]{id}, new UserRowMapper());
    }

    // 插入用户
    public void addUser(String name, int age) {
        jdbc().update("INSERT INTO users (name, age) VALUES (?, ?)", name, age);
    }

    // 删除用户
    public void deleteUser(int id) {
        jdbc().update("DELETE FROM users WHERE id = ?", id);
    }
}

```

###### 3.1.4.2.3.集成实体映射框架

在使用 `JdbcTemplate` 的时候，我们用得最多的方法就是 `List<T> query(String, RowMapper, Object...)` 这一类查询的方法。如果我们没有传入实体类，就需要我们自己进行手动映射，把处理好的 `RowMapper` 传入进去。这个 `RowMapper` 参数的的作用就是把 `ResultSet` 的一行记录映射为 `Java Bean`。不过有些框架可以帮我们做到这类事情。

>   [!IMPORTANT]
>
>   补充：稍微整理一下。
>
>   -   数据实体层：描述数据对象 `Entity`
>   -   数据映射层：操作数据源头 `JdbcTemplate、RowMapper、JdbcDaoSupport`
>   -   持久访问层：屏蔽操作后的封装服务 `Service`

映射层这里主要有几个框架，主要就是 `Hibernate` 和 `MyBatis`，而这两个框架直接看文档即可，并且在现代的编码过程中都是直接接入到 `Spring Boot` 中的，并不推荐直接原生使用。

> [!IMPORTANT]
>
> 补充：这里完整阐述一下 `Spring` 的模块：
>
> - **Core Container（控制反转）**：
>   - **Spring Core**：提供了控制反转和依赖注入的实现，所有其他 `Spring` 模块的基础，别的模块都会依赖此模块。
>   - **Spring Beans**：负责管理Bean的定义和生命周期。通过IoC容器完成Bean的创建、依赖注入、初始化、销毁等操作。
>   - **Spring Context**：基于Core和Beans的高级容器，提供了类似JNDI的上下文功能，还包含了国际化、事件传播、资源访问等功能。
>   - **Spring Expression Language**：一个强大的表达式语言，用于在运行时查询和操作对象的值。
> - **AOP（面向切面）**：
>   - **Spring AOP**：提供面向切面编程的功能，可以在方法执行前后或抛出异常时动态插入额外的逻辑，比如日志记录、权限验证、事务管理等。
> - **Data Access（数据访问）**：
>   - **Spring JDBC**：简化了原生JDBC的操作，提供模板方法来管理连接、资源的释放和异常处理。
>   - **Spring ORM**：支持与主流ORM框架（如Hibernate、JPA、MyBatis等）集成，简化持久层开发。
>   - **Spring Transaction（事务管理）**：提供声明式和编程式的事务管理机制，与数据库操作密切结合。
> - **Web 层（网络编程）**：
>   - **Spring Web**：提供基础的Web开发支持，包括Servlet API的集成，适用于构建MVC架构。
>   - **Spring MVC**：实现了Model-View-Controller（MVC）模式的框架，用于构建基于HTTP请求的Web应用。它是一个常用的模块，支持注解驱动的Web开发。
>   - **Spring WebFlux**：提供基于Reactive Streams的响应式编程模型，专为高并发的异步非阻塞请求设计。
> - **Spring 的其他模块（扩展模块）****Spring Batch****：用于批处理的框架，支持大规模数据的处理与分块执行。**
>   - **Spring Integration**：提供消息驱动的应用程序集成方案，适用于构建企业集成架构（EAI）。**
>   - **Spring Cloud**：用于构建微服务架构的模块集合，支持分布式系统中的服务注册、配置管理、服务调用等功能。

### 3.2.深入知识

#### 3.2.1.循环依赖

循环依赖是指两个或多个模块、类、组件之间相互依赖，形成一个闭环。简而言之，模块 `A` 依赖于模块 `B`，而模块 `B` 又依赖于模块 `A`，这会导致依赖链的循环，无法确定加载或初始化的顺序。用最小的代码演示如下：

```java
@Service
public class A {
    @Autowired
    private B b;
}

@Service
public class B {
    @Autowired
    private A a;
}

// 或者自己依赖自己
@Service
public class A {
    @Autowired
    private A a;
}

```

而在 `Spring` 系列中常见的依赖循环就是 `Bean` 的使用不单导致依赖循环：某些 `Bean 1` 需要依赖别的 `Bean 1` 才能使用，但是 `Bean 2` 也依赖 `Bean 1` 才能使用。此时这种循环依赖会产生问题，例如 `Bean 1` 要依赖 `Bean 2`，发现 `Bean 2` 还没创建，于是开始创建 `Bean 2`，创建的过程发现 `Bean 2` 要依赖 `Bean 1`， 而 `Bean 1` 还没创建好，因为它要等 `Bean 2` 创建好...

那么如何解决这个问题呢？当项目量一旦大起来，不能指望开发者清晰每一个 `Bean` 的顺序，一般解决依赖循环的方案是使用三级缓存。

- 一级缓存: 用于存储完全初始化完成的单例 `Bean`
- 二级缓存: 用于存储尚未完全初始化，但已实例化的 `Bean`，用于提前暴露对象，避免循环依赖问题
- 三级缓存: 用于存储对象工厂，当需要时可以通过工厂创建早期 `Bean`（特别是为了支持 `AOP` 代理对象的创建）

> [!IMPORTANT]
>
> 补充：工厂就是一个类或接口，需要实现对于某个对象的构造方法，是比构造方法更加通用的构造思路。

先只考虑二级缓存为我们带来了什么。

1. 怎么解释呢？首先我们必须保证要创建的 `Bean A` 和 `Bean B` 都是单例
2. 创建 `Bean A` 的时候，原本是需要直接放入到一级缓存中的（这里都是被完全创建好的 `Bean`）
3. 但是 `Spring` 初始化 `Bean A` 的时候发现，`Bean A` 内部依赖的 `b` 对象需要使用 `Bean B` 来注入
4. 因此 `Spring` 把 `Bean A` 的还没有完全初始化的单例放进了二级缓存中（这里都是半成品的 `Bean`）
5. 然后尝试创建并且初始化 `Bean B`（毕竟如果 `Bean B` 不依赖 `Bean A` 的话事情不就简单多了），可惜初始化 `Bean B` 属性的时候发现，内部依赖的 `a` 需要注入 `Bean A`，不过我们可以使用二级缓存中的半成品 `Bean A` 来提前注入
6. 而注入的这一瞬间，由于 `Bean A` 和 `Bean B` 都是单例对象，因此 `Bean B` 在注入 `a` 完成初始化的一瞬间 `Bean A` 也完成了完整的初始化，因为 `Bean A` 自己和 `Bean B` 中的 `a` 是同一个单例
7. 这样我们使用二级缓存就可以解决循环依赖的问题，最终我们得到了可以直接使用的 `Bean A` 和 `Bean B`，并且 `Bean A` 内部的属性 `b` 引用的就是 `Bean B`，`Bean B` 内部的属性 `a` 引用的就是 `Bean A`
8. 到这里我们使用二级缓存就解决了基本的循环依赖的问题

> [!IMPORTANT]
>
> 补充：补充：单例和原型是相对的概念
>
> - 单例（`@Scope("singleton")`）
>   - `Spring` 容器只创建一次，`Bean` 最终存在于一级缓存中
>   - 每次 `getBean()` 返回的都是同一个对象
>   - 适合无状态、线程安全的对象
>   - 生命周期由 `Spring` 管理，创建和销毁都管
>   - 注入时立即创建，除非懒加载
> - 原型（`@Scope("prototype")`）
>   - 每次 `getBean()` 都会新建一个对象实例
>   - 不会放入一级缓存，也不会参与 `Bean` 生命周期的完整流程
>   - 只负责创建，不负责销毁
>   - 容器不会管理其生命周期（比如不会调用 `@PreDestroy` 这种钩子）
>
> `@Bean` 默认就是单例作用域，行为等同于 `@Scope("singleton")`。但您也可以配合 `@Scope("prototype")` 修改它的作用域。

可以发现我们解决循环依赖的大前提就是单例，如果连这个要求都无法满足，那么就会导致无法解决。到目前为止好像二级缓存就足够了，不过我们还没有考虑到 `AOP` 的问题，当我们要给某个对象设置代理时，那么放入一级缓存的是该对象，还是它的代理呢？当然是代理。因为我们想让整个应用中拿到的都是代理对象，而不是原始对象，想想代理对象的目的是什么！

这个时候我们就需要提到我们的三级缓存了，我们引入存在代理依赖的场景来分析为什么二级缓存有缺陷：

1. 怎么解释呢？首先我们必须保证要创建的 `Bean A` 和 `Bean B` 都是单例
2. 创建 `Bean A` 的时候，原本是需要直接放入到一级缓存中的（这里都是被完全创建好的 `Bean`）
3. 但是 `Spring` 初始化 `Bean A` 的时候发现，`Bean A` 内部依赖的 `b` 对象需要使用 `Bean B` 来注入
4. 因此 `Spring` 把 `Bean A` 的还没有完全初始化的单例放进了二级缓存中（这里都是半成品的 `Bean`）
5. 然后尝试创建并且初始化 `Bean B`（毕竟如果 `Bean B` 不依赖 `Bean A` 的话事情不就简单多了），可惜初始化 `Bean B` 属性的时候发现，内部依赖的 `a` 需要注入 `Bean A`，不过我们可以使用二级缓存中的半成品 `Bean A` 来提前注入
6. 而注入的这一瞬间，由于 `Bean A` 和 `Bean B` 都是单例对象，因此 `Bean B` 在注入 `a` 完成初始化的一瞬间 `Bean A` 也完成了完整的初始化，因为 `Bean A` 自己和 `Bean B` 中的 `a` 是同一个单例
7. 这样我们使用二级缓存就可以解决循环依赖的问题，最终我们得到了可以直接使用的 `Bean A` 和 `Bean B`，并且 `Bean A` 内部的属性 `b` 引用的就是 `Bean B`，`Bean B` 内部的属性 `a` 引用的就是 `Bean A`
8. 到这里我们使用二级缓存就解决了基本的循环依赖的问题
9. 考虑到 `AOP` 的问题，我们垂死梦中惊坐起！猛的回头发现 `Bean A` 是个代理对象，而 `AOP` 是在解决了循环依赖后继续初始化的时候实现的，此时 `Bean A` 被 `AOP` 代理了。这没什么问题，毕竟当我们要给某个对象设置代理时，放入一级缓存理应是代理。因为我们想让整个应用中拿到的都是代理对象，而不是原始对象，想想代理对象的目的是什么，不就是为了屏蔽创建的细节么
10. 但是！出问题了，`Bean B` 中从二级缓存获取到的半成品 `Bean A` 没有通过 `AOP` 就称为了 `Bean B` 的属性 `a`，这不符合我们代理的要求！

因此我们需要在放入二级缓存之前就提前做 `AOP` 才行，我们重新来一遍：

1. 怎么解释呢？首先我们必须保证要创建的 `Bean A` 和 `Bean B` 都是单例
2. 创建 `Bean A` 的时候，原本是需要直接放入到一级缓存中的（这里都是被完全创建好的 `Bean`）
3. 但是 `Spring` 初始化 `Bean A` 的时候发现，`Bean A` 内部依赖的 `b` 对象需要使用 `Bean B` 来注入
4. 因此 `Spring` 把 `Bean A` 的还没有完全初始化的单例放进了三级缓存中，这次我们用三级缓存存储原始对象半成品
5. 然后尝试创建并且初始化 `Bean B`（毕竟如果 `Bean B` 不依赖 `Bean A` 的话事情不就简单多了），可惜初始化 `Bean B` 属性的时候发现，内部依赖的 `a` 需要注入 `Bean A`，不过我们可以使用三级缓存中的半成品 `Bean A`，**不过这次需要提前把 Bean A 做好 AOP 后**，就可以把 `Bean A` 放入二级缓存中，然后再来提前注入到 `Bean B` 中
6. 而注入的这一瞬间，由于 `Bean A` 和 `Bean B` 都是单例对象，因此 `Bean B` 在注入 `a` 完成初始化的一瞬间 `Bean A` 也完成了完整的初始化，因为 `Bean A` 自己和 `Bean B` 中的 `a` 是同一个单例，并且还都是 **代理后的对象**！
7. 到此现有的三级缓存理论就具备了

另外虽然没有明确说，在 `Spring` 中创建 `Bean` 分三步，不过您通过上面的创建过程多少能够察觉到：

1. 实例化，`createBeanInstance`，就是 `new` 了个对象，属性还没动，不过这个阶段会发生构造器注入
2. 属性注入，`populateBean`，就是 `set` 一些属性值（比如通过注解注入）
3. 初始化，`initializeBean`，执行一些 `aware` 接口中的方法，`initMethod`，`AOP` 代理等

而全构造器注入就是把所有的属性都依赖实例化阶段的全使用构造器注入，而我们的三级缓存机制不会允许您全使用构造器注入属性依赖，因为此时缓存中没有任何可用来注入的属性依赖。因此这个小 `Bug` 就需要进一步修正：不允许您全部使用构造器注入，但是部分依赖使用构造器是允许的。

并且不允许 `AOP` 后的对象存在二级缓存中，因为违背 `Bean` 在上面提到的生命周期顺序。

而且在稍微补充一下，当所有的 `Bean` 都存储到一级缓存后，二、三级缓存都会清空不会发生数据冗余堆积。

> [!CAUTION]
>
> 警告：不过好玩的是 `springboot 2.6` 默认禁止了循环依赖，但是这种解决循环依赖的方式值的我们用到别处不是么...

