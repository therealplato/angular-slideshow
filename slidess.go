package slidess

import (
	"encoding/json"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

// Start initializes the slideshow server
func Start(folder string) {
	ServeSlides(folder)
}

// ServeSlides serves images from the given folder
func ServeSlides(folder string) {
	http.HandleFunc("/folder.json", func(w http.ResponseWriter, r *http.Request) {
		ii := ListImages(folder)
		bb, err := json.Marshal(ii)
		_, err = w.Write(bb)
		if err != nil {
			panic(err)
		}
		// fmt.Fprintf(w, ii)
		// `["acestream-japi-trafficshaping.PNG", "arena-mage-2.PNG", "AV-flag.png", "prague at dusk.jpg"]`)
	})
	http.Handle("/image/", http.StripPrefix("/image/", http.FileServer(http.Dir(folder))))
	// http.Handle("/", http.FileServer(http.Dir("C:\\Users\\there\\go\\src\\github.com\\therealplato\\angular-slideshow\\app")))
	http.Handle("/", http.FileServer(assetFS()))
	// http.Handle("/image", http.FileServer(http.Dir(folder)))
	// http.Handle("/image", &imageServer)

	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	// })

	log.Fatal(http.ListenAndServe(":8080", nil))
}

// type imageServer struct{}

// func (is *imageServer) ServeHTTP(w ResponseWriter, r *Request) {
// 	// http.FileServer(http.Dir(folder))
// }

// ListImages returns a list of images in the folder
func ListImages(folder string) []string {
	files := []string{}
	patterns := []string{
		filepath.Join(folder, "*.jpg"),
		filepath.Join(folder, "*.jpeg"),
		filepath.Join(folder, "*.png"),
		filepath.Join(folder, "*.gif"),
	}
	for _, p := range patterns {
		ff, err := filepath.Glob(p)
		if err != nil {
			panic(err)
		}
		for _, f := range ff {
			f = strings.TrimPrefix(f, folder)
			f = strings.TrimPrefix(f, "/")
			f = strings.TrimPrefix(f, "\\")
			files = append(files, f)
		}
	}
	return files
}
