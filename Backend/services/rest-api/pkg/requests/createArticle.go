package requests

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"mime/multipart"
	"os"
)

type CreateArticleRequest struct {
	Title    string                `form:"title" binding:"required"`
	AuthorID int                   `form:"author_id" binding:"required"`
	File     *multipart.FileHeader `form:"file" binding:"required"`
}

func CreateArticle(c *gin.Context, db *sql.DB) {
	var req CreateArticleRequest

	// Привязываем данные из формы
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Проверяем, существует ли папка uploads, если нет — создаём
	if _, err := os.Stat("./articles"); os.IsNotExist(err) {
		err := os.Mkdir("./articles", os.ModePerm)
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

	// Определяем путь для сохранения файла
	filePath := fmt.Sprintf("./articles/%s", req.File.Filename)

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

	fileURL := fmt.Sprintf("http://localhost:3002/articles/%s", req.File.Filename)

	// Вставляем данные в базу данных
	_, err = db.Exec("INSERT INTO article (title, HtmlLink, author_id) VALUES (?, ?, ?)", req.Title, fileURL, req.AuthorID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, gin.H{"message": "Article created successfully", "file_url": fileURL})
}
