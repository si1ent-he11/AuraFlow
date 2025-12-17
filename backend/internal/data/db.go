package data

import (
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

type db struct {
	conn *sqlx.DB
}

func connectAttemt(urlDb string, countAttemt int) (*sqlx.DB, error) {
	var (
		err  error
		conn *sqlx.DB
	)

	for i := 0; i < countAttemt; i++ {
		conn, err = sqlx.Connect("pgx", urlDb)
		if err == nil {
			return conn, nil
		}
	}

	return nil, err
}

func InitDb(urlDb string, countAttemt int) (db, error) {
	conn, err := connectAttemt(urlDb, countAttemt)
	if err != nil {
		return db{}, err
	}

	if err := conn.Ping(); err != nil {
		return db{}, err
	}

	return db{conn: conn}, nil
}
