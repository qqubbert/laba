package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	//подключение к бд
	db, err := sql.Open("mysql", "root:spiritbinge@tcp(127.0.0.1:3306)/lab")
	if err != nil { // обработка ошибки
		panic(err)
	}
	defer db.Close()

	fmt.Println("подключено к базе")

}
