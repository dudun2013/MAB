
POSTMAN :

1- Register
   Endpoint:

    URL: http://localhost:5000/auth/register
    Method: POST
    Headers:
    Content-Type: application/json

    {
        "username": "suparmaidi",
        "email": "suparmaididudun@gmail.com",
        "password": "suparmaidi12345"
    }
    Response:
    {
    "message": "User registered successfully",
    "user": {
        "user_id": 38,
        "username": "suparmaidi",
        "email": "suparmaididudun@gmail.com",
        "password": "$2b$10$1BqRccSRmpGlMhWezrGHX.rJzU3gAqWKHmWbOvWq/M.IFhrOkLaP.",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGFybWFpZGlkdWR1bkBnbWFpbC5jb20iLCJpYXQiOjE3MzQ0ODU4OTksImV4cCI6MTczNDQ4OTQ5OX0.St6iyO8WZeZzDpFjQ5pEKZn4ClNHfWnYQZVUMsYTHrU",
        "updatedAt": "2024-12-18T01:38:19.603Z",
        "createdAt": "2024-12-18T01:38:19.603Z"
        }
    }


2- Verify Email

    Endpoint:

    URL: http://localhost:5000/auth/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGFybWFpZGlkdWR1bkBnbWFpbC5jb20iLCJpYXQiOjE3MzQ0ODU4OTksImV4cCI6MTczNDQ4OTQ5OX0.St6iyO8WZeZzDpFjQ5pEKZn4ClNHfWnYQZVUMsYTHrU
    Method: GET
    Steps:

    1. Saat melakukan registrasi, email akan dikirimkan ke email user (lihat token pada server log jika menggunakan dummy email).
    2. Gunakan token yang dikirimkan dalam URL.
    
    Expected Response:

    Status Code: 200 OK
    Response Body:
    json
    
    {
    "message": "Email verified successfully"
    }


3-  Login
    Endpoint:

    URL: http://localhost:5000/auth/login
    Method: POST
    Headers:
    Content-Type: application/json

    {
        "email": "suparmaididudun@gmail.com",
        "password": "suparmaidi12345"
    }
    Response:
    {
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJpYXQiOjE3MzQ0ODY3ODQsImV4cCI6MTczNDQ5MDM4NH0.XjSV8xGP32Y1jkiXxLwlf3eU-74KqhGUx7wuOkqeuRM"
    }


4-  Course

    a. Filtering
       Endpoint:
       http://localhost:5000/course?filter=category:Matematika,status:active&sortBy=createdAt
       Method : GET

       Hasilnya:
        {
            "message": "Courses retrieved successfully",
            "data": [
                {
                    "course_id": 4,
                    "title": "Video Matematika Dasar",
                    "description": "Matematika Hitungan Desimal",
                    "category": "Matematika",
                    "status": "active",
                    "createdAt": "2024-12-18T17:53:45.000Z",
                    "updatedAt": "2024-12-18T17:53:45.000Z"
                }
            ]
        }       

    b. Searching
       Endpoint:
       http://localhost:5000/course?search=Video Belajar Anak&sortBy=title
       Method : GET
    
       Hasilnya:
            {
            "message": "Courses retrieved successfully",
            "data": [
                {
                    "course_id": 3,
                    "title": "Video Belajar Anak",
                    "description": "Tutorial Node.js For Kids",
                    "category": "Programming",
                    "status": "active",
                    "createdAt": "2024-12-18T17:46:32.000Z",
                    "updatedAt": "2024-12-18T17:46:32.000Z"
                }
            ]
        }

    c.  Sorting
        Endpoint:
        http://localhost:5000/course?orderBy=title
        Method : GET  (orderBY -> DESC || sortBy -> ASC)

        Hasilnya:

                {
            "message": "Courses retrieved successfully",
            "data": [
                {
                    "course_id": 4,
                    "title": "Video Matematika Dasar",
                    "description": "Matematika Hitungan Desimal",
                    "category": "Matematika",
                    "status": "active",
                    "createdAt": "2024-12-18T17:53:45.000Z",
                    "updatedAt": "2024-12-18T17:53:45.000Z"
                },
                {
                    "course_id": 3,
                    "title": "Video Belajar Anak",
                    "description": "Tutorial Node.js For Kids",
                    "category": "Programming",
                    "status": "active",
                    "createdAt": "2024-12-18T17:46:32.000Z",
                    "updatedAt": "2024-12-18T17:46:32.000Z"
                },
                {
                    "course_id": 2,
                    "title": "New Course",
                    "description": "Description of the new course",
                    "category": "Programming",
                    "status": "active",
                    "createdAt": "2024-12-18T17:44:46.000Z",
                    "updatedAt": "2024-12-18T17:44:46.000Z"
                },
                {
                    "course_id": 1,
                    "title": "New Course",
                    "description": "Description of the new course",
                    "category": "Programming",
                    "status": "active",
                    "createdAt": "2024-12-18T16:28:09.000Z",
                    "updatedAt": "2024-12-18T16:28:09.000Z"
                }
            ]
        }


5-  Upload
    Endpoint:
    http://localhost:5000/course/upload
    Methode : POST
    Key                 Value
    image       File    abi.png / gambar berupa File  

    Hasilnya :

        {
        "message": "File uploaded successfully",
        "file": {
            "fieldname": "image",
            "originalname": "abi.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "./uploads",
            "filename": "1734528774693.png",
            "path": "uploads\\1734528774693.png",
            "size": 3660
        }
    }


6..  Protected Endpoint (Testing Middleware)

    Tambahkan middleware ke endpoint tertentu (contoh: Get Video):

    router.get('/course', authMiddleware.verifyToken, courseController.getList);
    
    Endpoint:
    URL: http://localhost:5000/course
    Method: GET
    Headers:
        Authorization: Bearer your_generated_jwt_token

    Expected Response (Token Valid):
        Status Code: 200 OK
        Response Body:
        
        {
        "message": "Access granted",
        "data": []
        }

    Expected Response (Token Invalid):
        Status Code: 401 Unauthorized
        Response Body:
        json
        
        {
        "message": "Invalid token"
        }



ini yang nodemailer
espf vqsn gyas jdwm

Outlook
azua vglu pbxf stne
