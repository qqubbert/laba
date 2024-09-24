package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/julienschmidt/httprouter"
	"net"
	"net/http"
	"rest-api/internal/user"
	"rest-api/pkg/logging"
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

	logger := logging.GetLogger()
	logger.Info("create router")
	router := httprouter.New()

	logger.Info("register user handler")
	handler := user.NewHandler(logger)
	handler.Register(router)

	start(router)

}

func start(router *httprouter.Router) {
	logger := logging.GetLogger()
	logger.Info("start application")

	listener, err := net.Listen("tcp", ":3002")
	if err != nil {
		panic(err)
	}

	server := &http.Server{
		Handler:           router,
		WriteTimeout:      15 * time.Second,
		ReadHeaderTimeout: 15 * time.Second,
	}
	logger.Info("server is listening port 0.0.0.0:3002")
	logger.Fatal(server.Serve(listener))
}
