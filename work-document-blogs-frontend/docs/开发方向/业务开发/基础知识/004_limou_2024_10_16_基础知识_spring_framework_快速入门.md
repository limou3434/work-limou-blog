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
-   `JavaBean` 组件：也就是组件依赖的别称，配置一个组件就是配置一个 `Bean`
-   `.xml` 配置：配置需要提示容器实例化组件，依赖关系等

正常来说，我们有两种依赖注入方法：

-   使用 `set()` 封装依赖注入，这也是最为常规的做法，只解决少量组件问题，但只有侵入（需要实现特定接口）
-   使用 `IoC` 这种无侵入容器，这连组件自己都不知道自己运行在容器中，测试不依赖容器，且无需侵入（不需实现特定接口）

我们可以尝试装载一个 `Bean` 试试，直接使用 `Maven` 创建一个 `Java` 项目然后引入 `org.springframework:spring-context:6.0.0` 进行手动配置即可，不要使用 `spring initializr` 然后禁用自动化配置这种方式（太复杂还需要学习更多的东西）。

```shell
# 创建项目以及目录结构
```

```xml
<!-- pom.xml -->
```

```java
// MailService.java: 邮件服务
public class MailService {
    private ZoneId zoneId = ZoneId.systemDefault();

    public void setZoneId(ZoneId zoneId) {
        this.zoneId = zoneId;
    }

    public String getTime() {
        return ZonedDateTime.now(this.zoneId).format(DateTimeFormatter.ISO_ZONED_DATE_TIME);
    }

    public void sendLoginMail(User user) {
        System.err.println(String.format("Hi, %s! You are logged in at %s", user.getName(), getTime()));
    }

    public void sendRegistrationMail(User user) {
        System.err.println(String.format("Welcome, %s!", user.getName()));

    }
}

```

```java
// UserService.java: 用户服务
public class UserService {
    private MailService mailService;

    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    private List<User> users = new ArrayList<>(List.of( // users:
            new User(1, "bob@example.com", "password", "Bob"), // bob
            new User(2, "alice@example.com", "password", "Alice"), // alice
            new User(3, "tom@example.com", "password", "Tom"))); // tom

    public User login(String email, String password) {
        for (User user : users) {
            if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
                mailService.sendLoginMail(user);
                return user;
            }
        }
        throw new RuntimeException("login failed.");
    }

    public User getUser(long id) {
        return this.users.stream().filter(user -> user.getId() == id).findFirst().orElseThrow();
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
}
```

```java
```



#### 3.1.2.切面编程



#### 3.1.3.访问数据



#### 3.1.4.服务开发



#### 3.1.5.模块集成



### 3.2.代码实践

待补充...
