package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	connectdb "rest-api/db"
	"rest-api/internal/handlers"
)

const (
	allUsers      = "/users"
	usersById     = "/users/:id"
	article       = "/articles"
	articleById   = "/articles/:id"
	tasks         = "/tasks"
	tasksByUserId = "/users/:id/tasks"
	departments   = "/departments"
	project       = "/projects"
)

func main() {
	// Загружаем данные из .env файла
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Ошибка при загрузке .env файла: %v", err)
	}
	// Подключение к БД
	db, err := connectdb.ConToDatabase()
	//if err != nil {
	//	log.Fatalf("Ошибка при подключении к базе данных: %v", err)
	//}
	defer db.Close()

	fmt.Println("Подключение к базе данных успешно установлено")

	r := gin.Default()

	//запросы ебанутого уровня кондиций
	r.GET(allUsers, handlers.GetAllUsersHandler(db))
	r.GET(usersById, handlers.GetUserByIdHandler(db))
	r.GET(article, handlers.GetAllArticlesHandler(db))
	r.GET(articleById, handlers.GetArticlesByIdHandler(db))
	r.GET(tasksByUserId, handlers.GetTasksByUserIdHandler(db))

	r.POST(tasks, handlers.CreateTaskHandler(db))
	r.POST(departments, handlers.CreateDepartmentHandler(db))
	r.POST(project, handlers.CreateProjectHandler(db))

	r.Run(":3002")
}
