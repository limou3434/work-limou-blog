# Spring Framework 快速入门

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

#### 3.1.1.控制反转

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

这里因为引入了 `IoC`，就会产生了几个新的事物：

-   `IoC` 容器：解决六个组件问题
-   `Spring Bean` 组件：也就是组件依赖的别称，配置一个组件就是配置一个 `Bean`
-   `.xml` 配置：配置需要提示容器实例化组件，依赖关系等

正常来说，我们有两种依赖注入方法：

-   使用 `set()` 封装依赖注入，这也是最为常规的做法，只解决少量组件问题，但只有侵入（需要实现特定接口）
-   使用 `IoC` 这种无侵入容器，这连组件自己都不知道自己运行在容器中，测试不依赖容器，且无需侵入（不需实现特定接口）

我们可以尝试装载一个 `Bean` 试试，直接使用 `Maven` 创建一个 `Java` 项目然后引入 `org.springframework:spring-context:6.0.0` 进行手动配置即可，不要使用 `spring initializr` 然后禁用自动化配置这种方式（太复杂还需要学习更多的东西）。

```shell
创建项目以及目录结构
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
  <name>work-project</name>
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

以上我们就完成了一个 `Bean` 的装载，可以看到我们使用 `.xml` 文件达成了不使用 `new` 的目的，不过现代的 `Spring` 项目采用注解来配置，不再需要自己手动编写 `.xml` 文件。

把上述 `XML` 配置文件用 `Java` 代码写出来，就像这样：

```java
// 核心等价代码
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

-   使用 `@Component` 来创建一个 `Baen`，使用 `@Autowired` 来标明注入字段，或者用 `@Autowired 字段类型 函数参数` 来标明注入参数（可以用在构造方法和 `setter` 中，另外 `Spring 4.3` 之后，如果只有一个构造方法，并且构造参数中的类型已经注册过 `Bean`，`Spring` 会自动注入，不再需要 `@Autowired`，代码更加简洁，我个人更加倾向于加上）。
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
  <name>work-project</name>
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
> 补充：有时候需要创建多个实例，对于注解 `@Component` 这档事会比较麻烦，因为默认是单例模式。但是如果对于使用 `@Bean`，则可以通过使用别名限定符 `@Qualifier` 来避免在同类不同方法的返回值类型相同时发生冲突（需要创建 `Bean` 和注入 `Bean` 都进行限定）。
>
> ```java
> // MailService.java
> @Configuration
> @ComponentScan
> class AppConfig {
>     @Bean
>     @Qualifier("z")
>     @Primary // 指定为主要 Bean, 在注入时如果没有指出 Bean 的名字, Spring 会注入标记有 @Primary 的 Bean
>     ZoneId createZoneOfZ() {
>         return ZoneId.of("Z");
>     }
> 
>     @Bean
>     @Qualifier("utc8")
>     ZoneId createZoneOfUTC8() {
>         return ZoneId.of("UTC+08:00");
>     }
> }
> 
> @Component
> public class MailService {
> 	@Autowired(required = false)
> 	@Qualifier("z") // 指定注入名称为"z"的 ZoneId, 如果不使用这个注释就会默认查找且注入带有 @Primary 的 Bean 组件, 再没有就抛出异常
> 	ZoneId zoneId = ZoneId.systemDefault();
>     ...
> }
> 
> ```

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

#### 3.1.2.切面编程

`OOP` 作为面向对象编程的模式，获得了巨大的成功，`OOP` 的主要功能是数据封装、继承和多态。而 `AOP` 是一种新的编程方式，它和 `OOP` 不同，`OOP` 把系统看作多个对象的交互，`AOP` 把系统分解为不同的关注点，或者称之为切面。

对于安全检查、日志、事务等代码，它们会重复出现在每个业务方法中。使用 `OOP`，我们很难将这些四处分散的代码模块化，哪怕模块化了也总有部分逻辑和业务无关。

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
        target.createBook(book);
    }

    public void updateBook(Book book) {
        securityCheck();
        target.updateBook(book);
    }

    private void securityCheck() {
        ...
    }
}

```

另一种方法是，既然`SecurityCheckBookService`的代码都是标准的 `Proxy` 样板代码，不如把查权、日志、事务视为切面。然后以某种自动化的方式，把切面织入到核心逻辑中，实现 `Proxy` 模式。

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
  <name>work-project</name>
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
@Aspect
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

    // @AfterReturning 方法成功执行后执行
    // @After 无论方法是否抛异常都会执行
    // @AfterThrowing 方法抛异常后执行
}

@ComponentScan("com.work")
@EnableAspectJAutoProxy
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

`Spring` 容器启动时为我们自动创建的注入了作为 `Aspect` 的 `UserService` 类的子类 `UserServiceAopProxy`，它取代了原始的`UserService`。

> [!IMPORTANT]
>
> 补充：我们在使用 `AOP` 时，要注意到虽然 `Spring` 容器可以把指定的方法通过 `AOP` 规则装配到指定的 `Bean` 的指定方法前后，但是，如果自动装配时，因为不恰当的范围，容易导致意想不到的结果，即很多不需要 `AOP` 代理的 `Bean` 也被自动代理了，并且，后续新增的 `Bean`，如果不清楚现有的 `AOP` 装配规则，容易被强迫装配。
>
> 使用 `AOP` 时，被装配的 `Bean` 最好自己能清清楚楚地知道自己被安排了。例如，`Spring` 自己提供另外一个`@Transactional`注解就是一个非常好的例子。如果我们自己写的 `Bean` 希望在一个数据库事务中被调用，就标注上`@Transactional`（标记方法标识该方法有事务，或者直接在 `class` 级别注解，表示“所有 `public` 方法都有事务），这样当事务内的任何 `SQL` 失败，已执行的 `SQL` 语句都会回滚回来，避免数据不一致，这样就不用每次都使用 `try-catch` 处理事务回滚。
>
> ```java
> @Component
> public class UserService {
>     // 有事务:
>     @Transactional
>     public User createUser(String name) {
>         ...
>     }
> 
>     // 无事务:
>     public boolean isValidName(String name) {
>         ...
>     }
> 
>     // 有事务:
>     @Transactional
>     public void updateUser(User user) {
>         ...
>     }
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
>     String aValue(); // 指定要记录的指标名称(可选)
> }
> 
> // 2. 实现注解
> @Aspect
> @Component
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
>         joinPoint.proceed(); 先被执行
>         目标方法的返回值会被计算并暂存, 但不会立刻返回
>         进入 finally 代码块, 执行 System.err.println("[Metrics] " + name + ": " + t + "ms");
>         finally 代码执行完毕后, 再真正返回 joinPoint.proceed(); 的结果
>         这是 finally 的特性
>         */
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
>     public static void main(String[] args) {
>         ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
>         UserService userService = context.getBean(UserService.class);
>         userService.register("test@example.com", "password", "John Doe");
>     }
> }
> 
> ```
>
> 常见的切面选择如下。
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
>     public final ZoneId getFinalZoneId() {
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
> @Aspect
> @Component
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
>     public static void main(String[] args) {
>         ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
>         MailService mailService = context.getBean(MailService.class);
>         System.out.println(mailService.sendMail());
>     }
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
> 上面代码中，去掉 `@EnableAspectJAutoProxy` 也就是取消 `AOP` 扫描将不会出错，但是加上会出错，这是为什么呢？仔细跟踪代码，会发现`null`值出现在`MailService.sendMail()`内部的这一行代码，用`final`标注的成员变量为`null`？
>
> 1. 正常创建一个`UserService`的原始实例，这是通过反射调用构造方法实现的，它的行为和我们预期的完全一致。
>
> 2. 通过 `CGLIB` 创建一个 `UserService` 的子类，并引用了原始实例和 `LoggingAspect`，如果我们观察 `Spring` 创建的 `AOP` 代理，它的类名总是类似`UserService$$EnhancerBySpringCGLIB$$1c76af9d`（`Java` 的类名实际上允许`$`字符）。为了让调用方获得 `UserService` 的引用，它必须继承自 `UserService`。然后，该代理类会覆写所有 `public` 和 `protected` 方法，并在内部将调用委托给原始的 `UserService` 实例。
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
> 3. 如果开启了 `AOP`，用户获取 `Bean` 之前，就会出现两个 `UserService` 实例：
>
>    - 第一个 `UserService` 实例是代码中定义的*原始实例*，它的成员变量已经按照我们预期的方式被初始化完成
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
> 4. 等到用户从 `ApplicationContext` 中获取的 `UserService` 时，此时的实例是 `proxy`，注入到 `MailService` 中的 `UserService` 实例也是 `proxy`，都是经过代理后的类
>
> 5. 那么最终的问题来了 `proxy` 实例的成员变量，也就是从 `UserService` 继承的 `zoneId`，它的值是 `null`。在 `UserService` 中执行的 `public final ZoneId zoneId = ZoneId.systemDefault()` 初始化，在 `UserService$$EnhancerBySpringCGLIB` 中并未执行，因为没必要初始化 `proxy` 的成员变量，`proxy` 的目的是代理方法而无关属性。
>
> 6. 实际上，成员变量的初始化是在构造方法中完成的，和 `Cpp` 中使用初始化列表初始化有些类似。然而，对于 `Spring` 通过 `CGLIB` 动态创建的 `UserService$$EnhancerBySpringCGLIB `代理类的构造方法中，并未调用 `super()`。因此从父类继承的成员变量，包括 `final` 类型的成员变量，统统都没有初始化。
>
> 7. 尽管 `Java` 规定任何类的构造方法，第一行必须调用 `super()`，如果没有，编译器会自动加上，怎么 `Spring` 的 `CGLIB` 就可以搞特殊？这是因为自动加`super()`的功能是 `Java` 编译器实现的，它发现没加，就自动给加上，发现加错了，就报编译错误。但实际上，如果直接构造字节码，一个类的构造方法中，不一定非要调用 `super()`。`Spring` 使用 `CGLIB` 构造的 `Proxy` 类，是直接生成字节码，并没有源码-编译-字节码这个步骤，因此需要强调 `Spring` 通过 `CGLIB` 创建的代理类，不会初始化代理类自身继承的任何成员变量，包括 `final` 类型的成员变量！
>
> 8. 解决方法也简单，不要直接访问 `UserService$$EnhancerBySpringCGLIB` 继承过来的字段，而是使用方法来访问，方法内会先调用 `aspect.doAccessCheck();` 满足 `AOP` 再执行 `return target.getZoneId()` 就可以获取到 `UserService` 初始化的字段而不是继承来的字段
>
> 9. 如果在 `MailService` 中，调用的不是 `getZoneId()`，而是 `getFinalZoneId()`，又会出现 `NullPointerException`，这是因为，代理类无法覆写 `final` 方法（这一点绕不过 `JVM` 的 `ClassLoader` 检查），该方法返回的其实就是是代理类继承下来的 `zoneId` 字段，即 `null`（无法覆盖的原因是 `Java` 的 `final` 关键字本身就是不希望父类的属性或方法被子类改动，只能被子类继承来使用）。
>
> 因此如果不希望自己的 `AOP` 出现问题，必须保证：
>
> - 访问被注入的 `Bean` 时，总是调用方法而非直接访问字段
> - 编写 `Bean` 时，如果可能会被代理，就不要编写 `public final` 方法，因为无法覆盖

#### 3.1.3.访问数据



#### 3.1.4.服务开发



#### 3.1.5.模块集成



### 3.2.代码实践

待补充...





**后端**  

**编程语言与开发规范**  

- 熟悉 Java 语言，掌握集合框架、Lambda 表达式、Stream 流、自定义注解等核心技术  
- 遵循阿里 Java 开发规范，代码风格严谨，逻辑清晰  
- 使用 IDEA 进行开发，Maven 进行依赖管理  

**后端框架与数据库**  

- 熟悉 Spring 全家桶，包括 Spring MVC、Spring Boot、MyBatis、MyBatis-Plus 等框架  
- 熟悉 Redis，掌握其数据结构、缓存策略与持久化机制  
- 熟悉 MySQL 和 MongoDB，了解 MySQL 索引优化与 SQL 事务管理  

**常规业务开发**  

- **断点续传**：支持大文件上传，保障传输完整性  
- **多端会话管理**：基于 Sa-Token 进行同端登录控制  
- **对象存储管理**：利用 COS 进行静态资源存储与分发  
- **配置中心**：基于 Nacos 实现动态配置管理  
- **分词搜索**：借助 Elasticsearch 进行高效全文检索  
- **权限校验**：采用 Sa-Token 进行细粒度权限控制  
- **并发检测**：Sa-Token 保障多端并发安全性  
- **多级缓存**：Redis 分布式缓存 + Caffeine 本地缓存 + Redisson 提供高效缓存方案  
- **流量控制**：Sentinel 实现服务限流与熔断降级  
- **热点参数防护**：Sentinel 监控高频请求，优化系统负载  
- **爬虫防护**：利用 Redisson 限制异常访问，防止数据爬取  
- **批量操作优化**：合并 SQL 请求，提高数据库吞吐能力  
- **动态数据筛选**：灵活的查询过滤机制，提高数据查询效率  

---

**前端**  

**框架与开发规范**  

- 熟悉 React.js 和 Vue.js，能够根据业务需求定制前端架构  
- 遵循前端代码规范，结合 ESLint + Prettier + TypeScript + Husky 保证代码质量  

**组件库与工具**  

- 熟悉 Ant Design、ECharts、Element UI、Element Plus 等组件库  
- 具备使用 Ant Design Pro 框架、Umi OpenAPI 代码生成进行前端开发的能力  
- 熟练掌握 VS Code、WebStorm 等前端开发工具  

---

**运维**  

**Linux 环境管理**  

- 熟悉 Linux，常用 CentOS 和 Ubuntu 进行系统运维  
- 具备 Shell 脚本编写能力，能够完成基本的系统维护与自动化任务  

**容器化与自动化部署**  

- 熟悉 Docker 容器管理，掌握镜像构建、容器编排、日志管理等  
- 具备 CI/CD 自动化部署经验，提升开发与运维效率  

**服务器管理与优化**  

- 熟悉 Nginx 反向代理、负载均衡及静态资源优化  
- 具备服务器优化、性能调优能力，保障系统稳定高效运行  

