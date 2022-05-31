#!/bin/sh

echo "Start to initialize MariaDB database... ⌛"

mariadb -u root -p${MARIADB_ROOT_PASSWORD} --execute \
"grant select, update, insert, delete on Playground.cards to '${MARIADB_USER}'@'%';"

echo "Finish MariaDB database initializing🍻"
