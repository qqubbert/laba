package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
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
	db, err := connectToDatabase()
	if err != nil {
		log.Fatalf("Ошибка при подключении к базе данных: %v", err)
	}
	defer db.Close()

	fmt.Println("Подключение к базе данных успешно установлено")

	r := gin.Default()

	r.GET("/users", func(c *gin.Context) {
		users, err := getUsers(db)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, users)
	})

	r.Run(":3002")
}

func getUsers(db *sql.DB) ([]User, error) {
	query := `SELECT u.FirstName, u.LastName, u.JobTitle, d.DepTtl
		FROM Users u
		LEFT JOIN Departaments d ON u.DepID = d.DepID`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.FirstName, &user.LastName, &user.JobTitle, &user.DepID); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

func connectToDatabase() (*sql.DB, error) {
	root := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", root, password, host, port, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
