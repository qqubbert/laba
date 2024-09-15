package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from Go service!")
}

func main() {
	http.HandleFunc("/hello!!!mamutraxal", helloHandler)
	fmt.Println("Go service is running on http://localhost:3002")
	http.ListenAndServe(":3002", nil)
}
