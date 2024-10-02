package http

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"rest-api/pkg/requests"
	"strconv"
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
		articles, err := requests.GetAllArticles(db)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, articles)
	}
}

func GetArticlesByIdHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid article ID"})
			return
		}

		article, err := requests.GetArticleById(db, id)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		if article == nil {
			c.JSON(404, gin.H{"error": "article not found"})
			return
		}
		c.JSON(200, article)
	}
}

func CreateTaskHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var task requests.Task

		//достаю данные из тела запроа
		if err := c.BindJSON(&task); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request body"})
			return
		}
		//проверяю на наличие айди работника и таски
		if task.IdEmployee == 0 || task.Task == "" {
			c.JSON(400, gin.H{"error": "Missing employee id or task description"})
			return
		}

		//создаю задачу
		err := requests.CreateTask(db, task)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(201, gin.H{"message": "Task created successfully!"})
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

		idStr := c.Param("id")

		var newComment requests.CreateComment

		if err := c.ShouldBindJSON(&newComment); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		articleID, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid article ID"})
			return
		}
		//вставляю комент в бдшку
		err = requests.AddComment(db, articleID, newComment.AuthorID, newComment.Comm)
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
