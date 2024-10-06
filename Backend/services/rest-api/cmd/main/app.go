package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"rest-api/internal/handler/http"
	"rest-api/pkg/db"
	"rest-api/pkg/requests"
)

const (
	allUsers          = "/users"
	usersById         = "/users/:id"
	article           = "/articles"
	articleById       = "/articles/:id"
	commentsByID      = "/articles/:id/comments"
	addComm           = "/articles/:id/comments"
	CreateTasks       = "/tasks"
	tasksByUserId     = "/users/:id/tasks"
	CreateDepartments = "/departments"
	CreateProject     = "/projects"
	uploadFilePath    = "/upload"
	staticUploadFile  = "/uploads"
	uploadHtmlPath    = "/upload-html"
	getUserByIDCookie = "/self"
	getTaskByID       = "/tasks/selftasks"
)

func main() {
	// Загружаем данные из .env файла
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Ошибка при загрузке .env файла: %v", err)
	}
	// Подключение к БД
	db, err := connect.ConToDatabase()
	//if err != nil {
	//	log.Fatalf("Ошибка при подключении к базе данных: %v", err)
	//}
	defer db.Close()

	fmt.Println("Подключение к базе данных успешно установлено")

	r := gin.Default()

	//запросы ебанутого уровня кондиций
	r.GET(allUsers, http.GetAllUsersHandler(db))
	r.GET(usersById, http.GetUserByIdHandler(db))
	r.GET(article, http.GetAllArticlesHandler(db))
	r.GET(articleById, http.GetArticlesByIdHandler(db))
	r.GET(tasksByUserId, http.GetTasksByUserIdHandler(db))
	r.GET(commentsByID, http.GetCommentByIdHandler(db))
	r.GET(getUserByIDCookie, http.GetUserBySelfHandler(db))
	r.GET(getTaskByID, http.GetTaskByUserIdHandler(db))

	r.POST(CreateTasks, http.CreateTaskHandler(db))
	r.POST(CreateDepartments, http.CreateDepartmentHandler(db))
	r.POST(CreateProject, http.CreateProjectHandler(db))
	r.POST(addComm, http.CreateComHandler(db))

	r.PATCH(usersById, http.UserUpdateHandler(db))

	r.POST(uploadFilePath, requests.UploadFile)
	r.Static(staticUploadFile, "./uploads")

	r.POST(uploadHtmlPath, http.CreateArticleHandler(db))

	r.Run(":3002")
}
