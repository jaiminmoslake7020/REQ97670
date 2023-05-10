#!/bin/bash
set -x

DB_NAME=${req_DB:=req96760}
DB_USER=${req_DB_USER:=jaimin}
DB_HOST=${req_DB_HOST:=localhost}
DB_PWD=${req_DB_PWD:=jaImiNPK*}

/Applications/Postgres.app/Contents/Versions/14/bin/psql ${CI:+-U $DB_USER -h $DB_HOST} -c "drop database IF EXISTS $DB_NAME"
/Applications/Postgres.app/Contents/Versions/14/bin/psql ${CI:+-U $DB_USER -h $DB_HOST} -c "create database $DB_NAME"
/Applications/Postgres.app/Contents/Versions/14/bin/psql ${CI:+-U $DB_USER -h $DB_HOST} $DB_NAME -c "create extension postgis"
/Applications/Postgres.app/Contents/Versions/14/bin/psql ${CI:+-U $DB_USER -h $DB_HOST} $DB_NAME -c "create user $DB_USER"
/Applications/Postgres.app/Contents/Versions/14/bin/psql ${CI:+-U $DB_USER -h $DB_HOST} $DB_NAME -c "alter user $DB_USER with encrypted password '$DB_PWD'"
/Applications/Postgres.app/Contents/Versions/14/bin/psql ${CI:+-U $DB_USER -h $DB_HOST} $DB_NAME -c "grant all privileges on database $DB_NAME to $DB_USER"
