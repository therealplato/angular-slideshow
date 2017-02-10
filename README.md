# slidess
simple slideshow server

# usage
slidess

# build

    bower install
    go get github.com/elazarl/go-bindata-assetfs/... github.com/elazarl/go-bindata/...
    go-bindata-assetfs.exe -pkg slidess app/...
    mv bindata_assetfs.go bindata/

##todo
- go server
  - scan for images and hold in memory
  - serve static content
  - serve folder.json endpoint
  - compile static content into binary
  - generate and embed certs