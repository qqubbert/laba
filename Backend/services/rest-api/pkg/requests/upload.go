package requests

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"os"
)

func UploadFile(c *gin.Context) {
	// Проверяем, существует ли папка uploads, если нет — создаём
	if _, err := os.Stat("./uploads"); os.IsNotExist(err) {
		err := os.Mkdir("./uploads", os.ModePerm)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to create upload directory"})
			return
		}
	}

	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "File not found"})
		return
	}
	defer file.Close()

	// Определяем путь для сохранения файла
	filePath := fmt.Sprintf("./uploads/%s", header.Filename)

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

	fileURL := fmt.Sprintf("http://localhost:3002/uploads/%s", header.Filename)
	c.JSON(201, gin.H{"file_url": fileURL})
}
