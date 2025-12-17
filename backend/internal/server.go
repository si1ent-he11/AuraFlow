package server

import "net/http"

type server struct {
	httpServer *http.Server
}

func NewServer(httpHandler http.Handler, appPort string) *server {
	return &server{
		httpServer: &http.Server{
			Addr:    ":" + appPort,
			Handler: httpHandler,
		},
	}
}

func (s *server) Run() error {
	return s.httpServer.ListenAndServe()
}
