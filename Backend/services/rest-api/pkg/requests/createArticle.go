package requests

import (
	"database/sql"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateArticleRequest struct {
	Title     string                `form:"title" binding:"required"`
	Completed bool                  `form:"completed"`
	File      *multipart.FileHeader `form:"file" binding:"required"`
	Biology   *bool                 `form:"biology"`
	Chemistry *bool                 `form:"chemistry"`
	It        *bool                 `form:"it"`
	Physics   *bool                 `form:"physics"`
}

func CreateArticle(c *gin.Context, db *sql.DB) {
	var req CreateArticleRequest

	// Привязываем данные из формы
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	cookie, err := c.Cookie("userid")
	if err != nil {
		c.JSON(401, gin.H{"error": "Unauthorized, userid not found in cookie"})
		return
	}

	userID, err := strconv.Atoi(cookie)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid userid in cookie"})
		return
	}

	// Проверяем, существует ли папка uploads, если нет — создаём
	if _, err := os.Stat("./uploads/articles"); os.IsNotExist(err) {
		err := os.Mkdir("./uploads/articles", os.ModePerm)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to create articles directory"})
			return
		}
	}

	// Открываем файл
	file, err := req.File.Open()
	if err != nil {
		c.JSON(400, gin.H{"error": "File not found"})
		return
	}
	defer file.Close()

	//// Генерируем уникальное имя файла, добавляя к имени оригинального файла timestamp
	uniqueFilename := fmt.Sprintf("%d_%s", time.Now().Unix(), req.File.Filename)

	// Определяем путь для сохранения файла
	filePath := fmt.Sprintf("./uploads/articles/%s", uniqueFilename)

	// Сохраняем файл
	out, err := os.Create(filePath)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to save file"})
		return
	}
	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to save file"})
		return
	}

	fileURL := fmt.Sprintf("http://localhost:3002/uploads/articles/%s", uniqueFilename)

	// Вставляем данные в базу данных
	_, err = db.Exec("INSERT INTO article (title, HtmlLink, author_id, completed, biology, chemistry, it, physics) VALUES (?, ?, ?, TRUE, ?, ?, ?, ?)", req.Title, fileURL, userID, req.Biology, req.Chemistry, req.It, req.Physics)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, gin.H{"message": "Article created successfully", "file_url": fileURL})
}
