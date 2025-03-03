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

-   使用 `@Component` 来创建一个 `Baen`，使用 `@Autowired` 来标明注入字段，或者用 `@Autowired 字段类型 函数参数` 来标明注入参数（可以用在构造方法和 `setter` 中）。
-   在主类中使用 `@ComponentScan` 用于指定 `Spring` 需要扫描的包路径，这样 `@Component` 等标注的类会被自动发现，并注册为 `Spring Bean`。
-   实际上，对于下面代码中主类的 `AnnotationConfigApplicationContext` 这个 `Spring` 容器的实现类，主要用于加载基于 `Java` 配置的 `Spring` 应用上下文（也就是和 `XML` 配置文件方式的 `ClassPathXmlApplicationContext` 是类似的），只不过它是基于 `Java` 代码配置的。它需要是一个 `Spring` 配置类，负责提供 `Bean` 定义，而 `@Configuration` 正是用来标识这种配置类的。

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
import org.springframework.context.support.ClassPathXmlApplicationContext;

@Configuration
@ComponentScan
public class App {
    public static void main(String[] args) {
        // 创建 Spring 容器，加载类路径注解配置
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

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
>   补充：如何在 `Spring IoC` 容器中注册 `HikariDataSource` 这种第三方组件作为 `Bean`？由于 `HikariDataSource` 是第三方类，它不在我们自己的代码里，无法直接加 `@Component` 注解。但 `Spring` 允许我们用 `@Bean` 标记某个方法或类，然后该方法或类的返回值或构造函数就会创建 `Bean`，并让 `IoC` 容器管理它。然后和 `@Component` 自动创建的实例一样，只不过这次我们是自己创建一个实例，在使用过程中注入过程一样。并且这种方法最好直接写到主类中，不然有些乱。
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
>       @Bean // 这个方法返回的对象会被 Spring 管理，成为一个 Bean
>       public DataSource hikariDataSource() {
>           HikariConfig config = new HikariConfig();
>           config.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
>           config.setUsername("root");
>           config.setPassword("password");
>           config.setMaximumPoolSize(10);
>           return new HikariDataSource(config);
>       }
>   }
>   
>   ```

对于 `Spring` 容器来说，当我们把一个 `Bean` 标记为 `@Component` 后，它就会自动为我们创建一个单例，即容器初始化时创建 `Bean`，容器关闭前销毁 `Bean`。在容器运行期间，我们调用 `getBean(Class)` 获取到的 `Bean` 总是同一个实例。

还有一种 `Bean`，我们每次调用 `getBean(Class)`，容器都返回一个新的实例，这种 `Bean` 称为 `Prototype, 原型`，它的生命周期显然和单例不同。声明一个 `Prototype` 的 `Bean` 时，需要添加一个额外的 `@Scope` 注解。

-   @Component
-   @Autowired
-   @ComponentScan
-   @Scope
    -   @Scope("singleton")：整个程序只创建一个全局复用的 Bean，程序结束后销毁
    -   @Scope("prototype")：每次获取都会创建一个新的 Bean，使用结束后销毁
    -   @Scope("request")：每次网络请求创建一个新的 Bean，请求结束后销毁
    -   @Scope("session")：每次会话创建一个新的 Bean，会话结束后销毁
-   @Configuration
-   @Bean
-   

#### 3.1.2.切面编程



#### 3.1.3.访问数据



#### 3.1.4.服务开发



#### 3.1.5.模块集成



### 3.2.代码实践

待补充...
