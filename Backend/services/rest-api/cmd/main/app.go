package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/julienschmidt/httprouter"
	"log"
	"net"
	"net/http"
	"rest-api/internal/user"

	"time"
)

func main() {
	//подключение к бд
	db, err := sql.Open("mysql", "root:spiritbinge@tcp(127.0.0.1:3306)/lab")
	if err != nil { // обработка ошибки
		panic(err)
	}
	defer db.Close()

	fmt.Println("подключено к базе")

	router := httprouter.New()

	handler := user.NewHandler()

}

func start(router *httprouter.Router) {
	listener, err := net.Listen("tcp", "127.0.0.1:3002")
	if err != nil {
		panic(err)
	}

	server := &http.Server{
		Handler:           router,
		WriteTimeout:      15 * time.Second,
		ReadHeaderTimeout: 15 * time.Second,
	}
	log.Fatalln(server.Serve(listener))
}
