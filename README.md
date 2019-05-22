# Sample project to do
## Usage
### Local dev
command: 
```
sudo yarn dev
```
->webpack-dev-server starts
->port number: 8080
-> https://localhost:8080

### Local nginx
command:
```
su
local_nginx_start
```
-> nginx starts
-> port number: 80 
-> https://localhost/p-drum

### prod env
```
su
docker-compose up
```
-> docker-compose starts
-> port number: 80
-> https://hostname.com/p-drum
