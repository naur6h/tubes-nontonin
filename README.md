# 🎬 NONTONIN - Streaming Review Application

## 📌 Project Overview

**Nontonin** merupakan aplikasi manajemen film dan ulasan berbasis **Microservice Architecture** yang dibangun menggunakan **GraphQL API**, **Node.js**, **MySQL**, dan **Docker**.

Aplikasi ini memisahkan setiap fitur utama ke dalam service yang independen sehingga lebih mudah dikembangkan, dikelola, dan dilakukan deployment.

Terdapat tiga service utama:

1. 👤 **User Service**  
   Bertanggung jawab untuk mengelola seluruh data pengguna.

2. 🎬 **Movie Service**  
   Bertanggung jawab untuk mengelola data dan informasi film.

3. ⭐ **Review Service**  
   Bertanggung jawab untuk mengelola ulasan serta penilaian terhadap film.

Setiap service memiliki:
- Server Node.js dan Express sendiri.
- GraphQL Schema sendiri.
- Koneksi database MySQL masing-masing dan berjalan dilocal.
- Endpoint API GraphQL masing-masing.
- Container Docker tersendiri.

---

# 🏗️ System Architecture

```
                    🌐 HTML Client
                         |
                         |
             GraphQL Request (HTTP)
                         |
     ------------------------------------------------
     |                      |                       |
     |                      |                       |
     ▼                      ▼                       ▼

👤 User Service       🎬 Movie Service       ⭐ Review Service
Port : 3001           Port : 3002            Port : 3003
GraphQL API           GraphQL API            GraphQL API

     |                      |                       |
     |                      |                       |
     ▼                      ▼                       ▼

Database             Database               Database
nontonin             nontonin_movies        nontonin_review

     (Seluruh database berjalan dalam MySQL Container melalui Docker)
```

---

# 👤 User Service

## Description

User Service digunakan untuk mengelola seluruh informasi pengguna aplikasi Nontonin.

Service ini berjalan pada:

```
http://localhost:3001
```

### GraphQL Endpoint

```
http://localhost:3001/graphql
```

### Database

Database yang digunakan:

```
nontonin
```

### Available Operations

#### Query

Menampilkan seluruh data pengguna:

```graphql
{
  users {
    id
    username
    email
    password
  }
}
```

#### Mutation - Add User

Menambahkan pengguna baru:

```graphql
mutation {
  addUser(
    username: "mia",
    email: "mia@gmail.com",
    password: "123456"
  ){
    id
    username
  }
}
```

#### Mutation - Update User

Memperbarui username dan email pengguna:

```graphql
mutation {
  updateUser(
    id: 1,
    username: "mia baru",
    email: "mia@gmail.com"
  ){
    id
    username
    email
  }
}
```

---

# 🎬 Movie Service

## Description

Movie Service digunakan untuk mengelola data film yang tersedia pada aplikasi Nontonin.

Service ini berjalan pada:

```
http://localhost:3002
```

### GraphQL Endpoint

```
http://localhost:3002/graphql
```

### Database

Database yang digunakan:

```
nontonin_movies
```

### Available Operations

Operasi yang tersedia pada Movie Service meliputi:

- Query untuk melihat daftar film.
- Mutation untuk menambahkan film baru.
- Mutation untuk memperbarui informasi film.

Contoh GraphQL operation dapat dijalankan melalui GraphiQL pada endpoint:

```
http://localhost:3002/graphql
```

---

# ⭐ Review Service

## Description

Review Service digunakan untuk mengelola ulasan dan rating terhadap film yang diberikan oleh pengguna.

Service ini berjalan pada:

```
http://localhost:3003
```

### GraphQL Endpoint

```
http://localhost:3003/graphql
```

### Database

Database yang digunakan:

```
nontonin_review
```

### Available Operations

Operasi yang tersedia pada Review Service meliputi:

- Query untuk melihat daftar ulasan.
- Mutation untuk menambahkan ulasan baru.
- Mutation untuk memperbarui data ulasan.

Seluruh operasi GraphQL dapat dijalankan melalui:

```
http://localhost:3003/graphql
```

---

# 🌐 Client Application

Client aplikasi dibuat menggunakan teknologi:

- HTML
- CSS
- JavaScript

Client tidak menggunakan framework tambahan seperti React atau Vue.

Setiap halaman HTML akan mengirimkan request langsung ke endpoint GraphQL masing-masing service.

Contoh:

| Client Page | Service | Endpoint |
|------------|---------|----------|
| user.html | User Service | localhost:3001/graphql |
| movie.html | Movie Service | localhost:3002/graphql |
| review.html | Review Service | localhost:3003/graphql |

---

# 🐳 Docker Architecture

Docker digunakan untuk menjalankan seluruh komponen aplikasi dalam container terpisah.

Container yang digunakan:

| Container | Function | Port |
|---|---|---|
| nontonin-mysql | Menjalankan MySQL Server | 3307:3306 |
| nontonin-user-service | Menjalankan User Service | 3001 |
| nontonin-movie-service | Menjalankan Movie Service | 3002 |
| nontonin-review-service | Menjalankan Review Service | 3003 |

Seluruh container dikelola menggunakan:

```
docker-compose.yml
```

---

# 📁 Project Structure

```
tubes-nontonin
│
├── 1-user-service
│   ├── db.js
│   ├── schema.js
│   ├── server.js
│   ├── package.json
│   ├── dockerfile
│   └── index.html
│
├── 2-movie-service
│   ├── db.js
│   ├── schema.js
│   ├── server.js
│   ├── package.json
│   ├── dockerfile
│   └── index.html
│
├── 3-review-service
│   ├── db.js
│   ├── schema.js
│   ├── server.js
│   ├── package.json
│   ├── dockerfile
│   └── index.html
│
├── init.sql
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Installation & Running Application

## Clone Repository

```bash
git clone <repository-url>
cd tubes-nontonin
```

## Build and Run Docker Container

```bash
docker-compose up --build -d
```

## Check Running Container

```bash
docker ps
```

Output yang diharapkan:

```
nontonin-mysql
nontonin-user-service
nontonin-movie-service
nontonin-review-service
```

---

# 🧪 API Testing

Setiap service menyediakan GraphiQL interface untuk melakukan pengujian GraphQL.

| Service | GraphQL URL |
|---|---|
| User Service | http://localhost:3001/graphql |
| Movie Service | http://localhost:3002/graphql |
| Review Service | http://localhost:3003/graphql |

---

# 📌 Conclusion

Nontonin merupakan implementasi aplikasi berbasis **Microservice Architecture** dengan tiga service independen yang saling terpisah. Dengan menggunakan GraphQL API, setiap service memiliki mekanisme komunikasi data yang fleksibel, sedangkan Docker membantu memastikan seluruh service dapat berjalan dalam environment yang konsisten dan mudah untuk dilakukan deployment.