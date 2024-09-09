# Project_B

[Uploading CSE 311_Tree Management Appication_Cao Minh Tri_Tran Van Tai.pdf…]()
EASTERN INTERNATIONAL UNIVERSITY
SCHOOL OF COMPUTING AND INFORMATION TECHNOLOGY
DEPARTMENT OF COMPUTING AND INFOMATION TECHNOLOGY



PROJECT 2 REPORT 

TREE MANAGEMENT SYSTEM APPLICATION


Student(s)
Cao Minh Trí – 2031200025


Supervisor(s)
Trần Văn Tài



Binh Duong, August, 2024




ABSTRACT
The Tree Management Application is a comprehensive software solution designed to facilitate the efficient management and organization of tree-related data. It serves as a pivotal tool for users involved in forestry, landscaping, and environmental management. This application provides an intuitive interface for recording and tracking detailed information about trees and coordinating maintenance activities.
Key features: 
1.Data entry and tracking.
2.Interactive tree mapping.
3.Reporting and analytic.
4.Task management.
5.User roles and permissions.

ACKNOWLEDGEMENT
I would like to express my deepest gratitude to my adviser, Tran Van Tai, for his invaluable guidance, support, and encouragement throughout the development of this project. His expertise, insights, and constructive feedback have been instrumental in shaping the Tree Management Application and in enhancing my understanding of both the technical and practical aspects of this work. I am truly grateful for his contribution and the knowledge he has generously shared with me. Thank you for your unwavering support and inspiration.



TABLE OF CONTENTS
ABSTRACT	2
ACKNOWLEDGEMENT	3
TABLE OF CONTENTS	4
LIST OF FIGURES	6
LIST OF TABLES	8
LIST OF ABBREVIATIONS	9
CHAPTER 1 : INTRODUCTION	10
1.1 Motivation	10
1.2 Project Statement	10
1.3 Objective	10
1.4 Project Features	10
CHAPTER 2: TECHNOLOGIES	12
2.1 Programming Languages	12
2.1.1 HTML	12
2.1.2 CSS	12
2.1.3 Typescript	12
2.1.4 C#	13
2.2 Framework	13
2.2.1 React	13
2.2.2 Vite	13
2.2.3 Tailwind CSS	13
2.2.4 ASP.NET Core	14
2.3 Library	14
2.3.1 MUI	14
2.3.2 Leaflet	15
2.3.3 Redux Toolkit	16
2.3.4 TanStack Query (React Query)	16
2.3.5 AutoMapper	17
2.4 Database	17
2.4.1  Microsoft SQL Server	17
2.4.1  SQL Server Management Studio 20	17
CHAPTER 3: SYSTEM ANALYSIS AND DESIGN	18
3.1 Software Architecture	18
3.1.1 4-Tier Architecture	18
3.1.2 Folder structure	19
3.2 Requirements Analysis	20
3.2.1 Functional Requirements	20
3.2.2 Non-Functional Requirements	20
3.3 Use Case Diagram	20
3.3.1 Admin Use Case Diagram	21
3.3.2 Manager Use Case Diagram	22
3.3.3 Staff Use Case Diagram	23
3.4 System Models	24
3.4.1 Entity Relationship Diagram (ERD)	24
3.4.2 Tables Description	24
3.4.3 Tables Details	25
3.4.4 Enum	27
3.5 Design Pattern	27
3.5.1 Repository Pattern	27
3.5.2 Unit Of Work Pattern	28
3.5.3 Data Transfer Object Pattern (DTO)	29
3.6 Security Design	29
3.6.1 Authentication	29
3.6.2 Authorization	30
CHAPTER 4: IMPLEMENTATION AND RESULT	32
4.1 Product	32
4.1.1 Home Page	32
4.1.2 Login Page	33
4.1.3 Admin Dashboard	34
4.1.4 Manager Home Page	39
4.1.5 Manager Dashboard	40
4.1.6 Staff Home Page	43
4.1.7 Staff Dashboard	44
4.2 APIs	46
4.3 Result	46
CHAPTER 5: CONCLUSION AND FUTURE WORKS	48
5.1 Conclusion	48
5.2 Limitations	48
5.3 Future Works	48
REFERENCES	49


LIST OF FIGURES
Figure 1 : Leaflet	14
Figure 2 : Redux Toolkit	15
Figure 3 : Tanstack Query (React Query)	15
Figure 4 : 4-Tier Architecture	17
Figure 5 : Folder structure	18
Figure 6 : Admin use case diagram	20
Figure 7 : Manager use case diagram	21
Figure 8 : Staff use case diagram	22
Figure 9 : Entity relationship diagram	23
Figure 10 : Repository & UnitOfWork pattern	27
Figure 11 : Dtos pattern	28
Figure 12 : JWT token authentication example	29
Figure 13 : Hash password using bcrypt	29
Figure 14 : Authorize example 	30
Figure 15 : Home page	31
Figure 16 : Map with tree information	31
Figure 17 : Search	32
Figure 18 : Login page	32
Figure 19 : Validate input	33
Figure 20 : Login fail	33
Figure 21 : Admin Dashboard page	34
Figure 22 : Trees management page	34
Figure 23 : Tree details	35
Figure 24 : Add tree form	35
Figure 25 : Select tree to add	36
Figure 26 : Users management page	36
Figure 27 : Species tree management page	37
Figure 28 : Tasks management page	37
Figure 29 : Manager home page	38
Figure 30 : Tree information manager	38
Figure 31 : Manager dashboard page	39
Figure 32 : Trees manager information	39
Figure 33 : Staff details	40
Figure 34 : Confirm task is done	40
Figure 35 : Tasks History	41
Figure 36 : Add new assignment form	41
Figure 37 : Staff home page	42
Figure 38 : Update status	42
Figure 39 : Overdue task	43
Figure 40 : Staff dashboard page	43
Figure 41 : To do list (Staff)	44
Figure 42 : APIs	45


LIST OF TABLES
Table 1 : Functional requirements	19
Table 2 : Non-Functional requirements	19
Table 3 : Description of tables	24
Table 4 : BaseEntity table	24
Table 5 : User table	25
Table 6 : Tree table	25
Table 7 : Position table	25
Table 8 : TypeTree table	25
Table 9 : Assignment table	26
Table 10 : WorkContent table	26


LIST OF ABBREVIATIONS
HTML 	Hyper Text Markup Language
CSS		Cascading Style Sheets
HTTP 		Hypertext Transfer Protocol
MUI 		Material-UI
DTOs		Data Transfer Objects
SQL		Structured Query Language
MSSQL	Microsoft SQL Server
APIs		Application Programming Interfaces
RBDMS	Relational Database Management System
RESTful	Representational State Transfer
SSMS		SQL Server Management Studio

CHAPTER 1 : INTRODUCTION
1.1Motivation
The motivation for creating the Tree Management Application arises from the need to address critical challenges in managing and preserving tree populations, particularly in urban and forestry environments. As the importance of trees in mitigating climate change, enhancing biodiversity, and improving the quality of urban life becomes increasingly recognized, the demand for efficient, accurate, and scalable tree management solutions has grown significantly. This project was initiated to fulfill this demand by providing a comprehensive tool that integrates tree data management, spatial visualization, and task coordination.
1.2Project Statement
The Tree Management Application is a dedicated software solution aimed at supporting the Eastern International University’s efforts to manage and maintain its green spaces effectively. The project seeks to address the university’s need for a systematic approach to monitoring the health and growth of trees on campus, ensuring that these valuable natural resources are well-maintained and contribute to the overall environmental sustainability of the university.
Encouraging environmental responsibility and developing a sustainable, green campus. This project is a crucial component because it gives the institution a tool to efficiently and precisely track, assess, and manage its tree population. The application will serve as a centralized platform for recording detailed tree data, visualizing tree locations through interactive maps, and managing maintenance tasks to ensure the health and safety of the campus environment.
1.3Objective
The primary objective of this project is to develop a comprehensive Tree Management Application that enables users to efficiently manage tree-related data, visualize this data on interactive maps, and coordinate maintenance tasks. The application aims to:
-Provide an intuitive interface for recording and updating detailed tree information.
-Integrate interactive mapping tools to visualize tree locations and support spatial analysis.
-Incorporate task management features to facilitate the assignment, tracking, and completion of tree maintenance activities.
-Generate reports and analytics to support data-driven decision-making.
1.4 Project Features
These features ensure that all aspects of tree care, from data management to task coordination, are streamlined and easily accessible.
1.Tree Data Management
-Comprehensive Tree Profiles: Store detailed information for each tree, including species, age, plant year, and physical dimensions (e.g., height, diameter).
-Location Tracking: Record the precise geographic location of each tree on the campus map.
-Maintenance History: Keep a record of all past maintenance activities for easy reference and continuity in care.
2.Interactive Mapping
-Digital Campus Map Integration: An interactive map of the university campus where all trees are plotted, allowing users to visualize the distribution and status of trees across the campus.
-Search and Filter: Quickly locate specific trees or groups of trees based on criteria such as species, name, or tree code.
3.Task Management
-Task Creation and Assignment: Create tasks related to tree maintenance (e.g., pruning, watering, fertilize) and assign them to specific staffs.
-Task Scheduling: Every task has a deadline.
-Progress Tracking: Monitor the status of on progress tasks, including start date and mark tasks as complete when finished.
4.Reporting
-Summary: number of trees, species, users and tasks.
-Task Classification: On progress, finished.
5.User Roles and Permissions
-Role-Based Access Control: Differentiate access levels based on user roles (e.g., administrator, managers, staffs), ensuring that only authorized personnel can modify critical data.
-Audit Trail: Maintain a log of all user actions within the application, providing transparency and accountability in data management and task execution.

CHAPTER 2: TECHNOLOGIES
2.1 Programming Languages
2.1.1 HTML
HTML (Hyper Text Markup Language) is the standard language used to create and design web pages and applications. Web developers can specify text, graphics, links, and other elements by using HTML to create the structure and content of web pages. It is also used to create web forms for user interaction and data collecting, format documentation for online publication, and create email templates. Furthermore, HTML is compatible with responsive design principles, which guarantee that web pages will work well on a range of screens and devices.
2.1.2 CSS
CSS (Cascading Style Sheets) is a style-sheet language used to describe the presentation and layout of web pages written in HTML. CSS allows developers to control the appearance of web elements, including layout, colors, fonts, and spacing, separating the content of a web page from its visual presentation.
CSS is essential for designing and styling web pages. It allows developers to control the visual appearance of HTML elements, ensuring a consistent and appealing user experience. With features like layout control, responsive design, and advanced styling capabilities, CSS is a fundamental tool in web development.
2.1.3 Typescript
TypeScript is a statically typed superset of JavaScript developed by Microsoft. It builds on JavaScript by adding optional static types, which can help catch errors early and improve code quality and maintainability. TypeScript compiles down to plain JavaScript, which can run on any browser or JavaScript environment.
TypeScript enhances JavaScript by adding static types, which can improve code quality and maintainability. With features such as type annotations, interfaces, classes, and generics, TypeScript helps developers write safer and more robust code. It integrates well with existing JavaScript code and provides a smooth developer experience with powerful tooling and editor support.
Reason for choosing TypeScript:
TypeScript offers a compelling set of features that enhance the development experience, improve code quality, and provide long-term benefits for project maintainability. Its adoption can lead to fewer runtime errors, more efficient development processes, and a more robust and scalable codebase, making it an excellent choice for modern software development.
2.1.4 C#
C# (pronounced "C-sharp") is a modern, object-oriented programming language developed by Microsoft. It is frequently used to create a variety of applications, including games, mobile apps, and desktop and web applications. As a component of the.NET framework, C# provides a rich feature like LINQ, async/await, and robust error handling set aimed at assisting programmers in producing effective, scalable, and maintainable software.
Reason for choosing C#:
C# is also a fairly "safe" language. Lower-level languages like C or C++ will still execute the program even if there are errors that lead to serious damage, while C# will check your code when compiling and throw errors and send Warning to prevent bad things from happening. 
It is versatility, strong typing, rich feature set, and deep integration with the .NET ecosystem.Its support for cross-platform development, strong community backing, and high performance make it a compelling choice for building scalable, secure, and maintainable applications across various domains.
2.2 Framework
2.2.1 React
React is a free and open-source front-end JavaScript library for building user interfaces based on components by Facebook Inc. It is maintained by Meta and a community of individual developers and companies. It allows developers to create reusable UI components and manage the state of an application efficiently. React is known for its declarative approach, which simplifies the development process and enhances the maintainability of code.
2.2.2 Vite
Vite is a modern build tool and development server designed for faster and more efficient web development. It was created by Evan You, the creator of Vue.js, and aims to improve the development experience by providing fast builds and instant hot module replacement (HMR). Vite is designed to work with various front-end frameworks and libraries, including React, Vue, and Svelte, among others.
2.2.3 Tailwind CSS
Tailwind CSS is a highly customizable, utility-first CSS framework that provides a collection of low-level utility classes to build custom user interfaces without writing any custom CSS. Instead of offering pre-designed components, Tailwind gives developers the flexibility to compose designs directly in their HTML by applying utility classes.
By using utility classes, developers can build complex layouts without writing custom CSS, which speeds up development time. Tailwind’s utility classes are designed to be simple and expressive, reducing the need to write repetitive CSS code.
2.2.4 ASP.NET Core
ASP.NET Core is a cross-platform, high-performance framework for building modern, cloud-based, and internet-connected applications. Developed by Microsoft, it is a part of the .NET ecosystem and provides a framework for developing web applications, APIs, and microservices. ASP.NET Core is designed to be flexible, modular, and optimized for performance and scalability.
Key features: 
-Cross-Platform
-High Performance
-Modular and Lightweight
-Unified Framework
-Dependency Injection
-Middleware Pipeline
-Razor Pages
-Security
-Development Tools
-Globalization and Localization
-Modern Web Standards
2.3 Library
2.3.1 MUI
MUI (formerly known as Material-UI) is a popular open-source library for building user interfaces with React. It provides a set of pre-designed, customizable components based on Google's Material Design guidelines. MUI helps developers create consistent and visually appealing web applications by offering a comprehensive suite of UI components and tools.
Its robust theming system, responsive design capabilities, and integration with React make it an excellent choice for developers looking to create visually consistent and user-friendly applications.
2.3.2 Leaflet

Figure 1: Leaflet
Leaflet is an open-source JavaScript library used for creating interactive maps on web applications. It is widely used for displaying geospatial data and integrating map functionalities into websites and applications. Leaflet is known for its simplicity, lightweight nature, and ease of use, making it a popular choice for web developers working with mapping solutions.
Leaflet is a versatile and user-friendly library for creating interactive maps on the web. Its lightweight design, ease of use, and rich set of features make it an excellent choice for integrating mapping capabilities into web applications. With support for various tile providers, interactive features, and a robust plugin ecosystem, Leaflet allows developers to build highly customizable and functional mapping solutions.
2.3.3 Redux Toolkit

Figure 2: Redux Toolkit
Redux Toolkit is the official, recommended way to write Redux logic for managing state in JavaScript applications. It provides a set of tools and best practices for efficiently managing and updating the state of an application, simplifying the process of setting up and using Redux.
2.3.4 TanStack Query (React Query)

Figure 3: Tanstack Query (React Query)
TanStack Query (formerly known as React Query) is a powerful data-fetching and state management library for JavaScript and TypeScript applications, especially those using React. It simplifies the process of fetching, caching, synchronizing, and updating server state in your applications. TanStack Query provides a comprehensive set of tools to handle server-side data interactions efficiently, making it easier to manage and synchronize data.
2.3.5 AutoMapper
AutoMapper is a popular object-to-object mapping library in .NET, including .NET Core, designed to simplify the process of transferring data between objects. AutoMapper helps developers map properties from one object to another, often between domain models and Data Transfer Objects (DTOs), without the need for repetitive manual code. It is particularly useful in scenarios where objects have similar structure but may not have identical property names or types.
Purpose: 
AutoMapper's primary purpose is to reduce the amount of boilerplate code needed for mapping one object to another. This is especially useful when working with DTOs, where data from domain models (entities) needs to be transferred to objects that are exposed via APIs, or when converting DTOs back into domain models for processing.
2.4 Database
2.4.1  Microsoft SQL Server
Microsoft SQL Server (MSSQL Server) is a relational database management system (RDBMS) developed by Microsoft. It is designed to store and manage data in a structured format using tables and support complex querying and reporting.
Microsoft SQL Server is a comprehensive and powerful RDBMS that supports a wide range of data management and analysis needs. It offers robust features for relational data management, security, high availability, and data warehousing. With tools like SQL Server Management Studio and SQL Server Data Tools, it provides a full suite of solutions for database administration, development, and reporting. Whether used on-premises or in the cloud via Azure SQL Database, SQL Server is well-suited for managing and analyzing data in various types of applications.
2.4.1  SQL Server Management Studio 20
SQL Server Management Studio (SSMS) 20 is an integrated environment developed by Microsoft for managing SQL Server databases and related services. It provides a comprehensive set of tools for database administrators, developers, and data analysts to perform a wide range of tasks.




CHAPTER 3: SYSTEM ANALYSIS AND DESIGN
3.1 Software Architecture
3.1.1 4-Tier Architecture

Figure 4: 4-Tier Architecture
Our system is implemented 4-tier architecture which is a specific case of N-tier architecture with four layers. In this case it includes the following layers:
1.Presentation Layer: This layer is responsible for exposing the application's functionality to external clients through RESTful endpoints. It acts as the entry point for incoming requests, handling HTTP requests and responses. This layer is where the controllers reside, managing the interaction between the client and the application's underlying logic.
2.Application Layer: This layer is responsible for handling business logic, includes service interfaces and implementations.
3.Persistence Layer: This layer is the data access layer of the application. It is responsible for interacting with the database. This layer includes repositories, which handle the CRUD (Create, Read, Update, Delete) operations for the application's entities, and the Unit of Work pattern, which manages transactions and ensures data integrity
4.Domain Layer: This layer represents the core of the application, defining the fundamental business concepts and rules. This layer includes entities that represent the application's main objects, DTOs (Data Transfer Objects) for transferring data between layers, enums for defining specific sets of values, and repository interfaces for abstracting data access logic.
3.1.2 Folder structure

Figure 5: Folder structure
This application is separated into two parts: font-end and back-end. The back-end is writing APIs using C# and ASP.NET core while the font-end is using React with Typescript.
3.2 Requirements Analysis
3.2.1 Functional Requirements
Requirement	Description
Authentication	Users should be able to log in, and log out. The system should validate the user's credentials against the database before granting access
Role-Based Access Control	The system should restrict access to certain features based on user roles (Admin, Manager, Staff).
Tree mapping	Users should be able to view a map showing the location of trees. Each tree on the map should include details such as species, height, name,…
Task Management	Managers should be able to manage tasks, including setting due dates, assigning to specific staff.
Table 1: Functional requirements
3.2.2 Non-Functional Requirements
Requirement	Description
Performance	The system should be optimized to handle a large number of simultaneous users without significant delays. This includes efficient database queries and optimized server performance.
Usability	The user interface should providing clear navigation, meaningful error messages, and accessible features. The system should be usable without extensive training.
Security	The system must encrypt all sensitive data, including user credentials and personal information.
Security	The architecture should allow for horizontal scaling by adding more servers or services without significant changes to the codebase. The database should be optimized for scalability as well.
Table 2: Non-Functional requirements
3.3 Use Case Diagram
Our system have 3 roles: Admin, manager and user. Each role has different functions.
3.3.1 Admin Use Case Diagram

Figure 6: Admin use case diagram
Description: 
−Actor: Admin.
−Use cases: 
1.View trees map: When login or not login will also show a map with location of full trees in system, and search function with the ability to search by tree name, tree code and specie. Each tree is marker that can click to show tree information.
2.Login and logout: Actor can login and logout in system. Login to get permission to access dashboard.
3.Manage trees: When login successful, actor can view all trees in system with details and can create, update, delete and search tree.
4.Manage users: When login successful, actor can view all users in system and can create new account, update, delete and search user.
5.Manage species: When login successful, actor can view all species with total number trees of each specie in system, and can create, update, delete and search specie.
6.Manage tasks: When login successful, actor can view all tasks in system include tasks on progress, tasks finished, tasks overdue, and can create, update, delete and search task. 
3.3.2 Manager Use Case Diagram

Figure 7: Manager use case diagram
Description: 
−Actor: Manager.
−Use cases: 
1.View trees map: When not login, will show a map with location of full trees in system, and search function with the ability to search by tree name, tree code and specie. Each tree is marker that can click to show tree information. When login successful if tree has task it will show on tree information include staff name who is implemented this task and due date, and list contents of task.
2.Login and logout: Actor can login and logout in system. Login to get permission to access dashboard.
3.View list trees: When login successful, actor can view all trees in system with details and search tree.
4.View list staffs: When login successful, actor can view all staffs information in system  and search staff.
5.Manage tasks: When login successful, actor can view all tasks in system include tasks on progress, tasks finished, tasks overdue, and can create, update, delete and search task. 
3.3.3 Staff Use Case Diagram

Figure 8: Staff use case diagram
Description: 
−Actor: Staff.
−Use cases: 
1.View trees map: When not login, will show a map with location of full trees in system, and search function with the ability to search by tree name, tree code and specie. Each tree is marker that can click to show tree information. When login successful if tree has task it will show on tree information include name of who is created this task and due date, and list contents of task, if the due date not overdue then actor can update status of each work content in list task.
2.Login and logout: Actor can login and logout in system. Login to get permission to access dashboard.
3.View list trees: When login successful, actor can view all trees in system with details and search tree.
4.View list tasks: When login successful, actor can view all tasks in system and search task,  if task is not overdue then actor can update status of each work content in list task. 
3.4 System Models
3.4.1 Entity Relationship Diagram (ERD)

Figure 9: Entity relationship diagram
Our system use Microsoft SQL server database for storing, managing and retrieving data. A figure above provide a clear and concise visualization of the database structure. There are six entities in system: User, Tree, Position, TypeTree, Assignment and WorkContent.
3.4.2 Tables Description
Table name	Description
User	This table stores users information and assignments. One user can have many assignments.
Tree	This table stores trees properties and position with coordinates in a leaflet map. One tree only have one position.
Position	This table stores Lat (Latitude) and Lng (Longitude) in a leaflet map to identitfy location of tree in a map.
TypeTree	This table stores tree species name for convenient classification..
Assignment	This table stores a list of work contents of each tree and user.
WorkContent	This table stores contents and status for each content.
Table 3: Description of tables
All of the above tables have audit attribute: createdAt, createdBy, updatedAt, updatedBy, isDeleted. These attributes are crucial for maintaining a record of changes, actions, or events in the system, typically for security, compliance, or operational purposes. Audit attributes help in tracking who did what, when, and sometimes why, which is essential for both internal reviews and external compliance requirements.
3.4.3 Tables Details
1.BaseEntity table:
This table is an abstract class for other tables to inherit
Column name	Data type	Description
Id	varchar (Guid)	A primary key, unique identifier for each record.
IsDeleted	boolean	A boolean flag indicating whether the record has been marked as deleted without actually removing it from the database.
CreatedAt	datetime	A timestamp that records when the entity was first created.
CreatedBy	varchar 	The identifier of the user or system that created the record.
UpdatedAt	datetime	A timestamp that records when the entity was last updated.
UpdatedBy	varchar	The identifier of the user or system that last updated the record.
Table 4: BaseEntity table
2.User table:
Column name	Data type	Description
UserName	varchar	Unique identifier for each user account.
Password	varchar	A hash password for each user account.
FullName	varchar	Full name of user.
Phone	varchar 	Phone number of user, can null.
Avatar	varchar	Avatar URL of user, can null.
Dob	datetime	Date of birth of user, can null.
Role	Role	Role of user.
Assignments	List<Assignment>	List assignments user have.
Table 5: User table
3.Tree table:
Column name	Data type	Description
Name	varchar	Name of the tree.
TreeCode	varchar	Unique identifier each tree.
Image	varchar	Image URL of the tree, can null.
Age	double	Age of the tree, can null.
Height	double	Height of the tree.
Diameter	double	Diameter of the tree.
PlantYear	int	Year the tree have planted.
PositionId	varchar	(Foreign key) Unique position id to identifier for position of the tree.
TypeTreeId	varchar	(Foreign key) Unique type tree id to identifier for type of the tree.
Description	varchar	Description of the tree, can null.
Assignments	List<Assignment>	Include list of assignments that the tree has.
Table 6: Tree table
4.Position table:
Column name	Data type	Description
Lat	double	Latitude of the tree on the map.
Lng	double	Longitude of the tree on the map.
TreeId	varchar	(Foreign key) Unique tree id for identifier for tree of the position. 
Table 7: Position table
5.TypeTree table:
Column name	Data type	Description
Name	varchar	Unique identifier name of type tree.
ListTrees	List<Tree>	List of trees relative with the type.
Table 8: TypeTree table
6.Assignment table:
Column name	Data type	Description
TreeId	varchar	(Foreign key) Unique tree id identifier for tree has this assignment.
UserId	varchar	(Foreign key) Unique user id identifier for user has this assignment.
Deadline	datetime	Due of an assignment.
IsRequest	boolean	A boolean flag indicating whether the record has been send request for confirm or not.
FinishedAt	datetime	A timestamp that records when first send request confirm.
Progress	int	Task completion rate.
Table 9: Assignment table
7.WorkContent table:
Column name	Data type	Description
Content	varchar	Content of a task to do.
AssignmentId	varchar	(Foreign key) Unique assignmentId identifier for assignment has this content.
WorkStatus	WorkStatus	Status of this task.
Table 10: WorkContent table
3.4.4 Enum
Role : Admin, Manager, Staff.
WorkStatus : OnProgress, Finished.
3.5 Design Pattern
3.5.1 Repository Pattern
The Repository Pattern is a design pattern that provides a way to manage and encapsulate the data access logic. It acts as a mediator between the domain and data access layers, allowing the application to interact with data sources (like databases) in a more abstracted and consistent manner. The primary goal of the Repository pattern is to isolate the data access logic and provide a centralized place for querying and persisting data, which can make the codebase more maintainable, testable, and flexible.
Purpose:
The Repository pattern is used to create a layer of abstraction over the data access layer. By defining repository interfaces and their implementations, the application can work with data entities without being tightly coupled to the specific data access mechanisms. This allows for easy swapping of data sources, such as moving from a SQL database to a NoSQL database, without significantly altering the business logic.
3.5.2 Unit Of Work Pattern

Figure 10: Repository & UnitOfWork pattern
The Unit of Work pattern is a design pattern that maintains a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems. The main goal of the Unit of Work pattern is to manage and track changes made during a transaction to ensure that all changes are successfully committed to the database, or none at all, ensuring data consistency and integrity.
Purpose:
The Unit of Work pattern is used to group one or more repository operations into a single transaction. It allows an application to manage changes across multiple repositories and ensures that all changes are committed together. If any operation within the transaction fails, the Unit of Work pattern enables the system to roll back all changes, leaving the database in a consistent state.
3.5.3 Data Transfer Object Pattern (DTO)

Figure 11: Dtos pattern
The Data Transfer Object (DTO) pattern is used to encapsulate data and transfer it between different layers of an application, particularly between the client and server or between different layers within the server itself. DTOs are simple objects that do not contain any business logic but only the data necessary for a specific operation or view. This pattern helps to reduce the amount of data transferred, maintain a clear separation between the domain model and the data being transferred, and improve security by exposing only the necessary information.
Purpose: 
The primary purpose of the DTO pattern is to decouple the internal representation of data within the domain model from the external data required by the application’s presentation or service layers. By using DTOs, the application can ensure that only the necessary data is exposed to the client or other layers, thereby minimizing over-fetching and under-fetching of data, improving performance, and enhancing security.
3.6 Security Design
3.6.1 Authentication
The application employs robust authentication mechanisms to ensure that only authorized users can access the system include these method:
1.JWT Authentication: The application uses JSON Web Tokens (JWT) for authentication. Upon successful login, the server generates a JWT containing the user's identity and role claims, which is then sent to the client. The client includes this token in the Authorization header of subsequent requests. The server validates the token to authenticate the user.

Figure 12: JWT token authentication example
2.Password Hashing: User passwords are securely hashed using a strong hashing algorithm is bcrypt before being stored in the database. This ensures that plain text passwords are never stored or transmitted.

Figure 13: Hash password using bcrypt
3.6.2 Authorization
Authorization is managed through role-based access control (RBAC) to ensure that users can only perform actions or access resources they are permitted to.
Role-Based Access Control (RBAC): The application assigns roles such as "Admin," "Manager," and "Staff" to users. Permissions are granted based on roles. For instance, only users with the "Admin" role can access the manage users, or perform other administrative tasks.
Claims-Based Authorization: The JWT includes claims that represent the user's roles and permissions. The application checks these claims to determine whether the user has the right to access specific resources or perform certain actions.

Figure 14: Authorize example 


CHAPTER 4: IMPLEMENTATION AND RESULT
4.1 Product
4.1.1 Home Page
When you first visit our website, you will notice an interactive map of Eastern International University with a search bar in the upper left corner.

Figure 15: Home page

Figure 16: Map with tree information
When click into tree marker it will show tree information on the right of a map and color of marker will change to blue for easy tracking.

Figure 17: Search
4.1.2 Login Page
Simple login page, this application using form of react-hook-form for validate schema.

Figure 18: Login page

Figure 19: Validate input

Figure 20: Login fail
4.1.3 Admin Dashboard
Dashboard admin include trees, users, types, and assignments management. In Home show summary total of users, trees, types and trees planted this year.

Figure 21: Admin Dashboard page

Figure 22: Trees management page

Figure 23: Tree details

Figure 24: Add tree form

Figure 25: Select tree to add
On add new tree form will have a button select tree. It will open a map with full trees in system and then just click on a place that want to add it will auto generate Latitude and Longitude.

Figure 26: Users management page

Figure 27: Species tree management page

Figure 28: Tasks management page
This page has functions to filter by task status. Assignments on progress will filter all assignments that have status onProgress, assignments will filter all assignment that have status Finished. Finally overdue assignments will filter all assignments that have an expire deadline date. 
4.1.4 Manager Home Page

Figure 29: Manager home page

Figure 30: Tree information manager
On role manager when clicking on tree that has a task, it will display additional information about that task. If the task is overdue the color of due will display red.
4.1.5 Manager Dashboard

Figure 31: Manager dashboard page

Figure 32: Trees manager information

Figure 33: Staff details

Figure 34: Confirm task is done

Figure 35: Tasks History
After confirm task is done it will be moved to tasks history.

Figure 36: Add new assignment form
4.1.6 Staff Home Page

Figure 37: Staff home page
Staff on home page can directly updates status task by click on tree that have task and it will display task information and update status button on the bottom.

Figure 38: Update status
Update status by checking and save.

Figure 39: Overdue task
If task is overdue the update status button will not able to press.
4.1.7 Staff Dashboard


Figure 40: Staff dashboard page

Figure 41: To do list (Staff)
Same function update status on home page. When task overdue will not display update status action. 
After finished all tasks, staff can send request for confirmation and waiting for manager to confirm that task is done.

















4.2 APIs

Figure 42: APIs
4.3 Result
The project to develop a tree management application was successful in achieving its goals. Here are the key outcomes:
1.Tree Mapping Feature: We successfully created a feature that allows users to see and manage trees on an interactive map. This map helps users easily locate and monitor trees across the campus.
2.Task Management: The application includes a task management system where users can create, assign, and track tasks related to tree maintenance. This helps in organizing work and ensuring that tasks are completed on time.
3.User Access Control: We implemented a system where different users have different levels of access.  Administrators can manage all aspects of the application, while regular users have limited access based on their roles.
4.Performance and Scalability: The application was tested to ensure it performs well, even with many users at the same time. It was able to handle large amounts of data and user activity without slowing down.
5.Challenges and Solutions: We faced some challenges, like ensuring login data is not refreshed when refreshing the page, but we were able to solve them by implementing redux toolkit persistence for caching login data in local storage.

CHAPTER 5: CONCLUSION AND FUTURE WORKS
5.1Conclusion
After a period of research and implementation, with the desire to build a management system, with the care and dedicated guidance of Mr. Tran Van Tai, I have initially completed the project "Tree Management Application".
Here are the key of incomes:
-Learn how a management system software works.
-Learn how to build a standard APIs.
-Implement architecture and design patterns to develop programming-level. 
-Have a opportunity to approach many new technologies.
In conclusion, the tree management application is a reliable and effective tool that meets the initial requirements. It helps in managing trees and tasks efficiently and have a user-friendly interface for easy using. 
5.2 Limitations
While the application has met its initial goals, the time to implement the project is limited, and learning the new technology takes a lot of time, so some errors in the application may occur and has some limitations:
Area forbidden: There are some places in the map, such as block buildings, that do not allow for planting, but our application does not validate those areas.
Mobile application: We researched many sources about integrating maps into mobile application, but the result was that we had not found any support, except for Google Maps which needs an API key and is not free.
5.3 Future Works
There are several opportunities for further development and enhancement. Future work will focus on expanding the application's functionality, improving user experience such as: 
Automated Notifications: Implementing automated alerts and reminders for upcoming maintenance tasks could further streamline operations and ensure timely action.

REFERENCES
[1] Microsoft Documentation, ASP.NET Core Overview, Retrieved from https://learn.microsoft.com/en-us/aspnet/core, 2024.
[2] Redux Toolkit Documentation, Introduction to Redux Toolkit, Retrieved from https://redux-toolkit.js.org/introduction/getting-started, 2024.
[3] MUI Documentation, Material-UI React Components, Retrieved from https://mui.com/getting-started/overview/, 2024.
[4] Leaflet Documentation, Leaflet: An Open-Source JavaScript Library for Interactive Maps, Retrieved from https://leafletjs.com/, 2024.
[5] TanStack Query Documentation, React Query for Data Fetching and State Management, Retrieved from https://tanstack.com/query/latest/docs/framework/react/overview, 2024.
[6] TypeScript Documentation, The TypeScript Handbook, Retrieved from https://www.typescriptlang.org/docs/, 2024.
[7] Entity Framework Core Documentation, Getting Started with Entity Framework Core, Retrieved from https://learn.microsoft.com/en-us/ef/core/, 2024.

