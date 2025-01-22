package http

import (
	"database/sql"
	"fmt"
	"net/http"
	"path/filepath"
	"rest-api/pkg/requests"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func GetAllUsersHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		users, err := requests.GetAllUsers(db)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, users)
	}
}

func GetUserByIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid user ID"})
			return
		}

		user, err := requests.GetUser(db, id)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		if user == nil {
			c.JSON(404, gin.H{"error": "User not found"})
			return
		}

		c.JSON(200, user)
	}
}

func GetAllArticlesHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Извлекаем ID пользователя из куки
		cookie, err := c.Cookie("userid")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized: userid not found in cookie"})
			return
		}

		userId, err := strconv.Atoi(cookie)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid userid in cookie"})
			return
		}

		// Получаем статьи
		articles, err := requests.GetAllArticles(db, userId)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		// Возвращаем статьи клиенту
		c.JSON(200, articles)
	}
}

func GetArticlesByIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получаем ID статьи из параметров
		idStr := c.Param("id")
		articleID, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid article ID"})
			return
		}

		// Получаем ID пользователя из куки
		cookie, err := c.Cookie("userid")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized: missing userid in cookie"})
			return
		}

		userID, err := strconv.Atoi(cookie)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid userid in cookie"})
			return
		}

		// Получаем статью
		article, err := requests.GetArticleById(db, articleID, userID)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		if article == nil {
			c.JSON(404, gin.H{"error": "Article not found"})
			return
		}

		c.JSON(200, article)
	}
}

func GetTasksByUserIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		//получаю айдишник из юрл
		idStr := c.Param("id")
		userId, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid user ID"})
			return
		}
		//получаю таски
		tasks, err := requests.GetTaskByID(db, userId)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, tasks)

	}

}

func CreateDepartmentHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newDepartment requests.Dep

		if err := c.ShouldBindJSON(&newDepartment); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		depID, err := requests.CreateDepartment(db, newDepartment)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(201, gin.H{"message": "Department created", "department_id": depID})
	}
}

func CreateProjectHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newProject requests.Project

		if err := c.ShouldBindJSON(&newProject); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		// Добавляем новый проект в базу данных
		projID, err := requests.CreateProject(db, newProject)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		// Возвращаем ответ с ID нового проекта
		c.JSON(201, gin.H{"message": "Project created", "project_id": projID})
	}
}

func GetCommentByIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid comment ID"})
			return
		}

		comment, err := requests.GetCommentsByArticleId(db, id)

		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		if comment == nil {
			c.JSON(404, gin.H{"error": "comment not found"})
			return
		}
		c.JSON(200, comment)
	}

}

func CreateComHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		cookie, err := c.Cookie("userid")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized, userid is not found in cookie"})
			return
		}
		authorID, err := strconv.Atoi(cookie)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid userid in cookie"})
		}

		idStr := c.Param("id")
		articleID, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid article ID"})
			return
		}

		var newComment requests.CreateComment
		if err := c.ShouldBindJSON(&newComment); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		//вставляю комент в бдшку
		err = requests.AddComment(db, articleID, authorID, newComment.Comm)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(201, gin.H{"message": "Comment added successfully"})
	}
}

func UserUpdateHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		userId, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid user ID"})
			return
		}

		var updateUser requests.UserUdpate
		if err := c.ShouldBindJSON(&updateUser); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		err = requests.UserUpdate(db, userId, updateUser)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(204, gin.H{"message": "User updated successfully!"})
	}
}

func CreateArticleHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		requests.CreateArticle(c, db)
	}
}

func GetUserBySelfHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie("userid")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized, no userid cookie found"})
			return
		}

		userId, err := strconv.Atoi(cookie)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid user ID"})
			return
		}

		user, err := requests.GetSelf(db, userId)
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		if user == nil {
			c.JSON(400, gin.H{"error": "User not found"})
			return
		}

		c.JSON(200, user)
	}
}

func GetTaskByUserIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie("userid")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized, userid is not found in cookie"})
			return
		}
		userId, err := strconv.Atoi(cookie)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid userid in cookie"})
			return
		}
		tasks, err := requests.GetTaskByID(db, userId)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, tasks)
	}
}

func AddToVadoritesHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie("userid")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized, userid is not found in cookie"})
			return
		}
		userId, err := strconv.Atoi(cookie)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid userid in cookie"})
			return
		}

		articleIDStr := c.Param("id")
		articleID, err := strconv.Atoi(articleIDStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid article ID"})
			return
		}
		err = requests.AddToVadoriteArticles(db, userId, articleID)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failied to add article to favorite"})
			return
		}
		c.JSON(201, gin.H{"message": "Article added to favorite successfully"})
	}
}

func GetArticleByAuthorIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		authorId, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid author id"})
			return
		}

		articles, err := requests.GetArticlesByAuthorID(db, authorId)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to get articles"})
			return
		}

		if len(articles) == 0 {
			c.JSON(404, gin.H{"error": "No articles found for this author"})
			return
		}

		c.JSON(200, articles)
	}
}

func CreateTaskByUserIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newTask requests.TaskByID
		idStr := c.Param("id")
		employeeId, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid employee ID"})
			return
		}

		if err := c.ShouldBindJSON(&newTask); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		err = requests.CreateTaskByEmployeeId(db, employeeId, newTask)
		if err != nil {
			c.JSON(400, gin.H{"error": "Failed to add task"})
			return
		}

		c.JSON(201, gin.H{"message": "Task added successfully!"})
	}
}

func CreatePFPHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получаем ID пользователя из параметров URL
		userIDStr := c.Param("id")
		userID, err := strconv.Atoi(userIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		// Получаем файл из запроса
		file, err := c.FormFile("avatar")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to upload avatar"})
			return
		}

		// Генерируем уникальное имя файла на основе таймстемпа UNIX
		uniqueFilename := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)

		// Сохраняем файл в папку uploads/pics
		path := filepath.Join("uploads", "pics", uniqueFilename)
		if err := c.SaveUploadedFile(file, path); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save avatar"})
			return
		}

		// Формируем URL для файла
		avatarURL := fmt.Sprintf("http://localhost:3002/uploads/pics/%s", uniqueFilename)

		// Обновляем ссылку на аватар в базе данных
		err = requests.CreatePFP(db, userID, avatarURL)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update avatar in database"})
			return
		}

		// Возвращаем успешный ответ с URL аватарки
		c.JSON(http.StatusOK, gin.H{
			"message":    "Avatar updated successfully",
			"avatar_url": avatarURL,
		})
	}
}

func BlockUserHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		userID, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid user ID"})
			return
		}
		err = requests.FireUser(db, userID)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to block user"})
			return
		}
		c.JSON(204, gin.H{"message": "User blocked successfully!"})
	}
}

func GetAllDepartaments(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		departments, err := requests.GetAllDepartments(db)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, departments)
	}
}
