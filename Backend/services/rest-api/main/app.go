package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	connectdb "rest-api/db"
	"rest-api/handlers"
)

const (
	allUsers  = "/users"
	usersById = "/users/:id"
	article   = "/articles"
)

type User struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	JobTitle  string `json:"job_title"`
	DepID     string `json:"dep_id"`
}

func main() {
	// Загружаем данные из .env файла
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Ошибка при загрузке .env файла: %v", err)
	}
	// Подключение к БД
	db, err := connectdb.ConnectToDatabase()
	if err != nil {
		log.Fatalf("Ошибка при подключении к базе данных: %v", err)
	}
	defer db.Close()

	fmt.Println("Подключение к базе данных успешно установлено")

	r := gin.Default()

	r.GET(allUsers, handlers.GetAllUsersHandler(db))
	r.GET(usersById, handlers.GetUserByIdHandler(db))
	r.GET(article, handlers.GetAllArticlesHandler(db))

	r.Run(":3002")
}
