package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	requests2 "rest-api/internal/requests"
	"strconv"
)

func GetAllUsersHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		users, err := requests2.GetAllUsers(db)
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

		user, err := requests2.GetUser(db, id)
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
		articles, err := requests2.GetAllArticles(db)
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

		article, err := requests2.GetArticleById(db, id)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		if article == nil {
			c.JSON(404, gin.H{"error": "User not found"})
			return
		}
		c.JSON(200, article)
	}
}
