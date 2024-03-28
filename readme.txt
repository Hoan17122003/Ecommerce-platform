
-d : Detach(background ) mode
-e : enviroment variable
--name : container's name
-p : map port 

docker run \
-e "ACCEPT_EULA=Y"\
-e "SA_PASSWORD=Abc@123456789" \
--name sql-server-2019-container \
-p 1435:1433\
-d mcr.microsoft.com/mssql/server:2019-latest


docker run \
-e "ACCEPT_EULA=Y"\
-e "SA_PASSWORD=Abc@123456789" \
--name sql-server-2019-container \
-p 1435:1433\
-d mcr.microsoft.com/mssql/server:2019-latest\
-v : /var/opt/mssql

remove container => data lost => how to solve ? 
let's map container's volume to your host(PC)'s volume
docker rm
-f : force
-v : "host' volume":" container's volume"