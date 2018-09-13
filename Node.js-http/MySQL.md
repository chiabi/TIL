# MySQL

SQL 언어를 사용하는 관계형 데이터베이스 관리 시스템 중 대표적으로 사용되는 데이터베이스. 오픈소스이다.

## 1. 데이터베이스

- 관련성을 가지며 중복이 없는 데이터들의 집합  
- 정보를 저장하는 애플리케이션, 파일과 마찬가지로 보조기억장치에 데이터를 저장하는 수단
- 서버의 하드 디스크나 SSD 등의 저장 매체에 데이터를 저장한다.  
- 정형화된 포맷의 데이터를 체계적으로 저장할 수 있다.
- 데이터를 여러 가지 방법으로 빠르게 검색하고 정렬할 수 있다.
- 저장 매체가 고장나거나 사용자가 직접 데이터를 지우지 않는 이상 데이터가 계속 보존된다.
- 서버 종료 여부와 상관없이 데이터를 계속 사용할 수 있다.
- 서버에 데이터베이스를 올리면 여러 사람이 동시에 사용할 수 있다.
- 사람마다 데이터의 접근에 대해 다른 권한을 줄 수 있다. 

### 1.1. 데이터베이스 종류

- 계층형 데이터베이스
- 관계형 데이터베이스
- 객체지향 데이터베이스

### 1.2. RDBMS(Relational DataBase Mangement System)

DBMS: 데이터베이스 관리 시스템

RDBMS: 관계형 DBMS, 많이 사용된다. 
- 대표적으로 Oracle, MySQL, MSSQL 등이 있다.
- SQL이라는 언어를 사용해 데이터를 관리한다.
- RDBMS별로 SQL문이 조금씩 다르다.

## 2. MySQL 데이터베이스 및 테이블 생성하기

MySQL 설치 후, 설치된 폴더([경로]/MySQL/MySQL Server 8.0/bin)로 이동 후 명령 프롬프트를 통해 MySQL에 접속한다. 
```sh
$ mysql -h localhost -u root -p
Enter password: [비밀번호 입력]

# 프롬프트가 mysql> 로 바뀌었다면 접속 된 것
# 이제 여기에 SQL 명령어를 입력하면 된다.
# 콘솔로 돌아갈 때는 exit 명령어를 입력한다.
mysql>
```
- `-h [접속할 주소(ex. localhost)]`
- `-u [사용자 명(ex. root)]`
- `-p`: 비밀번호를 사용하겠다는 뜻

### 2.1. 데이터베이스 생성하기

- `CREATE SCHEMA [데이터베이스명]`

MySQL에서 데이터베이스와 Schema는 같은 개념이다.  
> **[데이터베이스 스키마(database schema)](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%8A%A4%ED%82%A4%EB%A7%88)**  
데이터베이스에서 자료의 구조, 자료의 표현 방법, 자료 간의 관계를 형식 언어로 정의한 구조이다. DBMS가 주어진 설정에 따라 데이터베이스 스키마를 생성하며, 데이터베이스 사용자가 자료를 저장, 조회, 삭제, 변경할 때 DBMS는 자신이 생성한 데이터베이스 스키마를 참조하여 명령을 수행한다.

`CREATE SCHEMA`와 같이 MySQL이 기본적으로 알고 있는 구문을 예약어라 부른다. 예약어는 소문자도 가능하긴 하지만 사용자 정의 이름과 구분하기 위해 대문자를 쓰는 것이 좋다.

다음은 nodejs 데이터베이스를 생성한다.
```sh
# SQL 구문을 입력할 때 마지막에 세미콜론(;)을 붙여야 실행된다.
# 세미콜론을 붙이지 않으면 프롬프트가 다음 줄로 넘어가 다른 입력이 들어오기를 기다린다.
mysql> CREATE SCHEMA nodejs;
Query OK, 1 row affected (0.02 sec)

# 앞으로 nodejs 데이터베이스를 사용하겠다는 것을 MySQL에 알림
mysql> use nodejs;
Database changed
```

### 2.2. 테이블 생성하기

- 
  ```
  CREATE TABLE [데이터베이스명.테이블명] ( 
    [컬럼 자료형 [옵션]], 
    [컬럼 자료형 [옵션]])
    COMMENT = [테이블에 대한 보충 설명]
    DEFAULT CHARSET=utf8
    ENGINE=[사용할 엔진]
  ```
- `DESC [테이블명]`: 만들어진 테이블 확인
- `DROP TABEL [테이블명]`: 테이블을 제거
- `SHOW TABLES`: 테이블 확인

테이블은 데이터가 들어갈 수 있는 틀을 의미하며, 테이블에 맞는 데이터만 들어갈 수 있다.  

| id | name | age | married |
|:---:|:---:|:---:|:---:|
| 1 | syami | 10 | false |
| 2 | jojo | 8 | false |
| 3 | loki | 6 | false |

데이터베이스에서 id, name, age, married로 시작되는 줄을 **컬럼(column)**이라고 부르며 컬럼에 대한 정보 줄은 **로우(row)**라고 부른다.  
컬럼과 로우가 교차하는 칸 하나는 필드라고 부른다.  
- 컬럼: 세로 필드 집합
- 로우: 가로 필드 집합

테이블에 데이터를 넣을 때 미리 컬럼을 정의해두고, 컬럼에 맞춰 데이터를 넣으면 된다.

다음은 사용자의 정보를 저장하는 테이블이다.
```sh
mysql> CREATE TABLE nodejs.users (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> name VARCHAR(20) NOT NULL,
    -> age INT UNSIGNED NOT NULL,
    -> married TINYINT NOT NULL,
    -> comment TEXT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> UNIQUE INDEX name_UNIQUE (name ASC))
    -> COMMENT = '사용자 정보'
    -> DEFAULT CHARSET=utf8
    -> ENGINE=InnoDB;
Query OK, 0 rows affected, 1 warning (0.67 sec)
```

#### 2.2.1. 컬럼 설정 

- 자료형: 아래는 자주 쓰이는 자료형으로 이외에도 많은 자료형이 있다.
  - `INT`: 정수 
  - `FLOAT`, `DOUBLE`: 소수
  - `VARCHAR(자릿수)`: 가변길이. `VARCHAR(10)`는 길이가 0~10인 문자열을 넣을 수 있음
  - `CHAR(자릿수)`: 고정길이. ` CHAR(10)`는 반드시 길이가 10인 문자열만 넣어야 함. 주어진 길이보다 짧은 문자열을 넣으면 부족한 자릿수만큼 스페이스가 채워짐
  - `TEXT`: 긴 글 저장. 보통 몇 백자 이내의 문자열은 `VARCHAR`, 그보다 길면 `TEXT`로 처리
  - `TINYINT`: -127 ~ 128의 정수를 저장할 때 사용. 1 또는 0만 저장한다면, 불린 값(Boolean)같은 역할을 할 수 있다.
  - `DATETIME`: 날짜와 시간에 대한 정보
  - `DATE`:  날짜 정보만 담는다
  - `TIME`: 시간 정보만 담는다.
- 자료형 뒤 옵션
  - `NULL | NOT NULL`: 빈칸을 허용할 지 여부, `NOT NULL`인 경우 로우를 생성할 때 반드시 데이터를 입력해주어야 함
  - `AUTO_INCREMENT`: 데이터를 넣을 때 숫자를 저절로 올린다. (보통 id에 쓰임)
  - `UNSIGNED`: 숫자 자료형에 적용되는 옵션. 음수가 무시되고 0~4294967295까지 저장할 수 있다.
    - ※ 숫자 자료형은 기본적으로 음수 범위를 지원한다.(`INT`: -2147483648 ~ 2147483647)
    - `FLOAT`과 `DOUBLE`에는 `UN` 적용이 불가능하다. 
    - 음수가 나올 수 없는 컬럼에 체크해두면 좋다.
  - `ZEROFILL`: 숫자의 자릿수가 고정되어 있을 때 사용.
    - `INT(4)`인데 숫자 1을 넣으면 0001이 되는 식으로 비어있는 자리에 모두 0을 넣는다.
  - `DEFAULT now()`: 기본값으로 정보를 넣었을 때 넣는 순간의 시각이 자동으로 기록된다.
    - `DEFAULT [MySQL이 대신 넣어줄 기본값]`
    - `now()`: 현재 시각을 구한다. `CURRENT_TIMESTAMP`도 같은 의미
- `PRIMARY KEY(컬럼)`: 해당 컬럼이 기본 키(로우를 대표하는 고유한 값)인 경우 설정하는 옵션.
  - ※데이터베이스에 데이터를 넣을 때 로우 단위로 넣으며, 이때 로우를 구별하는 고유한 식별자가 필요함
- `UNIQUE INDEX [컬럼]_UNIQUE ([컬럼] ASC)`: 해당 값이 고유해야 하는지에 대한 옵션
  - 컬럼 인덱스의 이름은 `[컬럼]_UNIQUE`로, 컬럼을 오름차순(`ASC`)로 기억하겠다는 의미 (내림차순은 `DESC`)

※ `PRIMARY KEY`나 `UNIQUE INDEX`는 데이터베이스가 별도로 컬럼을 관리하므로 조회 시 속도가 빨라진다.  
`PRIMARY KEY`는 자동으로 `UNIQUE INDEX`를 포함하므로 따로 적지 않는다.

#### 2.2.2. 테이블 자체 설정

- `COMMENT`: 필수는 아님. 테이블에 대한 보충 설명.(테이블이 무슨 역할을 하는지)
- `DEFAULT CHARSET`: utf8로 설정해야 한글이 입력되므로 주의
- `ENGINE`: 여러가지 엔진이 있다. 그 중 MyISAM과 InnoDB가 제일 많이 사용된다.

```sh
mysql> DESC users;
+------------+------------------+------+-----+-------------------+----------------+
| Field      | Type             | Null | Key | Default           | Extra          |
+------------+------------------+------+-----+-------------------+----------------+
| id         | int(11)          | NO   | PRI | NULL              | auto_increment |
| name       | varchar(20)      | NO   | UNI | NULL              |                |
| age        | int(10) unsigned | NO   |     | NULL              |                |
| married    | tinyint(4)       | NO   |     | NULL              |                |
| comment    | text             | YES  |     | NULL              |                |
| created_at | datetime         | NO   |     | CURRENT_TIMESTAMP |                |
+------------+------------------+------+-----+-------------------+----------------+
6 rows in set (0.11 sec)
```

사용자 댓글을 저장하는 테이블의 컬럼

| id | commenter | comment | created_at |
|:---:|:---:|:---:|:---:|
| 고유번호 | 댓글 쓴 사용자 id | 댓글 내용 | 로우 생성일 |

```sh
mysql> CREATE TABLE nodejs.comments (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> commenter INT NOT NULL,
    -> comment VARCHAR(100) NOT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> INDEX commenter_idx (commenter ASC),
    -> CONSTRAINT commenter
    -> FOREIGN KEY (commenter)
    -> REFERENCES nodejs.users (id)
    -> ON DELETE CASCADE
    -> ON UPDATE CASCADE)
    -> COMMENT = '댓글'
    -> DEFAULT CHARSET=utf8
    -> ENGINE=InnoDB;
Query OK, 0 rows affected, 1 warning (0.26 sec)
```

- `CONSTRAINT [제약 조건명] FOREIGN KEY ([컬럼명]) REFERENCES [참고하는 컬럼명]`
  - `FOREIGN KEY ([컬럼])`: 다른 테이블의 기본 키를 저장하는 컬럼. **외래 키(foreign key)**
- `ON DELETE CASCADE`, `ON UPDATE CASCADE`: 참고하는 정보가 수정되거나 삭제되면 연결된 정보도 같이 수정하거나 삭제한다는 의미

```
mysql> SHOW TABLES;
+------------------+
| Tables_in_nodejs |
+------------------+
| comments         |
| users            |
+------------------+
2 rows in set (0.00 sec)
```