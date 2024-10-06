package main

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	polygon "github.com/polygon-io/client-go/rest"
	"github.com/polygon-io/client-go/rest/models"
)

type ChartData struct {
	CandleStickData [][]interface{} `json:"candleStickData"`
	VolumeData [][]interface{} `json:"volumeData"`
}
func getCandleStickData(items []models.Agg) [][]interface{} {
	var candleStickData [][]interface{}
	for _, item := range items {
		candleStickEntry := []interface{} {
			item.Open,
			item.High,
			item.Low,
			item.Close,
			item.Volume,
		}
		candleStickData = append(candleStickData, candleStickEntry)
	}
		return candleStickData
}
func main() {
	app := fiber.New()
	 
	p := polygon.New("1JnWbfZH3sMMBhfYKdvRvFMJeWNEOZ2v")



	app.Get("/aapl", func(c *fiber.Ctx) error {

		params := models.GetTickerDetailsParams{
			Ticker: "AAPL",
		}.WithDate(models.Date(time.Date(2021, 7, 22, 0, 0, 0, 0, time.Local)))
		
		res, err := p.GetTickerDetails(c.Context(), params)
		if err != nil {
			log.Fatal(err)
		}
		return c.JSON(res.Results)
	})
	

	app.Get("/stock/:ticker", func(c *fiber.Ctx) error {
		// reqParam := c.Params("ticker")
		// ticker := strings.ToUpper(reqParam)
		params := models.ListAggsParams{
			Ticker:     "O:SPY251219C00650000",
			Multiplier: 1,
			Timespan:   "day",
			From:       models.Millis(time.Date(2024, 7, 1, 0, 0, 0, 0, time.UTC)),
			To:         models.Millis(time.Date(2024, 9, 9, 0, 0, 0, 0, time.UTC)),
		}.WithOrder(models.Desc).WithLimit(50000).WithAdjusted(true)
	
		// make request
		iter := p.ListAggs(c.Context(), params)
		
		var items []interface{}  // Initialize a slice to hold the items
		
		for iter.Next() {
			items = append(items, iter.Item())  // Collect each item into the slice
		}
	
		if iter.Err() != nil {
			log.Fatal(iter.Err())
		}

		
		
		return c.JSON(items)
	})

	app.Listen(":3000")
}