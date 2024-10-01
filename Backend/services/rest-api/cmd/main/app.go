package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"rest-api/db"
	"rest-api/internal/handler/http"
)

const (
	allUsers          = "/users"
	usersById         = "/users/:id"
	article           = "/articles"
	articleById       = "/articles/:id"
	CreateTasks       = "/tasks"
	tasksByUserId     = "/users/:id/tasks"
	CreateDepartments = "/departments"
	CreateProject     = "/projects"
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

	r.POST(CreateTasks, http.CreateTaskHandler(db))
	r.POST(CreateDepartments, http.CreateDepartmentHandler(db))
	r.POST(CreateProject, http.CreateProjectHandler(db))

	r.Run(":3002")
}
