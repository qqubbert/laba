package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"rest-api/internal/handler/http"
	"rest-api/pkg/db"
	"rest-api/pkg/requests"
	"time"
)

const (
	allUsers           = "/users"
	userById           = "/users/:id"
	article            = "/articles"
	articleById        = "/articles/:id"
	commentsByID       = "/articles/:id/comments"
	addComm            = "/articles/:id/comments"
	addToFavorite      = "/articles/:id/favorites"
	articlesByAuthorId = "/articles/author/:id"
	tasksByUserId      = "/users/:id/tasks"
	CreateDepartments  = "/departments"
	CreateProject      = "/projects"
	uploadFilePath     = "/upload"
	staticUploadFile   = "/uploads"
	uploadHtmlPath     = "/upload-html"
	getUserByIDCookie  = "/self"
	getTaskByID        = "/tasks/selftasks"
	createPFP          = "/users/:id/avatar"
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
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},                            // Разрешенные источники
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}, // Разрешенные методы
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},          // Разрешенные заголовки
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	//запросы уровня кондиций
	r.GET(allUsers, http.GetAllUsersHandler(db))
	r.GET(userById, http.GetUserByIdHandler(db))
	r.GET(article, http.GetAllArticlesHandler(db))
	r.GET(articleById, http.GetArticlesByIdHandler(db))
	r.GET(tasksByUserId, http.GetTasksByUserIdHandler(db))
	r.GET(commentsByID, http.GetCommentByIdHandler(db))
	r.GET(getUserByIDCookie, http.GetUserBySelfHandler(db))
	r.GET(getTaskByID, http.GetTaskByUserIdHandler(db))
	r.GET(articlesByAuthorId, http.GetArticlesByIdHandler(db))

	r.POST(CreateDepartments, http.CreateDepartmentHandler(db))
	r.POST(CreateProject, http.CreateProjectHandler(db))
	r.POST(addComm, http.CreateComHandler(db))
	r.POST(addToFavorite, http.AddToVadoritesHandler(db))
	r.POST(tasksByUserId, http.CreateTaskByUserIdHandler(db))

	r.PATCH(userById, http.UserUpdateHandler(db))
	r.PATCH(createPFP, http.CreatePFPHandler(db))

	r.POST(uploadFilePath, requests.UploadFile)
	r.Static(staticUploadFile, "./uploads")

	r.POST(uploadHtmlPath, http.CreateArticleHandler(db))

	r.Run(":3002")
}
