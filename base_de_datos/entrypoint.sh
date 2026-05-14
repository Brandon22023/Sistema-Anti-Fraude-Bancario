#!/bin/bash
set -euo pipefail

if [ -z "${SA_PASSWORD:-}" ]; then
  echo "SA_PASSWORD no está definido"
  exit 1
fi

if [ -z "${SENTINELPAY_DB_USER:-}" ] || [ -z "${SENTINELPAY_DB_PASSWORD:-}" ]; then
  echo "SENTINELPAY_DB_USER o SENTINELPAY_DB_PASSWORD no están definidos"
  exit 1
fi

/opt/mssql/bin/sqlservr &
sqlserver_pid=$!

echo "Esperando a que SQL Server inicie..."

until /opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "${SA_PASSWORD}" \
  -C \
  -Q "SELECT 1" >/dev/null 2>&1
do
  echo "SQL Server no está listo, reintentando..."
  sleep 5
done

database_exists=$(/opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "${SA_PASSWORD}" \
  -C \
  -h -1 \
  -W \
  -Q "SET NOCOUNT ON; SELECT CASE WHEN DB_ID(N'SentinelPayDb') IS NULL THEN 0 ELSE 1 END" \
  | tr -d '\r' | tail -n 1)

if [ "${database_exists}" = "1" ]; then
  echo "La base de datos ya existe. Se omite la inicialización."
else
  echo "Ejecutando script de inicialización..."
  /opt/mssql-tools18/bin/sqlcmd \
    -S localhost \
    -U sa \
    -P "${SA_PASSWORD}" \
    -C \
    -I \
    -i /usr/src/app/init.sql
  echo "Base de datos inicializada correctamente."
fi

echo "Creando o actualizando el usuario de aplicación..."
/opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "${SA_PASSWORD}" \
  -C \
  -Q "IF NOT EXISTS (SELECT 1 FROM sys.sql_logins WHERE name = N'${SENTINELPAY_DB_USER}') CREATE LOGIN [${SENTINELPAY_DB_USER}] WITH PASSWORD = N'${SENTINELPAY_DB_PASSWORD}', CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF;"

/opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "${SA_PASSWORD}" \
  -C \
  -d SentinelPayDb \
  -Q "IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'${SENTINELPAY_DB_USER}') CREATE USER [${SENTINELPAY_DB_USER}] FOR LOGIN [${SENTINELPAY_DB_USER}]; IF IS_ROLEMEMBER('db_owner', N'${SENTINELPAY_DB_USER}') = 0 ALTER ROLE [db_owner] ADD MEMBER [${SENTINELPAY_DB_USER}];"

echo "Usuario de aplicación listo."

wait "${sqlserver_pid}"