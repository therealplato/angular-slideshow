package main

import (
	"fmt"
	"os"

	"github.com/therealplato/angular-slideshow"
	"gopkg.in/urfave/cli.v1"
)

func main() {
	app := cli.NewApp()
	app.Name = "slidess"
	app.Usage = "serve slides"
	app.Action = func(c *cli.Context) error {
		fmt.Println("boom! I say!")
		cwd, _ := os.Getwd()
		slidess.Start(cwd)
		return nil
	}
	app.Run(os.Args)
}
