package user

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
	"rest-api/internal/handlers"
	"rest-api/pkg/logging"
)

const (
	allUsersURL = "/users"
	userURL     = "/users/:uuid"
)

type handler struct {
	logger logging.Logger
}

func NewHandler(logger logging.Logger) handlers.Handler {
	return &handler{
		logger: logger,
	}
}

func (h *handler) Register(router *httprouter.Router) {
	router.GET(allUsersURL, h.GetList)
	router.POST(allUsersURL, h.CreateUser)
	router.GET(userURL, h.GetUserByUUID)
	router.PUT(userURL, h.UpdateUser)
	router.PATCH(userURL, h.PartiallyUpdateUser)
	router.DELETE(userURL, h.DeleteUser)
}

func (h *handler) GetList(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	w.Write([]byte("this is list of users"))
}

func (h *handler) CreateUser(w http.ResponseWriter, request *http.Request, params httprouter.Params) {
	w.Write([]byte("this is create user"))
}

func (h *handler) GetUserByUUID(w http.ResponseWriter, request *http.Request, params httprouter.Params) {
	w.Write([]byte("this is user by uuid"))
}

func (h *handler) UpdateUser(w http.ResponseWriter, request *http.Request, params httprouter.Params) {
	w.Write([]byte("this is update user"))
}

func (h *handler) PartiallyUpdateUser(w http.ResponseWriter, request *http.Request, params httprouter.Params) {
	w.Write([]byte("this is partially update user"))
}

func (h *handler) DeleteUser(w http.ResponseWriter, request *http.Request, params httprouter.Params) {
	w.Write([]byte("this is delete user"))
}
